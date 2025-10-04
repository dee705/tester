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
  Menu,
  Repeat,
  Shuffle,
  Volume2,
  VolumeX,
} from "lucide-react";

const Music = () => {
  // =================== STATES ===================
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [currentAlbum, setCurrentAlbum] = useState<number | null>(null);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [volume, setVolume] = useState(50);
  const [playerReady, setPlayerReady] = useState(false);

  const playerRef = useRef<any>(null);

  // =================== SONGS DATA ===================
  const songs = [
    { title: "Unimaginable", album: "Unimaginable", year: "2025", youtube: "https://www.youtube.com/embed/QdgVlGwHoXc", duration: 189.6 },
    { title: "OA", album: "Unimaginable", year: "2025", youtube: "https://www.youtube.com/embed/mzHcZPFc-Ag", duration: 210.6 },
    { title: "Pipilitin", album: "Unimaginable", year: "2025", youtube: "https://www.youtube.com/embed/UbIS383_oZw", duration: 265.8 },
    { title: "Di ko Kaya ko to", album: "Unimaginable", year: "2025", youtube: "https://www.youtube.com/embed/g5BygcsEF7w", duration: 258.6 },
    { title: "Finally you came", album: "Unimaginable", year: "2025", youtube: "https://www.youtube.com/embed/xISjh6fNDnU", duration: 214.8 },
    { title: "TAYO", album: "Unimaginable", year: "2025", youtube: "https://www.youtube.com/embed/kGfoqBVhcJY", duration: 309.6 },
    { title: "TODO", album: "Unimaginable", year: "2025", youtube: "https://www.youtube.com/embed/ijwXh7U_6A0", duration: 152 },
    { title: "Babae Ako", album: "Unimaginable", year: "2025", youtube: "https://www.youtube.com/embed/bMy7r6iNcaM", duration: 204 },
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

  // =================== HELPERS ===================
  const getYouTubeId = (url: string) => {
    const match = url.match(/embed\/([^?]+)/);
    return match ? match[1] : "";
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // =================== TIMER ===================
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setTime((t) => {
          if (t >= song.duration) {
            playNext();
            return 0;
          }
          return t + 1;
        });
      }, 1000);
    }
    return () => interval && clearInterval(interval);
  }, [isPlaying, currentSong]);

  const progress = song.duration ? (time / song.duration) * 100 : 0;

  const playNext = () => {
    if (isShuffling) {
      const random = Math.floor(Math.random() * songs.length);
      setCurrentSong(random);
    } else {
      setCurrentSong((prev) => (prev + 1) % songs.length);
    }
    setTime(0);
    setIsPlaying(true);
  };

  const playPrev = () => {
    setCurrentSong((prev) => (prev - 1 + songs.length) % songs.length);
    setTime(0);
    setIsPlaying(true);
  };

  // =================== YOUTUBE PLAYER API ===================
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
            playerRef.current = e.target;
            setPlayerReady(true);
          },
        },
      });
    };
  }, []);

  useEffect(() => {
    if (!playerReady || !playerRef.current) return;
    const videoId = getYouTubeId(song.youtube);
    playerRef.current.loadVideoById(videoId);
    playerRef.current.setVolume(volume);
    if (isPlaying) playerRef.current.playVideo();
    else playerRef.current.pauseVideo();
  }, [currentSong, isPlaying]);

  useEffect(() => {
    if (playerRef.current) playerRef.current.setVolume(volume);
  }, [volume]);

  // =================== RENDER ===================
  return (
    <section id="music" className="py-20 bg-gradient-to-b from-green-100 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
            Soundtracks & Albums
          </h2>
        </div>

        {/* ================= ALBUMS ================= */}
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

        {/* ================= FEATURED SONGS ================= */}
        <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
          Featured Songs
        </h3>

        <Card className="overflow-hidden rounded-3xl border border-white/30 shadow-lg bg-gradient-to-br from-green-50/60 via-white/40 to-green-100/60 backdrop-blur-xl transition-all duration-500 hover:shadow-green-400/50 hover:scale-[1.01] mb-16 max-w-lg mx-auto">
          <CardContent className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-green-600">Bubble Beats</h3>
              <button
                onClick={() => setShowPlaylist(!showPlaylist)}
                className="transition-transform duration-300"
              >
                <Menu
                  className={`w-7 h-7 text-green-600 transform transition-transform duration-300 ${
                    showPlaylist ? "rotate-90" : ""
                  }`}
                />
              </button>
            </div>

            {/* Album Art */}
            <div className="flex justify-center mb-4">
              <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full border-8 border-green-300 flex items-center justify-center shadow-lg bg-green-100 overflow-hidden">
                <img
                  src={`https://img.youtube.com/vi/${getYouTubeId(song.youtube)}/hqdefault.jpg`}
                  alt={song.title}
                  className={`w-32 h-32 md:w-40 md:h-40 rounded-full object-cover transition-all duration-500 ${
                    isPlaying ? "animate-spin-slow" : ""
                  }`}
                />
              </div>
            </div>

            {/* Song Info */}
            <h4 className="text-xl md:text-2xl font-bold text-center text-green-700">{song.title}</h4>
            <p className="text-sm text-center text-gray-500 mb-4">
              {song.album} • {song.year}
            </p>

            {/* Progress */}
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>{formatTime(time)}</span>
              <span>{formatTime(song.duration)}</span>
            </div>
            <div className="h-2 w-full bg-gray-200 rounded-full mb-4 overflow-hidden">
              <div
                className="h-2 bg-green-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Controls */}
            <div className="flex justify-center items-center gap-5 text-green-600 mb-4">
              <button onClick={() => setIsShuffling(!isShuffling)}>
                <Shuffle
                  className={`w-5 h-5 ${isShuffling ? "text-green-600" : "opacity-50"}`}
                />
              </button>
              <button onClick={playPrev}>
                <SkipBack className="w-6 h-6" />
              </button>
              <button
                className="bg-green-500 text-white p-4 rounded-full shadow-md hover:bg-green-600 transition"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              <button onClick={playNext}>
                <SkipForward className="w-6 h-6" />
              </button>
              <button onClick={() => setIsRepeating(!isRepeating)}>
                <Repeat
                  className={`w-5 h-5 ${isRepeating ? "text-green-600" : "opacity-50"}`}
                />
              </button>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-2 mb-6">
              <button
                onClick={() => {
                  if (volume > 0) {
                    setVolume(0);
                    playerRef.current?.setVolume(0);
                  } else {
                    setVolume(50);
                    playerRef.current?.setVolume(50);
                  }
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
                  playerRef.current?.setVolume(v);
                }}
                className="w-full accent-green-500"
              />
            </div>

            {/* Playlist */}
            <div
              className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                showPlaylist ? "max-h-96" : "max-h-0"
              }`}
            >
              <div className="space-y-2">
                {songs.map((s, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setCurrentSong(index);
                      setTime(0);
                      setIsPlaying(true);
                    }}
                    className={`flex justify-between items-center p-2 rounded-lg cursor-pointer transition ${
                      currentSong === index
                        ? "bg-green-100 text-green-600 font-bold"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <span className="truncate">{s.title}</span>
                    <span className="text-xs">{formatTime(s.duration)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hidden YouTube Player */}
            <div id="yt-player" style={{ display: "none" }}></div>
          </CardContent>
        </Card>

        {/* ================= LISTEN EVERYWHERE ================= */}
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
                  "https://music.youtube.com/channel/UCeg7EAceRGI8D6q1j4djPTQ",
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

      {/* 🔄 Smooth spin animation */}
      <style jsx global>{`
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
      `}</style>
    </section>
  );
};

export default Music;
