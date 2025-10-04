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
  X,
} from "lucide-react";

const Music = () => {
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [playlistOpen, setPlaylistOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // ✅ Songs
  const songs = [
    { title: "Unimaginable", album: "Unimaginable", year: "2025", youtube: "https://www.youtube.com/embed/QdgVlGwHoXc", duration: 189.6 },
    { title: "OA", album: "Unimaginable", year: "2025", youtube: "https://www.youtube.com/embed/mzHcZPFc-Ag", duration: 210.6 },
    { title: "Pipilitin", album: "Unimaginable", year: "2025", youtube: "https://www.youtube.com/embed/UbIS383_oZw", duration: 265.8 },
    { title: "Di ko Kaya ko to", album: "Unimaginable", year: "2025", youtube: "https://www.youtube.com/embed/g5BygcsEF7w", duration: 258.6 },
    { title: "Finally you came", album: "Unimaginable", year: "2025", youtube: "https://www.youtube.com/embed/xISjh6fNDnU", duration: 214.8 },
    { title: "TAYO", album: "Unimaginable", year: "2025", youtube: "https://www.youtube.com/embed/kGfoqBVhcJY", duration: 309.6 },
    { title: "TODO", album: "Unimaginable", year: "2025", youtube: "https://www.youtube.com/embed/ijwXh7U_6A0", duration: 152 },
    { title: "Babae Ako", album: "Unimaginable", year: "2025", youtube: "https://www.youtube.com/embed/bMy7r6iNcaM", duration: 204 },
    { title: "Dito Ka Lang, Wag kang lalayo", album: "Klarisse", year: "2025", youtube: "https://www.youtube.com/embed/zd7kQQ0fjDU", duration: 249.6 },
    { title: "Dito", album: "Feels", year: "2024", youtube: "https://www.youtube.com/embed/VxnNphj9qtQ", duration: 241.2 },
    { title: "Minamahal pa rin ako", album: "Feels", year: "2024", youtube: "https://www.youtube.com/embed/WTKCs5j_1JA", duration: 241.8 },
    { title: "Bibitawan Ka", album: "Feels", year: "2024", youtube: "https://www.youtube.com/embed/GsGKnZSCsCo", duration: 230 },
    { title: "Ulan Ng Kahapon", album: "Singles", year: "2021", youtube: "https://www.youtube.com/embed/RcKMBkkZZdc", duration: 260 },
    { title: "Wala na Talaga", album: "Klarisse", year: "2017", youtube: "https://www.youtube.com/embed/nuDNvk22Qmg", duration: 250 },
    { title: "Paalam Na", album: "Klarisse", year: "2017", youtube: "https://www.youtube.com/embed/_-6qgbuFSYA", duration: 300 },
    { title: "Sa pangarap na lang", album: "Klarisse", year: "2017", youtube: "https://www.youtube.com/embed/q_zMKbI1ufE", duration: 240 },
    { title: "Eto na naman tayo", album: "Klarisse", year: "2017", youtube: "https://www.youtube.com/embed/Ni-B1lQGgMk", duration: 240 },
    { title: "Mahal mo pa ba ako", album: "Klarisse", year: "2017", youtube: "https://www.youtube.com/embed/ekljZEYW7oI", duration: 240 },
    { title: "Sanay tumibok muli", album: "Klarisse", year: "2017", youtube: "https://www.youtube.com/embed/3z4Nujk6P2k", duration: 240 },
    { title: "Ikaw ay ako", album: "Klarisse", year: "2017", youtube: "https://www.youtube.com/embed/ToBuXLpQyxw", duration: 240 },
  ];

  const song = songs[currentSong];

  const getYouTubeId = (url: string) => {
    const match = url.match(/embed\/([^?]+)/);
    return match ? match[1] : "";
  };

  const getYouTubeThumbnail = (url: string) => {
    const id = getYouTubeId(url);
    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  };

  // Player controls
  const playSong = (index: number) => {
    setCurrentSong(index);
    setIsPlaying(true);
  };

  const playNext = () => {
    setCurrentSong((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
  };

  const playPrev = () => {
    setCurrentSong((prev) => (prev - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);
  const togglePlaylist = () => setPlaylistOpen(!playlistOpen);

  return (
    <section id="music" className="py-20 bg-gradient-to-b from-green-100 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
            Soundtracks & Albums
          </h2>
        </div>

        {/* ✅ Albums Section (unchanged) */}
        {/* ... keep your original albums section here exactly ... */}

        {/* ✅ Featured Songs Section */}
        <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
          Featured Songs
        </h3>

        <Card className="relative overflow-hidden rounded-3xl border border-white/30 shadow-lg bg-gradient-to-br from-green-50/60 via-white/40 to-green-100/60 backdrop-blur-xl mb-16">
          <CardContent className="p-6 flex flex-col md:flex-row items-center md:items-stretch gap-6">
            {/* Album Cover */}
            <div className="flex-1 flex flex-col items-center justify-center relative">
              <img
                src={getYouTubeThumbnail(song.youtube)}
                alt={song.title}
                className={`rounded-full w-56 h-56 md:w-64 md:h-64 object-cover shadow-lg transition-transform duration-700 ${
                  isPlaying ? "animate-spin-slow" : ""
                }`}
              />
              <button
                className="absolute top-4 right-4 md:hidden bg-green-500 text-white p-2 rounded-full shadow-md hover:bg-green-600"
                onClick={togglePlaylist}
              >
                {playlistOpen ? <X /> : <Menu />}
              </button>
            </div>

            {/* Player Controls */}
            <div className="flex-1 flex flex-col justify-center items-center text-center gap-4">
              <h4 className="text-2xl font-bold text-green-800">{song.title}</h4>
              <p className="text-green-700/80 text-sm mb-2">
                {song.album} • {song.year}
              </p>

              {/* Controls */}
              <div className="flex items-center justify-center gap-6">
                <button onClick={playPrev} className="hover:scale-125 transition-transform">
                  <SkipBack className="w-6 h-6 text-green-700" />
                </button>
                <button
                  onClick={togglePlay}
                  className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>
                <button onClick={playNext} className="hover:scale-125 transition-transform">
                  <SkipForward className="w-6 h-6 text-green-700" />
                </button>
              </div>

              {/* Volume */}
              <div className="flex items-center justify-center gap-3 mt-2">
                <button onClick={toggleMute} className="text-green-700">
                  {isMuted ? <VolumeX /> : <Volume2 />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-32 accent-green-600"
                />
              </div>
            </div>

            {/* Playlist (desktop) */}
            <div
              className={`hidden md:block absolute top-0 right-0 h-full w-64 bg-white/70 backdrop-blur-xl shadow-xl transform transition-transform duration-500 ${
                playlistOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="flex justify-between items-center p-4 border-b border-green-300">
                <h4 className="text-green-700 font-bold">Playlist</h4>
                <button onClick={togglePlaylist}>
                  <X className="text-green-700" />
                </button>
              </div>
              <div className="overflow-y-auto h-[calc(100%-3rem)]">
                {songs.map((s, index) => (
                  <div
                    key={index}
                    onClick={() => playSong(index)}
                    className={`p-3 cursor-pointer hover:bg-green-100 ${
                      currentSong === index ? "bg-green-200/60 font-semibold" : ""
                    }`}
                  >
                    {s.title}
                  </div>
                ))}
              </div>
            </div>

            {/* Playlist (mobile) */}
            <div
              className={`md:hidden fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl shadow-lg transform transition-transform duration-500 ${
                playlistOpen ? "translate-y-0" : "translate-y-full"
              }`}
            >
              <div className="flex justify-between items-center p-4 border-b border-green-300">
                <h4 className="text-green-700 font-bold">Playlist</h4>
                <button onClick={togglePlaylist}>
                  <X className="text-green-700" />
                </button>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {songs.map((s, index) => (
                  <div
                    key={index}
                    onClick={() => playSong(index)}
                    className={`p-3 cursor-pointer hover:bg-green-100 ${
                      currentSong === index ? "bg-green-200/60 font-semibold" : ""
                    }`}
                  >
                    {s.title}
                  </div>
                ))}
              </div>
            </div>

            {/* Hidden YouTube autoplay */}
            {isPlaying && (
              <iframe
                ref={iframeRef}
                src={`${song.youtube}?autoplay=1&mute=${isMuted ? 1 : 0}`}
                width="0"
                height="0"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                style={{ display: "none" }}
              />
            )}
          </CardContent>
        </Card>

        {/* ✅ Listen Everywhere Section (unchanged) */}
        {/* ... keep your original Listen Everywhere section here exactly ... */}
      </div>

      {/* Smooth spin animation */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Music;
