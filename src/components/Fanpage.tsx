import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Users,
  Heart,
  Star,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";

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
          icon: <FaFacebook className="h-4 w-4 text-white" />,
          color: "bg-blue-600",
        },
        {
          platform: "Instagram",
          url: "https://www.instagram.com/klarissenaticsofficial?igsh=N2F0dm0zYzI3eTY3/",
          icon: <FaInstagram className="h-4 w-4 text-white" />,
          color: "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600",
        },
        {
          platform: "Twitter/X",
          url: "https://x.com/KLARISSEnatics_?t=yi1BxfMkRQxv9RTXCukr2w&s=09",
          icon: <FaXTwitter className="h-4 w-4 text-white" />,
          color: "bg-black",
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
          icon: <FaFacebook className="h-4 w-4 text-white" />,
          color: "bg-blue-600",
        },
        {
          platform: "Instagram",
          url: "https://www.instagram.com/theklangots?igsh=eDliY3VjMDBrd29y/",
          icon: <FaInstagram className="h-4 w-4 text-white" />,
          color: "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600",
        },
        {
          platform: "Twitter/X",
          url: "https://x.com/theklangots?t=yP1vgOIB5hqdKI8ieoBaHw&s=09",
          icon: <FaXTwitter className="h-4 w-4 text-white" />,
          color: "bg-black",
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
              className="border-primary/20 hover:shadow-elegant transition-all duration-300 hover:scale-105 group"
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
                        className="w-full group-hover:bg-primary/10 group-hover:border-primary/30 transition-all"
                        onClick={() => window.open(link.url, "_blank")}
                      >
                        <span className={`mr-2 ${link.color} p-1 rounded`}>
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
      </div>
    </section>
  );
};

export default Fanpage;
