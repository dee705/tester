import { Button } from "@/components/ui/button";
import { Play, Download, ExternalLink } from "lucide-react";
const Hero = () => {
  return <section id="home" className="h-[70vh] md:h-[80vh] flex items-center justify-center relative overflow-hidden" style={{
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(/lovable-uploads/17ffc630-a780-4ae7-90df-3c29b63db259.png)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat'
  }}>
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-hero opacity-80"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-20 relative z-10 text-center">
        <div className="max-w-4xl mx-auto animate-slide-up">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            <span className="text-gradient">Klarisse</span>
            <br />
            <span className="text-white">De Guzman</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Filipino Pop Sensation • Singer-Songwriter • Performer
          </p>
          
          {/* Description */}
          <p className="text-lg text-white/80 mb-12 max-w-3xl mx-auto">
            From reality TV to chart-topping hits, experience the journey of one of the Philippines' 
            most dynamic musical talents. Discover the voice that's captivating audiences worldwide.
          </p>
          
          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="luxury" size="lg" className="group" onClick={() => document.getElementById('music')?.scrollIntoView({
            behavior: 'smooth'
          })}>
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Listen to Music
            </Button>
            
            <Button variant="hero" size="lg" onClick={() => document.getElementById('about')?.scrollIntoView({
            behavior: 'smooth'
          })}>
              Learn More
              <ExternalLink className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          {/* Floating Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div className="text-center animate-float">
              <div className="text-3xl font-bold text-gradient">10M+</div>
              <div className="text-white/70">Streams</div>
            </div>
            <div className="text-center animate-float" style={{
            animationDelay: '1s'
          }}>
              <div className="text-3xl font-bold text-gradient">50+</div>
              <div className="text-white/70">Songs</div>
            </div>
            <div className="text-center animate-float" style={{
            animationDelay: '2s'
          }}>
              <div className="text-3xl font-bold text-gradient">1M+</div>
              <div className="text-white/70">Fans</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>;
};
export default Hero;