import { ModeToggle } from "@/components/Ui/Buttons/mode-toggle";
import { CgProfile } from "react-icons/cg";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/Ui/Menu/dropdown-menu";
import { Link } from "react-router-dom";



const Navbar: React.FC = () => {
    const navItems = [
        { name: "Home", href: "/" },
        { name: "Products", href: "/products" },
        { name: "Pricing", href: "/pricing" },
        { name: "About", href: "/about" },
    ];

    return (
            <>
                <div className="flex justify-between p-4 border-b">
                    <Link to={"/"} className="left">
                        <a className="dark:text-white font-leag text-[1.5rem] font-extrabold text-black ">Petopia🐶</a>
                    </Link>
                    <div>

                        <nav className="hidden gap-12 lg:flex">
                    {navItems.map((item) => (
                        <div
                            className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-red-500 active:text-red-700"
                            key={item.name}
                        >
                            <Link to={item.href}>{item.name}</Link>
                        </div>
                    ))}
                </nav>
            </div>
            <div className="right flex gap-5">
                <ModeToggle />
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <CgProfile className="text-3xl" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel className="cursor-default">My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">Billing</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">Team</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">Subscription</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                    </div>
                </div>
            </>
        );
    }

    export default Navbar