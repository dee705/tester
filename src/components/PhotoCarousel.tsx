import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";

const PhotoCarousel = () => {
  const photos = [
    {
      src: "/lovable-uploads/555.jpg",
      caption: "555 Isdalicious ❤",
      date: "2025",
    },
    {
      src: "/lovable-uploads/surf.jpg",
      caption: "Surf with ShuKla ❤",
      date: "2025",
    },
    {
      src: "/lovable-uploads/acer.jpg",
      caption: "Acer with PDG ❤",
      date: "2025",
    },
    {
      src: "/lovable-uploads/c844ad26-7be8-48ae-adfb-cc44ff652824.png",
      caption: "In the studio vibes ✨",
      date: "2024-01-15",
    },
    {
      src: "/lovable-uploads/6d68bdd5-5093-4f21-a240-8a263a9f26e9.png",
      caption: "Recording session magic 🎵",
      date: "2024-01-15",
    },
    {
      src: "/lovable-uploads/f17abe1b-ee0c-4560-9dea-159bd24b9bbe.png",
      caption: "Behind the music 🎧",
      date: "2024-01-15",
    },
    {
      src: "/lovable-uploads/89847245-69e5-41d7-908d-fd94a1a054dd.png",
      caption: "Studio sessions bringing joy 😊",
      date: "2024-01-15",
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-theme-green/10 via-white/70 to-theme-white/90 overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-white/20 opacity-70 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12 relative z-10">
          <Badge variant="secondary" className="mb-4 backdrop-blur-md bg-white/20 border border-white/30">
            Latest Updates
          </Badge>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
            Behind the Scenes
          </h2>
          <p className="text-theme-muted max-w-2xl mx-auto">
            Get an exclusive look at Klarisse's latest studio sessions and musical journey
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {photos.map((photo, index) => (
                <CarouselItem key={index} className="sm:basis-1/2 lg:basis-1/3">
                  <div className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg hover:shadow-glow transition-all duration-500">
                    {/* Image */}
                    <div className="aspect-[4/5] overflow-hidden">
                      <img
                        src={photo.src}
                        alt={photo.caption}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {/* Caption */}
                    <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <p className="font-semibold mb-1 drop-shadow">{photo.caption}</p>
                      <p className="text-sm opacity-90">{photo.date}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation arrows */}
            <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 hidden sm:flex bg-white/30 hover:bg-white/50 text-gray-800 rounded-full shadow-lg backdrop-blur-md transition" />
            <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 hidden sm:flex bg-white/30 hover:bg-white/50 text-gray-800 rounded-full shadow-lg backdrop-blur-md transition" />

            {/* Mobile navigation dots */}
            <div className="flex sm:hidden justify-center gap-2 mt-6">
              {photos.map((_, index) => (
                <div
                  key={index}
                  className="w-2.5 h-2.5 rounded-full bg-gray-400 opacity-70 hover:opacity-100 transition"
                ></div>
              ))}
            </div>
          </Carousel>
        </div>

        <div className="text-center mt-8 relative z-10">
          <p className="text-theme-muted">
            Follow Klarisse on social media for more behind-the-scenes content
          </p>
        </div>
      </div>
    </section>
  );
};

export default PhotoCarousel;
