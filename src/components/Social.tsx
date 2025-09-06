import { Button } from "@/components/ui/button";

const MinimalistSocialButtons = () => {
  const socialLinks = [
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
    <div className="flex flex-wrap justify-center gap-4">
      {socialLinks.map((platform, index) => (
        <Button
          key={index}
          variant="outline"
          onClick={() => window.open(platform.link, '_blank')}
        >
          {platform.name}
        </Button>
      ))}
    </div>
  );
};

export default MinimalistSocialButtons;
