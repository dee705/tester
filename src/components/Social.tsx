import { Card, Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Social = () => {
  const socialPlatforms = [
    {
      name: "Instagram",
      link: "https://www.instagram.com/klarissedguzman/"
    },
    {
      name: "YouTube",
      link: "https://www.youtube.com/@KLARISSEUpdates"
    },
    {
      name: "TikTok",
      link: "https://www.tiktok.com/@klarissedguzman?lang=en&is_from_webapp=1&sender_device=mobile&sender_web_id=7531174735428011538"
    },
    {
      name: "Facebook",
      link: "https://m.facebook.com/Klarisse06/"
    },
    {
      name: "Twitter",
      link: "https://x.com/Klarissedguzman?t=ZFXgmlgJTyf0daUNbcUguA&s=09"
    },
    {
      name: "Spotify",
      link: "https://open.spotify.com/artist/7r59WFPJdYBQmnIQB4DX7K?si=3D0wFIiMSieyWycCGO7bTw"
    }
  ];

  return (
    <section id="social" className="py-20 flex justify-center bg-gradient-to-br from-muted/30 to-background">
      <Card className="w-full max-w-lg shadow-xl">
        <CardContent className="p-6 text-center">
          <h3 className="text-2xl font-bold mb-4">Connect with Klarisse</h3>
          <p className="text-muted-foreground mb-6">
            Stay updated with the latest music and content on all my social platforms.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {socialPlatforms.map((platform, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => window.open(platform.link, '_blank')}
                className="w-full sm:w-auto"
              >
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
