import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, Volume2, VolumeX, Music } from "lucide-react";

const formatTime = (seconds: number) => {
  if (isNaN(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};

const Concert = () => {
  const playerRef = useRef<any>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const initPlayer = () => {
      playerRef.current = new (window as any).YT.Player("concert-video", {
        videoId: "zd7kQQ0fjDU",
        playerVars: {
          autoplay: 0, // 🚫 disable autoplay
          mute: 0,     // 🚫 don’t force mute
          controls: 0,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: (event: any) => {
            setDuration(playerRef.current.getDuration());
            setIsMuted(false);
            // ❌ removed: event.target.playVideo()
          },
          onStateChange: (event: any) => {
            if (event.data === (window as any).YT.PlayerState.PLAYING) {
              setIsPlaying(true);
              if (!intervalRef.current) {
                intervalRef.current = setInterval(() => {
                  const time = playerRef.current.getCurrentTime();
                  const dur = playerRef.current.getDuration();
                  const loadFraction =
                    playerRef.current.getVideoLoadedFraction() || 0;

                  setCurrentTime(time);
                  setDuration(dur);
                  setProgress((time / dur) * 100);
                  setBuffered(loadFraction * 100);
                }, 1000);
              }
            } else {
              setIsPlaying(false);
              if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
              }
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

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handlePlay = () => playerRef.current?.playVideo();
  const handlePause = () => playerRef.current?.pauseVideo();
  const handleToggleMute = () => {
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    const newTime = (newProgress / 100) * duration;
    playerRef.current?.seekTo(newTime, true);
    setProgress(newProgress);
    setCurrentTime(newTime);
  };

  return (
    <section
      id="concert"
      className="py-20 bg-gradient-to-br from-green-50 via-white to-green-100"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
            Stream Now!
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the soulful voice of our Nation’s Mom and Soul Diva as
            she shares her latest single — available on YouTube, Spotify and
            Apple Music!
          </p>
        </div>

        {/* Concert Card */}
        <div className="max-w-6xl mx-auto mb-12">
          <Card className="overflow-hidden border-0 bg-white/40 backdrop-blur-xl shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-500">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2">
                {/* Video */}
                <div className="relative w-full overflow-hidden">
                  <div className="relative w-full pt-[56.25%]">
                    <div
                      id="concert-video"
                      className="absolute top-0 left-0 w-full h-full rounded-lg"
                    />
                  </div>

                  {/* Controls */}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-3 z-10">
                    <div className="flex gap-3">
                      {isPlaying ? (
                        <Button
                          variant="secondary"
                          size="sm"
                          className="backdrop-blur-md bg-white/70 hover:bg-white text-green-700"
                          onClick={handlePause}
                        >
                          <Pause className="mr-1 h-4 w-4" /> Pause
                        </Button>
                      ) : (
                        <Button
                          variant="secondary"
                          size="sm"
                          className="backdrop-blur-md bg-white/70 hover:bg-white text-green-700"
                          onClick={handlePlay}
                        >
                          <Play className="mr-1 h-4 w-4" /> Play
                        </Button>
                      )}
                      <Button
                        variant="secondary"
                        size="sm"
                        className="backdrop-blur-md bg-white/70 hover:bg-white text-green-700"
                        onClick={handleToggleMute}
                      >
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

                    {/* Progress Bar with buffer */}
                    <div className="flex items-center gap-2 text-xs text-gray-700">
                      <span>{formatTime(currentTime)}</span>
                      <div className="relative flex-1 h-2">
                        {/* Buffered (gray bar) */}
                        <div
                          className="absolute top-1/2 -translate-y-1/2 h-2 rounded bg-gray-300"
                          style={{ width: `${buffered}%` }}
                        />
                        {/* Played (green bar via range input) */}
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={progress}
                          onChange={handleSeek}
                          className="absolute w-full h-2 opacity-0 cursor-pointer z-20"
                        />
                        <div
                          className="absolute top-1/2 -translate-y-1/2 h-2 rounded bg-green-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-green-50/60 to-white/30 backdrop-blur-xl">
                  <h3 className="text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                    Dito Ka Lang, Wag Kang Lalayo
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    Original themesong for the drama series <em>Alibi</em>.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      variant="default"
                      size="lg"
                      className="flex-1 bg-gradient-to-r from-green-600 to-green-400 text-white shadow-md hover:shadow-lg"
                      onClick={() =>
                        window.open(
                          "https://open.spotify.com/track/2GjTvT9x3XYnngU7JyKQZZ",
                          "_blank"
                        )
                      }
                    >
                      <Music className="mr-2 h-5 w-5" />
                      Stream Now
                    </Button>

                    <Button
                      variant="outline"
                      size="lg"
                      className="flex-1 border-green-400 text-green-700 hover:bg-green-50"
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
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-gray-600">
            Don’t miss this once-in-a-lifetime musical experience!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Concert;
