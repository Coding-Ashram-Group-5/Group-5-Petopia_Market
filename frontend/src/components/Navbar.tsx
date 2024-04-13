import { ModeToggle } from "@/components/mode-toggle";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

export default function Navbar() {
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
                    Logo
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
                </div>
            </div>
        </>
    );
}
