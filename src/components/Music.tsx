import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Headphones, Music2, Youtube, Apple, Cloud } from "lucide-react";

// Helper for Spotify embeds
const getSpotifyEmbedUrl = (url: string) => {
  if (!url.includes("open.spotify.com")) return url;
  const parts = url.split("/");
  const type = parts[3];
  const id = parts[4]?.split("?")[0];
  return `https://open.spotify.com/embed/${type}/${id}`;
};

const Music = () => {
  const [currentSong, setCurrentSong] = useState<number | null>(null);

  const songs = [
    {
      title: "Dito Ka Lang, Wag kang lalayo",
      album: "Klarisse",
      year: "2025",
      cover: "/covers/klarisse.jpg",
      spotify: "https://open.spotify.com/album/4kl5U1j3VxkjcXCpHxzgz7",
    },
    {
      title: "Dito",
      album: "Feels",
      year: "2024",
      cover: "/covers/dito.jpg",
      spotify: "https://open.spotify.com/track/5sfqkmXnAigZ3KIwQIH8sK?si=9e192ed10ee74719",
    },
    {
      title: "Bibitawan Ka",
      album: "Feels",
      year: "2024",
      cover: "/covers/feels.jpg",
      spotify: "https://open.spotify.com/track/6Rl2zqkSoIfyUnMFFBYeIK?si=d96d472160b04f96",
    },
    {
      title: "Ulan Ng Kahapon",
      album: "Singles",
      year: "2021",
      cover: "/covers/ulan.jpg",
      youtube: "https://www.youtube.com/embed/RcKMBkkZZdc",
    },
    {
      title: "Wala na Talaga",
      album: "Klarisse",
      year: "2017",
      cover: "/covers/wala.jpg",
      spotify: "https://open.spotify.com/track/4o8yZ5AnripYyuTksF1nK6?si=f4d741d320cd4dbf",
    },
  ];

  return (
    <section id="music" className="py-20 bg-gradient-to-b from-green-100 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
            My Soundtrack Playlist
          </h2>
        </div>

        {/* Playlist Layout */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Covers (Left side) */}
          <div className="space-y-6">
            {songs.map((song, index) => (
              <div
                key={index}
                className={`rounded-xl overflow-hidden shadow-md cursor-pointer transition-transform hover:scale-105 ${
                  currentSong === index ? "ring-4 ring-green-400" : ""
                }`}
                onClick={() => setCurrentSong(index)}
              >
                <img
                  src={song.cover}
                  alt={song.title}
                  className="w-full h-48 object-cover"
                />
              </div>
            ))}
          </div>

          {/* Song List (Right side) */}
          <div className="space-y-6">
            {songs.map((song, index) => {
              const isActive = currentSong === index;
              return (
                <Card
                  key={index}
                  className={`transition-all bg-white/70 border border-white/30 rounded-2xl backdrop-blur-sm ${
                    isActive ? "ring-2 ring-green-500" : ""
                  }`}
                  onClick={() => setCurrentSong(isActive ? null : index)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-bold text-green-700">{song.title}</h4>
                        <p className="text-sm text-black/60">
                          {song.album} • {song.year}
                        </p>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="bg-green-500 text-white hover:bg-green-600 rounded-full"
                      >
                        <Headphones />
                      </Button>
                    </div>

                    {/* Expanded Embed */}
                    {isActive && (
                      <div className="mt-4">
                        {song.spotify && (
                          <iframe
                            src={getSpotifyEmbedUrl(song.spotify)}
                            width="100%"
                            height={song.spotify.includes("/track/") ? "80" : "380"}
                            frameBorder="0"
                            allow="encrypted-media"
                            className="rounded-xl"
                          />
                        )}
                        {song.youtube && (
                          <iframe
                            width="100%"
                            height="200"
                            src={song.youtube}
                            title={song.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="rounded-xl"
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
      </div>
    </section>
  );
};

export default Music;
