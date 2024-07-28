import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ModeToggle } from "@/components/Ui/Buttons/ModeToggle/mode-toggle";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoChevronDown, IoClose } from "react-icons/io5";
import { IoIosWallet } from "react-icons/io";
import { LuShoppingBasket, LuChevronLeft } from "react-icons/lu";
import { HiChartPie, HiShoppingBag } from "react-icons/hi2";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { Info, FilePen } from 'lucide-react';
import { PiReadCvLogoDuotone } from "react-icons/pi";
import usePersonStore from '@/lib/Utils/zustandStore';

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);

    const isUserLoggedIn = usePersonStore((state) => state._id);

    const handleToggleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        setIsOpen(!isOpen);
    };

    const handleCloseClick = () => {
        setIsOpen(false);
    };

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const sidebarVariants = {
        open: { x: 0 },
        closed: { x: '100%' }
    };

    const sidebarMenuVariants = {
        open: { opacity: 1, y: 0 },
        closed: { opacity: 0, y: '-50%' }
    };

    return (
        <div className='lg:hidden'>
            <motion.button
                data-drawer-target="sidebar-multi-level-sidebar"
                data-drawer-toggle="sidebar-multi-level-sidebar"
                aria-label='Sidebar controls'
                type="button"
                className="inline-flex items-center p-2 mt-1 ms-3 text-lg text-black rounded-lg bg-border lg:hidden hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                onClick={handleToggleClick}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <span className="sr-only">Open sidebar</span>
                <RxHamburgerMenu size={20} title='Open Sidebar' aria-label='Sidebar'/>
            </motion.button>

            <motion.aside
                id="sidebar-multi-level-sidebar"
                className="fixed top-0 right-0 z-40 w-64 h-screen bg-gray-50 dark:bg-gray-800"
                aria-label="Sidebar"
                ref={sidebarRef}
                initial={false}
                animate={isOpen ? "open" : "closed"}
                variants={sidebarVariants}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <motion.div
                    className="h-full px-3 py-4 overflow-y-auto"
                    variants={sidebarMenuVariants}
                    transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
                >
                    <div className="sidebar-menu-container">
                        <ul className="space-y-2 font-medium">
                            <li>
                                <a href="/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <HiChartPie size={25} />
                                    <span className="ms-3">Petboard</span>
                                </a>
                            </li>
                            <li>
                                <div>
                                    <button type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" data-collapse-toggle="sidebar-multi-level-menu" onClick={handleDropdownToggle}>
                                        <LuShoppingBasket size={25} />
                                        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">PET-Eommerce</span>
                                        {isDropdownOpen ? <IoChevronDown size={20} /> : <LuChevronLeft size={20} />}
                                    </button>
                                    {isDropdownOpen && (
                                        <ul id="sidebar-multi-level-menu" className="py-2 space-y-2">
                                            <li>
                                                <a href="/pets" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                                    Pets
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                                    Billing
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                                    Invoice
                                                </a>
                                            </li>
                                        </ul>
                                    )}
                                    <li>
                                        <a href="/products" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            <HiShoppingBag size={21.5} />
                                            <span className="ms-3">Products</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/blogs" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        <PiReadCvLogoDuotone size={21.5}/>
                                            <span className="ms-3">Blogs</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/login" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            <IoIosWallet size={21.5} />
                                            <span className="ms-3">Pricing</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/about" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            <Info size={21.5} />
                                            <span className="ms-3">About</span>
                                        </a>
                                    </li>
                                </div>
                            </li>
                            {!isUserLoggedIn && (
                                <>
                                    <li>
                                        <a href="/auth" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            <FaArrowRightToBracket size={21.5} />
                                            <span className="ms-3">Sign In</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/auth" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            <FilePen size={25} />
                                            <span className="ms-3">Sign Up</span>
                                        </a>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </motion.div>

                <motion.div
                    className="absolute inset-x-0 bottom-0 left-0 p-4"
                    initial={{ opacity: 0, y: '50%' }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut", delay: 0.4 }}
                >
                    <hr className="w-48 h-1 mx-auto my-4 bg-gray-300 border-0 rounded md:my-10 dark:bg-gray-700" />
                    <ModeToggle />
                </motion.div>

                {isOpen && (
                    <motion.button
                        type="button"
                        className="absolute top-2 left-[-4.5rem] mt-2 mr-4 text-white border-solid border-2 border-white dark:border-white rounded dark:text-white inline-flex items-center p-2 ms-3 text-l lg:hidden hover:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-gray-20 dark:hover:border-sky-300 dark:focus:ring-gray-600 bg-transparent"
                        onClick={handleCloseClick}
                        title="Close Sidebar"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, ease: "easeInOut", delay: 0.5 }}
                    >
                        <IoClose size={25} />
                    </motion.button>
                )}
            </motion.aside>

            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={handleCloseClick}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                ></motion.div>
            )}
        </div>
    );
}

export default Sidebar;
