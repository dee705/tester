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
  const [volume, setVolume] = useState(100);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playerReady, setPlayerReady] = useState(false);
  const playerRef = useRef<any>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const songs = [
    { title: "Unimaginable", album: "Unimaginable", year: "2025", youtube: "https://www.youtube.com/watch?v=QdgVlGwHoXc" },
    { title: "OA", album: "Unimaginable", year: "2025", youtube: "https://www.youtube.com/watch?v=mzHcZPFc-Ag" },
    { title: "Pipilitin", album: "Unimaginable", year: "2025", youtube: "https://www.youtube.com/watch?v=UbIS383_oZw" },
    { title: "Di ko Kaya ko to", album: "Unimaginable", year: "2025", youtube: "https://www.youtube.com/watch?v=g5BygcsEF7w" },
    { title: "Finally you came", album: "Unimaginable", year: "2025", youtube: "https://www.youtube.com/watch?v=xISjh6fNDnU" },
    { title: "TAYO", album: "Unimaginable", year: "2025", youtube: "https://www.youtube.com/watch?v=kGfoqBVhcJY" },
    { title: "TODO", album: "Unimaginable", year: "2025", youtube: "https://www.youtube.com/watch?v=ijwXh7U_6A0" },
    { title: "Babae Ako", album: "Unimaginable", year: "2025", youtube: "https://www.youtube.com/watch?v=bMy7r6iNcaM" },
    { title: "Dito Ka Lang, Wag kang lalayo", album: "Klarisse", year: "2025", youtube: "https://www.youtube.com/watch?v=zd7kQQ0fjDU" },
    { title: "Dito", album: "Feels", year: "2024", youtube: "https://www.youtube.com/watch?v=VxnNphj9qtQ" },
    { title: "Minamahal pa rin ako", album: "Feels", year: "2024", youtube: "https://www.youtube.com/watch?v=WTKCs5j_1JA" },
    { title: "Bibitawan Ka", album: "Feels", year: "2024", youtube: "https://www.youtube.com/watch?v=GsGKnZSCsCo" },
    { title: "Ulan Ng Kahapon", album: "Singles", year: "2021", youtube: "https://www.youtube.com/watch?v=RcKMBkkZZdc" },
    { title: "Wala na Talaga", album: "Klarisse", year: "2017", youtube: "https://www.youtube.com/watch?v=nuDNvk22Qmg" },
    { title: "Paalam Na", album: "Klarisse", year: "2017", youtube: "https://www.youtube.com/watch?v=_-6qgbuFSYA" },
    { title: "Sa pangarap na lang", album: "Klarisse", year: "2017", youtube: "https://www.youtube.com/watch?v=q_zMKbI1ufE" },
    { title: "Eto na naman tayo", album: "Klarisse", year: "2017", youtube: "https://www.youtube.com/watch?v=Ni-B1lQGgMk" },
    { title: "Mahal mo pa ba ako", album: "Klarisse", year: "2017", youtube: "https://www.youtube.com/watch?v=ekljZEYW7oI" },
    { title: "Sanay tumibok muli", album: "Klarisse", year: "2017", youtube: "https://www.youtube.com/watch?v=3z4Nujk6P2k" },
    { title: "Ikaw ay ako", album: "Klarisse", year: "2017", youtube: "https://www.youtube.com/watch?v=ToBuXLpQyxw" },
  ];

  const song = songs[currentSong];

  const getYouTubeId = (url: string) => {
    const match = url.match(/v=([^&]+)/);
    return match ? match[1] : "";
  };

  const getYouTubeThumbnail = (url: string) => {
    const id = getYouTubeId(url);
    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  };

  // Load YouTube IFrame API
  useEffect(() => {
    if (window.YT) return;
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }, []);

  // Initialize player
  useEffect(() => {
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("yt-player", {
        videoId: getYouTubeId(song.youtube),
        playerVars: { autoplay: 0, controls: 0 },
        events: {
          onReady: (event: any) => {
            setDuration(event.target.getDuration());
            setPlayerReady(true);
          },
          onStateChange: (event: any) => {
            if (event.data === 0) playNext();
          },
        },
      });
    };
  }, []);

  // When song changes
  useEffect(() => {
    if (playerReady && playerRef.current) {
      playerRef.current.loadVideoById(getYouTubeId(song.youtube));
      if (isPlaying) playerRef.current.playVideo();
    }
  }, [currentSong]);

  // Play/pause
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

  // Volume control
  const toggleMute = () => {
    if (!playerRef.current) return;
    if (playerRef.current.isMuted()) {
      playerRef.current.unMute();
      setVolume(playerRef.current.getVolume());
    } else {
      playerRef.current.mute();
      setVolume(0);
    }
  };

  const playNext = () => {
    setCurrentSong((prev) => (prev + 1) % songs.length);
  };

  const playPrev = () => {
    setCurrentSong((prev) => (prev - 1 + songs.length) % songs.length);
  };

  return (
    <section id="music" className="py-20 bg-gradient-to-b from-green-100 to-white">
      <div className="container mx-auto px-4">
        {/* Featured Songs */}
        <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
          Featured Songs
        </h3>

        <Card className="rounded-3xl border border-white/30 shadow-lg bg-gradient-to-br from-green-50/60 via-white/40 to-green-100/60 backdrop-blur-xl mb-16 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center">
              {/* Thumbnail */}
              <div className="relative w-48 h-48 md:w-64 md:h-64 mb-6 md:mb-0 md:mr-10 flex-shrink-0">
                <img
                  src={getYouTubeThumbnail(song.youtube)}
                  alt={song.title}
                  className={`rounded-full shadow-lg w-full h-full object-cover border-4 border-green-400 transition-transform ${
                    isPlaying ? "animate-spin-slow" : ""
                  }`}
                />
                <div id="yt-player" ref={iframeRef} className="hidden" />
              </div>

              {/* Player info */}
              <div className="flex-1 text-center md:text-left">
                <h4 className="text-2xl font-bold text-green-800">{song.title}</h4>
                <p className="text-green-700/80 mb-4">
                  {song.album} • {song.year}
                </p>

                {/* Controls */}
                <div className="flex justify-center md:justify-start items-center gap-5 mb-4">
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
                  <button onClick={toggleMute} className="hover:scale-110 transition-transform">
                    {volume === 0 ? (
                      <VolumeX className="w-6 h-6 text-green-700" />
                    ) : (
                      <Volume2 className="w-6 h-6 text-green-700" />
                    )}
                  </button>
                  <button
                    onClick={() => setShowPlaylist(!showPlaylist)}
                    className="hover:scale-110 transition-transform"
                  >
                    <Menu className="w-6 h-6 text-green-700" />
                  </button>
                </div>

                {/* Playlist */}
                <div
                  className={`transition-all duration-500 overflow-hidden ${
                    showPlaylist ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <ul className="text-green-800 space-y-2 mt-4">
                    {songs.map((s, i) => (
                      <li
                        key={i}
                        onClick={() => setCurrentSong(i)}
                        className={`cursor-pointer p-2 rounded-md transition-all ${
                          i === currentSong
                            ? "bg-green-200/60 font-semibold"
                            : "hover:bg-green-100/60"
                        }`}
                      >
                        {s.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <style>{`
        .animate-spin-slow {
          animation: spin 6s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Music;
