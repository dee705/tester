"use client";
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
  ChevronDown,
} from "lucide-react";

const Music = () => {
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [showVolume, setShowVolume] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const volumeRef = useRef<HTMLDivElement>(null);
  const playlistRef = useRef<HTMLDivElement>(null);

  const songs = [
    { title: "Unimaginable", album: "Unimaginable", year: "2025", youtube: "https://www.youtube.com/embed/QdgVlGwHoXc", duration: 189 },
    { title: "OA", album: "Unimaginable", year: "2025", youtube: "https://www.youtube.com/embed/mzHcZPFc-Ag", duration: 210 },
    { title: "Pipilitin", album: "Unimaginable", year: "2025", youtube: "https://www.youtube.com/embed/UbIS383_oZw", duration: 265 },
    { title: "Di ko kaya ko to", album: "Unimaginable", year: "2025", youtube: "https://www.youtube.com/embed/g5BygcsEF7w", duration: 259 },
    { title: "Finally you came", album: "Unimaginable", year: "2025", youtube: "https://www.youtube.com/embed/xISjh6fNDnU", duration: 214 },
    { title: "TAYO", album: "Unimaginable", year: "2025", youtube: "https://www.youtube.com/embed/kGfoqBVhcJY", duration: 300 },
    { title: "TODO", album: "Unimaginable", year: "2025", youtube: "https://www.youtube.com/embed/ijwXh7U_6A0", duration: 152 },
    { title: "Dito Ka Lang, Wag kang lalayo", album: "Klarisse", year: "2025", youtube: "https://www.youtube.com/embed/zd7kQQ0fjDU", duration: 240 },
    { title: "Dito", album: "Feels", year: "2024", youtube: "https://www.youtube.com/embed/VxnNphj9qtQ", duration: 210 },
    { title: "Bibitawan Ka", album: "Feels", year: "2024", youtube: "https://www.youtube.com/embed/GsGKnZSCsCo", duration: 230 },
    { title: "Ulan Ng Kahapon", album: "Singles", year: "2021", youtube: "https://www.youtube.com/embed/RcKMBkkZZdc", duration: 200 },
    { title: "Wala na Talaga", album: "Klarisse", year: "2017", youtube: "https://www.youtube.com/embed/nuDNvk22Qmg", duration: 250 },
  ];

  const albums = [
    { title: "Unimaginable", year: "2025", type: "Latest Album", description: "It’s a reminder that persistence can lead somewhere meaningful.", spotifyId: "6ojC0sFbE9CcsEFgLbxPD8" },
    { title: "Feels", year: "2024", type: "Latest Album", description: "Her latest album featuring heartfelt ballads.", spotifyId: "4jUJec6voKpplFklfNeTk6" },
    { title: "Klarisse", year: "2017", type: "Self-Titled Album", description: "Her acclaimed self-titled album.", spotifyId: "0U9ZD8Tu410sGD8i3eRsAK" },
  ];

  const song = songs[currentSong];

  const getYouTubeId = (url: string) => url.match(/embed\/([^?]+)/)?.[1] ?? "";
  const getYouTubeThumbnail = (url: string) => `https://img.youtube.com/vi/${getYouTubeId(url)}/hqdefault.jpg`;
  const formatTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setTime((t) => (t >= song.duration ? (playNext(), 0) : t + 1));
      }, 1000);
    }
    return () => interval && clearInterval(interval);
  }, [isPlaying, currentSong]);

  const playNext = () => {
    setCurrentSong((p) => (p + 1) % songs.length);
    setTime(0);
    setIsPlaying(true);
  };
  const playPrev = () => {
    setCurrentSong((p) => (p - 1 + songs.length) % songs.length);
    setTime(0);
    setIsPlaying(true);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (volumeRef.current && !volumeRef.current.contains(e.target as Node)) setShowVolume(false);
      if (playlistRef.current && !playlistRef.current.contains(e.target as Node)) setShowPlaylist(false);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const progress = (time / song.duration) * 100;

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
            <Card key={i} className="transition-all backdrop-blur-xl bg-white/30 border border-white/20 rounded-2xl cursor-pointer hover:shadow-lg hover:shadow-green-400/40">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-green-700">{album.title}</h4>
                    <p className="text-sm text-black/60">{album.type} • {album.year}</p>
                    <p className="text-sm text-black/70 mt-2">{album.description}</p>
                  </div>
                  <Button size="icon" variant="ghost" className="bg-green-500 text-white hover:bg-green-600 rounded-full">
                    <Headphones />
                  </Button>
                </div>
                <iframe src={`https://open.spotify.com/embed/album/${album.spotifyId}`} width="100%" height="180" className="rounded-xl" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FEATURED SONGS SECTION */}
        <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
          Featured Songs
        </h3>

        <Card className="overflow-hidden rounded-3xl border border-white/30 shadow-lg bg-gradient-to-br from-green-50/60 via-white/40 to-green-100/60 backdrop-blur-xl mb-16">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              {/* Album Cover */}
              <div className="md:w-1/2 flex items-center justify-center bg-gradient-to-br from-green-100 to-white p-6">
                <img
                  src={getYouTubeThumbnail(song.youtube)}
                  alt={song.title}
                  className="rounded-2xl shadow-lg w-64 h-64 object-cover"
                />
              </div>

              {/* Player */}
              <div className="md:w-1/2 p-6 flex flex-col justify-center text-center relative">
                <h4 className="text-2xl font-bold mb-2 text-green-800">{song.title}</h4>
                <p className="text-lg text-green-700/80 mb-4">{song.album} • {song.year}</p>

                <div className="flex justify-between text-xs text-green-900/70 mb-1">
                  <span>{formatTime(time)}</span>
                  <span>{formatTime(song.duration)}</span>
                </div>

                <div className="h-1.5 w-full bg-green-200/50 rounded-full overflow-hidden mb-6">
                  <div
                    className="h-1.5 bg-gradient-to-r from-green-400 to-green-600 transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Controls */}
                <div className="flex justify-center items-center gap-4 text-green-700">
                  <button onClick={playPrev} className="hover:scale-125 transition-transform hover:text-green-600">
                    <SkipBack className="w-6 h-6" />
                  </button>
                  <button
                    className="bg-green-500 text-white p-4 rounded-full shadow-md hover:bg-green-600 hover:shadow-green-400/50 transition-all"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </button>
                  <button onClick={playNext} className="hover:scale-125 transition-transform hover:text-green-600">
                    <SkipForward className="w-6 h-6" />
                  </button>

                  {/* Volume Dropdown */}
                  <div className="relative" ref={volumeRef}>
                    <button
                      className="ml-2 bg-green-100 p-3 rounded-full hover:bg-green-200 hover:shadow-green-300/50 transition-all"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowVolume(!showVolume);
                      }}
                    >
                      <Volume2 className="w-5 h-5 text-green-700" />
                    </button>
                    {showVolume && (
                      <div className="absolute right-0 mt-2 p-3 rounded-xl backdrop-blur-md bg-white/50 border border-white/20 shadow-lg flex flex-col items-center">
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={volume}
                          onChange={(e) => setVolume(parseFloat(e.target.value))}
                          className="accent-green-600 rotate-[-90deg] w-24"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Playlist Dropdown */}
                <div className="mt-6" ref={playlistRef}>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowPlaylist(!showPlaylist);
                    }}
                    className="bg-green-500 text-white hover:bg-green-600 hover:shadow-green-400/50 flex items-center gap-2 mx-auto"
                  >
                    Playlist <ChevronDown className="w-4 h-4" />
                  </Button>
                  {showPlaylist && (
                    <div className="mt-3 mx-auto w-full md:w-3/4 rounded-xl backdrop-blur-md bg-white/50 border border-white/20 text-left shadow-lg">
                      {songs.map((s, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setCurrentSong(idx);
                            setShowPlaylist(false);
                            setTime(0);
                          }}
                          className={`w-full px-4 py-2 text-sm text-green-800 hover:bg-green-100 transition ${
                            idx === currentSong ? "bg-green-200/50 font-semibold" : ""
                          }`}
                        >
                          {s.title} • {s.album} • {s.year}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Hidden YouTube */}
            {isPlaying && (
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
      </div>
    </section>
  );
};

export default Music;
