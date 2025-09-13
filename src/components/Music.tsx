import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Headphones } from "lucide-react";
import { SiSpotify, SiApplemusic, SiYoutube } from "react-icons/si";

// Helper for Spotify embeds with autoplay
const getSpotifyEmbedUrl = (url: string) => {
  if (!url.includes("open.spotify.com")) return url;
  const parts = url.split("/");
  const type = parts[3];
  const id = parts[4]?.split("?")[0];
  return `https://open.spotify.com/embed/${type}/${id}?autoplay=1`;
};

const Music = () => {
  const [currentSong, setCurrentSong] = useState<number | null>(null);
  const [currentAlbum, setCurrentAlbum] = useState<number | null>(null);

  const songs = [
    {
      title: "Dito Ka Lang, Wag kang lalayo",
      album: "Klarisse",
      year: "2025",
      youtube: "https://youtu.be/zd7kQQ0fjDU?si=t_mzdrK7pce6VaGz",
    },
    {
      title: "Dito",
      album: "Feels",
      year: "2024",
      youtube: "https://youtu.be/OwGoyDBW_x8?si=Z3U0Ki2QvuwwGrsN",
    },
    {
      title: "Bibitawan Ka",
      album: "Feels",
      year: "2024",
      youtube: "https://youtu.be/GsGKnZSCsCo?si=IYLdNFsDkaChXzHY",
    },
    {
      title: "Ulan Ng Kahapon",
      album: "Singles",
      year: "2021",
      youtube: "https://www.youtube.com/embed/RcKMBkkZZdc",
    },
    {
      title: "Wala na Talaga",
      album: "Klarisse",
      year: "2017",
      youtube: "https://youtu.be/nuDNvk22Qmg?si=rcms6T5-TR0vddmM",
    },
  ];

  const albums = [
    {
      title: "Feels",
      year: "2024",
      type: "Latest Album",
      description:
        "Her latest album featuring heartfelt ballads and emotional storytelling.",
      spotify: "https://open.spotify.com/album/4jUJec6voKpplFklfNeTk6",
    },
    {
      title: "Klarisse",
      year: "2017",
      type: "Self-Titled Album",
      description:
        "Her acclaimed self-titled album showcasing her vocal range and artistry.",
      spotify: "https://open.spotify.com/artist/1Imlf2KHeVnyY2bkZe1bNC",
    },
  ];

  return (
    <section
      id="music" // ✅ Added this so the nav can scroll here
      className="py-20 bg-gradient-to-b from-green-100 to-white"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
            Soundtracks & Albums
          </h2>
        </div>

        {/* Albums Section */}
        {/* ... rest of your existing code stays the same ... */}
      </div>
    </section>
  );
};

export default Music;
