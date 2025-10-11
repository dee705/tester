import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, Volume2, VolumeX, Music, Maximize } from "lucide-react";

// Utility function to format time
const formatTime = (seconds: number) => {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};

// --- Reusable Player Card Component ---
// This component renders either the full-size or the mini-floating player
const VideoPlayerCard = ({ 
    isFloating,
    floatingClasses,
    videoWrapperClasses,
    handleExitFloat,
    isMuted,
    isPlaying,
    progress,
    currentTime,
    duration,
    handlePause,
    handlePlay,
    handleToggleMute,
    handleSeek,
    buffered // Added buffered prop
}: any) => {
    
    // Determine the layout for the controls section
    const detailsClasses = isFloating 
        ? "p-3 flex items-center justify-between" 
        : "p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-green-50/60 to-white/30 backdrop-blur-xl";

    // When floating, the progress bar is simpler and included in the details section
    const showFullControls = !isFloating;

    return (
        <div className={floatingClasses}>
          <Card 
            className={`overflow-hidden border-0 shadow-xl rounded-2xl ${
                isFloating 
                    ? 'bg-white/90 backdrop-blur-md' 
                    : 'bg-white/40 backdrop-blur-xl hover:shadow-2xl transition-all duration-500'
            }`}
          >
            <CardContent className="p-0">
              {/* Only show the full two-column grid layout when NOT floating */}
              <div className={`grid ${isFloating ? 'grid-cols-1' : 'lg:grid-cols-2'}`}>
                
                {/* 1. Video Player Container */}
                <div className="relative w-full overflow-hidden">
                  <div className={videoWrapperClasses}>
                    {/* The YouTube Player iframe remains mounted with ID 'concert-video' */}
                    <div
                      id="concert-video"
                      className={`absolute top-0 left-0 w-full h-full ${isFloating ? 'rounded-t-xl' : 'rounded-lg'}`}
                    />
                    
                    {/* Mini-player click overlay (only in floating mode) */}
                    {isFloating && (
                        <div 
                            className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                            onClick={handleExitFloat} // Click anywhere on video to expand
                        >
                            <button
                                className="text-white hover:text-green-300 p-2 rounded-full transition-colors"
                                aria-label="Expand Player"
                            >
                                <Maximize className="w-8 h-8" />
                            </button>
                        </div>
                    )}

                    {/* Controls (Only show in full mode) */}
                    {showFullControls && (
                      <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-3 z-10">
                        {/* Play/Pause/Mute Buttons */}
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
                    )}
                  </div>
                </div>

                {/* 2. Details / Mini-Controls Section */}
                <div className={detailsClasses}>
                  {/* Full Details (Only show in full mode) */}
                  {!isFloating ? (
                    <div className="flex flex-col">
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
                  ) : (
                    // Mini Player Controls (Only show in floating mode)
                    <div className="flex w-full items-center justify-between gap-4">
                        {/* Title and Progress Bar */}
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-green-800 truncate mb-1">Dito Ka Lang, Wag Kang Lalayo</h4>
                             {/* Simplified Progress Bar */}
                            <div className="h-1 w-full bg-green-200 rounded-full overflow-hidden">
                                <div
                                    className="h-1 bg-gradient-to-r from-green-400 to-green-600 transition-all duration-1000"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                        
                        {/* Play/Pause Button */}
                        <button
                            className="text-green-600 hover:text-green-800 p-2 transition-colors rounded-full"
                            onClick={isPlaying ? handlePause : handlePlay}
                            aria-label={isPlaying ? "Pause" : "Play"}
                        >
                            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                        </button>
                        
                        {/* Mute Button */}
                        <button
                            className="text-green-600 hover:text-green-800 p-2 transition-colors rounded-full"
                            onClick={handleToggleMute}
                            aria-label={isMuted ? "Unmute" : "Mute"}
                        >
                            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </button>
                        
                        {/* Exit/Close Button (Maximize icon rotated) */}
                        <button
                            className="text-gray-500 hover:text-red-500 transition-colors p-2"
                            onClick={handleExitFloat}
                            aria-label="Expand Player"
                        >
                           <Maximize className="w-4 h-4 transform rotate-45" /> 
                        </button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
    );
}


// --- Main Concert Component ---
const Concert = () => {
  // 1. Ref to the YouTube Player instance
  const playerRef = useRef<any>(null);
  // 2. Ref to the main concert section element to track when it leaves the viewport
  const sectionRef = useRef<HTMLElement>(null); 
  // 3. Ref for the interval timer
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  
  // 🔑 NEW STATE: Controls the floating mode
  const [isFloating, setIsFloating] = useState(false);

  // --- YouTube Player Initialization Logic ---
  useEffect(() => {
    const initPlayer = () => {
      // Destroy any existing player to prevent conflicts if re-initialized
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      
      // Create the player instance
      playerRef.current = new (window as any).YT.Player("concert-video", {
        videoId: "zd7kQQ0fjDU",
        playerVars: {
          autoplay: 0, 
          mute: 0, 
          controls: 0, 
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: (event: any) => {
            if (playerRef.current) {
                setDuration(playerRef.current.getDuration());
                // Get the actual mute status from the player, not just set a default
                setIsMuted(playerRef.current.isMuted()); 
            }
          },
          onStateChange: (event: any) => {
            if (!playerRef.current) return;

            const YT_STATE = (window as any).YT.PlayerState;

            if (event.data === YT_STATE.PLAYING) {
              setIsPlaying(true);
              if (!intervalRef.current) {
                intervalRef.current = setInterval(() => {
                  const time = playerRef.current.getCurrentTime();
                  const dur = playerRef.current.getDuration();
                  const loadFraction = playerRef.current.getVideoLoadedFraction() || 0;

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

    // Check if YouTube API is ready, if not, load the script
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
      // Set the function to be called once the API script loads
      (window as any).onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      // Clean up the player instance on component unmount
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy();
      }
    };
  }, []);

  // --- Floating Logic (Scroll Detection) ---
  const handleScroll = useCallback(() => {
    if (sectionRef.current) {
      // Check if the bottom of the section has scrolled past the top of the viewport
      const sectionBottom = sectionRef.current.getBoundingClientRect().bottom;
      const shouldFloat = sectionBottom < 0; 
      
      if (shouldFloat !== isFloating) {
        setIsFloating(shouldFloat);
      }
    }
  }, [isFloating]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // --- Player Control Functions (Unchanged) ---
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

  // Function to exit floating mode and jump to the original section
  const handleExitFloat = () => {
    // Check if the player is currently playing and pause it (optional, but good practice)
    if (isPlaying) {
        playerRef.current?.pauseVideo();
    }
    // Scroll smoothly back to the original section
    if (sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // Explicitly hide the floating player immediately before or after scrolling
    setIsFloating(false);
  };
  
  // --- Conditionally applied TailwindCSS classes ---
  const floatingClasses = isFloating ? 
    // Fixed positioning for the floating player
    "fixed bottom-4 right-4 z-50 w-[320px] shadow-2xl transition-all duration-300 transform translate-x-0" : 
    // Regular positioning for the full player
    "relative max-w-6xl mx-auto mb-12";
    
  const videoWrapperClasses = isFloating ? 
    // Smaller size for the video container in floating mode
    "w-full h-[180px] rounded-t-xl" : 
    // Full size with 16:9 aspect ratio padding trick
    "relative w-full pt-[56.25%] rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none"; 

  // --- Render ---
  return (
    <>
      {/* 1. MAIN SECTION (The content that gets scrolled past) */}
      <section
        ref={sectionRef} // 🔑 Attach ref here to monitor scroll position
        id="concert"
        // Hide/collapse the main content visually when floating is active to prevent large blank space
        className={`py-20 bg-gradient-to-br from-green-50 via-white to-green-100 ${isFloating ? 'pb-0 opacity-0 h-0 overflow-hidden' : ''}`} 
      >
        <div className="container mx-auto px-4">
          {/* Header (Only show in full mode) */}
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
          
          {/* Render the full card only when NOT floating. */}
          {!isFloating && (
              <VideoPlayerCard 
                  isFloating={false}
                  floatingClasses={floatingClasses}
                  videoWrapperClasses={videoWrapperClasses}
                  handleExitFloat={handleExitFloat}
                  isMuted={isMuted}
                  isPlaying={isPlaying}
                  progress={progress}
                  buffered={buffered}
                  currentTime={currentTime}
                  duration={duration}
                  handlePause={handlePause}
                  handlePlay={handlePlay}
                  handleToggleMute={handleToggleMute}
                  handleSeek={handleSeek}
              />
          )}

          {/* Footer (Only show in full mode) */}
          <div className="text-center">
            <p className="text-gray-600">
              Don’t miss this once-in-a-lifetime musical experience!
            </p>
          </div>
        </div>
      </section>

      {/* 2. FLOATING PLAYER CONTAINER (Always rendered but conditionally styled) */}
      {isFloating && (
        <VideoPlayerCard 
            isFloating={true}
            floatingClasses={floatingClasses}
            videoWrapperClasses={videoWrapperClasses}
            handleExitFloat={handleExitFloat}
            isMuted={isMuted}
            isPlaying={isPlaying}
            progress={progress}
            buffered={buffered}
            currentTime={currentTime}
            duration={duration}
            handlePause={handlePause}
            handlePlay={handlePlay}
            handleToggleMute={handleToggleMute}
            handleSeek={handleSeek}
        />
      )}
    </>
  );
};

export default Concert;
