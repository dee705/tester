import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Ensure you have Font Awesome linked in your project.
// If not, add this to your public/index.html or main layout:
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

const Social = () => {
  const socialPlatforms = [
    {
      name: "Instagram",
      link: "https://www.instagram.com/klarissedguzman/",
      iconClass: "fab fa-instagram" // Updated Instagram icon
    },
    {
      name: "YouTube",
      link: "https://www.youtube.com/@KLARISSEUpdates",
      iconClass: "fab fa-youtube" // Updated YouTube icon
    },
    {
      name: "TikTok",
      link: "https://www.tiktok.com/@klarissedguzman?lang=en&is_from_webapp=1&sender_device=mobile&sender_web_id=7531174735428011538",
      iconClass: "fab fa-tiktok" // Updated TikTok icon
    },
    {
      name: "Facebook",
      link: "https://m.facebook.com/Klarisse06/",
      iconClass: "fab fa-facebook-f" // Updated Facebook icon
    },
    {
      name: "Twitter",
      link: "https://x.com/Klarissedguzman?t=ZFXgmlgJTyf0daUNbcUguA&s=09",
      iconClass: "fab fa-x-twitter" // Updated Twitter (X) icon
    },
    {
      name: "Spotify",
      link: "https://open.spotify.com/artist/7r59WFPJdYBQmnIQB4DX7K?si=3D0wFIiMSieyWycCGO7bTw",
      iconClass: "fab fa-spotify" // Updated Spotify icon
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
                className="w-full sm:w-auto flex items-center gap-2" // Added flex and gap for icon alignment
              >
                {/* Render the Font Awesome icon */}
                <i className={platform.iconClass}></i> 
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
