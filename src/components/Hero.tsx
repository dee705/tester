import { Button } from "@/components/ui/button";
import { Play, ExternalLink } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="home"
      className="h-[70vh] md:h-[80vh] flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url(/lovable-uploads/17ffc630-a780-4ae7-90df-3c29b63db259.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-200/50 via-green-100/40 to-black/40"></div>

      {/* Content */}
      <div className="container mx-auto px-4 py-20 relative z-10 text-center">
        <div className="max-w-4xl mx-auto animate-slide-up">
          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
            <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              Klarisse
            </span>
            <br />
            <span className="text-white drop-shadow-lg">De Guzman</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Filipino Pop Sensation • Singer-Songwriter • Performer
          </p>

          {/* ✅ Description now in gray for readability */}
          <p className="text-lg text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
            From reality TV to chart-topping hits, experience the journey of one
            of the Philippines' most dynamic musical talents. Discover the voice
            that's captivating audiences worldwide.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="glass bg-green-600 text-white hover:bg-green-700 hover:shadow-green-400/50 transition transform hover:scale-105"
              onClick={() =>
                document
                  .getElementById("music")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Listen to Music
            </Button>

            <Button
              size="lg"
              className="glass bg-white/80 text-green-700 hover:bg-green-100 hover:shadow-green-300/50 transition transform hover:scale-105"
              onClick={() =>
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Learn More
              <ExternalLink className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
