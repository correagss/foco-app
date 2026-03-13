import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    let interval = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => setSeconds(s => s - 1), 1000);
    } else if (seconds === 0 && isActive) {
      setIsActive(false);
      alert("Tempo esgotado!");
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const formatTime = (s) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (seconds > 0) return setIsActive(true);
    if (input > 0) {
      setSeconds(input * 60);
      setIsActive(true);
    }
  };

  return (
    <div className="tool-container">
      {!isActive && (
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input 
            type="number" 
            placeholder="Minutos"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ background: 'var(--border)', border: 'none', color: 'white', padding: '10px', borderRadius: '8px', width: '80px', textAlign: 'center' }}
          />
          <span style={{color: 'var(--text-secondary)'}}>minutos</span>
        </div>
      )}
      <div className="clock-wrapper">
        <span className="clock-background">88:88</span>
        <h1 className="main-clock">{formatTime(seconds)}</h1>
      </div>
      <div className="controls" style={{marginTop: '30px'}}>
        <button className="btn-main" onClick={isActive ? () => setIsActive(false) : handleStart}>
          {isActive ? <Pause size={20} /> : <Play size={20} />}
          {isActive ? 'Pausar' : 'Iniciar'}
        </button>
        <button className="btn-sec" onClick={() => { setIsActive(false); setSeconds(0); setInput(""); }}>
          <RotateCcw size={20} /> Resetar
        </button>
      </div>
    </div>
  );
};

export default Timer;