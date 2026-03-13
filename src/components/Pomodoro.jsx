import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Coffee } from 'lucide-react';

const Pomodoro = ({ studyMode }) => {
  const settings = {
    Iniciante: 15,
    Mediano: 25,
    Avançado: 45
  };

  const [seconds, setSeconds] = useState(settings[studyMode] * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setSeconds(settings[studyMode] * 60);
    setIsActive(false);
  }, [studyMode]);

  useEffect(() => {
    let interval = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => setSeconds(s => s - 1), 1000);
    } else if (seconds === 0) {
      clearInterval(interval);
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const formatTime = (s) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="tool-container">
      <div style={{ marginBottom: '20px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Coffee size={20} /> Tempo de Foco: {studyMode}
      </div>
      
      <div className="clock-wrapper">
        <span className="clock-background">88:88</span>
        <h1 className="main-clock">{formatTime(seconds)}</h1>
      </div>

      <div className="controls" style={{marginTop: '30px'}}>
        <button className="btn-main" onClick={() => setIsActive(!isActive)}>
          {isActive ? <Pause size={20}/> : <Play size={20}/>} {isActive ? 'Pausar' : 'Iniciar'}
        </button>
        <button className="btn-sec" onClick={() => {setIsActive(false); setSeconds(settings[studyMode] * 60);}}>
          <RotateCcw size={20}/> Resetar
        </button>
      </div>
    </div>
  );
};

export default Pomodoro;