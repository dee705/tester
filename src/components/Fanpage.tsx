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

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {/* ... stats content remains the same ... */}
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
                  <div className="grid grid-cols-1 gap-3 pt-2">
                    {community.links.map((link, i) => (
                      <Button
                        key={i}
                        variant="outline"
                        className="w-full flex items-center justify-center gap-2 group-hover:bg-primary/10 group-hover:border-primary/30 transition-all"
                        onClick={() => window.open(link.url, "_blank")}
                      >
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

        {/* Call to Action */}
        <div className="text-center mt-16">
            {/* ... call to action content remains the same ... */}
        </div>
      </div>
    </section>
  );
};

export default Fanpage;
