{/* Stationhead Section */}
<div className="text-center mt-20">
  <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
    🎧 Listen on Stationhead
  </h3>

  <Card className="overflow-hidden rounded-3xl border border-white/30 shadow-lg bg-gradient-to-br from-green-50/60 via-white/40 to-green-100/60 backdrop-blur-xl transition-all duration-500 hover:shadow-green-400/50 hover:scale-[1.01] mb-16 max-w-xl mx-auto">
    <CardContent className="p-6 flex flex-col items-center">
      <p className="text-lg text-green-700/80 mb-6">
        Join Klarisse live on <strong>Stationhead</strong> for exclusive sessions and fan interaction.
      </p>

      <Button
        className="bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-green-400/50 mb-6"
        onClick={() =>
          window.open("https://www.stationhead.com/kdgstream", "_blank")
        }
      >
        <Headphones className="mr-2 h-5 w-5" /> Open Stationhead
      </Button>

      {/* Compact Embed (around 2x2 size) */}
      <div className="w-[300px] h-[300px]">
        <iframe
          src="https://www.stationhead.com/kdgstream"
          className="w-full h-full rounded-xl"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        ></iframe>
      </div>
    </CardContent>
  </Card>
</div>
