import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Users,
  Heart,
  Star,
} from "lucide-react";

const Fanpage = () => {
  const fanCommunities = [
    {
      name: "KLARISSENATICS OFFICIAL",
      description:
        "Official fan community for Klarissenatics - devoted fans of Klarisse de Guzman",
      links: [
        {
          platform: "Facebook",
          url: "https://www.facebook.com/share/1BB7Ms5YxQ/",
          iconClass: "fab fa-facebook-f",
          iconColorClass: "bg-gradient-to-r from-blue-600 to-blue-700",
        },
        {
          platform: "Instagram",
          url: "https://www.instagram.com/klarissenaticsofficial?igsh=N2F0dm0zYzI3eTY3/",
          iconClass: "fab fa-instagram",
          iconColorClass: "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500",
        },
        {
          platform: "Twitter/X",
          url: "https://x.com/KLARISSEnatics_?t=yi1BxfMkRQxv9RTXCukr2w&s=09",
          iconClass: "fab fa-x-twitter",
          iconColorClass: "text-black", // X logo is solid black
        },
      ],
    },
    {
      name: "KLANGOTS OFFICIAL",
      description:
        "Official fan community for Klangots - another amazing fan group supporting Klarisse",
      links: [
        {
          platform: "Facebook",
          url: "https://www.facebook.com/share/1DzuSVjNAF/",
          iconClass: "fab fa-facebook-f",
          iconColorClass: "bg-gradient-to-r from-blue-600 to-blue-700",
        },
        {
          platform: "Instagram",
          url: "https://www.instagram.com/theklangots?igsh=eDliY3VjMDBrd29y/",
          iconClass: "fab fa-instagram",
          iconColorClass: "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500",
        },
        {
          platform: "Twitter/X",
          url: "https://x.com/theklangots?t=yP1vgOIB5hqdKI8ieoBaHw&s=09",
          iconClass: "fab fa-x-twitter",
          iconColorClass: "text-black", // X logo is solid black
        },
      ],
    },
  ];

  return (
    <section id="fanpages" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Official <span className="text-gradient">Fan Communities</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join the amazing fan communities dedicated to Klarisse de Guzman!
            Connect with fellow fans and stay updated.
          </p>
        </div>

        {/* Stats Overview - Left unchanged from your source */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <Users className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-3xl font-bold text-foreground">2</div>
            <div className="text-sm text-muted-foreground">Fan Communities</div>
          </div>
          <div className="text-center">
            <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <div className="text-3xl font-bold text-foreground">Strong</div>
            <div className="text-sm text-muted-foreground">Support</div>
          </div>
          <div className="text-center">
            <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-3xl font-bold text-foreground">Dedicated</div>
            <div className="text-sm text-muted-foreground">Fans</div>
          </div>
          <div className="text-center">
            <ExternalLink className="h-8 w-8 text-accent mx-auto mb-2" />
            <div className="text-3xl font-bold text-foreground">6</div>
            <div className="text-sm text-muted-foreground">Platforms</div>
          </div>
        </div>

        {/* Main Fanpages Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {fanCommunities.map((community, index) => (
            <Card
              key={index}
              className="border-primary/20 hover:shadow-elegant transition-all duration-300 hover:scale-105 group"
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h3 className="font-bold text-lg text-center text-foreground group-hover:text-primary transition-colors">
                    {community.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed text-center">
                    {community.description}
                  </p>
                  
                  {/* Links with Gradient Icons */}
                  <div className="grid grid-cols-1 gap-3 pt-2">
                    {community.links.map((link, i) => (
                      <Button
                        key={i}
                        variant="outline"
                        // Added flex and gap to align the icon and text
                        className="w-full flex items-center justify-center gap-2 group-hover:bg-primary/10 group-hover:border-primary/30 transition-all"
                        onClick={() => window.open(link.url, "_blank")}
                      >
                        {/* Rendering the Font Awesome icon with gradient classes */}
                        <i className={`${link.iconClass} ${link.iconColorClass} bg-clip-text text-transparent text-lg`}></i>
                        {link.platform}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action - Left unchanged from your source */}
        <div className="text-center mt-16">
          <div className="bg-gradient-primary/10 rounded-2xl p-8 border border-primary/20">
            <h3 className="text-2xl font-bold mb-4">Join the Fan Communities</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Connect with fellow fans through Klarissenatics and Klangots.
              Share your love for Klarisse's music and stay updated with fan
              activities and events!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 w-full sm:w-auto"
                onClick={() =>
                  window.open(
                    "https://www.facebook.com/share/1BB7Ms5YxQ/",
                    "_blank"
                  )
                }
              >
                Join Klarissenatics
              </Button>
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 w-full sm:w-auto"
                onClick={() =>
                  window.open(
                    "https://www.facebook.com/share/1DzuSVjNAF/",
                    "_blank"
                  )
                }
              >
                Join Klangots
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Fanpage;
