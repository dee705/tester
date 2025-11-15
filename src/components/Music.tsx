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
  ListMusic,
} from "lucide-react";

const Music = () => {
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [currentAlbum, setCurrentAlbum] = useState<number | null>(null);
  const [showPlaylist, setShowPlaylist] = useState(false);

  // 🔑 Songs with durations (in seconds)
  const songs = [
    // ... your songs array unchanged ...
  ];

  const albums = [
    // ... your albums array unchanged ...
  ];

  const song = songs[currentSong];

  // ✅ Helper to safely append autoplay
  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    return `${url}${url.includes("?") ? "&" : "?"}autoplay=1`;
  };

  // ✅ Extract YouTube video ID
  const getYouTubeId = (url: string) => {
    const match = url.match(/embed\/([^?]+)/);
    return match ? match[1] : "";
  };

  // ✅ Get YouTube thumbnail
  const getYouTubeThumbnail = (url: string) => {
    const id = getYouTubeId(url);
    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  };

  // ✅ Format as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // Timer effect
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
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentSong, song.duration]);

  // Progress bar
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

  const handleSongSelect = (index: number) => {
    setCurrentSong(index);
    setTime(0);
    setIsPlaying(true);
    setShowPlaylist(false);
  };

  return (
    <>
      {/* ==================================================
          ORIGINAL MAIN MUSIC SECTION 
          ================================================== */}
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
                          src={`https://open.spotify.com/embed/album/${album.spotifyId}?utm_source=generator`}
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

          <Card className="overflow-hidden rounded-3xl border border-white/30 shadow-lg bg-gradient-to-br from-green-50/60 via-white/40 to-green-100/60 backdrop-blur-xl transition-all duration-500 hover:shadow-green-400/50 hover:scale-[1.01] mb-16 relative">
            <CardContent className="p-0 relative overflow-hidden">

              {/* 🎵 Playlist Toggle (Burger Icon) */}
              <button
                onClick={() => setShowPlaylist(!showPlaylist)}
                className="absolute top-4 right-4 z-20 text-green-700 hover:text-green-900 transition-colors p-2 rounded-full hover:bg-green-100"
              >
                <ListMusic className="w-6 h-6" />
              </button>

              {/* 🎧 Main Player Container */}
              <div className="flex flex-col md:flex-row relative overflow-hidden">

                {/* Album Cover */}
                <div className="md:w-1/2 w-full flex items-center justify-center bg-gradient-to-br from-green-100 to-white p-6">
                  <img
                    src={getYouTubeThumbnail(song.youtube)}
                    alt={song.title}
                    className="rounded-2xl shadow-lg w-64 h-64 object-cover"
                  />
                </div>

                {/* Player (when playlist hidden) */}
                {!showPlaylist && !isPlaying && (
                  <div className="md:w-1/2 w-full p-6 flex flex-col justify-center text-center transition-all duration-500 ease-in-out">
                    <div className="pr-10">
                      <h4 className="text-2xl font-bold mb-2 text-green-800">{song.title}</h4>
                      <p className="text-lg text-green-700/80 mb-4">
                        {song.album} • {song.year}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-green-900/70 mb-1">
                      <span>{formatTime(time)}</span>
                      <span>{formatTime(song.duration)}</span>
                    </div>
                    <div className="h-1.5 w-full bg-green-200/50 rounded-full overflow-hidden mb-6">
                      <div
                        className="h-1.5 bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    <div className="flex justify-center items-center gap-6 text-green-700">
                      <button onClick={playPrev} className="hover:scale-125 transition-transform">
                        <SkipBack className="w-6 h-6" />
                      </button>
                      <button
                        className="bg-green-500 text-white p-4 rounded-full shadow-md hover:bg-green-600 hover:shadow-green-400/50 transition-all"
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                      </button>
                      <button onClick={playNext} className="hover:scale-125 transition-transform">
                        <SkipForward className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Message when playing */}
                {!showPlaylist && isPlaying && (
                  <div className="md:w-1/2 w-full p-6 flex flex-col justify-center text-center transition-all duration-500 ease-in-out">
                    <h4 className="text-2xl font-bold mb-2 text-green-800">{song.title}</h4>
                    <p className="text-lg text-green-700/80 mb-8">Now Playing</p>
                    <p className="text-gray-500 italic">
                      The music controls are available in the floating player at the bottom-right.
                    </p>
                  </div>
                )}

                {/* 🎶 Sliding Playlist Panel */}
                <div
                  className={`absolute top-0 right-0 h-full w-full md:w-1/2 bg-white/90 backdrop-blur-xl shadow-xl transition-all duration-500 ease-in-out transform ${
                    showPlaylist ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
                  } rounded-l-3xl z-20`}
                >
                  <div className="p-6 flex flex-col h-full">
                    <h4 className="text-xl font-bold mb-4 text-green-800 border-b border-green-200 pb-2">
                      Full Playlist ({songs.length} Songs)
                    </h4>

                    <ul className="space-y-1 overflow-y-auto max-h-full pr-1">
                      {songs.map((s, index) => (
                        <li
                          key={index}
                          className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                            index === currentSong
                              ? "bg-green-200/80 font-semibold text-green-900 shadow-inner"
                              : "text-gray-700 hover:bg-green-100/50 cursor-pointer"
                          }`}
                          onClick={() => handleSongSelect(index)}
                        >
                          <div className="flex items-center truncate pr-2">
                            {index === currentSong && (
                              <Play className="w-4 h-4 mr-2 text-green-600 fill-green-600" />
                            )}
                            <span className={index === currentSong ? "ml-0" : "ml-6"}>{s.title}</span>
                          </div>
                          <span className="text-sm opacity-70 flex-shrink-0">
                            {formatTime(s.duration)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* 🎨 Background Overlay when Playlist is Open */}
              <div
                className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-500 ${
                  showPlaylist ? "opacity-100 visible" : "opacity-0 invisible"
                } z-10`}
                onClick={() => setShowPlaylist(false)}
              />

              {/* 🎬 Autoplay Embed (Hidden) */}
              {isPlaying && song.youtube && (
                <iframe
                  src={getEmbedUrl(song.youtube)}
                  width="0"
                  height="0"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  style={{ display: "none" }}
                />
              )}
            </CardContent>
          </Card>

          {/* Listen Everywhere */}
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
                onClick={() => window.open("https://soundcloud.com/klarissedeguzman", "_blank")}
              >
                <Cloud className="mr-2 h-5 w-5" /> SoundCloud
              </Button>
            </div>
          </div>

          {/* Floating Music Player */}
          {isPlaying && (
            <div className="fixed bottom-4 right-4 z-[9999] p-2">
              <Card className="rounded-xl shadow-2xl bg-white/90 backdrop-blur-md w-72 transition-all duration-300 border border-green-200">
                <CardContent className="p-3 flex items-center justify-between space-x-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-green-800 truncate" title={song.title}>
                      {song.title}
                    </p>
                    <div className="h-1 w-full bg-green-200 rounded-full overflow-hidden mt-1">
                      <div
                        className="h-1 bg-gradient-to-r from-green-400 to-green-600 transition-all duration-1000"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={playPrev}
                      className="text-green-600 hover:text-green-800 p-1 transition-colors rounded-full"
                    >
                      <SkipBack className="w-4 h-4" />
                    </button>
                    <button
                      className="bg-green-500 text-white p-2 rounded-full shadow-md hover:bg-green-600 transition-all"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={playNext}
                      className="text-green-600 hover:text-green-800 p-1 transition-colors rounded-full"
                    >
                      <SkipForward className="w-4 h-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Music;
