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
  Shuffle,
  Repeat,
  Volume2,
  VolumeX,
  Menu,
} from "lucide-react";

const Music = () => {
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [currentAlbum, setCurrentAlbum] = useState<number | null>(null);

  // Bubble Beats states
  const [showPlaylist, setShowPlaylist] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);

  // 🔑 Songs with durations (in seconds)
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

  const albums = [
    { title: "Unimaginable", year: "2025", type: "Latest Album", description: "It’s a reminder that persistence can lead somewhere meaningful, that your dreams or hopes might be realized even if the road is long.", spotifyId: "6ojC0sFbE9CcsEFgLbxPD8" },
    { title: "Feels", year: "2024", type: "Latest Album", description: "Her latest album featuring heartfelt ballads and emotional storytelling.", spotifyId: "4jUJec6voKpplFklfNeTk6" },
    { title: "Klarisse", year: "2017", type: "Self-Titled Album", description: "Her acclaimed self-titled album showcasing her vocal range and artistry.", spotifyId: "0U9ZD8Tu410sGD8i3eRsAK" },
  ];

  const song = songs[currentSong];

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
            if (isRepeating) return 0;
            playNext();
            return 0;
          }
          return t + 1;
        });
      }, 1000);
    }
    return () => interval && clearInterval(interval);
  }, [isPlaying, currentSong, isRepeating]);

  const progress = song.duration ? (time / song.duration) * 100 : 0;

  const playNext = () => {
    if (isShuffling) {
      const randomIndex = Math.floor(Math.random() * songs.length);
      setCurrentSong(randomIndex);
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
          {albums.map((album, index) => {
            const isActive = currentAlbum === index;
            return (
              <Card
                key={index}
                className={`transition-all backdrop-blur-xl bg-white/30 border border-white/20 rounded-2xl cursor-pointer hover:shadow-lg hover:shadow-green-400/40 ${isActive ? "ring-2 ring-green-500" : ""}`}
                onClick={() => setCurrentAlbum(isActive ? null : index)}
              >
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
                  <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden mb-4">
                    <div className={`h-2 bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500 ${isActive ? "w-full animate-pulse" : "w-0"}`} />
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

        {/* Featured Songs - Bubble Beats Style */}
        <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent">
          Featured Songs
        </h3>
        <div className="flex flex-col items-center">
          <Card className="rounded-3xl border border-white/30 shadow-xl bg-white/80 backdrop-blur-lg w-full max-w-lg">
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-pink-600">Bubble Beats</h3>
                <button onClick={() => setShowPlaylist(!showPlaylist)}>
                  <Menu className="w-6 h-6 text-pink-600" />
                </button>
              </div>

              {/* Album Art */}
              <div className="flex justify-center mb-4">
                <div className="w-40 h-40 rounded-full border-8 border-pink-300 flex items-center justify-center shadow-lg bg-pink-100">
                  <img
                    src={`https://img.youtube.com/vi/${song.youtube.split("/embed/")[1]}/hqdefault.jpg`}
                    alt={song.title}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                </div>
              </div>

              {/* Song Info */}
              <h4 className="text-xl font-bold text-center text-pink-600">{song.title}</h4>
              <p className="text-sm text-center text-gray-500 mb-4">{song.album} • {song.year}</p>

              {/* Progress Bar */}
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>{formatTime(time)}</span>
                <span>{formatTime(song.duration)}</span>
              </div>
              <div className="h-2 w-full bg-gray-200 rounded-full mb-4 overflow-hidden">
                <div className="h-2 bg-pink-500 transition-all" style={{ width: `${progress}%` }} />
              </div>

              {/* Controls */}
              <div className="flex justify-center items-center gap-6 text-pink-600 mb-4">
                <button onClick={() => setIsShuffling(!isShuffling)}>
                  <Shuffle className={`w-5 h-5 ${isShuffling ? "text-pink-500" : "opacity-50"}`} />
                </button>
                <button onClick={playPrev}><SkipBack className="w-6 h-6" /></button>
                <button
                  className="bg-pink-500 text-white p-4 rounded-full shadow-md hover:bg-pink-600"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>
                <button onClick={playNext}><SkipForward className="w-6 h-6" /></button>
                <button onClick={() => setIsRepeating(!isRepeating)}>
                  <Repeat className={`w-5 h-5 ${isRepeating ? "text-pink-500" : "opacity-50"}`} />
                </button>
              </div>

              {/* Volume */}
              <div className="flex items-center gap-2 mb-6">
                <button onClick={() => setVolume(volume > 0 ? 0 : 0.5)}>
                  {volume > 0 ? <Volume2 className="w-5 h-5 text-pink-600" /> : <VolumeX className="w-5 h-5 text-pink-600" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full accent-pink-500"
                />
              </div>

              {/* Playlist */}
              {showPlaylist && (
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
                        currentSong === index ? "bg-pink-100 text-pink-600 font-bold" : "hover:bg-gray-100"
                      }`}
                    >
                      <span>{s.title}</span>
                      <span className="text-xs">{formatTime(s.duration)}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Hidden YouTube autoplay */}
              {isPlaying && song.youtube && (
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
