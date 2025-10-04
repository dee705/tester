import { useState, useEffect, useRef, useCallback } from "react";
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
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// ✅ Helper functions
const getYouTubeId = (url: string) => {
  const match = url.match(/embed\/([^?]+)/);
  return match ? match[1] : "";
};

const formatTime = (seconds: number) => {
  if (!isFinite(seconds) || seconds <= 0) return "00:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

// 🎵 Featured Songs Section
function FeaturedSongs({ songs }: { songs: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(songs[0]?.duration || 0);
  const [volume, setVolume] = useState(70);

  const playerRef = useRef<any | null>(null);
  const ytContainerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const song = songs[currentIndex];

  // Load YouTube API
  useEffect(() => {
    if ((window as any).YT && (window as any).YT.Player) return;
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }, []);

  // Initialize player
  useEffect(() => {
    const createPlayer = () => {
      const YT = (window as any).YT;
      if (!YT || !YT.Player) {
        setTimeout(createPlayer, 200);
        return;
      }
      if (playerRef.current) return;

      playerRef.current = new YT.Player(ytContainerRef.current!, {
        height: "0",
        width: "0",
        videoId: getYouTubeId(song.youtube),
        playerVars: { autoplay: 0, controls: 0, rel: 0, modestbranding: 1 },
        events: {
          onReady: () => {
            playerRef.current.setVolume(volume);
            setDuration(playerRef.current.getDuration() || song.duration);
          },
          onStateChange: (e: any) => {
            const ps = (window as any).YT.PlayerState;
            if (e.data === ps.ENDED) handleNext();
            if (e.data === ps.PLAYING) startProgress();
            if (e.data === ps.PAUSED) stopProgress();
          },
        },
      });
    };
    createPlayer();
    return () => stopProgress();
  }, []);

  // Progress loop
  const startProgress = useCallback(() => {
    stopProgress();
    const loop = () => {
      if (playerRef.current) {
        setTime(Math.floor(playerRef.current.getCurrentTime() || 0));
        setDuration(Math.floor(playerRef.current.getDuration() || song.duration));
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
  }, [song.duration]);

  const stopProgress = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  // Controls
  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % songs.length);
    setTime(0);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);
    setTime(0);
    setIsPlaying(true);
  };

  const onProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const seekTime = pct * (duration || song.duration);
    playerRef.current?.seekTo(seekTime, true);
  };

  const progressPct = duration > 0 ? (time / duration) * 100 : 0;

  // Volume knob
  const knobRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = knobRef.current;
    if (!el) return;
    const handleRotate = (e: WheelEvent) => {
      const delta = e.deltaY < 0 ? 3 : -3;
      setVolume((v) => Math.min(100, Math.max(0, v + delta)));
    };
    el.addEventListener("wheel", handleRotate);
    return () => el.removeEventListener("wheel", handleRotate);
  }, []);

  useEffect(() => {
    if (playerRef.current?.setVolume) playerRef.current.setVolume(volume);
    const el = knobRef.current;
    if (el) el.style.setProperty("--angle", `${(volume / 100) * 270 - 135}deg`);
  }, [volume]);

  const selectSong = (i: number) => {
    setCurrentIndex(i);
    setIsPlaying(true);
    setTime(0);
    const id = getYouTubeId(songs[i].youtube);
    playerRef.current?.loadVideoById(id);
  };

  return (
    <Card className="overflow-hidden rounded-3xl border border-white/30 shadow-lg bg-gradient-to-br from-green-50/60 via-white/40 to-green-100/60 backdrop-blur-xl mb-16">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Player */}
          <div className="md:w-1/2 w-full p-6 flex flex-col items-center bg-gradient-to-br from-green-100 to-white">
            <img
              src={`https://img.youtube.com/vi/${getYouTubeId(song.youtube)}/hqdefault.jpg`}
              alt={song.title}
              className="rounded-2xl shadow-lg w-64 h-64 object-cover mb-4"
            />
            <h4 className="text-2xl font-bold text-green-800 mb-1">{song.title}</h4>
            <p className="text-lg text-green-700/80 mb-3">
              {song.album} • {song.year}
            </p>

            {/* Progress bar */}
            <div className="flex items-center justify-between w-full text-xs text-green-900/70 mb-1 px-2">
              <span>{formatTime(time)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <div
              className="h-1.5 w-full bg-green-200/50 rounded-full overflow-hidden mb-4 cursor-pointer"
              onClick={onProgressClick}
            >
              <div
                className="h-1.5 bg-gradient-to-r from-green-400 to-green-600 transition-all"
                style={{ width: `${progressPct}%` }}
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6 text-green-700">
              <button onClick={handlePrev} className="hover:scale-110 transition-transform">
                <SkipBack className="w-6 h-6" />
              </button>
              <button
                onClick={togglePlay}
                className="bg-green-500 text-white p-4 rounded-full shadow-md hover:bg-green-600 transition-all"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              <button onClick={handleNext} className="hover:scale-110 transition-transform">
                <SkipForward className="w-6 h-6" />
              </button>
            </div>

            {/* Volume knob */}
            <div className="mt-6">
              <div
                ref={knobRef}
                onClick={() => setVolume((v) => (v > 0 ? 0 : 70))}
                className="relative w-14 h-14 rounded-full bg-white/70 shadow-inner cursor-pointer flex items-center justify-center"
                style={{
                  background:
                    "conic-gradient(from -135deg, rgba(16,185,129,0.9) var(--angle,0deg), rgba(0,0,0,0.1) var(--angle,0deg))",
                  transition: "background 0.2s linear",
                }}
              >
                <div className="absolute inset-1 bg-white/80 rounded-full shadow-sm flex items-center justify-center">
                  <Volume2 className="w-5 h-5 text-green-700" />
                </div>
              </div>
            </div>
          </div>

          {/* Playlist */}
          <div className="md:w-1/2 w-full p-6">
            <h4 className="text-lg font-bold text-green-700 mb-3">Playlist</h4>
            <div className="grid gap-2">
              {songs.map((s, i) => (
                <div
                  key={i}
                  onClick={() => selectSong(i)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                    i === currentIndex
                      ? "bg-green-600 text-white shadow-lg"
                      : "bg-white/70 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://img.youtube.com/vi/${getYouTubeId(s.youtube)}/default.jpg`}
                      alt={s.title}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                    <div>
                      <div className="text-sm font-semibold">{s.title}</div>
                      <div className="text-xs text-green-800/70">
                        {s.album} • {s.year}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-green-900/60">{formatTime(s.duration)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hidden YouTube Player */}
        <div style={{ position: "absolute", left: -9999, top: -9999 }}>
          <div ref={ytContainerRef} id="yt-player" />
        </div>
      </CardContent>
    </Card>
  );
}

// 🎧 Main Music Component
export default function Music() {
  const [currentAlbum, setCurrentAlbum] = useState<number | null>(null);

  const songs = [
    { title: "Unimaginable", album: "Unimaginable", year: "2025", youtube: "https://www.youtube.com/embed/QdgVlGwHoXc", duration: 189 },
    { title: "OA", album: "Unimaginable", year: "2025", youtube: "https://www.youtube.com/embed/mzHcZPFc-Ag", duration: 210 },
    { title: "Pipilitin", album: "Unimaginable", year: "2025", youtube: "https://www.youtube.com/embed/UbIS383_oZw", duration: 265 },
    { title: "Di ko kaya ko to", album: "Unimaginable", year: "2025", youtube: "https://www.youtube.com/embed/g5BygcsEF7w", duration: 259 },
    { title: "Finally you came", album: "Unimaginable", year: "2025", youtube: "https://www.youtube.com/embed/xISjh6fNDnU", duration: 214 },
    { title: "TAYO", album: "Unimaginable", year: "2025", youtube: "https://www.youtube.com/embed/kGfoqBVhcJY", duration: 300 },
  ];

  const albums = [
    {
      title: "Unimaginable",
      year: "2025",
      type: "Latest Album",
      description: "It’s a reminder that persistence can lead somewhere meaningful.",
      spotifyId: "6ojC0sFbE9CcsEFgLbxPD8",
    },
    {
      title: "Feels",
      year: "2024",
      type: "Latest Album",
      description: "Her latest album featuring heartfelt ballads.",
      spotifyId: "4jUJec6voKpplFklfNeTk6",
    },
  ];

  return (
    <section id="music" className="py-20 bg-gradient-to-b from-green-100 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
            Soundtracks & Albums
          </h2>
        </div>

        {/* Albums */}
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

        {/* Featured Songs */}
        <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
          Featured Songs
        </h3>
        <FeaturedSongs songs={songs} />
      </div>
    </section>
  );
}
