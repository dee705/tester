import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Headphones, Music2, Youtube, Apple, Cloud } from "lucide-react";

const Music = () => {
  const [currentSong, setCurrentSong] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef<any>(null);

  // ✅ Use YouTube IDs only
  const songs = [
    { title: "Dito Ka Lang, Wag kang lalayo", album: "Klarisse", year: "2025", youtubeId: "zd7kQQ0fjDU" },
    { title: "Dito", album: "Feels", year: "2024", youtubeId: "VxnNphj9qtQ" },
    { title: "Bibitawan Ka", album: "Feels", year: "2024", youtubeId: "GsGKnZSCsCo" },
    { title: "Ulan Ng Kahapon", album: "Singles", year: "2021", youtubeId: "RcKMBkkZZdc" },
    { title: "Wala na Talaga", album: "Klarisse", year: "2017", youtubeId: "nuDNvk22Qmg" },
  ];

  const albums = [
    {
      title: "Feels",
      year: "2024",
      type: "Latest Album",
      description: "Her latest album featuring heartfelt ballads and emotional storytelling.",
      spotifyId: "4jUJec6voKpplFklfNeTk6",
    },
    {
      title: "Klarisse",
      year: "2017",
      type: "Self-Titled Album",
      description: "Her acclaimed self-titled album showcasing her vocal range and artistry.",
      spotifyId: "0U9ZD8Tu410sGD8i3eRsAK",
    },
  ];

  // Load YouTube API
  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    (window as any).onYouTubeIframeAPIReady = () => {
      playerRef.current = new (window as any).YT.Player("yt-player", {
        height: "0",
        width: "0",
        videoId: songs[0].youtubeId,
        playerVars: { autoplay: 0 },
      });
    };
  }, []);

  // Update progress
  useEffect(() => {
    let interval: any;
    if (isPlaying && playerRef.current) {
      interval = setInterval(() => {
        setProgress(playerRef.current.getCurrentTime());
        setDuration(playerRef.current.getDuration());
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const playSong = (index: number) => {
    if (!playerRef.current) return;
    setCurrentSong(index);
    playerRef.current.loadVideoById(songs[index].youtubeId);
    playerRef.current.playVideo();
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    if (currentSong === null) return;
    const nextIndex = (currentSong + 1) % songs.length;
    playSong(nextIndex);
  };

  const prevSong = () => {
    if (currentSong === null) return;
    const prevIndex = (currentSong - 1 + songs.length) % songs.length;
    playSong(prevIndex);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    playerRef.current.seekTo(newTime, true);
    setProgress(newTime);
  };

  const formatTime = (secs: number) => {
    if (!secs) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
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

        {/* ✅ Albums Section (unchanged) */}
        <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
          Albums
        </h3>
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {albums.map((album, index) => (
            <Card key={index} className="transition-all backdrop-blur-xl bg-white/30 border border-white/20 rounded-2xl hover:shadow-lg hover:shadow-green-400/40">
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
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 🎵 Fixed Featured Songs Section */}
        <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
          Featured Songs
        </h3>
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {songs.map((song, index) => {
            const isActive = currentSong === index;
            return (
              <Card
                key={index}
                className={`transition-all backdrop-blur-xl bg-white/30 border border-white/20 rounded-2xl hover:shadow-lg hover:shadow-green-400/40 ${
                  isActive ? "ring-2 ring-green-500" : ""
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-bold text-green-700">{song.title}</h4>
                      <p className="text-sm text-black/60">
                        {song.album} • {song.year}
                      </p>
                      {isActive && (
                        <p className="text-xs text-green-600 mt-1">
                          {formatTime(progress)} / {formatTime(duration)}
                        </p>
                      )}
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="bg-green-500 text-white hover:bg-green-600 rounded-full"
                      onClick={() => (isActive ? togglePlay() : playSong(index))}
                    >
                      {isActive && isPlaying ? "⏸" : <Headphones />}
                    </Button>
                  </div>

                  {/* Progress Bar */}
                  {isActive && (
                    <div className="flex items-center space-x-2">
                      <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        value={progress}
                        onChange={handleSeek}
                        className="w-full"
                      />
                    </div>
                  )}

                  {/* Controls */}
                  {isActive && (
                    <div className="flex justify-center space-x-6 text-green-600 mt-4">
                      <button onClick={prevSong}>⏮</button>
                      <button onClick={togglePlay}>{isPlaying ? "⏸" : "▶"}</button>
                      <button onClick={nextSong}>⏭</button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}

          {/* Hidden YouTube Player */}
          <div id="yt-player" style={{ display: "none" }}></div>
        </div>

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
