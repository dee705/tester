import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Users, Heart, MessageCircle } from "lucide-react";

const Social = () => {
  const socialPlatforms = [
    {
      name: "Instagram",
      handle: "@klarissedguzman",
      followers: "980K+",
      description: "Behind-the-scenes content, photoshoots, and daily life updates",
      icon: "📸",
      color: "from-pink-500 to-purple-600",
      link: "https://www.instagram.com/klarissedguzman/"
    },
    {
      name: "YouTube",
      handle: "Klarisse de Guzman",
      followers: "82K",
      description: "Music videos, live performances, and exclusive content",
      icon: "▶️",
      color: "from-red-500 to-red-600",
      link: "https://www.youtube.com/@KLARISSEUpdates"
    },
    {
      name: "TikTok",
      handle: "@klarissedguzman",
      followers: "511K",
      description: "Music snippets, dance videos, and trending content",
      icon: "🎵",
      color: "from-black to-pink-600",
      link: "https://www.tiktok.com/@klarissedguzman?lang=en&is_from_webapp=1&sender_device=mobile&sender_web_id=7531174735428011538"
    },
    {
      name: "Facebook",
      handle: "Klarisse de Guzman Official",
      followers: "202K",
      description: "Official updates, fan interactions, and event announcements",
      icon: "👥",
      color: "from-blue-600 to-blue-700",
      link: "https://m.facebook.com/Klarisse06/"
    },
    {
      name: "Twitter",
      handle: "@klarissedguzman",
      followers: "199K",
      description: "Real-time updates, thoughts, and fan engagement",
      icon: "🐦",
      color: "from-blue-400 to-blue-500",
      link: "https://x.com/Klarissedguzman?t=ZFXgmlgJTyf0daUNbcUguA&s=09"
    },
    {
      name: "Spotify",
      handle: "Klarisse de Guzman",
      followers: "500K",
      description: "Complete discography and latest releases",
      icon: "🎧",
      color: "from-green-500 to-green-600",
      link: "https://open.spotify.com/artist/7r59WFPJdYBQmnIQB4DX7K?si=3D0wFIiMSieyWycCGO7bTw"
    }
  ];

  return (
    <section id="social" className="py-20 bg-gradient-to-br from-muted/30 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Connect with <span className="text-gradient">Klarisse</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay updated with the latest music, behind-the-scenes content, and connect with the community.
          </p>
        </div>

        {/* Social Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">2.7M+</div>
            <div className="text-muted-foreground">Total Followers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">50M+</div>
            <div className="text-muted-foreground">Total Views</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">1M+</div>
            <div className="text-muted-foreground">Monthly Listeners</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">500+</div>
            <div className="text-muted-foreground">Posts This Year</div>
          </div>
        </div>

        {/* Social Platforms Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {socialPlatforms.map((platform, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-luxury transition-all duration-500 border-primary/20 overflow-hidden"
            >
              <CardContent className="p-6">
                {/* Platform Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{platform.icon}</span>
                    <div>
                      <h3 className="font-bold text-foreground group-hover:text-gradient transition-colors">
                        {platform.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{platform.handle}</p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300"
                    onClick={() => window.open(platform.link, '_blank')}
                  >
                    <ExternalLink className="h-5 w-5" />
                  </Button>
                </div>

                {/* Followers Count */}
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="font-bold text-foreground">{platform.followers}</span>
                  <span className="text-muted-foreground text-sm">followers</span>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {platform.description}
                </p>

                {/* Engagement Metrics */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4 text-secondary" />
                    <span>High Engagement</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4 text-accent" />
                    <span>Active</span>
                  </div>
                </div>

                {/* Gradient Border Effect */}
                <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${platform.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold mb-4">Join the Community</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Be part of the journey and stay connected with exclusive content, early releases, and special events.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="luxury" 
              size="lg"
              onClick={() => window.open('https://www.instagram.com/klarissedguzman/', '_blank')}
            >
              Follow on Instagram
            </Button>
            <Button 
              variant="elegant" 
              size="lg"
              onClick={() => window.open('https://www.youtube.com/@KLARISSEUpdates', '_blank')}
            >
              Subscribe on YouTube
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Social;
