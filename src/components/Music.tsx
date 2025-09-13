import { Card, CardContent } from "@/components/ui/card";
import { Music as MusicIcon, Calendar } from "lucide-react";

const Music = () => {
  const songs = [
    {
      title: "Dito Ka Lang, Wag kang lalayo",
      album: "Klarisse",
      year: "2025",
      description: "A heartfelt song that shows empowering anthem on declaring one's love",
      featured: true,
      spotify: "https://open.spotify.com/album/4kl5U1j3VxkjcXCpHxzgz7"
    },
    {
      title: "Dito",
      album: "Feels",
      year: "2024",
      description: "A heartfelt song from her latest album Feels, showcasing her emotional depth and vocal prowess.",
      featured: true,
      spotify: "https://open.spotify.com/track/5sfqkmXnAigZ3KIwQIH8sK"
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

  const albums = [
    {
      title: "Feels",
      year: "2024",
      type: "Latest Album",
      tracks: 3,
      description: "Her latest album featuring heartfelt ballads and emotional storytelling.",
      spotify: "https://open.spotify.com/album/4jUJec6voKpplFklfNeTk6"
    },
    {
      title: "Klarisse",
      year: "2017",
      type: "Self-Titled Album",
      tracks: 10,
      description: "Her acclaimed self-titled album showcasing her vocal range and artistry.",
      spotify: "https://open.spotify.com/artist/1Imlf2KHeVnyY2bkZe1bNC"
    }
  ];

  // Helper function to convert Spotify/YouTube URLs into embed players
  const getEmbedUrl = (url) => {
    if (url.includes("spotify.com/track/")) {
      const trackId = url.split("track/")[1]?.split("?")[0];
      return `https://open.spotify.com/embed/track/${trackId}`;
    }
    if (url.includes("spotify.com/album/")) {
      const albumId = url.split("album/")[1]?.split("?")[0];
      return `https://open.spotify.com/embed/album/${albumId}`;
    }
    if (url.includes("spotify.com/artist/")) {
      const artistId = url.split("artist/")[1]?.split("?")[0];
      return `https://open.spotify.com/embed/artist/${artistId}`;
    }
    if (url.includes("youtube.com/watch?v=")) {
      const videoId = url.split("v=")[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return null;
  };

  return (
    <section id="music" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Music</span> & Albums
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the songs that have touched hearts and the albums that define a generation.
          </p>
        </div>

        {/* Albums */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center">Albums</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {albums.map((album, index) => (
              <Card key={index}>
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold">{album.title}</h4>
                      <p className="text-primary font-medium">{album.type} • {album.year}</p>
                    </div>
                    <MusicIcon className="h-6 w-6 text-primary/60" />
                  </div>
                  <p className="text-muted-foreground mb-4">{album.description}</p>

                  {/* Embed Album */}
                  <iframe
                    src={getEmbedUrl(album.spotify)}
                    width="100%"
                    height="380"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    className="rounded-lg"
                  ></iframe>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Songs */}
        <div>
          <h3 className="text-2xl font-bold mb-8 text-center">Featured Songs</h3>
          <div className="grid gap-6">
            {songs.map((song, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-bold">{song.title}</h4>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MusicIcon className="h-4 w-4" /> {song.album}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" /> {song.year}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">{song.description}</p>

                  {/* Embed Song */}
                  <iframe
                    src={getEmbedUrl(song.spotify)}
                    width="100%"
                    height={song.spotify.includes("youtube") ? "315" : "80"}
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    allowFullScreen={song.spotify.includes("youtube")}
                    className="rounded-lg"
                  ></iframe>
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
