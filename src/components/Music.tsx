import { Card, CardContent } from "@/components/ui/card";
import { Music as MusicIcon, Calendar } from "lucide-react";

const Music = () => {
  const songs = [
    {
      title: "Dito Ka Lang, Wag kang lalayo",
      album: "Klarisse",
      year: "2025",
      description: "A heartfelt song that shows empowering anthem on declaring one's love",
      featured: true,
      spotify: "https://open.spotify.com/album/4kl5U1j3VxkjcXCpHxzgz7"
    },
    {
      title: "Dito",
      album: "Feels",
      year: "2024",
      description: "A heartfelt song from her latest album Feels, showcasing her emotional depth and vocal prowess.",
      featured: true,
      spotify: "https://open.spotify.com/track/5sfqkmXnAigZ3KIwQIH8sK"
    },
    {
      title: "Bibitawan Ka",
      album: "Feels",
      year: "2024",
      description: "A powerful track from Feels exploring themes of letting go and moving forward.",
      featured: true,
      spotify: "https://open.spotify.com/track/6Rl2zqkSoIfyUnMFFBYeIK"
    },
    {
      title: "Ulan Ng Kahapon",
      album: "Singles",
      year: "2021",
      description: "A nostalgic track about memories and past relationships.",
      spotify: "https://www.youtube.com/watch?v=RcKMBkkZZdc"
    }, 
    {
      title: "Wala na Talaga",
      album: "Klarisse",
      year: "2017",
      description: "A nostalgic track that expresses a finality and the absence of something that was once there.", 
      spotify: "https://open.spotify.com/track/6A3oVEfrPO6XSYfakUw3N1"
    }
  ];

  const albums = [
    {
      title: "Feels",
      year: "2024",
      type: "Latest Album",
      tracks: 3,
      description: "Her latest album featurin
