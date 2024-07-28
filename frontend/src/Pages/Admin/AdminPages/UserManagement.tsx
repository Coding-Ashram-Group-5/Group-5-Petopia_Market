import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/Ui/dialog";
import { Input } from "@/components/Ui/input";
import { getAllUsers, deleteUserById } from "@/lib/UserApi"
import { User } from "@/types/models";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Trash2, Search } from "lucide-react"

export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const dataFetch = async (): Promise<User[]> => {
    try {
      const data = await getAllUsers() as unknown as User[];
      console.log(data)
      return data;
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  };

  const { isLoading, error, data, refetch } = useQuery<User[]>({
    queryKey: ["GetAllUsers"],
    queryFn: dataFetch,
  });
  console.log(isLoading, error, data)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data?.filter((user) =>
    user.firstName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
      <>
        <div>
          <div className="header">
            <div className="header-title my-3">
              <h2 className="text-center font-bold text-3xl">User Management</h2>
              <div className="flex justify-between px-8 my-4"><div className="flex  gap-x-2 items-center"><h2 className=" font-bold font-cab flex gap-x-2"> <Search />Search</h2><Input type="text" value={searchQuery} onChange={handleSearchChange} /></div><span className="px-6 font-bold">Total Users : {data?.length} </span></div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y-2 divide-gray-200 bg-background text-sm">
                <thead className="ltr:text-left rtl:text-right">
                  <tr>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white"> Name</th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Join Date </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Role</th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Email Address </th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>

                {filteredData && filteredData.map((data, key) => (<tbody key={key} className="divide-y divide-gray-200">
                  <tr>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">{data.firstName} {data.lastName}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">{(data.created_at)?.slice(0, 10)}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">{data.userRole}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">{data.email}</td>
                    <td className="whitespace-nowrap px-4 flex gap-3 py-2">
                      <Dialog>
                        <DialogTrigger className="inline-block rounded hover:bg-red-500 hover:text-white bg-red-100 px-4 py-2 text-xs font-medium text-red-500"><Trash2 /></DialogTrigger>
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
                                    await deleteUserById(data._id)
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
