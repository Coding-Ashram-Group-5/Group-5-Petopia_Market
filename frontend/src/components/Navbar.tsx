import { ModeToggle } from "@/components/mode-toggle";
import { ModeToggle } from '@/components/mode-toggle'
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
} from "@/components/ui/dropdown-menu"
import logo from '@/assets/fulllogo.png'



export default function Navbar() {
    const navItems = [
        { name: "Home", href: "/" },
        { name: "Products", href: "/products" },
        { name: "Pricing", href: "/pricing" },
        { name: "About", href: "/about" },
    ];
const Navbar: React.FC = () => {

    return (
        <>
            <div className="flex justify-between p-4 border-b">
                <Link to={"/"} className="left">
                    Logo
                </Link>
                <div>
                <div className="h-fit w-24"> <img src={logo} alt="Petopia" /></div>
                <div >
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
                        <DropdownMenuTrigger>Profile</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                            <DropdownMenuItem>Team</DropdownMenuItem>
                            <DropdownMenuItem>Subscription</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                        <a  className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-red-500 active:text-red-700">Home</a>
                        <a href="#" className="inline-flex items-center gap-1 text-lg font-semibold text-red-500">
                            <DropdownMenu>
                                <DropdownMenuTrigger>Product</DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                    <DropdownMenuItem>Billing</DropdownMenuItem>
                                    <DropdownMenuItem>Team</DropdownMenuItem>
                                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                        </a>
                        <a href="#" className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-red-500 active:text-red-700">Pricing</a>
                        <a href="#" className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-red-500 active:text-red-700">About</a>
                    </nav>
                </div>
            </div>
        </>
    );
}

export default Navbar;