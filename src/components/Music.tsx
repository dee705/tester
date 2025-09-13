import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Headphones } from "lucide-react";

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
  const [currentAlbum, setCurrentAlbum] = useState<number | null>(null);

  const songs = [
    {
      title: "Dito Ka Lang, Wag kang lalayo",
      album: "Klarisse",
      year: "2025",
      spotify: "https://open.spotify.com/album/4kl5U1j3VxkjcXCpHxzgz7",
    },
    {
      title: "Dito",
      album: "Feels",
      year: "2024",
      spotify: "https://open.spotify.com/track/5sfqkmXnAigZ3KIwQIH8sK?si=6056ffaaa6d647d9",
    },
    {
      title: "Bibitawan Ka",
      album: "Feels",
      year: "2024",
      spotify: "https://open.spotify.com/track/6Rl2zqkSoIfyUnMFFBYeIK?si=e94916dc00e7479d",
    },
    {
      title: "Ulan Ng Kahapon",
      album: "Singles",
      year: "2021",
      youtube: "https://www.youtube.com/embed/RcKMBkkZZdc",
    },
    {
      title: "Wala na Talaga",
      album: "Klarisse",
      year: "2017",
      spotify: "https://open.spotify.com/track/4o8yZ5AnripYyuTksF1nK6?si=960d087bced24098",
    },
  ];

  const albums = [
    {
      title: "Feels",
      year: "2024",
      type: "Latest Album",
      description:
        "Her latest album featuring heartfelt ballads and emotional storytelling.",
      spotify: "https://open.spotify.com/album/4jUJec6voKpplFklfNeTk6",
    },
    {
      title: "Klarisse",
      year: "2017",
      type: "Self-Titled Album",
      description:
        "Her acclaimed self-titled album showcasing her vocal range and artistry.",
      spotify: "https://open.spotify.com/artist/1Imlf2KHeVnyY2bkZe1bNC",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-green-100 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
            Soundtracks & Albums
          </h2>
        </div>

        {/* Albums Section */}
        <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
          Albums
        </h3>
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {albums.map((album, index) => {
            const isActive = currentAlbum === index;
            return (
              <Card
                key={index}
                className={`transition-all backdrop-blur-xl bg-white/30 border border-white/20 rounded-2xl cursor-pointer hover:shadow-lg hover:shadow-green-400/40 ${
                  isActive ? "ring-2 ring-green-500" : ""
                }`}
                onClick={() => setCurrentAlbum(isActive ? null : index)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-bold text-green-700">
                        {album.title}
                      </h4>
                      <p className="text-sm text-black/60">
                        {album.type} • {album.year}
                      </p>
                      <p className="text-sm text-black/70 mt-2">
                        {album.description}
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

                  {/* Visual Progress */}
                  <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden mb-4">
                    <div
                      className={`h-2 bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500 ${
                        isActive ? "w-full animate-pulse" : "w-0"
                      }`}
                    />
                  </div>

                  {isActive && (
                    <div className="mt-4">
                      <iframe
                        src={getSpotifyEmbedUrl(album.spotify)}
                        width="100%"
                        height="380"
                        frameBorder="0"
                        allow="encrypted-media"
                        className="rounded-xl"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Songs Section */}
        <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
          Featured Songs
        </h3>
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {songs.map((song, index) => {
            const isActive = currentSong === index;
            return (
              <Card
                key={index}
                className={`transition-all backdrop-blur-xl bg-white/30 border border-white/20 rounded-2xl cursor-pointer hover:shadow-lg hover:shadow-green-400/40 ${
                  isActive ? "ring-2 ring-green-500" : ""
                }`}
                onClick={() => setCurrentSong(isActive ? null : index)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-bold text-green-700">
                        {song.title}
                      </h4>
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

                  {/* Visual Progress */}
                  <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden mb-4">
                    <div
                      className={`h-2 bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500 ${
                        isActive ? "w-full animate-pulse" : "w-0"
                      }`}
                    />
                  </div>

                  {isActive && (
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

        {/* Listen Everywhere Section */}
        <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
          Listen Everywhere
        </h3>
        <div className="flex flex-wrap justify-center gap-6">
          <a
            href="https://open.spotify.com/artist/1Imlf2KHeVnyY2bkZe1bNC?si=dg-SlfOOR3iRjm56evf_CA"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition"
          >
            Spotify
          </a>
          <a
            href="https://music.apple.com/ph/artist/klarisse/1462398733"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-pink-500 text-white rounded-full shadow-md hover:bg-pink-600 transition"
          >
            Apple Music
          </a>
          <a
            href="https://music.youtube.com/channel/UCeg7EAceRGI8D6q1j4djPTQ?si=iYiNmeIBAf25OFFH"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition"
          >
            YouTube
          </a>
          <a
            href="https://on.soundcloud.com/X7g5hoFdHlsOAswEvG"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-orange-500 text-white rounded-full shadow-md hover:bg-orange-600 transition"
          >
            SoundCloud
          </a>
        </div>
      </div>
    </section>
  );
};

export default Music;
