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
  List,
  Repeat,
  Shuffle,
} from "lucide-react";

const Music = () => {
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [currentAlbum, setCurrentAlbum] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const songs = [
    { title: "Unimaginable", album: "Unimaginable", year: "2025", youtube: "https://www.youtube.com/embed/QdgVlGwHoXc", duration: 189.6 },
    { title: "OA", album: "Unimaginable", year: "2025", youtube: "https://www.youtube.com/embed/mzHcZPFc-Ag", duration: 210.6 },
    { title: "Pipilitin", album: "Unimaginable", year: "2025", youtube: "https://www.youtube.com/embed/UbIS383_oZw", duration: 265.8 },
    { title: "Di ko Kaya ko to", album: "Unimaginable", year: "2025", youtube: "https://www.youtube.com/embed/g5BygcsEF7w", duration: 258.6 },
    { title: "Finally you came", album: "Unimaginable", year: "2025", youtube: "https://www.youtube.com/embed/xISjh6fNDnU", duration: 214.8 },
    { title: "TAYO", album: "Unimaginable", year: "2025", youtube: "https://www.youtube.com/embed/kGfoqBVhcJY", duration: 309.6 },
  ];

  const albums = [
    { title: "Unimaginable", year: "2025", type: "Latest Album", description: "It’s a reminder that persistence can lead somewhere meaningful.", spotifyId: "6ojC0sFbE9CcsEFgLbxPD8" },
    { title: "Feels", year: "2024", type: "Latest Album", description: "Her latest album featuring heartfelt ballads and emotional storytelling.", spotifyId: "4jUJec6voKpplFklfNeTk6" },
    { title: "Klarisse", year: "2017", type: "Self-Titled Album", description: "Her acclaimed self-titled album showcasing her vocal range and artistry.", spotifyId: "0U9ZD8Tu410sGD8i3eRsAK" },
  ];

  const song = songs[currentSong];

  const getYouTubeId = (url: string) => url.match(/embed\/([^?]+)/)?.[1] || "";
  const getYouTubeThumbnail = (url: string) => `https://img.youtube.com/vi/${getYouTubeId(url)}/hqdefault.jpg`;
  const formatTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  // ⏱️ Timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => setTime((t) => (t >= song.duration ? 0 : t + 1)), 1000);
    }
    return () => interval && clearInterval(interval);
  }, [isPlaying, currentSong]);

  const progress = song.duration ? (time / song.duration) * 100 : 0;

  const playNext = () => {
    setCurrentSong((prev) => (prev + 1) % songs.length);
    setTime(0);
    setIsPlaying(true);
  };
  const playPrev = () => {
    setCurrentSong((prev) => (prev - 1 + songs.length) % songs.length);
    setTime(0);
    setIsPlaying(true);
  };

  // 🎧 Volume handling
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  return (
    <section id="music" className="py-20 bg-gradient-to-b from-green-100 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
            Soundtracks & Albums
          </h2>
        </div>

        {/* ✅ Albums Section (Unchanged) */}
        <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
          Albums
        </h3>
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {albums.map((album, i) => {
            const isActive = currentAlbum === i;
            return (
              <Card key={i} onClick={() => setCurrentAlbum(isActive ? null : i)}
                className={`transition-all bg-white/30 border border-white/20 rounded-2xl backdrop-blur-xl cursor-pointer hover:shadow-lg hover:shadow-green-400/40 ${isActive ? "ring-2 ring-green-500" : ""}`}>
                <CardContent className="p-6">
                  <div className="flex justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-bold text-green-700">{album.title}</h4>
                      <p className="text-sm text-black/60">{album.type} • {album.year}</p>
                      <p className="text-sm text-black/70 mt-2">{album.description}</p>
                    </div>
                    <Button size="icon" variant="ghost" className="bg-green-500 text-white rounded-full hover:bg-green-600">
                      <Headphones />
                    </Button>
                  </div>
                  <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden mb-4">
                    <div className={`h-2 bg-gradient-to-r from-green-400 to-green-600 transition-all ${isActive ? "w-full animate-pulse" : "w-0"}`} />
                  </div>
                  {isActive && (
                    <iframe src={`https://open.spotify.com/embed/album/${album.spotifyId}`} width="100%" height="380"
                      className="rounded-xl border-none" allow="encrypted-media" />
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* 🎵 Featured Songs (Bubble Beats style) */}
        <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
          Featured Songs
        </h3>

        <Card className="rounded-3xl overflow-hidden border border-white/30 bg-gradient-to-br from-green-50/60 via-white/40 to-green-100/60 shadow-lg backdrop-blur-xl mb-16">
          <CardContent className="p-0 relative">
            <div className="flex flex-col md:flex-row">
              {/* 🎧 Album Cover */}
              <div className="md:w-1/2 w-full flex items-center justify-center bg-gradient-to-br from-green-100 to-white p-6 relative">
                <img
                  src={getYouTubeThumbnail(song.youtube)}
                  alt={song.title}
                  className={`rounded-2xl shadow-lg w-64 h-64 object-cover transition-transform duration-700 ${isPlaying ? "animate-spin-slow" : ""}`}
                />
                {/* Burger Icon */}
                <button
                  onClick={() => setShowPlaylist(!showPlaylist)}
                  className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition"
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              {/* 🎶 Player */}
              <div className="md:w-1/2 w-full p-6 flex flex-col justify-center text-center">
                <h4 className="text-2xl font-bold mb-2 text-green-800">{song.title}</h4>
                <p className="text-lg text-green-700/80 mb-4">{song.album} • {song.year}</p>

                {/* Progress bar */}
                <div className="flex justify-between text-xs text-green-900/70 mb-1">
                  <span>{formatTime(time)}</span>
                  <span>{formatTime(song.duration)}</span>
                </div>
                <div className="h-1.5 bg-green-200/50 rounded-full mb-6 overflow-hidden">
                  <div className="h-1.5 bg-gradient-to-r from-green-400 to-green-600 transition-all" style={{ width: `${progress}%` }} />
                </div>

                {/* Controls */}
                <div className="flex justify-center items-center gap-6 text-green-700 mb-4">
                  <button onClick={playPrev} className="hover:scale-125 transition-transform">
                    <SkipBack className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-green-500 text-white p-4 rounded-full shadow-md hover:bg-green-600 transition-all"
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </button>
                  <button onClick={playNext} className="hover:scale-125 transition-transform">
                    <SkipForward className="w-6 h-6" />
                  </button>
                </div>

                {/* Volume + Repeat + Shuffle */}
                <div className="flex justify-center items-center gap-5 text-green-700">
                  <button onClick={() => setIsMuted(!isMuted)}>
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-24 accent-green-500 cursor-pointer"
                  />
                  <Repeat className="w-5 h-5" />
                  <Shuffle className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Playlist Toggle */}
            <div
              className={`transition-all duration-500 overflow-hidden bg-green-50/70 backdrop-blur-lg ${
                showPlaylist ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <ul className="p-4 space-y-2">
                {songs.map((s, i) => (
                  <li
                    key={i}
                    onClick={() => {
                      setCurrentSong(i);
                      setShowPlaylist(false);
                      setIsPlaying(true);
                    }}
                    className={`cursor-pointer text-sm font-medium text-green-800 rounded-lg p-2 hover:bg-green-200/50 transition-all ${
                      i === currentSong ? "bg-green-300/60" : ""
                    } animate-fade-in`}
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    {s.title}
                  </li>
                ))}
              </ul>
            </div>

            {/* Audio hidden */}
            <audio ref={audioRef} src={`${song.youtube}`} />
          </CardContent>
        </Card>

        {/* 🎧 Listen Everywhere (Unchanged) */}
        <div className="text-center mt-20">
          <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
            Listen Everywhere
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Music2 className="mr-2 h-5 w-5" /> Spotify
            </Button>
            <Button className="bg-black hover:bg-gray-800 text-white">
              <Apple className="mr-2 h-5 w-5" /> Apple Music
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              <Youtube className="mr-2 h-5 w-5" /> YouTube
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Cloud className="mr-2 h-5 w-5" /> SoundCloud
            </Button>
          </div>
        </div>
      </div>

      {/* Animations */}
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
          animation: fade-in 0.4s ease forwards;
        }
      `}</style>
    </section>
  );
};

export default Music;
