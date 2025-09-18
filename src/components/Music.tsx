import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Headphones, Music2, Youtube, Apple, Cloud } from "lucide-react";

const Music = () => {
  const [currentSong, setCurrentSong] = useState<number>(0); // 👉 start with first song
  const [currentAlbum, setCurrentAlbum] = useState<number | null>(null);
  const [time, setTime] = useState(0);

  // 🔑 Use YouTube EMBED links only
  const songs = [
    {
      title: "Dito Ka Lang, Wag kang lalayo",
      album: "Klarisse",
      year: "2025",
      youtube: "https://www.youtube.com/embed/zd7kQQ0fjDU",
    },
    {
      title: "Dito",
      album: "Feels",
      year: "2024",
      youtube: "https://www.youtube.com/embed/VxnNphj9qtQ",
    },
    {
      title: "Bibitawan Ka",
      album: "Feels",
      year: "2024",
      youtube: "https://www.youtube.com/embed/GsGKnZSCsCo",
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
      youtube: "https://www.youtube.com/embed/nuDNvk22Qmg",
    },
  ];

  const albums = [
    {
      title: "Feels",
      year: "2024",
      type: "Latest Album",
      description:
        "Her latest album featuring heartfelt ballads and emotional storytelling.",
      spotifyId: "4jUJec6voKpplFklfNeTk6",
    },
    {
      title: "Klarisse",
      year: "2017",
      type: "Self-Titled Album",
      description:
        "Her acclaimed self-titled album showcasing her vocal range and artistry.",
      spotifyId: "0U9ZD8Tu410sGD8i3eRsAK",
    },
  ];

  // Timer for playback progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (currentSong !== null) {
      setTime(0);
      interval = setInterval(() => setTime((t) => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [currentSong]);

  // Progress bar % (simulate 60s duration)
  const progress = Math.min((time % 60) / 60, 1) * 100;

  // Song navigation handlers
  const playNext = () => {
    setCurrentSong((prev) => (prev + 1) % songs.length);
  };

  const playPrev = () => {
    setCurrentSong((prev) => (prev - 1 + songs.length) % songs.length);
  };

  const togglePlay = () => {
    // restart the song from 0
    setTime(0);
  };

  const song = songs[currentSong];

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
                        src={`https://open.spotify.com/embed/album/${album.spotifyId}`}
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

        {/* Unified Playback Card */}
        <Card className="transition-all backdrop-blur-xl bg-white/30 border border-white/20 rounded-2xl hover:shadow-lg hover:shadow-green-400/40">
          <CardContent className="p-0">
            {/* Top Green Header */}
            <div className="flex items-center justify-between bg-green-600 text-white rounded-t-2xl px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
                  <img
                    src={`https://picsum.photos/100?random=${currentSong}`}
                    alt={song.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-md font-semibold">{song.title}</h4>
                  <p className="text-xs opacity-80">{song.album}</p>
                </div>
              </div>
              <button className="text-white hover:text-red-400 transition">♥</button>
            </div>

            {/* Playback Section */}
            <div className="p-6 text-center">
              <h4 className="text-xl font-bold mb-2 text-black">{song.title}</h4>
              <p className="text-lg text-black/70 mb-4">
                {song.album} • {song.year}
              </p>

              {/* Progress bar */}
              <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden mb-6">
                <div
                  className="h-1 bg-green-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Controls */}
              <div className="flex justify-center items-center gap-6 text-green-600">
                <button onClick={playPrev} className="hover:scale-110 transition">⏮</button>
                <button
                  className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition"
                  onClick={togglePlay}
                >
                  ⏯
                </button>
                <button onClick={playNext} className="hover:scale-110 transition">⏭</button>
              </div>

              {/* Playback time */}
              <p className="text-xs text-green-600 mt-3">▶ Playing... {time}s</p>
            </div>

            {/* Hidden YouTube iframe */}
            {song.youtube && (
              <iframe
                src={`${song.youtube}?autoplay=1`}
                width="0"
                height="0"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                style={{ display: "none" }}
              />
            )}
          </CardContent>
        </Card>

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
