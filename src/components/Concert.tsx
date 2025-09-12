import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Ticket } from "lucide-react";

const Concert = () => {
  useEffect(() => {
    // Load the YouTube IFrame Player API
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    // When API is ready, create the player
    (window as any).onYouTubeIframeAPIReady = () => {
      const player = new (window as any).YT.Player("concert-video", {
        videoId: "zd7kQQ0fjDU", // Your video ID
        events: {
          onReady: (event: any) => {
            // Wait for user interaction before playing with sound
            document.addEventListener("click", () => {
              event.target.playVideo();
            }, { once: true });
          },
        },
      });
    };
  }, []);

  return (
    <section id="concert" className="py-20 bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient"> STREAM NOW! </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the soulful voice of our very own Mowm as she share with us her latest single DKLWKL available on YouTube, Spotify and apple Music! Stream Now! 
          </p>
        </div>

        {/* Main Concert Card */}
        <div className="max-w-6xl mx-auto mb-12">
          <Card className="overflow-hidden shadow-luxury border-0 bg-gradient-to-br from-card to-card/50">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Concert Video */}
                <div className="relative overflow-hidden w-full min-h-[400px] lg:min-h-[600px]">
                  <div
                    id="concert-video"
                    className="absolute top-0 left-0 w-full h-full"
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:hidden"></div>
                </div>

                {/* Song Details */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-3xl lg:text-4xl font-bold mb-2 text-gradient">
                        Dito Ka lang, Wag Kang Lalayo
                      </h3>
                      <p className="text-lg text-muted-foreground">
                        Themesong for Alibi 
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button
                        variant="luxury"
                        size="lg"
                        className="flex-1"
                        onClick={() =>
                          window.open(
                            "  https://open.spotify.com/track/2GjTvT9x3XYnngU7JyKQZZ?si=TrzB8zUKQ0Oxgzyoj__bKQ", 
                            "_blank"
                          )
                        }
                      >
                        <Ticket className="mr-2 h-5 w-5" />
                        stream here! 
                      </Button>
                      <Button
                        variant="elegant"
                        size="lg"
                        className="flex-1"
                        onClick={() =>
                          window.open(
                            "https://www.instagram.com/p/DMmO_QVTzow/?igsh=aDJuMnFkZWo2cDln",
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

        {/* Additional Info */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Don't miss this once-in-a-lifetime musical experience!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Concert;
