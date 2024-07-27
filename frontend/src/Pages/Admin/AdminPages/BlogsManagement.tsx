
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/Ui/dialog";
import { Input } from "@/components/Ui/input";
import { getAllBlogsforadmin, deleteBlogById } from "@/lib/api"
import { Blog } from "@/types/models";
import { useQuery } from "@tanstack/react-query";
import { FilePenLine, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function BlogsManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const dataFetch = async (): Promise<Blog[]> => {
    try {
      const data = await getAllBlogsforadmin() as unknown as Blog[];
      return data ;
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  };

  const { isLoading, error, data, refetch } = useQuery<Blog[]>({
    queryKey: ["GetAllblogs"],
    queryFn: dataFetch,
  });
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data?.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
     <>
      <div>
        <div className="header">
        <div className="header-title my-3">
            <h2 className="text-center font-bold text-3xl">Blog Management</h2>
            <div className="flex justify-between px-8 my-4"><div className="flex  gap-x-2 items-center"><h2 className=" font-bold font-cab">Search</h2><Input type="text" value={searchQuery} onChange={handleSearchChange} /></div><Link to={"/admin/blogs/add"} className="text-center  bg-red-500 p-2 text-white font-bold rounded-md  font-cab">Add Blogs</Link></div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-background text-sm">
              <thead className="ltr:text-left rtl:text-right">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white"> Blogs Title</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Publish Date</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Category</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Likes</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Comments</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white"> Author </th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              {filteredData && filteredData.map((blog, key) => (
                <tbody key={key} className="divide-y divide-gray-200">
                  <tr>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">{blog.title.slice(0, 15)}...</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">{blog.userDetails?.created_at?.slice(0, 10)}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">{blog.category}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">{blog.likes?.length}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">{blog.comments?.length}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">{blog.userDetails?.firstName}</td>
                    <td className="whitespace-nowrap px-4 flex gap-3 py-2">
                    <Link 
                        to={`edit/${blog._id}`}
                        className="inline-block rounded bg-blue-100 text-blue-500 px-4 py-2 text-xs font-medium hover:text-white hover:bg-blue-700"
                      >
                        <FilePenLine  size={20} />
                      </Link>
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
                                  if (blog._id) {
                                    await deleteBlogById(blog._id)
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
                </tbody>
              ))}
               {isLoading && <div>Loding...</div>}
               {error && <div className="flex"> <h1 className=" text-center">Sorry some reason blogs not loading... </h1></div>}
            </table>
          </div>
        </div>
      </div>
    </>
    </>
  )
}
