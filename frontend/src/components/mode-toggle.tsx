import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"
import { toast } from "sonner"

export function ModeToggle() {
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
        <DropdownMenuItem onClick={handleLight}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDark}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSystem}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
