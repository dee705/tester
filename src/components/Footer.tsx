import { Music, Heart, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Music", href: "#music" },
    { name: "Contact", href: "#contact" }
  ];

  const socialLinks = [
    { name: "Instagram", icon: "📸", href: "https://www.instagram.com/klarissedguzman/" },
    { name: "YouTube", icon: "▶️", href: "https://www.youtube.com/@KLARISSEUpdates" },
    { name: "Spotify", icon: "🎧", href: "https://open.spotify.com/artist/7r59WFPJdYBQmnIQB4DX7K?si=3D0wFIiMSieyWycCGO7bTw" },
    { name: "TikTok", icon: "🎵", href: "https://www.tiktok.com/@klarissedguzman?lang=en&is_from_webapp=1&sender_device=mobile&sender_web_id=7531174735428011538" }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gradient-to-br from-background to-muted/50 border-t border-border/50">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <Music className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-gradient">Klarisse de Guzman</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              Filipino pop sensation bringing authentic artistry and powerful vocals to audiences worldwide. 
              Join the journey of music, emotion, and connection.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-secondary fill-current" />
              <span>for music lovers everywhere</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={() => scrollToSection(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center group"
                  >
                    {link.name}
                    <ExternalLink className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Music */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Connect</h3>
            <div className="space-y-3">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300 group"
                >
                  <span className="text-lg">{social.icon}</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    {social.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-3">Stay Updated</h3>
            <p className="text-muted-foreground mb-6">
              Get the latest news, releases, and exclusive content delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md border border-border/50 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Button variant="luxury">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-muted-foreground text-sm">
            © {currentYear} Dedicated to Klarisse de Guzman from arkyyy . All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
