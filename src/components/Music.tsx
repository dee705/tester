import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, ExternalLink, Music as MusicIcon, Calendar } from "lucide-react";

const Music = () => {
  const [activeSong, setActiveSong] = useState(null);

  const songs = [
    {
      title: "Dito",
      album: "Feels",
      year: "2024",
      description: "A heartfelt song from her latest album Feels, showcasing her emotional depth and vocal prowess.",
      featured: true,
      spotify: "https://open.spotify.com/track/5sfqkmXnAigZ3KIwQIH8sK"
    },
    {
      title: "Minamahal Pa Rin Ako",
      album: "Feels",
      year: "2024",
      description: "An emotional ballad about enduring love from her 2024 album Feels.",
      featured: true,
      spotify: "https://open.spotify.com/track/2zafsagzdI4ve8Mw9TP9sB"
    },
    {
      title: "Bibitawan Ka",
      album: "Feels",
      year: "2024",
      description: "A powerful track from Feels exploring themes of letting go and moving forward.",
      featured: true,
      spotify: "https://open.spotify.com/track/6Rl2zqkSoIfyUnMFFBYeIK"
    },
    {
      title: "Ulan Ng Kahapon",
      album: "Singles",
      year: "2021",
      description: "A nostalgic track about memories and past relationships.",
      spotify: "https://www.youtube.com/watch?v=RcKMBkkZZdc"
    }, 
    {
      title: "Wala na Talaga",
      album: "Klarisse",
      year: "2017",
      description: "A nostalgic track that expresses a finality and the absence of something that was once there.", 
      spotify: "https://open.spotify.com/track/6A3oVEfrPO6XSYfakUw3N1"
    }
  ];

  const getEmbedUrl = (url) => {
    if (url.includes("spotify")) {
      const trackId = url.split("track/")[1]?.split("?")[0];
      return `https://open.spotify.com/embed/track/${trackId}`;
    }
    if (url.includes("youtube")) {
      const videoId = url.split("v=")[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return null;
  };

  return (
    <section id="music" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Music</span> & Albums
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the songs that have touched hearts and the albums that define a generation.
          </p>
        </div>

        {/* Featured Songs */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-8 text-center">Featured Songs</h3>
          <div className="grid gap-6">
            {songs.map((song, index) => (
              <Card 
                key={index} 
                className={`group hover:shadow-elegant transition-all duration-500 ${
                  song.featured ? 'border-secondary/40 bg-gradient-to-r from-secondary/5 to-primary/5' : 'border-border/50'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-bold text-foreground group-hover:text-gradient transition-colors">
                          {song.title}
                        </h4>
                        {song.featured && (
                          <span className="bg-gradient-primary text-white text-xs px-2 py-1 rounded-full font-medium">
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <span className="flex items-center gap-1">
                          <MusicIcon className="h-4 w-4" />
                          {song.album}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {song.year}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm">{song.description}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300"
                        onClick={() => setActiveSong(activeSong === index ? null : index)}
                      >
                        <Play className="h-5 w-5" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300"
                        onClick={() => window.open(song.spotify, '_blank')}
                      >
                        <ExternalLink className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Embedded Player */}
                  {activeSong === index && (
                    <div className="mt-4">
                      <iframe
                        src={getEmbedUrl(song.spotify)}
                        width="100%"
                        height={song.spotify.includes("spotify") ? "80" : "315"}
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        className="rounded-lg"
                      ></iframe>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Music;
