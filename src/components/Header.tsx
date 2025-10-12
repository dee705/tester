import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Music, Menu } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle"; // ✅ ADD THIS

const Header = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = ["home", "about", "music", "fanpages"];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50
      bg-gradient-to-r from-white/90 via-green-50/70 to-green-200/60
      dark:from-zinc-900 dark:via-green-900/40 dark:to-zinc-800/80
      backdrop-blur-md border-b border-white/40 shadow-lg transition-all duration-500"
    >
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Music className="h-8 w-8 text-green-600 dark:text-green-400 drop-shadow-md" />
            <span className="text-xl font-bold text-green-800 dark:text-green-200">
              Klarisse
            </span>
          </div>

          {/* Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-gray-800 dark:text-gray-200 hover:text-green-700 dark:hover:text-green-400"
                >
                  Menu
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white/95 dark:bg-zinc-900/90 backdrop-blur-md shadow-lg rounded-xl border border-green-100 dark:border-green-800">
                {navItems.map((item) => (
                  <DropdownMenuItem
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`cursor-pointer ${
                      item === "music"
                        ? "font-semibold bg-green-600 text-white rounded-md mt-2 hover:bg-green-700 hover:shadow-lg hover:shadow-green-400/50 transition"
                        : "text-gray-800 dark:text-gray-200 hover:text-green-700 dark:hover:text-green-400"
                    }`}
                  >
                    {item === "music"
                      ? "🎧 Music"
                      : item.charAt(0).toUpperCase() + item.slice(1)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* 🌙 Theme Toggle Button */}
            <ThemeToggle />
          </div>

          {/* Navigation - Mobile */}
