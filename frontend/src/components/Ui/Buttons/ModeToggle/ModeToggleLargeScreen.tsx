import { Moon, Sun, Monitor } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/components/theme-provider";

export function ModeToggleLargeScreen() {
    const { setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [timer, setTimer] = useState<number | null>(null);

    const handleMouseEnter = () => {
        if (timer) clearTimeout(timer);
            window.setTimeout(() => {
                setIsOpen(true);
            }, 300)
    };

    const handleMouseLeave = () => {
        setTimer(
            window.setTimeout(() => {
                setIsOpen(false);
            }, 300)
        );
    };

    return (
        <div
            className="relative group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button
            type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="p-2 border rounded-lg flex items-center justify-center"
            >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
            </button>
            <div
                className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 border rounded-lg shadow-lg bg-white dark:bg-gray-800 transition-opacity duration-300 z-10 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
            >
                <div
                    onClick={() => {
                        setTheme("light");
                        setIsOpen(false);
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-x-2"
                >
                    <Sun /> <span>Light</span>
                </div>
                <div
                    onClick={() => {
                        setTheme("dark");
                        setIsOpen(false);
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-x-2"
                >
                    <Moon /> <span>Dark</span>
                </div>
                <div
                    onClick={() => {
                        setTheme("system");
                        setIsOpen(false);
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-x-2"
                >
                    <Monitor /> <span>System</span>
                </div>
            </div>
        </div>
    );
}
