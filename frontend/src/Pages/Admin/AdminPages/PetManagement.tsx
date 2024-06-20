import { getAllPets, deletePetById } from  "@/lib/api"
import { useQuery } from "@tanstack/react-query"

export default function PetManagement() {

  const dataFetch = async () => {
    try {
        const data = await getAllPets();
        return data;
    } catch (error) {
        console.error("Error:", error);
    }
};

const { isLoading, error, data } = useQuery({
    queryKey: ["GetAllPets"],
    queryFn: dataFetch,
});

console.log(isLoading, error, data)

  return (
    <>
     <>
      <div>
        <div className="header">
          <div className="header-title my-3">
            <h2 className="text-center font-bold text-3xl">Pets Management</h2>
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

             {data && data.map((data,key) =>  ( <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">{data.petName}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">{(data.created_at).slice(0, 10)}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">{data.userData.firstName} {data.userData.lastName}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">{(data.isFree)? "Free":data.price}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-white">Floreda south America</td>
                  <td className="whitespace-nowrap px-4 flex gap-3 py-2">
                    <a
                      href="#"
                      className="inline-block rounded bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700"
                    >
                      Edit
                    </a>
                    <button
                     onClick={() => deletePetById(data._id)
                     
                     }
                      className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>))}
            </table>
          </div>
        </div>
      </div>
    </>
    </>
  )
}
