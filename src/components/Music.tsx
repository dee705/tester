import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Music as MusicIcon,
  Calendar,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// Helper to generate correct Spotify embed URL
const getSpotifyEmbedUrl = (url: string) => {
  if (!url.includes("open.spotify.com")) return url;
  const parts = url.split("/");
  const type = parts[3]; // track | album | artist
  const id = parts[4]?.split("?")[0]; // clean ID without query
  return `https://open.spotify.com/embed/${type}/${id}`;
};

const Music = () => {
  const [expandedSong, setExpandedSong] = useState<number | null>(null);
  const [expandedAlbum, setExpandedAlbum] = useState<number | null>(null);

  const songs = [
    {
      title: "Dito Ka Lang, Wag kang lalayo",
      album: "Klarisse",
      year: "2025",
      description:
        "A heartfelt song that shows empowering anthem on declaring one's love",
      featured: true,
      spotify: "https://open.spotify.com/album/4kl5U1j3VxkjcXCpHxzgz7",
    },
    {
      title: "Dito",
      album: "Feels",
      year: "2024",
      description:
        "A heartfelt song from her latest album Feels, showcasing her emotional depth and vocal prowess.",
      featured: true,
      spotify: "https://open.spotify.com/track/5sfqkmXnAigZ3KIwQIH8sK",
    },
    {
      title: "Bibitawan Ka",
      album: "Feels",
      year: "2024",
      description:
        "A powerful track from Feels exploring themes of letting go and moving forward.",
      featured: true,
      spotify: "https://open.spotify.com/track/6Rl2zqkSoIfyUnMFFBYeIK",
    },
    {
      title: "Ulan Ng Kahapon",
      album: "Singles",
      year: "2021",
      description: "A nostalgic track about memories and past relationships.",
      youtube: "https://www.youtube.com/embed/RcKMBkkZZdc",
      blackTheme: true,
    },
    {
      title: "Wala na Talaga",
      album: "Klarisse",
      year: "2017",
      description:
        "A nostalgic track that expresses a finality and the absence of something that was once there.",
      spotify: "https://open.spotify.com/track/6A3oVEfrPO6XSYfakUw3N1",
      blackTheme: true,
    },
  ];

  const albums = [
    {
      title: "Feels",
      year: "2024",
      type: "Latest Album",
      tracks: 3,
      description:
        "Her latest album featuring heartfelt ballads and emotional storytelling.",
      spotify: "https://open.spotify.com/album/4jUJec6voKpplFklfNeTk6",
    },
    {
      title: "Klarisse",
      year: "2017",
      type: "Self-Titled Album",
      tracks: 10,
      description:
        "Her acclaimed self-titled album showcasing her vocal range and artistry.",
      spotify: "https://open.spotify.com/artist/1Imlf2KHeVnyY2bkZe1bNC",
    },
  ];

  return (
    <section id="music" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
            Music & Albums
          </h2>
          <p className="text-xl text-black max-w-3xl mx-auto">
            Discover the songs that have touched hearts and the albums that
            define a generation.
          </p>
        </div>

        {/* Albums Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
            Albums
          </h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {albums.map((album, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-500 border-green-400"
              >
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                        {album.title}
                      </h4>
                      <p className="text-green-600 font-medium">
                        {album.type} • {album.year}
                      </p>
                    </div>
                    <MusicIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="text-black mb-4">{album.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-black">
                      {album.tracks} tracks
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="group-hover:bg-green-50 text-green-700"
                      onClick={() =>
                        setExpandedAlbum(expandedAlbum === index ? null : index)
                      }
                    >
                      {expandedAlbum === index ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {expandedAlbum === index && (
                    <div className="mt-4">
                      <iframe
                        src={getSpotifyEmbedUrl(album.spotify)}
                        width="100%"
                        height="380"
                        frameBorder="0"
                        allow="encrypted-media"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Songs */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
            Featured Songs
          </h3>
          <div className="grid gap-6">
            {songs.map((song, index) => {
              const isBlack = song.blackTheme;
              return (
                <Card
                  key={index}
                  className={`group hover:shadow-lg transition-all duration-500 ${
                    isBlack
                      ? "border-black"
                      : song.featured
                      ? "border-green-500 bg-gradient-to-r from-green-50 to-green-100"
                      : "border-green-300"
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4
                            className={`text-lg font-bold ${
                              isBlack
                                ? "text-black"
                                : "bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent"
                            }`}
                          >
                            {song.title}
                          </h4>
                          {song.featured && !isBlack && (
                            <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                              Featured
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-black mb-2">
                          <span className="flex items-center gap-1">
                            <MusicIcon
                              className={`h-4 w-4 ${
                                isBlack ? "text-black" : "text-green-600"
                              }`}
                            />
                            {song.album}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar
                              className={`h-4 w-4 ${
                                isBlack ? "text-black" : "text-green-600"
                              }`}
                            />
                            {song.year}
                          </span>
                        </div>
                        <p className="text-black text-sm">{song.description}</p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`${
                            isBlack
                              ? "text-black hover:bg-gray-100"
                              : "text-green-700 hover:bg-green-50"
                          }`}
                          onClick={() =>
                            setExpandedSong(
                              expandedSong === index ? null : index
                            )
                          }
                        >
                          {expandedSong === index ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </Button>
                      </div>
                    </div>
                    {expandedSong === index && (
                      <div className="mt-4">
                        {song.spotify && (
                          <iframe
                            src={getSpotifyEmbedUrl(song.spotify)}
                            width="100%"
                            height={
                              song.spotify.includes("/track/") ? "80" : "380"
                            }
                            frameBorder="0"
                            allow="encrypted-media"
                          />
                        )}
                        {song.youtube && (
                          <iframe
                            width="100%"
                            height="315"
                            src={song.youtube}
                            title={song.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Music Platform Links */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-8 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
            Listen Everywhere
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant="outline"
              className="hover:bg-black/10 hover:border-black text-black"
              onClick={() =>
                window.open(
                  "https://open.spotify.com/artist/7r59WFPJdYBQmnIQB4DX7K",
                  "_blank"
                )
              }
            >
              <span className="mr-2">🎵</span>
              Spotify
            </Button>
            <Button
              variant="outline"
              className="hover:bg-black/10 hover:border-black text-black"
              onClick={() =>
                window.open(
                  "https://music.apple.com/ph/album/klarisse-de-guzman/1444083907",
                  "_blank"
                )
              }
            >
              <span className="mr-2">🎵</span>
              Apple Music
            </Button>
            <Button
              variant="outline"
              className="hover:bg-black/10 hover:border-black text-black"
              onClick={() =>
                window.open("https://www.youtube.com/@KLARISSEUpdates", "_blank")
              }
            >
              <span className="mr-2">▶️</span>
              YouTube Music
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Music;
