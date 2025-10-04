import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Headphones,
  Music2,
  Youtube,
  Apple,
  Cloud,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Menu,
  Volume2,
  VolumeX,
} from "lucide-react";

const Music = () => {
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [currentAlbum, setCurrentAlbum] = useState<number | null>(null);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [volume, setVolume] = useState(50);
  const [playerRef, setPlayerRef] = useState<any>(null);
  const [isRepeating, setIsRepeating] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  // 🔑 Songs
  const songs = [
    {
      title: "Unimaginable",
      album: "Unimaginable",
      year: "2025",
      youtube: "https://www.youtube.com/embed/QdgVlGwHoXc",
      duration: 189.6,
    },
    {
      title: "OA",
      album: "Unimaginable",
      year: "2025",
      youtube: "https://www.youtube.com/embed/mzHcZPFc-Ag",
      duration: 210.6,
    },
    {
      title: "Pipilitin",
      album: "Unimaginable",
      year: "2025",
      youtube: "https://www.youtube.com/embed/UbIS383_oZw",
      duration: 265.8,
    },
    {
      title: "Di ko Kaya ko to",
      album: "Unimaginable",
      year: "2025",
      youtube: "https://www.youtube.com/embed/g5BygcsEF7w",
      duration: 258.6,
    },
    {
      title: "Finally you came",
      album: "Unimaginable",
      year: "2025",
      youtube: "https://www.youtube.com/embed/xISjh6fNDnU",
      duration: 214.8,
    },
    {
      title: "TAYO",
      album: "Unimaginable",
      year: "2025",
      youtube: "https://www.youtube.com/embed/kGfoqBVhcJY",
      duration: 309.6,
    },
    {
      title: "TODO",
      album: "Unimaginable",
      year: "2025",
      youtube: "https://www.youtube.com/embed/ijwXh7U_6A0",
      duration: 152,
    },
    {
      title: "Babae Ako",
      album: "Unimaginable",
      year: "2025",
      youtube: "https://www.youtube.com/embed/bMy7r6iNcaM",
      duration: 204,
    },
    {
      title: "Dito Ka Lang, Wag kang lalayo",
      album: "Klarisse",
      year: "2025",
      youtube: "https://www.youtube.com/embed/zd7kQQ0fjDU",
      duration: 249.6,
    },
    {
      title: "Dito",
      album: "Feels",
      year: "2024",
      youtube: "https://www.youtube.com/embed/VxnNphj9qtQ",
      duration: 241.2,
    },
    {
      title: "Minamahal pa rin ako",
      album: "Feels",
      year: "2024",
      youtube: "https://www.youtube.com/embed/WTKCs5j_1JA",
      duration: 241.8,
    },
    {
      title: "Bibitawan Ka",
      album: "Feels",
      year: "2024",
      youtube: "https://www.youtube.com/embed/GsGKnZSCsCo",
      duration: 230,
    },
    {
      title: "Ulan Ng Kahapon",
      album: "Singles",
      year: "2021",
      youtube: "https://www.youtube.com/embed/RcKMBkkZZdc",
      duration: 260,
    },
    {
      title: "Wala na Talaga",
      album: "Klarisse",
      year: "2017",
      youtube: "https://www.youtube.com/embed/nuDNvk22Qmg",
      duration: 250,
    },
    {
      title: "Paalam Na",
      album: "Klarisse",
      year: "2017",
      youtube: "https://www.youtube.com/embed/_-6qgbuFSYA",
      duration: 300,
    },
    {
      title: "Sa pangarap na lang",
      album: "Klarisse",
      year: "2017",
      youtube: "https://www.youtube.com/embed/q_zMKbI1ufE",
      duration: 240,
    },
    {
      title: "Eto na naman tayo",
      album: "Klarisse",
      year: "2017",
      youtube: "https://www.youtube.com/embed/Ni-B1lQGgMk",
      duration: 240,
    },
    {
      title: "Mahal mo pa ba ako",
      album: "Klarisse",
      year: "2017",
      youtube: "https://www.youtube.com/embed/ekljZEYW7oI",
      duration: 240,
    },
    {
      title: "Sanay tumibok muli",
      album: "Klarisse",
      year: "2017",
      youtube: "https://www.youtube.com/embed/3z4Nujk6P2k",
      duration: 240,
    },
    {
      title: "Ikaw ay ako",
      album: "Klarisse",
      year: "2017",
      youtube: "https://www.youtube.com/embed/ToBuXLpQyxw",
      duration: 240,
    },
  ];

  const albums = [
    {
      title: "Unimaginable",
      year: "2025",
      type: "Latest Album",
      description:
        "It’s a reminder that persistence can lead somewhere meaningful, that your dreams or hopes might be realized even if the road is long.",
      spotifyId: "6ojC0sFbE9CcsEFgLbxPD8",
    },
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

  const song = songs[currentSong];

  // Helpers
  const getYouTubeId = (url: string) => url.match(/embed\/([^?]+)/)?.[1] || "";
  const formatTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  // 🧠 YouTube Player API setup
  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
    (window as any).onYouTubeIframeAPIReady = () => {
      const player = new (window as any).YT.Player("yt-player", {
        height: "0",
        width: "0",
        videoId: getYouTubeId(song.youtube),
        playerVars: { autoplay: 0, controls: 0 },
        events: {
          onReady: (e: any) => {
            e.target.setVolume(volume);
            setPlayerRef(e.target);
          },
        },
      });
    };
  }, []);

  useEffect(() => {
    if (!playerRef) return;
    playerRef.loadVideoById(getYouTubeId(song.youtube));
    playerRef.setVolume(volume);
    if (isPlaying) playerRef.playVideo();
    else playerRef.pauseVideo();
  }, [currentSong, isPlaying]);

  useEffect(() => {
    if (playerRef) playerRef.setVolume(volume);
  }, [volume]);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setTime((t) => {
          if (t >= song.duration) {
            if (isRepeating) return 0;
            if (isShuffling) {
              const random = Math.floor(Math.random() * songs.length);
              setCurrentSong(random);
            } else {
              setCurrentSong((prev) => (prev + 1) % songs.length);
            }
            return 0;
          }
          return t + 1;
        });
      }, 1000);
    }
    return () => interval && clearInterval(interval);
  }, [isPlaying, currentSong, isRepeating, isShuffling]);

  const progress = song.duration ? (time / song.duration) * 100 : 0;

  const playNext = () =>
    setCurrentSong((prev) => (prev + 1) % songs.length);
  const playPrev = () =>
    setCurrentSong((prev) => (prev - 1 + songs.length) % songs.length);

  // 🌈 UI
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
          {albums.map((album, i) => (
            <Card
              key={i}
              className={`transition-all backdrop-blur-xl bg-white/30 border border-white/20 rounded-2xl cursor-pointer hover:shadow-lg hover:shadow-green-400/40 ${
                currentAlbum === i ? "ring-2 ring-green-500" : ""
              }`}
              onClick={() => setCurrentAlbum(currentAlbum === i ? null : i)}
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
                {currentAlbum === i && (
                  <iframe
                    src={`https://open.spotify.com/embed/album/${album.spotifyId}`}
                    width="100%"
                    height="380"
                    frameBorder="0"
                    allow="encrypted-media"
                    className="rounded-xl mt-4"
                  />
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 🌟 Featured Songs (Bubble Beats Style) */}
        <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
          Featured Songs
        </h3>

        <Card className="overflow-hidden rounded-3xl border border-white/30 shadow-lg bg-gradient-to-br from-green-50/60 via-white/40 to-green-100/60 backdrop-blur-xl transition-all duration-500 hover:shadow-green-400/50 hover:scale-[1.01] mb-16 max-w-lg mx-auto">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-green-600">Bubble Beats</h3>
              <button
                onClick={() => setShowPlaylist(!showPlaylist)}
                className="transition-transform duration-500"
              >
                <Menu
                  className={`w-6 h-6 text-green-600 transform transition-transform ${
                    showPlaylist ? "rotate-90" : ""
                  }`}
                />
              </button>
            </div>

            {/* Album Art */}
            <div className="flex justify-center mb-4">
              <div
                className={`w-40 h-40 rounded-full border-8 border-green-300 shadow-lg bg-green-100 overflow-hidden flex items-center justify-center transition-transform duration-[3000ms] ${
                  isPlaying ? "animate-spin-slow" : ""
                }`}
              >
                <img
                  src={`https://img.youtube.com/vi/${getYouTubeId(song.youtube)}/hqdefault.jpg`}
                  alt={song.title}
                  className="w-32 h-32 rounded-full object-cover"
                />
              </div>
            </div>

            <h4 className="text-xl font-bold text-center text-green-700">
              {song.title}
            </h4>
            <p className="text-sm text-center text-gray-500 mb-4">
              {song.album} • {song.year}
            </p>

            {/* Progress */}
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>{formatTime(time)}</span>
              <span>{formatTime(song.duration)}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full mb-4 overflow-hidden">
              <div
                className="h-2 bg-green-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Controls */}
            <div className="flex justify-center items-center gap-6 text-green-600 mb-4">
              <button onClick={() => setIsShuffling(!isShuffling)}>
                <Shuffle
                  className={`w-5 h-5 ${
                    isShuffling ? "text-green-600" : "opacity-50"
                  }`}
                />
              </button>
              <button onClick={playPrev}>
                <SkipBack className="w-6 h-6" />
              </button>
              <button
                className="bg-green-500 text-white p-4 rounded-full shadow-md hover:bg-green-600"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6" />
                )}
              </button>
              <button onClick={playNext}>
                <SkipForward className="w-6 h-6" />
              </button>
              <button onClick={() => setIsRepeating(!isRepeating)}>
                <Repeat
                  className={`w-5 h-5 ${
                    isRepeating ? "text-green-600" : "opacity-50"
                  }`}
                />
              </button>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-2 mb-6">
              <button
                onClick={() => {
                  const newVol = volume > 0 ? 0 : 50;
                  setVolume(newVol);
                  playerRef?.setVolume(newVol);
                }}
              >
                {volume > 0 ? (
                  <Volume2 className="w-5 h-5 text-green-600" />
                ) : (
                  <VolumeX className="w-5 h-5 text-green-600" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={volume}
                onChange={(e) => {
                  const v = parseInt(e.target.value);
                  setVolume(v);
                  playerRef?.setVolume(v);
                }}
                className="w-full accent-green-500"
              />
            </div>

            {/* Playlist */}
            <div
              className={`overflow-hidden transition-[max-height] duration-700 ease-in-out ${
                showPlaylist ? "max-h-96" : "max-h-0"
              }`}
            >
              <div className="space-y-2 mt-2">
                {songs.map((s, i) => (
                  <div
                    key={i}
                    style={{
                      animationDelay: `${i * 0.05}s`,
                    }}
                    className={`flex justify-between items-center p-2 rounded-lg cursor-pointer transition duration-300 opacity-0 animate-fade-in ${
                      currentSong === i
                        ? "bg-green-100 text-green-600 font-semibold"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => {
                      setCurrentSong(i);
                      setTime(0);
                      setIsPlaying(true);
                    }}
                  >
                    <span>{s.title}</span>
                    <span className="text-xs">{formatTime(s.duration)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hidden Player */}
            <div id="yt-player" style={{ display: "none" }} />
          </CardContent>
        </Card>

        {/* 🎧 Listen Everywhere */}
        <div className="text-center mt-20">
          <h3 className="text-2xl font-bold mb-4 text-green-700">
            Listen Everywhere
          </h3>
          <div className="flex justify-center gap-6 text-green-600">
            <Music2 className="w-6 h-6" />
            <Youtube className="w-6 h-6" />
            <Apple className="w-6 h-6" />
            <Cloud className="w-6 h-6" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease forwards;
        }
      `}</style>
    </section>
  );
};

export default Music;
