import { Button } from "@/components/ui/button";
import { Music, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Music className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-gradient">Klarisse</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-foreground hover:text-primary transition-colors duration-300"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-foreground hover:text-primary transition-colors duration-300"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('music')}
              className="text-foreground hover:text-primary transition-colors duration-300"
            >
              Music
            </button>
            <button 
              onClick={() => scrollToSection('fanpages')}
              className="text-foreground hover:text-primary transition-colors duration-300"
            >
              Fanpages
            </button>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button 
              variant="luxury" 
              onClick={() => scrollToSection('music')}
            >
              Listen Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border/50">
            <nav className="flex flex-col space-y-4 pt-4">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-left text-foreground hover:text-primary transition-colors duration-300"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-left text-foreground hover:text-primary transition-colors duration-300"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('music')}
                className="text-left text-foreground hover:text-primary transition-colors duration-300"
              >
                Music
              </button>
              <button 
                onClick={() => scrollToSection('fanpages')}
                className="text-left text-foreground hover:text-primary transition-colors duration-300"
              >
                Fanpages
              </button>
              <Button 
                variant="luxury" 
                className="w-full mt-4"
                onClick={() => scrollToSection('music')}
              >
                Listen Now
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;