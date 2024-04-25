import { Moon, Sun } from "lucide-react"
<<<<<<< HEAD:frontend/src/components/mode-toggle.tsx
import { Button } from "@/components/ui/button"
=======

import { Button } from "@/components/Ui/Buttons/button"
>>>>>>> origin/main:frontend/src/components/Ui/Buttons/mode-toggle.tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/Ui/Menu/dropdown-menu"
import { useTheme } from "@/components/theme-provider"
import { toast } from "sonner"

export function ModeToggle() {
<<<<<<< HEAD:frontend/src/components/mode-toggle.tsx
  const { setTheme} = useTheme()

  function handleLight() {
    setTheme("light")
    toast.success("Light ☀️", {
      description: "Light mode enabled",
      duration: 2000,
    })
  }
  function handleDark() {
    setTheme("dark")
    toast.success("Dark 🌙",{
      description: "Dark mode enabled",
      duration: 2000,
    })
  }
  function handleSystem() {
    setTheme("system")
    toast.success("System 💻" ,{
      description: "System theme enabled",
      duration: 2000,
    })
  }
=======
  const { setTheme } = useTheme() // ,theme
   // console.log(theme)
>>>>>>> origin/main:frontend/src/components/Ui/Buttons/mode-toggle.tsx

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
<<<<<<< HEAD:frontend/src/components/mode-toggle.tsx
        <DropdownMenuItem onClick={handleLight}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDark}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSystem}>
=======
        <DropdownMenuItem onClick={() => setTheme("light")} className=" cursor-pointer">
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className=" cursor-pointer">
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className=" cursor-pointer">
>>>>>>> origin/main:frontend/src/components/Ui/Buttons/mode-toggle.tsx
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
