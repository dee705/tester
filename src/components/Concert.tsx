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
            <span className="text-gradient">Upcoming Concert</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the biggest night of Filipino music as Klarisse takes the stage
            at the iconic Smart Araneta Coliseum
          </p>
        </div>

        {/* Main Concert Card */}
        <div className="max-w-6xl mx-auto mb-12">
          <Card className="overflow-hidden shadow-luxury border-0 bg-gradient-to-br from-card to-card/50">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Concert Video (Replaced Image) */}
                <div className="relative overflow-hidden w-full min-h-[400px] lg:min-h-[600px]">
                  <iframe
                    src="https://www.instagram.com/reel/BAOca_G_0F/embed/captioned/?autoplay=1&loop=1&muted=1"
                    className="absolute top-0 left-0 w-full h-full"
                    frameBorder="0"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  ></iframe>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:hidden"></div>
                </div>

                {/* Concert Details */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-3xl lg:text-4xl font-bold mb-2 text-gradient">
                        THE BIG NIGHT
                      </h3>
                      <p className="text-lg text-muted-foreground">
                        Klarisse De Guzman's Grand Concert
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-primary" />
                        <span className="text-lg">September 26, 2025</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-primary" />
                        <span className="text-lg">Smart Araneta Coliseum</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-primary" />
                        <span className="text-lg">7:00 PM</span>
                      </div>
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
