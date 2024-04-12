import { ModeToggle } from '@/components/mode-toggle'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navbar() {

    return (
        <>
            <div className="flex justify-between p-4 border-b">
                <div className="left">Logo</div>
                <div >
                    <nav className="hidden gap-12 lg:flex">
                        <a href="#" className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-red-500 active:text-red-700">Home</a>
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
                <div className="right"><ModeToggle /></div>
            </div>

        </>

    )
}
