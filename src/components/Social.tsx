import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Social = () => {
  const socialPlatforms = [
    {
      name: "Instagram",
      link: "https://www.instagram.com/klarissedguzman/",
      iconClass: "fab fa-instagram",
      iconColorClass: "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"
    },
    {
      name: "YouTube",
      link: "https://www.youtube.com/@KLARISSEUpdates",
      iconClass: "fab fa-youtube",
      iconColorClass: "bg-gradient-to-r from-red-500 to-red-600"
    },
    {
      name: "TikTok",
      link: "https://www.tiktok.com/@klarissedguzman?lang=en&is_from_webapp=1&sender_device=mobile&sender_web_id=7531174735428011538",
      iconClass: "fab fa-tiktok",
      iconColorClass: "bg-gradient-to-r from-black via-pink-600 to-black"
    },
    {
      name: "Facebook",
      link: "https://m.facebook.com/Klarisse06/",
      iconClass: "fab fa-facebook-f",
      iconColorClass: "bg-gradient-to-r from-blue-600 to-blue-700"
    },
    {
      name: "Twitter",
      link: "https://x.com/Klarissedguzman?t=ZFXgmlgJTyf0daUNbcUguA&s=09",
      iconClass: "fab fa-x-twitter",
      iconColorClass: "text-black"
    },
    {
      name: "Spotify",
      link: "https://open.spotify.com/artist/7r59WFPJdYBQmnIQB4DX7K?si=3D0wFIiMSieyWycCGO7bTw",
      iconClass: "fab fa-spotify",
      iconColorClass: "bg-gradient-to-r from-green-500 to-green-600"
    }
  ];

  return (
    <section id="social" className="py-20 flex justify-center bg-gradient-to-br from-muted/30 to-background">
      <Card className="w-full max-w-lg shadow-xl">
        <CardContent className="p-6 text-center">
          {/* Updated the h3 tag with a green gradient color palette */}
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
            Connect with Klarisse
          </h3>
          <p className="text-muted-foreground mb-6">
            Stay updated with the latest music and content on all my social platforms.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {socialPlatforms.map((platform, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => window.open(platform.link, '_blank')}
                className="w-full sm:w-auto flex items-center gap-2"
              >
                <i className={`${platform.iconClass} ${platform.iconColorClass} bg-clip-text text-transparent`}></i>
                {platform.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Social;
