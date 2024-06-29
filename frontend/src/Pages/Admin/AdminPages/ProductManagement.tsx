import { getAllProducts } from "@/lib/ProductApi"
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/models";
import { Input } from "@/components/Ui/input";
import { Link } from "react-router-dom";

export default function ProductManagement() {
  const dataFetch = async (): Promise<Product[]> => {
    try {
      const data = await getAllProducts() as unknown as Product[];
      return data;
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  };

  const { isLoading, error, data } = useQuery<Product[]>({
    queryKey: ["GetAllProducts"],
    queryFn: dataFetch,
  });
  console.log(isLoading, error, data)
  return (
    <>
      <div>
        <div className="header">
          <div className="header-title my-3">
            <h2 className="text-center font-bold text-3xl">Products Management</h2>
            <div className="flex justify-between px-8 my-4"><div className="flex  gap-x-2 items-center"><h2 className=" font-bold font-cab">Search</h2><Input type="text" /></div><Link to={"/products/add"} className="text-center  bg-red-500 px-2 py-1 font-bold rounded-md  font-cab">Add Products</Link></div>
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

              {data && data.map((data,key) => (<tbody key={key} className="divide-y divide-gray-200">
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
                      className="inline-block rounded bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700"
                    >
                      Edit
                    </a>
                    <a
                      href="#"
                      className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                    >
                      Delete
                    </a>
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
