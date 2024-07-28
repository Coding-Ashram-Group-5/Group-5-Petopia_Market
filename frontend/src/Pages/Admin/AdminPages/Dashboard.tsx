import { IoCartOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { AiTwotoneDashboard } from "react-icons/ai";
import { MdAdsClick } from "react-icons/md";
import { BasicChart } from "./Dashboard/BasicChart";
import { PieCharts } from "./Dashboard/PieChart";
import { dashboardDetails } from "@/lib/UserApi";
import { useQuery } from "@tanstack/react-query";
import { IAdminPanelDetailsResponse } from "@/types/models";

export default function Dashboard() {
  const dataFetch = async (): Promise<IAdminPanelDetailsResponse> => {
    try {
      const data = await dashboardDetails();
      return data;
    } catch (error) {
      console.error("Error:", error);
      return {} as IAdminPanelDetailsResponse;
    }
  };

  const { data } = useQuery<IAdminPanelDetailsResponse, Error>({
    queryKey: ["GetAllDetailsadmin"],
    queryFn: dataFetch,
  });

  return (
    <>
      <section className="p-6 my-6 bg-background dark:text-gray-800">
        <div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4">
          <div className="flex border p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-background dark:text-white">
            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 ">
              <IoCartOutline size={40} />
            </div>
            <div className="flex flex-col justify-center align-middle">
              <p className="text-3xl font-semibold leading-none">{data?.totalPurchasedProducts || 0}</p>
              <p className="capitalize">order</p>
            </div>
          </div>
          <div className="flex border p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-background dark:text-white">
            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 ">
              <FaUsers size={40} />
            </div>
            <div className="flex flex-col justify-center align-middle">
              <p className="text-3xl font-semibold leading-none">{data?.totalNewUsers || 0}</p>
              <p className="capitalize">new users</p>
            </div>
          </div>
          <div className="flex border p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-background dark:text-white">
            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 ">
              <AiTwotoneDashboard size={40} />
            </div>
            <div className="flex flex-col justify-center align-middle">
              <p className="text-3xl font-semibold leading-none">{data?.totalNewProducts || 0}</p>
              <p className="capitalize">products</p>
            </div>
          </div>
          <div className="flex border p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-background dark:text-white">
            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 ">
              <MdAdsClick size={40} />
            </div>
            <div className="flex flex-col justify-center align-middle">
              <p className="text-3xl font-semibold leading-none">{data?.visitCount || 0}</p>
              <p className="capitalize">visits</p>
            </div>
          </div>
        </div>
      </section>
      <section className="p-6 py-1 flex gap-x-2 flex-col md:flex-row bg-background dark:text-gray-200">
        <div className="border h-full w-full rounded-lg">
          <BasicChart />
        </div>
        <div className="border h-full w-80 rounded-lg">
          <PieCharts />
        </div>
      </section>
    </>
  );
}
