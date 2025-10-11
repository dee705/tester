import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Music, Menu } from "lucide-react";

const Header = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 
      bg-gradient-to-r from-white/90 via-green-50/70 to-green-200/60
      backdrop-blur-md border-b border-white/40 shadow-lg">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Music className="h-8 w-8 text-green-600 drop-shadow-md" />
            <span className="text-xl font-bold text-green-800">Klarisse</span>
          </div>

          {/* Dropdown Navigation - Desktop */}
          <div className="hidden md:flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-gray-800 hover:text-green-700"
                >
                  Menu
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white/95 backdrop-blur-md shadow-lg rounded-xl border border-green-100">
                {["home", "about", "music", "fanpages"].map((item) => (
                  <DropdownMenuItem
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="cursor-pointer text-gray-800 hover:text-green-700"
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem
                  onClick={() => scrollToSection("music")}
                  className="cursor-pointer font-semibold bg-green-600 text-white rounded-md mt-2 hover:bg-green-700 hover:shadow-lg hover:shadow-green-400/50 transition"
                >
                  🎧 Listen Now
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Dropdown Navigation - Mobile */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="p-2 rounded-md bg-white/40 backdrop-blur-md hover:bg-green-100 transition"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white/95 backdrop-blur-lg shadow-lg rounded-xl border border-green-100">
                {["home", "about", "music", "fanpages"].map((item) => (
                  <DropdownMenuItem
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="cursor-pointer text-gray-800 hover:text-green-700"
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem
                  onClick={() => scrollToSection("music")}
                  className="cursor-pointer font-semibold bg-green-600 text-white rounded-md mt-2 hover:bg-green-700 hover:shadow-lg hover:shadow-green-400/50 transition"
                >
                  🎧 Listen Now
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
