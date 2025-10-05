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
  Menu, // The Burger Icon
  X,
} from "lucide-react";

const Music = () => {
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [playlistOpen, setPlaylistOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // ✅ Songs (unchanged)
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
    // Assuming the real IDs are at the end of your mock URLs.
    const parts = url.split('/');
    return parts[parts.length - 1];
  };

  const getYouTubeThumbnail = (url: string) => {
    const id = getYouTubeId(url);
    // Note: The original thumbnail function was a placeholder/mock URL. 
    // We'll use a unique placeholder image per song for better visual testing of the vinyl.
    const songIndex = songs.findIndex(s => s.youtube === url);
    return `https://picsum.photos/id/${100 + (songIndex % 20)}/400/400`;
  };

  // Player controls (unchanged)
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
        {/* Header (unchanged) */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
            Soundtracks & Albums
          </h2>
        </div>

        {/* ✅ Featured Songs Section */}
        <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
          Featured Songs
        </h3>

        {/* 1. PLAYER CARD: Set relative positioning for the absolute menu button and playlist.
        */}
        <Card className="relative overflow-hidden rounded-3xl border border-white/30 shadow-lg bg-gradient-to-br from-green-50/60 via-white/40 to-green-100/60 backdrop-blur-xl mb-16 max-w-lg mx-auto">
          
          {/* 2. BURGER ICON: Positioned absolutely at the top right of the Card.
          */}
          <button
            className="absolute top-4 right-4 z-20 bg-green-500/80 text-white p-2 rounded-full shadow-lg hover:bg-green-600/90 transition-colors"
            onClick={togglePlaylist}
            aria-label="Toggle Playlist"
          >
            {playlistOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <CardContent className="p-8 flex flex-col items-center gap-8">
            
            {/* 3. VINYL PLAYER: Wrapper for the spinning disk and album art.
            */}
            <div className="relative w-56 h-56 md:w-64 md:h-64">
              <div 
                // The outer ring simulates the black vinyl record border
                className={`w-full h-full rounded-full bg-gray-900 shadow-xl transition-transform duration-700 p-2 ${
                  isPlaying ? "animate-spin-slow" : ""
                }`}
              >
                {/* Vinyl Track Thumbnail (Inner Album Art) */}
                <img
                  src={getYouTubeThumbnail(song.youtube)}
                  alt={song.title}
                  className="w-full h-full object-cover rounded-full"
                />
                {/* Central Label (Small inner circle on the record) */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gray-100 border-2 border-gray-800 rounded-full z-10" />
              </div>
            </div>

            {/* 4. PLAYER CONTROLS and Info
            */}
            <div className="flex flex-col justify-center items-center text-center gap-4 w-full">
              <h4 className="text-3xl font-bold text-green-800 tracking-wider">{song.title}</h4>
              <p className="text-green-700/80 text-md mb-4 uppercase">
                {song.album}
              </p>

              {/* Controls */}
              <div className="flex items-center justify-center gap-8">
                <button onClick={playPrev} className="p-2 hover:scale-110 transition-transform" aria-label="Previous Song">
                  <SkipBack className="w-8 h-8 text-green-700" />
                </button>
                <button
                  onClick={togglePlay}
                  className="bg-green-500 hover:bg-green-600 text-white p-5 rounded-full shadow-xl transition-colors"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {/* The ml-1 on Play icon is a slight visual adjustment for center alignment */}
                  {isPlaying ? <Pause className="w-8 h-8" fill="white" /> : <Play className="w-8 h-8 ml-1" fill="white" />}
                </button>
                <button onClick={playNext} className="p-2 hover:scale-110 transition-transform" aria-label="Next Song">
                  <SkipForward className="w-8 h-8 text-green-700" />
                </button>
              </div>

              {/* Volume */}
              <div className="flex items-center justify-center gap-3 mt-4">
                <button onClick={toggleMute} className="text-green-700 hover:text-green-900 transition-colors" aria-label="Toggle Mute">
                  {isMuted ? <VolumeX /> : <Volume2 />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-40 h-1 accent-green-600 bg-green-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </CardContent>

          {/* 5. PLAYLIST OVERLAY: The slide-in/slide-up list. 
            We use a higher Z-index for mobile to ensure it's always on top.
          */}
          
          {/* Desktop Playlist (Slides in from the right) */}
          <div
            className={`hidden md:block absolute top-0 right-0 h-full w-72 bg-white/90 backdrop-blur-xl shadow-2xl z-10 transform transition-transform duration-500 ${
              playlistOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="p-4 border-b border-green-300">
              <h4 className="text-green-700 font-bold">Playlist</h4>
            </div>
            <div className="overflow-y-auto h-[calc(100%-3rem)]">
              {songs.map((s, index) => (
                <div
                  key={index}
                  onClick={() => playSong(index)}
                  className={`p-3 cursor-pointer flex items-center hover:bg-green-100 ${
                    currentSong === index ? "bg-green-200/60 font-semibold text-green-800" : "text-green-700"
                  }`}
                >
                  <Music2 className="w-4 h-4 mr-2" />
                  {s.title}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Playlist (Slides up from the bottom) */}
          <div
            className={`md:hidden fixed bottom-0 left-0 w-full max-h-[70vh] bg-white/95 backdrop-blur-xl shadow-2xl z-50 transform transition-transform duration-500 rounded-t-3xl ${
              playlistOpen ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <div className="flex justify-between items-center p-4 border-b border-green-300 sticky top-0 bg-white/95 backdrop-blur-xl">
              <h4 className="text-green-700 font-bold">Playlist</h4>
              <button onClick={togglePlaylist} className="p-1 rounded-full hover:bg-green-100" aria-label="Close Playlist">
                <X className="text-green-700 w-6 h-6" />
              </button>
            </div>
            <div className="overflow-y-auto max-h-[calc(70vh-4rem)]">
              {songs.map((s, index) => (
                <div
                  key={index}
                  onClick={() => playSong(index)}
                  className={`p-3 cursor-pointer flex items-center hover:bg-green-100 ${
                    currentSong === index ? "bg-green-200/60 font-semibold text-green-800" : "text-green-700"
                  }`}
                >
                  <Music2 className="w-4 h-4 mr-2" />
                  {s.title}
                </div>
              ))}
            </div>
          </div>

          {/* Hidden YouTube autoplay (unchanged) */}
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
        </Card>

        {/* ✅ Listen Everywhere Section (unchanged) */}
        {/* ... keep your original Listen Everywhere section here exactly ... */}
      </div>

      {/* Custom CSS for the smooth spin animation 
      */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite; /* Increased duration for a smooth vinyl spin */
        }
      `}</style>
    </section>
  );
};

export default Music;
