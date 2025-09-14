import { useEffect, useState, useRef } from "react";
import "./ConcertPopup.css";

export default function ConcertPopup() {
  const [show, setShow] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    setShow(true); // show popup on load
  }, []);

  // 🔹 Choose mode: "image" | "video" | "youtube"
  const MEDIA_MODE: "image" | "video" | "youtube" = "video";

  // 🔹 Media sources
  const posterImage = "/lovable-uploads/1000007342.jpg";
  const localVideo = "/videos/concertvid.mp4";
  const youtubeVideo = "";

  // ✅ Handle close (stop video completely)
  const handleClose = () => {
    setShow(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.src = videoRef.current.src; // reloads to fully stop sound
    }
  };

  let content;
  if (MEDIA_MODE === "youtube" && youtubeVideo) {
    content = (
      <div className="video-wrapper">
        <iframe
          src={`${youtubeVideo}?autoplay=1&mute=0`} // try autoplay w/ sound
          title="Concert Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  } else if (MEDIA_MODE === "video" && localVideo) {
    content = (
      <video
        ref={videoRef}
        src={localVideo}
        controls
        autoPlay
        className="responsive-video"
      />
    );
  } else {
    content = (
      <img
        src={posterImage}
        alt="Concert Poster"
        className="responsive-image"
      />
    );
  }

  return (
    <div className={`popup-overlay ${show ? "active" : ""}`}>
      <div className="popup-content">
        <span className="close-btn" onClick={handleClose}>
          &times;
        </span>

        {content}

        <h2 className="mt-4 text-xl md:text-2xl font-bold text-center">
          Klarisse De Guzman’s The Big Night
        </h2>
        <p className="text-center text-sm md:text-base">
          <strong>Date:</strong> September 26, 2025 7pm <br />
          <strong>Venue:</strong> Araneta Coliseum
        </p>
      </div>
    </div>
  );
}
