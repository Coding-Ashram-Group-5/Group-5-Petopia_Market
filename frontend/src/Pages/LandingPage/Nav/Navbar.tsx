import { ModeToggle } from "@/components/Ui/Buttons/mode-toggle";
import Sidebar from "./Sidebar";
import { motion, useAnimation } from "framer-motion";
import { CgProfile } from "react-icons/cg";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/Ui/Menu/dropdown-menu";
import Logout from "@/components/Auth/pages/Logout";
import { Link } from "react-router-dom";
import usePersonStore from "@/lib/Utils/zustandStore";

const Navbar: React.FC = () => {
    const controls = useAnimation();
    const navItems = [
        { name: "Home", href: "/" },
        { name: "Products", href: "/products" },
        { name: "Pets", href: "/pets" },
        { name: "About", href: "/about" },
    ];

    const isUserLoggedIn = usePersonStore((state) => state.email);

    // const isUserLoggedIn = () => {
    //     // Check if the refresh token exists in the cookie storage
    //     const refreshToken = document.cookie.split('; ').find(row => row.startsWith('refreshToken='));
    //     return refreshToken !== undefined;
    // };

    const handleTap = async () => {
        controls.start({ opacity: 0 });
        // Add any additional logic here, such as navigation or API calls
    };

    return (
        <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
                <Link
                    to={"/"}
                    className="text-2xl font-leag font-extrabold text-black flex items-center ml-4 dark:text-gray-100"
                >
                    PetoPia🐶
                </Link>
            </div>
            <nav className="hidden gap-12 lg:flex items-center">
                {navItems.map((item) => (
                    <div
                        className="text-lg font-semibold text-black transition duration-100 hover:text-red-500 active:text-red-700 dark:text-gray-200 dark:hover:text-red-500 dark:active:text-red-700"
                        key={item.name}
                    >
                        <Link to={item.href}>{item.name}</Link>
                    </div>
                ))}
            </nav>
            <div className="flex items-center gap-5">
                <div className="hidden lg:flex relative left-4">
                    <ModeToggle />
                </div>
                <div className="relative top-[-2.55px]">
                    <Sidebar />
                </div>
                {!isUserLoggedIn && (
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <motion.button
                                type="button"
                                className="text-xs bg-yellow-300/100 dark:bg-blue-600/100 border border-gray-500 dark:border-gray-200 rounded-md p-2 transition duration-300 ease-in-out hidden sm:block"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onTap={handleTap}
                            >
                                <Link
                                    to="/login"
                                    className="text-gray-800 dark:text-gray-200"
                                >
                                    Sign In
                                </Link>
                            </motion.button>
                        </DropdownMenuTrigger>
                    </DropdownMenu>
                )}
                {isUserLoggedIn && (
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <CgProfile
                                className="text-3xl"
                                title="My Account"
                            />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel className="cursor-default">
                                My Account
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer">
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                                Billing
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                                Team
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                                Subscription
                            </DropdownMenuItem>
                            <DropdownMenuItem className="bg-border text-red-500/100 dark:text-red-600/100 cursor-pointer">
                                <Logout buttonLabel="Logout" />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </div>
    );
};

export default Navbar;
