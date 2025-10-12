import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Music, Menu, Sun, Moon } from "lucide-react"; // ✅ Icons for toggle
import { useTheme } from "next-themes"; // ✅ Hook to control theme

const Header = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const { theme, setTheme } = useTheme(); // ✅ get and set theme
  const navItems = ["home", "about", "music", "fanpages"];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50
      bg-gradient-to-r from-white/90 via-green-50/70 to-green-200/60
      dark:from-gray-900/90 dark:via-gray-800/70 dark:to-gray-700/60
      backdrop-blur-md border-b border-white/40 shadow-lg transition-colors duration-300"
    >
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Logo + Theme Toggle */}
          <div className="flex items-center space-x-3">
            <Music className="h-8 w-8 text-green-600 dark:text-green-400 drop-shadow-md" />
            <span className="text-xl font-bold text-green-800 dark:text-green-100">
              Klarisse
            </span>

            {/* 🌙 Theme Toggle Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="ml-2 text-gray-800 dark:text-gray-100 hover:text-green-600 dark:hover:text-green-400 transition"
              title="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Navigation - Desktop */}
          <div className="hidden md:flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-gray-800 dark:text-gray-100 hover:text-green-700 dark:hover:text-green-400"
                >
                  Menu
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg rounded-xl border border-green-100 dark:border-gray-700">
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
          </div>

          {/* Navigation - Mobile */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="p-2 rounded-md bg-white/40 dark:bg-gray-800/60 backdrop-blur-md hover:bg-green-100 dark:hover:bg-green-800/50 transition"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg rounded-xl border border-green-100 dark:border-gray-700">
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
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
