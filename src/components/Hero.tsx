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
      {/* ✅ Main Light Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-200/20 via-white/10 to-green-100/20"></div>

      {/* ✅ Extra Bottom Dark Fade for readability */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 via-black/30 to-transparent"></div>

      {/* Content */}
      <div className="container mx-auto px-4 py-20 relative z-10 text-center">
        <div className="max-w-4xl mx-auto animate-slide-up">
          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 drop-shadow-lg">
            <span className="bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">
              Klarisse
            </span>
            <br />
            <span className="text-white drop-shadow-lg">De Guzman</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
            Filipino Pop Sensation • Singer-Songwriter • Performer
          </p>

          {/* ✅ Description now stronger contrast */}
          <p className="text-lg text-white mb-12 max-w-3xl mx-auto drop-shadow-2xl">
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
              className="glass bg-white/70 text-green-700 hover:bg-green-100 hover:shadow-green-300/50 transition transform hover:scale-105"
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

          {/* Floating Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            {[
              { value: "10M+", label: "Streams", delay: "0s" },
              { value: "50+", label: "Songs", delay: "1s" },
              { value: "1M+", label: "Fans", delay: "2s" },
            ].map((stat, i) => (
              <div
                key={i}
                className="glass p-6 rounded-2xl text-center animate-float hover:shadow-green-400/40 transition transform hover:-translate-y-2"
                style={{ animationDelay: stat.delay }}
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-white drop-shadow">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
