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
      src: "/lovable-uploads/c844ad26-7be8-48ae-adfb-cc44ff652824.png",
      caption: "In the studio vibes ✨",
      date: "2024-01-15"
    },
    {
      src: "/lovable-uploads/6d68bdd5-5093-4f21-a240-8a263a9f26e9.png", 
      caption: "Recording session magic 🎵",
      date: "2024-01-15"
    },
    {
      src: "/lovable-uploads/f17abe1b-ee0c-4560-9dea-159bd24b9bbe.png",
      caption: "Behind the music 🎧",
      date: "2024-01-15"
    },
    {
      src: "/lovable-uploads/89847245-69e5-41d7-908d-fd94a1a054dd.png",
      caption: "Studio sessions bringing joy 😊",
      date: "2024-01-15"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Latest Updates
          </Badge>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Behind the Scenes
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get an exclusive look at Klarisse's latest studio sessions and musical journey
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {photos.map((photo, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="group relative overflow-hidden rounded-xl bg-card shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="aspect-[4/5] overflow-hidden">
                      <img
                        src={photo.src}
                        alt={photo.caption}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="font-medium mb-1">{photo.caption}</p>
                      <p className="text-sm opacity-90">{photo.date}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>

        <div className="text-center mt-8">
          <p className="text-muted-foreground">
            Follow Klarisse on social media for more behind-the-scenes content
          </p>
        </div>
      </div>
    </section>
  );
};

export default PhotoCarousel;
