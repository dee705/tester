import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Clock, Ticket } from "lucide-react";

const Concert = () => {
  return (
    <section id="concert" className="py-20 bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient"> Latest Single </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the soulful voice of our very own Soul Diva Klarisse as she share with us her Latest single on YouTube, Spotify and apple music. Stream Now! 
          </p>
        </div>

        {/* Main Concert Card */}
        <div className="max-w-6xl mx-auto mb-12">
          <Card className="overflow-hidden shadow-luxury border-0 bg-gradient-to-br from-card to-card/50">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Concert Video */}
                <div className="relative overflow-hidden w-full min-h-[400px] lg:min-h-[600px]">
                  <iframe
                    src="http://googleusercontent.com/youtube.com/6"
                    className="absolute top-0 left-0 w-full h-full"
                    frameBorder="0"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  ></iframe>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:hidden"></div>
                </div>

                {/* Song Details */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-3xl lg:text-4xl font-bold mb-2 text-gradient">
                        DITO KA LANG
                      </h3>
                      <p className="text-lg text-muted-foreground">
                        WAG KANG LALAYO
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button
                        variant="luxury"
                        size="lg"
                        className="flex-1"
                        onClick={() => window.open('https://ticketnet.com.ph/event-detail/Klarisse-De-Guzman-s-The-Big-Night', '_blank')}
                      >
                        <Ticket className="mr-2 h-5 w-5" />
                        Buy Tickets
                      </Button>
                      <Button
                        variant="elegant"
                        size="lg"
                        className="flex-1"
                        onClick={() => window.open('https://www.instagram.com/p/DMmO_QVTzow/?igsh=aDJuMnFkZWo2cDln', '_blank')}
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
