import { Button } from "@/components/ui/button";
import { Music, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-green-500/80 via-white/60 to-green-400/70 backdrop-blur-md border-b border-white/30 shadow-lg">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Music className="h-8 w-8 text-green-700 drop-shadow-md" />
            <span className="text-xl font-bold text-green-900">Klarisse</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {["home", "about", "music", "fanpages"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="relative text-gray-800 hover:text-green-700 transition duration-300 ease-in-out
                           after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-green-600
                           after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </nav>

          {/* Listen Now Button */}
          <Button className="ml-4 bg-green-600 hover:bg-green-700 transition transform hover:scale-105 shadow-md hover:shadow-green-400/50">
            Listen Now
          </Button>

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md bg-white/30 backdrop-blur-md hover:bg-green-100 transition"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 flex flex-col space-y-3 bg-white/60 backdrop-blur-lg p-4 rounded-xl shadow-lg">
            {["home", "about", "music", "fanpages"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-gray-800 hover:text-green-700 transition duration-300 ease-in-out"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
