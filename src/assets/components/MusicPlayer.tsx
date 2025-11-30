import { useState } from 'react';

const MusicPlayer = () => {
  const PLAYLIST = [
    { name: "Lofi Girl - Study Beats", url: "https://www.youtube.com/watch?v=jfKfPfyJRdk" },
    { name: "Code Fi - Chill Coding", url: "https://www.youtube.com/watch?v=f02mOEt11OQ" },
    { name: "Classical for Reading", url: "https://www.youtube.com/watch?v=mWKqvRY380k" },
  ];

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(PLAYLIST[0]);
  const [volume, setVolume] = useState(0.3);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div style={{
      position: 'absolute',
      bottom: '20px',
      left: '20px',
      background: 'rgba(255, 255, 255, 0.95)',
      padding: isExpanded ? '16px' : '12px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      zIndex: 999,
      width: isExpanded ? '280px' : 'auto',
      transition: 'width 0.3s ease',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: isExpanded ? '12px' : '0'
        }}
      >
        <span style={{ fontSize: '20px' }}>🎵</span>
        {isExpanded && (
          <span style={{ fontSize: '13px', fontWeight: '500', color: '#666' }}>
            Study Music
          </span>
        )}
      </div>

      {isExpanded && (
        <>
          <div style={{ marginBottom: '12px' }}>
            <select
              value={currentTrack.url}
              onChange={(e) => {
                const track = PLAYLIST.find(t => t.url === e.target.value);
                if (track) {
                  setCurrentTrack(track);
                  setIsPlaying(true);
                }
              }}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '13px',
                fontFamily: 'inherit',
                background: 'white',
                cursor: 'pointer'
              }}
            >
              {PLAYLIST.map((track, index) => (
                <option key={index} value={track.url}>
                  {track.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              background: isPlaying ? '#ef4444' : '#10b981',
              color: 'white',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '13px',
              marginBottom: '12px',
              transition: 'opacity 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            {isPlaying ? 'Tạm dừng' : 'Phát nhạc'}
          </button>

          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '12px',
              color: '#666',
              marginBottom: '6px'
            }}>
              <span>Âm lượng</span>
              <span>{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              style={{
                width: '100%',
                cursor: 'pointer'
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default MusicPlayer;
