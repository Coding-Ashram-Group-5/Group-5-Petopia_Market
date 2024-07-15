import { getAllProducts, deleteProductbyId } from "@/lib/ProductApi"
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/models";
import { Input } from "@/components/Ui/input";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/Ui/dialog";
import { Trash2Icon, PencilRuler } from "lucide-react";

export default function ProductManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const dataFetch = async (): Promise<Product[]> => {
    try {
      const data = await getAllProducts() as unknown as Product[];
      return data;
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  };

  const { data, refetch } = useQuery<Product[]>({
    queryKey: ["GetAllProducts"],
    queryFn: dataFetch,
  });
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data?.filter((product) =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
      <div>
        <div className="header">
          <div className="header-title my-3">
            <h2 className="text-center font-bold text-3xl">Products Management</h2>
            <div className="flex justify-between px-8 my-4"><div className="flex  gap-x-2 items-center"><h2 className=" font-bold font-cab">Search</h2><Input type="text" value={searchQuery} onChange={handleSearchChange} /></div><div className=""> <span className="px-6 font-bold">Total Product : {data?.length} </span><Link to={"/products/add"} className="text-center  bg-red-500 p-2 text-white font-bold rounded-md  font-cab">Add Products</Link></div></div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-background text-sm">
              <thead className="ltr:text-left rtl:text-right">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Name</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Purchased Date </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Quntity</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">User</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white"> Price </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white"> Address </th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>

              {filteredData && filteredData.map((data,key) => (<tbody key={key} className="divide-y divide-gray-200">
                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">{data.productName}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">24/05/1995</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">{data.quantity}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">{data.userData?.firstName}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">${data.productPrice}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">Floreda south America</td>
                  <td className="whitespace-nowrap px-4 flex gap-3 py-2">
                  <a
                        href="#"
                        className="inline-block rounded bg-blue-100 text-blue-500 px-4 py-2 text-xs font-medium hover:text-white hover:bg-blue-700"
                      >
                        <PencilRuler size={20} />
                      </a>
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
                                    await deleteProductbyId(data._id)
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
          </div>
        </div>
      </div>
    </>

  )
}
