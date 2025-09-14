import { useEffect, useState } from "react";
import "./ConcertPopup.css";

export default function ConcertPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Show popup when page loads
    setShow(true);
  }, []);

  return (
    <div className={`popup-overlay ${show ? "active" : ""}`}>
      <div className="popup-content">
        <span className="close-btn" onClick={() => setShow(false)}>&times;</span>
        <img
          src="/lovable-uploads/1000007342.jpg"
          alt="Concert Poster"
          style={{ maxWidth: "100%", borderRadius: "10px" }}
        />
        <h2>Klarisse De Guzman’s The Big Night</h2>
        <p>
          <strong>Date:</strong> September 26, 2025 <br />
          <strong>Venue:</strong> Araneta Coliseum
        </p>
      </div>
    </div>
  );
}
