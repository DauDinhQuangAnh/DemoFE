import { useState, useEffect } from 'react';

const Pomodoro = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Pomodoro', {
          body: 'Hết giờ làm việc! Nghỉ giải lao thôi ☕',
        });
      } else {
        alert('Hết giờ làm việc! Nghỉ giải lao thôi ☕');
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
  };

  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      right: '20px',
      background: 'rgba(255, 255, 255, 0.95)',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      zIndex: 999,
      minWidth: '200px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <h3 style={{
        margin: '0 0 16px 0',
        fontSize: '14px',
        fontWeight: '600',
        color: '#666',
        textTransform: 'uppercase',
        letterSpacing: '1px'
      }}>
        Pomodoro
      </h3>
      
      <div style={{
        fontSize: '36px',
        fontWeight: '600',
        fontFamily: 'monospace',
        color: '#333',
        marginBottom: '16px',
        textAlign: 'center'
      }}>
        {formatTime(timeLeft)}
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={toggleTimer}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            background: isRunning ? '#ef4444' : '#10b981',
            color: 'white',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '13px',
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          {isRunning ? 'Dừng' : 'Bắt đầu'}
        </button>

        <button
          onClick={resetTimer}
          style={{
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            background: 'white',
            color: '#666',
            cursor: 'pointer',
            fontSize: '14px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f5f5f5';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'white';
          }}
        >
          ↺
        </button>
      </div>
    </div>
  );
};

export default Pomodoro;
