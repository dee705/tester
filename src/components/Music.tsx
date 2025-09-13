import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, Volume2, VolumeX, Music, Headphones } from "lucide-react";

const Concert = () => {
  const playerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Extra toggles for "Listen Everywhere"
  const [showSpotify, setShowSpotify] = useState(false);
  const [showYoutube, setShowYoutube] = useState(false);

  useEffect(() => {
    const initPlayer = () => {
      playerRef.current = new (window as any).YT.Player("concert-video", {
        videoId: "zd7kQQ0fjDU", // Your YouTube video ID
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: () => {
            setIsPlaying(true);
            setIsMuted(true);
          },
          onStateChange: (event: any) => {
            if (event.data === (window as any).YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            } else if (event.data === (window as any).YT.PlayerState.PAUSED) {
              setIsPlaying(false);
            }
          },
        },
      });
    };

    if ((window as any).YT && (window as any).YT.Player) {
      initPlayer();
    } else {
      const existingScript = document.getElementById("youtube-iframe-api");
      if (!existingScript) {
        const tag = document.createElement("script");
        tag.id = "youtube-iframe-api";
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
      }
      (window as any).onYouTubeIframeAPIReady = initPlayer;
    }
  }, []);

  const handlePlay = () => playerRef.current?.playVideo();
  const handlePause = () => playerRef.current?.pauseVideo();

  const handleToggleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    }
  };

  return (
    <section id="concert" className="py-20 bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Stream Now!</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the soulful voice of our very own Nation's Mowm and Philippines Soul Diva as she shares her latest single, available on YouTube, Spotify and Apple Music!
          </p>
        </div>

        {/* Main Concert Card */}
        <div className="max-w-6xl mx-auto mb-12">
          <Card className="overflow-hidden shadow-luxury border-0 bg-gradient-to-br from-card to-card/50">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Concert Video */}
                <div className="relative w-full overflow-hidden">
                  <div className="relative w-full pt-[56.25%]">
                    <div id="concert-video" className="absolute top-0 left-0 w-full h-full"></div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:hidden"></div>

                  {/* Custom Controls */}
                  <div className="absolute bottom-4 left-4 flex gap-2 z-10">
                    {isPlaying ? (
                      <Button variant="elegant" size="sm" onClick={handlePause}>
                        <Pause className="mr-1 h-4 w-4" /> Pause
                      </Button>
                    ) : (
                      <Button variant="elegant" size="sm" onClick={handlePlay}>
                        <Play className="mr-1 h-4 w-4" /> Play
                      </Button>
                    )}
                    <Button variant="elegant" size="sm" onClick={handleToggleMute}>
                      {isMuted ? (
                        <>
                          <VolumeX className="mr-1 h-4 w-4" /> Unmute
                        </>
                      ) : (
                        <>
                          <Volume2 className="mr-1 h-4 w-4" /> Mute
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Song Details */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-3xl lg:text-4xl font-bold mb-2 text-gradient">
                        Dito Ka Lang, Wag Kang Lalayo
                      </h3>
                      <p className="text-lg text-muted-foreground">
                        Original Themesong for drama series Alibi
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button
                        variant="luxury"
                        size="lg"
                        className="flex-1"
                        onClick={() =>
                          window.open(
                            "https://open.spotify.com/track/2GjTvT9x3XYnngU7JyKQZZ?si=RI42URD-RfGhnO6BqiS86A",
                            "_blank"
                          )
                        }
                      >
                        <Music className="mr-2 h-5 w-5" />
                        Stream Now!
                      </Button>
                      <Button
                        variant="elegant"
                        size="lg"
                        className="flex-1"
                        onClick={() =>
                          window.open(
                            "https://www.instagram.com/share/reel/BAO5vyT9Vw",
                            "_blank"
                          )
                        }
                      >
                        Get Updates
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Listen Everywhere Section */}
        <div className="text-center mt-16">
          <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-gradient">
            Listen Everywhere 🎧
          </h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {/* Spotify */}
            <div className="flex flex-col items-center">
              <Button
                variant="outline"
                className="flex items-center gap-2 text-green-700 border-green-400 hover:bg-green-50"
                onClick={() => setShowSpotify(true)}
              >
                <Headphones className="h-5 w-5" /> Spotify
              </Button>
              {showSpotify && (
                <div className="mt-4 w-[300px] md:w-[400px]">
                  <iframe
                    src="https://open.spotify.com/embed/track/2GjTvT9x3XYnngU7JyKQZZ?utm_source=generator"
                    width="100%"
                    height="152"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded-xl shadow-lg"
                  />
                </div>
              )}
            </div>

            {/* YouTube */}
            <div className="flex flex-col items-center">
              <Button
                variant="outline"
                className="flex items-center gap-2 text-red-600 border-red-400 hover:bg-red-50"
                onClick={() => setShowYoutube(true)}
              >
                <Headphones className="h-5 w-5" /> YouTube
              </Button>
              {showYoutube && (
                <div className="mt-4 w-[300px] md:w-[400px]">
                  <iframe
                    width="100%"
                    height="200"
                    src="https://www.youtube.com/embed/zd7kQQ0fjDU?autoplay=1"
                    title="YouTube music player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="rounded-xl shadow-lg"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Concert;
