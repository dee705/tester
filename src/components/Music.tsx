import { useState, useEffect, useRef } from "react";
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
  Volume2,
  VolumeX,
  Menu,
} from "lucide-react";

const Music = () => {
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [volume, setVolume] = useState(50);
  const [showPlaylist, setShowPlaylist] = useState(true);
  const [playerReady, setPlayerReady] = useState(false);
  const playerRef = useRef<any>(null);
  const iframeRef = useRef<HTMLDivElement>(null);

  // 🔑 Songs
  const songs = [
    {
      title: "Unimaginable",
      album: "Unimaginable",
      year: "2025",
      youtube: "QdgVlGwHoXc",
      duration: 189.6,
    },
    {
      title: "OA",
      album: "Unimaginable",
      year: "2025",
      youtube: "mzHcZPFc-Ag",
      duration: 210.6,
    },
    {
      title: "Pipilitin",
      album: "Unimaginable",
      year: "2025",
      youtube: "UbIS383_oZw",
      duration: 265.8,
    },
    {
      title: "Di ko Kaya ko to",
      album: "Unimaginable",
      year: "2025",
      youtube: "g5BygcsEF7w",
      duration: 258.6,
    },
  ];

  const song = songs[currentSong];
  const progress = song.duration ? (time / song.duration) * 100 : 0;

  // ✅ Load YouTube Player API once
  useEffect(() => {
    const loadYT = () => {
      if (window.YT && window.YT.Player) {
        createPlayer();
      } else {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
        window.onYouTubeIframeAPIReady = createPlayer;
      }
    };
    loadYT();
  }, []);

  // ✅ Create YouTube player
  const createPlayer = () => {
    if (!iframeRef.current) return;
    playerRef.current = new window.YT.Player(iframeRef.current, {
      videoId: songs[currentSong].youtube,
      playerVars: {
        autoplay: 0,
        controls: 0,
      },
      events: {
        onReady: () => setPlayerReady(true),
        onStateChange: onPlayerStateChange,
      },
    });
  };

  // ✅ Update time when playing
  const onPlayerStateChange = (event: any) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      setIsPlaying(true);
    } else if (event.data === window.YT.PlayerState.PAUSED) {
      setIsPlaying(false);
    }
  };

  // ✅ Play or pause
  const togglePlay = () => {
    if (!playerRef.current || !playerReady) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
    setIsPlaying(!isPlaying);
  };

  // ✅ Play next / previous
  const playNext = () => {
    const nextIndex = (currentSong + 1) % songs.length;
    playSong(nextIndex);
  };

  const playPrev = () => {
    const prevIndex = (currentSong - 1 + songs.length) % songs.length;
    playSong(prevIndex);
  };

  const playSong = (index: number) => {
    setCurrentSong(index);
    if (playerRef.current && playerReady) {
      playerRef.current.loadVideoById(songs[index].youtube);
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
    setTime(0);
  };

  // ✅ Volume
  const toggleMute = () => {
    if (!playerRef.current) return;
    const muted = playerRef.current.isMuted();
    if (muted) playerRef.current.unMute();
    else playerRef.current.mute();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseInt(e.target.value);
    setVolume(v);
    if (playerRef.current) playerRef.current.setVolume(v);
  };

  // ✅ Timer
  useEffect(() => {
    let interval: any;
    if (isPlaying && playerReady) {
      interval = setInterval(() => {
        const t = playerRef.current?.getCurrentTime?.() || 0;
        setTime(t);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playerReady]);

  // ✅ Format time
  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
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

        {/* Albums Section — unchanged */}
        {/* [ ... keep your original Albums section here exactly as before ... ] */}

        {/* Featured Songs */}
        <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
          Featured Songs
        </h3>

        <Card className="overflow-hidden rounded-3xl border border-white/30 shadow-lg bg-gradient-to-br from-green-50/60 via-white/40 to-green-100/60 backdrop-blur-xl transition-all duration-500 hover:shadow-green-400/50 hover:scale-[1.01] mb-16">
          <CardContent className="p-6 flex flex-col items-center">

            {/* Toggle + Player Layout */}
            <div className="flex justify-between items-center w-full mb-4">
              <Button
                variant="ghost"
                className="rounded-full p-2 hover:bg-green-100"
                onClick={() => setShowPlaylist(!showPlaylist)}
              >
                <Menu className="text-green-700 w-6 h-6" />
              </Button>
              <h4 className="text-xl font-bold text-green-800">
                {song.title} • {song.album}
              </h4>
            </div>

            {/* Player core */}
            <div className="flex flex-col md:flex-row items-center w-full justify-center gap-6">
              <div className="relative">
                <img
                  src={`https://img.youtube.com/vi/${song.youtube}/hqdefault.jpg`}
                  alt={song.title}
                  className={`rounded-full w-48 h-48 object-cover border-4 border-green-400 shadow-lg ${
                    isPlaying ? "animate-spin-slow" : ""
                  }`}
                />
              </div>

              <div className="flex flex-col items-center w-full md:w-1/2">
                <div className="flex items-center justify-between text-xs text-green-900/70 mb-1 w-full">
                  <span>{formatTime(time)}</span>
                  <span>{formatTime(song.duration)}</span>
                </div>
                <div className="h-1.5 w-full bg-green-200/50 rounded-full overflow-hidden mb-4">
                  <div
                    className="h-1.5 bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Controls */}
                <div className="flex justify-center items-center gap-5 mb-3">
                  <button onClick={playPrev} className="hover:scale-125 transition-transform">
                    <SkipBack className="w-6 h-6 text-green-700" />
                  </button>
                  <button
                    className="bg-green-500 text-white p-4 rounded-full shadow-md hover:bg-green-600 hover:shadow-green-400/50 transition-all"
                    onClick={togglePlay}
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </button>
                  <button onClick={playNext} className="hover:scale-125 transition-transform">
                    <SkipForward className="w-6 h-6 text-green-700" />
                  </button>
                </div>

                {/* Volume */}
                <div className="flex items-center gap-2">
                  <button onClick={toggleMute}>
                    {volume > 0 ? (
                      <Volume2 className="w-5 h-5 text-green-700" />
                    ) : (
                      <VolumeX className="w-5 h-5 text-green-700" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-24 accent-green-600"
                  />
                </div>
              </div>
            </div>

            {/* Smooth playlist */}
            <div
              className={`transition-all duration-700 overflow-hidden w-full ${
                showPlaylist ? "max-h-[500px] opacity-100 mt-6" : "max-h-0 opacity-0"
              }`}
            >
              <div className="grid md:grid-cols-2 gap-3">
                {songs.map((s, i) => (
                  <div
                    key={i}
                    onClick={() => playSong(i)}
                    className={`cursor-pointer p-3 rounded-lg text-center text-green-800 font-medium transition-all duration-300 ${
                      currentSong === i
                        ? "bg-green-200/60 scale-105"
                        : "hover:bg-green-100/50"
                    }`}
                  >
                    {s.title}
                  </div>
                ))}
              </div>
            </div>

            {/* YouTube player mount point */}
            <div ref={iframeRef} className="hidden" />
          </CardContent>
        </Card>

        {/* Listen Everywhere — unchanged */}
        {/* [ Keep your Listen Everywhere section here exactly as before ] */}
      </div>
    </section>
  );
};

export default Music;

/* ✅ Add this in your CSS (e.g., globals.css or index.css)
--------------------------------------------*/
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}
