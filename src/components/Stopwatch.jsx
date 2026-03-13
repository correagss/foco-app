import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (running) {
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [running]);

  const formatTime = (ms) => {
    const min = Math.floor(ms / 60000);
    const sec = Math.floor((ms % 60000) / 1000);
    const centi = Math.floor((ms % 1000) / 10);
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}.${centi.toString().padStart(2, '0')}`;
  };

  return (
    <div className="tool-container">
      <div className="clock-wrapper">
        <span className="clock-background">88:88.88</span>
        <h1 className="main-clock">{formatTime(time)}</h1>
      </div>
      <div className="controls">
        <button className="btn-main" onClick={() => setRunning(!running)}>
          {running ? <Pause size={20} /> : <Play size={20} />}
          {running ? 'Pausar' : 'Iniciar'}
        </button>
        <button className="btn-sec" onClick={() => { setRunning(false); setTime(0); }}>
          <RotateCcw size={20} /> Resetar
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;