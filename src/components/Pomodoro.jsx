// components/Pomodoro.jsx
import { useState, useEffect } from 'react';

const Pomodoro = () => {
  const modes = {
    foco: { label: 'Foco', time: 25 * 60 },
    pausaCurta: { label: 'Pausa Curta', time: 5 * 60 },
    pausaLonga: { label: 'Pausa Longa', time: 15 * 60 },
  };

  const [mode, setMode] = useState('foco');
  const [seconds, setSeconds] = useState(modes.foco.time);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => setSeconds(s => s - 1), 1000);
    } else if (seconds === 0) {
      setIsActive(false);
      alert(`Fim do modo ${modes[mode].label}!`);
      // Aqui você pode disparar um som de notificação
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, mode]);

  const switchMode = (newMode) => {
    setMode(newMode);
    setSeconds(modes[newMode].time);
    setIsActive(false);
  };

  const formatTime = (s) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="pomodoro-container">
      <div className="mode-selector">
        {Object.keys(modes).map(m => (
          <button 
            key={m} 
            className={mode === m ? 'active' : ''} 
            onClick={() => switchMode(m)}
          >
            {modes[m].label}
          </button>
        ))}
      </div>

      <div className="display">{formatTime(seconds)}</div>

      <div className="controls">
        <button onClick={() => setIsActive(!isActive)}>
          {isActive ? 'Pausar' : 'Iniciar'}
        </button>
        <button onClick={() => { setIsActive(false); setSeconds(modes[mode].time); }}>
          Reiniciar
        </button>
      </div>
    </div>
  );
};

export default Pomodoro;