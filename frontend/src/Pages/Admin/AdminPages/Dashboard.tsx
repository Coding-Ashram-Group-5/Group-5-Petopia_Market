import { IoCartOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { AiTwotoneDashboard } from "react-icons/ai";
import { MdAdsClick } from "react-icons/md";

const boxs = [
  {
    name: 'Orders',
    icon: <IoCartOutline size={40} />,
    value: 200
  },
  {
    name: 'New',
    icon: <FaUsers size={40}  />,
    value: 700
  },
  {
    name: 'Growth',
    icon: <AiTwotoneDashboard  size={40} />,
    value: '172%'
  },
  {
    name: 'Bounce rate',
    icon: <MdAdsClick size={40}  />,
    value: '17%'
  }
];

export default function Dashboard() {
  return (
    <>
      <section className="p-6 my-6 bg-background dark:text-gray-800">
        <div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4">
        {
          boxs.map((box, index) => (
            <div key={index} className="flex border p-4 space-x-4 rounded-lg md:space-x-6 dark:bg-gray-50 dark:text-gray-800">
              <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 dark:bg-violet-600">
                {box.icon}
              </div>
              <div className="flex flex-col justify-center align-middle">
                <p className="text-3xl font-semibold leading-none">{box.value}</p>
                <p className="capitalize">{box.name}</p>
              </div>
            </div>
          ))
        }
      
        </div>
      </section>
    </>
  )
}
