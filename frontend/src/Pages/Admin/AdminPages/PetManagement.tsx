import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/Ui/dialog";
import { Input } from "@/components/Ui/input";
import { getAllPets, deletePet } from  "@/lib/api"
import { Pet } from "@/types/models";
import { useQuery } from "@tanstack/react-query"
import {  PencilRuler, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function PetManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const dataFetch = async (): Promise<Pet[]> => {
    try {
        const data = await getAllPets() as unknown as Pet[];
        return data;
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
};

const { isLoading, error, data, refetch } = useQuery<Pet[]>({
    queryKey: ["GetAllPets"],
    queryFn: dataFetch,
});


const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setSearchQuery(event.target.value);
};

const filteredData = data?.filter((pet) =>
  pet.petName.toLowerCase().includes(searchQuery.toLowerCase())
);


  return (
    <>
     <>
      <div>
        <div className="header">
          <div className="header-title my-3">
            <h2 className="text-center font-bold text-3xl">Pets Management</h2>
            <div className="flex justify-between px-8 my-4"><div className="flex  gap-x-2 items-center"><h2 className=" font-bold font-cab">Search</h2><Input type="text" value={searchQuery} onChange={handleSearchChange} /></div><div><span className="px-6 font-bold">Total Pets : {data?.length} </span><Link to={"/admin/pets/add"} className="text-center  bg-red-500 p-2 font-bold rounded-md  text-white  font-cab">Add Pets</Link></div></div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-background text-sm">
              <thead className="ltr:text-left rtl:text-right">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Pet Name</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Date </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Pet Owner</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white"> Price </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white"> Address </th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>

             {filteredData && filteredData.map((data,key) =>  ( <tbody className="divide-y divide-gray-200">
                <tr key={key}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">{data.petName}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">{(data.created_at).slice(0, 10)}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">{data.userData.firstName} {data.userData.lastName}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">{(data.isFree)? "Free":data.price}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">Floreda south America</td>
                  <td className="whitespace-nowrap px-4 flex gap-3 py-2">
                  <Link
                        to={`edit/${data._id}`}
                        className="inline-block rounded bg-blue-100 text-blue-500 px-4 py-2 text-xs font-medium hover:text-white hover:bg-blue-700"
                      >
                        <PencilRuler size={20} />
                      </Link>
                    <Dialog>
                        <DialogTrigger className="inline-block rounded hover:bg-red-500 hover:text-white bg-red-100 px-4 py-2 text-xs font-medium text-red-500"><Trash2Icon /></DialogTrigger>
                        <DialogContent >
                          <DialogHeader>
                            <DialogTitle>Are you sure Delete?</DialogTitle>
                            <DialogDescription >
                              <p className="py-6">This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.</p>
                            </DialogDescription>
                            <DialogClose asChild>
                            <button onClick={
                              async () => {
                                  if (data._id) {
                                    await deletePet(data._id)
                                    refetch();
                                  } else {
                                    console.error("Error: User ID is undefined");
                                  }
                              }
                            } className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700">Delete</button>
                            </DialogClose>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                  </td>
                </tr>
              </tbody>))}
            </table>
            {isLoading && <div>Loding...</div>}
            {error && <div className="flex"> <h1 className=" text-center">Sorry some reason blogs not loading... </h1></div>}
          </div>
        </div>
      </div>
    </>
    </>
  )
}
