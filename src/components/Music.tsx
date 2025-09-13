{/* Listen Everywhere Section */}
<div className="text-center mt-24 pb-20">  {/* ✅ increased spacing and padding */}
  <h3 className="text-3xl font-bold mb-8 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
    Listen Everywhere
  </h3>
  <div className="flex flex-wrap justify-center gap-6">
    <Button
      onClick={() =>
        window.open(
          "https://open.spotify.com/track/2GjTvT9x3XYnngU7JyKQZZ",
          "_blank"
        )
      }
      className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white rounded-full px-6 py-3"
    >
      <SiSpotify className="h-5 w-5" /> Spotify
    </Button>
    <Button
      onClick={() =>
        window.open(
          "https://music.apple.com/us/song/dito-ka-lang-wag-kang-lalayo/1834162756",
          "_blank"
        )
      }
      className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full px-6 py-3"
    >
      <SiApplemusic className="h-5 w-5" /> Apple Music
    </Button>
    <Button
      onClick={() =>
        window.open(
          "https://www.youtube.com/watch?v=RcKMBkkZZdc",
          "_blank"
        )
      }
      className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white rounded-full px-6 py-3"
    >
      <SiYoutube className="h-5 w-5" /> YouTube
    </Button>
  </div>
</div>
