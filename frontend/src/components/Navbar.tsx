import { ModeToggle } from "@/components/mode-toggle";
import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import logo from "@/assets/fulllogo.png";

const Navbar: React.FC = () => {
    const navItems = [
        { name: "Home", href: "/" },
        { name: "Products", href: "/products" },
        { name: "Pricing", href: "/pricing" },
        { name: "About", href: "/about" },
    ];

    return (
        <>
            <div className="flex justify-between items-center p-4 border-b">
                <Link to={"/"} className="left">
                    <div className="h-fit w-24">
                        <img src={logo} alt="Petopia" />
                    </div>
                </Link>

                <nav className="hidden gap-12 lg:flex items-center">
                    {navItems.map((item) => (
                        <div
                            className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-red-500 active:text-red-700"
                            key={item.name}
                        >
                            <Link to={item.href}>{item.name}</Link>
                        </div>
                    ))}
                </nav>

                <div className="right flex gap-5 items-center">
                    <ModeToggle />
                    <div className="hidden md:flex">
                        <DropdownMenu>
                            <DropdownMenuTrigger>Profile</DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>
                                    My Account
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Billing</DropdownMenuItem>
                                <DropdownMenuItem>Team</DropdownMenuItem>
                                <DropdownMenuItem>
                                    Subscription
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
