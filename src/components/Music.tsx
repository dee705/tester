{/* 🎵 Featured Songs Section */}
<h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
  Featured Songs
</h3>
<div className="grid md:grid-cols-2 gap-8 mb-16">
  {songs.map((song, index) => {
    const isActive = currentSong === index;
    return (
      <Card
        key={index}
        className={`transition-all backdrop-blur-xl bg-white/30 border border-white/20 rounded-2xl hover:shadow-lg hover:shadow-green-400/40 ${
          isActive ? "ring-2 ring-green-500" : ""
        }`}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-lg font-bold text-green-700">{song.title}</h4>
              <p className="text-sm text-black/60">
                {song.album} • {song.year}
              </p>
              {isActive && (
                <p className="text-xs text-green-600 mt-1">
                  {formatTime(progress)} / {formatTime(duration)}
                </p>
              )}
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="bg-green-500 text-white hover:bg-green-600 rounded-full"
              onClick={() => (isActive ? togglePlay() : playSong(index))}
            >
              {isActive && isPlaying ? "⏸" : <Headphones />}
            </Button>
          </div>

          {/* Progress Bar */}
          {isActive && (
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={progress}
                onChange={handleSeek}
                className="w-full"
              />
            </div>
          )}

          {/* Controls */}
          {isActive && (
            <div className="flex justify-center space-x-6 text-green-600 mt-4">
              <button onClick={prevSong}>⏮</button>
              <button onClick={togglePlay}>{isPlaying ? "⏸" : "▶"}</button>
              <button onClick={nextSong}>⏭</button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  })}

  {/* Hidden YouTube Player */}
  <div id="yt-player" style={{ display: "none" }}></div>
</div>
