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

  // ✅ All 35 songs
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
    { title: "Ayoko ng Sana", album: "Klarisse x Rox Santos", year: "2024", youtube: "https://www.youtube.com/embed/8rw_2ps24vI?si", duration: 249 },
    { title: "Thank you", album: "Klarisse", year: "2022", youtube: "https://www.youtube.com/embed/UHzrSdL540E?si", duration: 273 },
    { title: "God Is With Us", album: "Klarisse x Emmanuel Lipio Jr", year: "2022", youtube: "https://www.youtube.com/embed/UHzrSdL540E?si", duration: 263 },
    { title: "Ulan Ng Kahapon", album: "Singles", year: "2021", youtube: "https://www.youtube.com/embed/RcKMBkkZZdc", duration: 260 },
    { title: "NBSB", album: "Klarisse", year: "2019", youtube: "https://www.youtube.com/embed/KPEkAVSQ-vI?si", duration: 198 },
    { title: "The Climb", album: "Klarisse De Guzman", year: "2018", youtube: "https://www.youtube.com/embed/ewC5y76YTis?si", duration: 258 },
    { title: "Slowly", album: "Klarisse De Guzman", year: "2018", youtube: "https://www.youtube.com/embed/qWNMeDHw1XA?si", duration: 241 },
    { title: "Everything I do , I do it for you", album: "Klarisse De Guzman", year: "2018", youtube: "https://www.youtube.com/embed/vFBDqSRVMrw?si", duration: 246 },
    { title: "To Love somebody", album: "Klarisse De Guzman", year: "2018", youtube: "https://www.youtube.com/embed/1gwCk2YdMXM?si", duration: 206 },
    { title: "Sayang Naman", album: "Klarisse De Guzman", year: "2018", youtube: "https://www.youtube.com/embed/1rMU2MdTr5k", duration: 244 },
    { title: "Stuck On You", album: "Klarisse De Guzman", year: "2018", youtube: "https://www.youtube.com/embed/JWDub6lHD1g?si", duration: 195 },
    { title: "I Can't Make You Love Me", album: "Klarisse De Guzman", year: "2018", youtube: "https://www.youtube.com/embed/bPLVcz5fVcE?si", duration: 204 },
    { title: "Wala na Talaga", album: "Klarisse", year: "2017", youtube: "https://www.youtube.com/embed/nuDNvk22Qmg", duration: 250 },
    { title: "Paalam Na", album: "Klarisse", year: "2017", youtube: "https://www.youtube.com/embed/_-6qgbuFSYA", duration: 300 },
    { title: "Sa pangarap na lang", album: "Klarisse", year: "2017", youtube: "https://www.youtube.com/embed/q_zMKbI1ufE", duration: 240 },
    { title: "Eto na naman tayo", album: "Klarisse", year: "2017", youtube: "https://www.youtube.com/embed/Ni-B1lQGgMk", duration: 240 },
    { title: "Mahal mo pa ba ako", album: "Klarisse", year: "2017", youtube: "https://www.youtube.com/embed/ekljZEYW7oI", duration: 240 },
    { title: "Sanay tumibok muli", album: "Klarisse", year: "2017", youtube: "https://www.youtube.com/embed/3z4Nujk6P2k", duration: 240 },
    { title: "Ikaw ay ako", album: "Klarisse", year: "2017", youtube: "https://www.youtube.com/embed/ToBuXLpQyxw", duration: 240 },
    { title: "Di kayang pilitin", album: "Klarisse De Guzman", year: "2015", youtube: "https://www.youtube.com/embed/CUSjyAqBzlk?si", duration: 251.4 },
    { title: "Sino Ka Ba ft. Nyoy Volante", album: "Klarisse De Guzman", year: "2015", youtube: "https://www.youtube.com/embed/BbQrxetReGQ?si", duration: 321 },
    { title: "Magpakailanman", album: "Klarisse De Guzman", year: "2015", youtube: "https://www.youtube.com/embed/ivIcdIImFDc?si", duration: 244.8 },
    { title: "Sabihin Mo Sa Akin", album: "Klarisse De Guzman", year: "2014", youtube: "https://www.youtube.com/embed/qOpkaSWqpJA?si", duration: 249 },
  ];

  // ✅ Albums
  const albums = [
    {
      title: "Unimaginable",
      year: "2025",
      type: "Latest Album",
      description: "It’s a reminder that persistence can lead somewhere meaningful, that your dreams or hopes might be realized even if the road is long.",
      spotifyId: "6ojC0sFbE9CcsEFgLbxPD8",
    },
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

  const song = songs[currentSong];

  const getYouTubeId = (url: string) => {
    const match = url.match(/embed\/([^?]+)/);
    return match ? match[1] : "";
  };

  const getYouTubeThumbnail = (url: string) => {
    const id = getYouTubeId(url);
    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // Playback logic
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
  }, [isPlaying, currentSong, song.duration]);

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
    <section id="music" className="py-20 bg-gradient-to-b from-green-100 to-white">
      <div className="container mx-auto px-4">
        {/* ===== ALBUMS ===== */}
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
          Soundtracks & Albums
        </h2>
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
                      <p className="text-sm text-black/60">{album.type} • {album.year}</p>
                      <p className="text-sm text-black/70 mt-2">{album.description}</p>
                    </div>
                    <Button size="icon" variant="ghost" className="bg-green-500 text-white hover:bg-green-600 rounded-full">
                      <Headphones />
                    </Button>
                  </div>
                  {isActive && (
                    <iframe
                      src={`https://open.spotify.com/embed/album/${album.spotifyId}?utm_source=generator`}
                      width="100%"
                      height="380"
                      frameBorder="0"
                      allow="encrypted-media"
                      className="rounded-xl"
                    />
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* ===== FEATURED SONGS ===== */}
        <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
          Featured Songs
        </h3>

        <Card className="overflow-hidden rounded-3xl border border-white/30 shadow-lg bg-gradient-to-br from-green-50/60 via-white/40 to-green-100/60 backdrop-blur-xl mb-16">
          <CardContent className="p-0 relative">
            {/* Playlist toggle */}
            <button
              onClick={() => setShowPlaylist(!showPlaylist)}
              className="absolute top-4 right-4 z-10 text-green-700 hover:text-green-900 p-2 rounded-full hover:bg-green-100"
            >
              <ListMusic className="w-6 h-6" />
            </button>

            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 w-full flex items-center justify-center bg-gradient-to-br from-green-100 to-white p-6">
                <img
                  src={getYouTubeThumbnail(song.youtube)}
                  alt={song.title}
                  className="rounded-2xl shadow-lg w-64 h-64 object-cover"
                />
              </div>

              {/* Song details */}
              {!showPlaylist && (
                <div className="md:w-1/2 w-full p-6 flex flex-col justify-center text-center">
                  <h4 className="text-2xl font-bold mb-2 text-green-800">{song.title}</h4>
                  <p className="text-lg text-green-700/80 mb-4">
                    {song.album} • {song.year}
                  </p>

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
            </div>

            {/* ✅ Fixed hidden autoplay iframe */}
            {isPlaying && song.youtube && (
              <iframe
                key={currentSong}
                src={`${song.youtube}?autoplay=1&mute=1&playsinline=1`}
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
