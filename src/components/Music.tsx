import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Headphones, Music2, Youtube, Apple, Cloud } from "lucide-react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const Music = () => {
  const [currentSong, setCurrentSong] = useState<number | null>(null);
  const [currentAlbum, setCurrentAlbum] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const playerRef = useRef<any>(null);

  // ✅ Featured songs use YouTube video IDs only
  const songs = [
    {
      title: "Dito Ka Lang, Wag kang lalayo",
      album: "Klarisse",
      year: "2025",
      youtube: "zd7kQQ0fjDU",
    },
    {
      title: "Dito",
      album: "Feels",
      year: "2024",
      youtube: "VxnNphj9qtQ",
    },
    {
      title: "Bibitawan Ka",
      album: "Feels",
      year: "2024",
      youtube: "GsGKnZSCsCo",
    },
    {
      title: "Ulan Ng Kahapon",
      album: "Singles",
      year: "2021",
      youtube: "RcKMBkkZZdc",
    },
    {
      title: "Wala na Talaga",
      album: "Klarisse",
      year: "2017",
      youtube: "nuDNvk22Qmg",
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
      spotify: "  https://open.spotify.com/artist/1Imlf2KHeVnyY2bkZe1bNC?si=FmasTWCLSCumqR6549uEwQ", 
    },
  ];

  // ✅ Load YouTube API once
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }
  }, []);

  // ✅ Create player and track elapsed time
  useEffect(() => {
    if (currentSong !== null && window.YT) {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
      playerRef.current = new window.YT.Player(`yt-player-${currentSong}`, {
        videoId: songs[currentSong].youtube,
        playerVars: {
          autoplay: 1,
          controls: 0,
        },
        events: {
          onReady: (event: any) => event.target.playVideo(),
        },
      });

      const interval = setInterval(() => {
        if (playerRef.current && playerRef.current.getCurrentTime) {
          setElapsed(Math.floor(playerRef.current.getCurrentTime()));
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [currentSong]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <section id="music" className="py-20 bg-gradient-to-b from-green-100 to-white">
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
                      <h4 className="text-lg font-bold text-green-700">{album.title}</h4>
                      <p className="text-sm text-black/60">
                        {album.type} • {album.year}
                      </p>
                      <p className="text-sm text-black/70 mt-2">{album.description}</p>
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
                        src={`https://open.spotify.com/embed/album/${album.spotify.split("/").pop()}`}
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

        {/* Featured Songs Section */}
        <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
          Featured Songs
        </h3>
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {songs.map((song, index) => {
            const isActive = currentSong === index;
            return (
              <Card
                key={index}
                className={`transition-all backdrop-blur-xl bg-white/30 border border-white/20 rounded-2xl hover:shadow-lg hover:shadow-green-400/40 ${
                  isActive ? "ring-2 ring-green-500" : ""
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-bold text-green-700">{song.title}</h4>
                      <p className="text-sm text-black/60">
                        {song.album} • {song.year}
                      </p>
                      {isActive && (
                        <p className="text-xs text-green-600 mt-1">
                          ⏱ {formatTime(elapsed)}
                        </p>
                      )}
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="bg-green-500 text-white hover:bg-green-600 rounded-full"
                      onClick={() => setCurrentSong(isActive ? null : index)}
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

                  {/* Hidden Player */}
                  {isActive && (
                    <div style={{ display: "none" }}>
                      <div id={`yt-player-${index}`} />
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* ✅ Listen Everywhere Buttons */}
        <div className="text-center mt-20">
          <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
            Listen Everywhere
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              className="bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-green-400/50"
              onClick={() =>
                window.open("https://open.spotify.com/artist/1Imlf2KHeVnyY2bkZe1bNC", "_blank")
              }
            >
              <Music2 className="mr-2 h-5 w-5" /> Spotify
            </Button>
            <Button
              className="bg-black hover:bg-gray-800 text-white shadow-md hover:shadow-gray-500/50"
              onClick={() =>
                window.open("https://music.apple.com/us/artist/klarisse/1462398733", "_blank")
              }
            >
              <Apple className="mr-2 h-5 w-5" /> Apple Music
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-red-400/50"
              onClick={() =>
                window.open(
                  "https://music.youtube.com/channel/UCeg7EAceRGI8D6q1j4djPTQ?si=mFVkSBDjI2JmOH1n",
                  "_blank"
                )
              }
            >
              <Youtube className="mr-2 h-5 w-5" /> YouTube
            </Button>
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white shadow-md hover:shadow-orange-400/50"
              onClick={() => window.open("https://on.soundcloud.com/S4TdClgpsEvCdcdEny", "_blank")}
            >
              <Cloud className="mr-2 h-5 w-5" /> SoundCloud
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Music;
