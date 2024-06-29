import { MdOutlinePets, MdDashboard } from "react-icons/md";
import { FaLuggageCart, FaUsers } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/Ui/tooltip";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const SidebarButton = [
  {
    name: 'Dashboard',
    icon: <MdDashboard />,
    path: '/admin'
  },
  {
    name: 'Products',
    icon: <FaLuggageCart />,
    path: 'products'
  },
  {
    name: 'Pets',
    icon: <MdOutlinePets />,
    path: 'pets'
  },
  {
    name: 'Blogs',
    icon: <TfiWrite />,
    path: 'blogs'
  },
  {
    name: 'Users',
    icon: <FaUsers />,
    path: 'users'
  }
];

export default function Admin() {
  return (
    <div className="flex">
      <div className="sidebar h-screen border-r-2">
        <TooltipProvider>
          <div className="py-4 flex flex-col">
            {SidebarButton.map((button, index) => (
              <Tooltip key={index}>
                <TooltipTrigger>
                  <Link to={button.path} className="flex items-center gap-x-3 my-4 justify-start px-4 h-10 w-fit hover:bg-slate-200">
                    {button.icon}
                    <span className="font-leag font-bold items-center hidden md:block">
                      {button.name}
                    </span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{button.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </div>
      <div className="main w-[80vw] h-fit">
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
