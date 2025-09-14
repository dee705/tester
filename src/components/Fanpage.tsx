import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Users,
  Heart,
  Star,
  Facebook,
  Instagram,
  Twitter,
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
          icon: <Facebook className="h-4 w-4 text-white" />,
          color: "bg-blue-600",
        },
        {
          platform: "Instagram",
          url: "https://www.instagram.com/klarissenaticsofficial?igsh=N2F0dm0zYzI3eTY3/",
          icon: <Instagram className="h-4 w-4 text-white" />,
          color: "bg-pink-600",
        },
        {
          platform: "Twitter/X",
          url: "https://x.com/KLARISSEnatics_?t=yi1BxfMkRQxv9RTXCukr2w&s=09",
          icon: <Twitter className="h-4 w-4 text-white" />,
          color: "bg-sky-600",
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
          icon: <Facebook className="h-4 w-4 text-white" />,
          color: "bg-blue-600",
        },
        {
          platform: "Instagram",
          url: "https://www.instagram.com/theklangots?igsh=eDliY3VjMDBrd29y/",
          icon: <Instagram className="h-4 w-4 text-white" />,
          color: "bg-pink-600",
        },
        {
          platform: "Twitter/X",
          url: "https://x.com/theklangots?t=yP1vgOIB5hqdKI8ieoBaHw&s=09",
          icon: <Twitter className="h-4 w-4 text-white" />,
          color: "bg-sky-600",
        },
      ],
    },
  ];

  return (
    <section
      id="fanpages"
      className="relative py-20 bg-gradient-to-br from-theme-green/10 via-white/70 to-theme-white/90 overflow-hidden"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-white/20 opacity-70 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
            Official Fan Communities
          </h2>
          <p className="text-xl text-theme-muted max-w-3xl mx-auto">
            Join the amazing fan communities dedicated to Klarisse de Guzman!
            Connect with fellow fans and stay updated.
          </p>
        </div>

        {/* Stats Overview */}
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
              className="relative bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg hover:shadow-glow rounded-2xl transition-all duration-500 hover:scale-105 group"
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Community Name */}
                  <h3 className="font-bold text-lg text-center text-foreground group-hover:text-primary transition-colors">
                    {community.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed text-center">
                    {community.description}
                  </p>

                  {/* Links */}
                  <div className="grid grid-cols-1 gap-3">
                    {community.links.map((link, i) => (
                      <Button
                        key={i}
                        variant="outline"
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-white/5 backdrop-blur-md border border-white/20 hover:scale-105 hover:shadow-glow transition-all duration-300"
                        onClick={() => window.open(link.url, "_blank")}
                      >
                        <span className={`p-1 rounded ${link.color}`}>
                          {link.icon}
                        </span>
                        {link.platform}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-lg hover:shadow-glow transition">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              Join the Fan Communities
            </h3>
            <p className="text-theme-muted mb-6 max-w-2xl mx-auto">
              Connect with fellow fans through Klarissenatics and Klangots. Share
              your love for Klarisse's music and stay updated with fan activities
              and events!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="px-6 py-3 rounded-xl bg-green-500 text-white hover:bg-green-600 hover:shadow-glow transition"
                onClick={() =>
                  window.open("https://www.facebook.com/share/1BB7Ms5YxQ/", "_blank")
                }
              >
                Join Klarissenatics
              </Button>
              <Button
                size="lg"
                className="px-6 py-3 rounded-xl bg-green-700 text-white hover:bg-green-800 hover:shadow-glow transition"
                onClick={() =>
                  window.open("https://www.facebook.com/share/1DzuSVjNAF/", "_blank")
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
