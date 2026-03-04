
import { useState, useEffect } from 'react';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [input, setInput] = useState(0); // Minutos que o usuário digita

  useEffect(() => {
    let interval = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => setSeconds(s => s - 1), 1000);
    } else if (seconds === 0 && isActive) {
      alert("Tempo esgotado!");
      setIsActive(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const startTimer = () => {
    setSeconds(input * 60);
    setIsActive(true);
  };

  return (
    <div className="timer-container">
      <input 
        type="number" 
        onChange={(e) => setInput(e.target.value)} 
        placeholder="Minutos"
        disabled={isActive}
      />
      <div className="display">
        {Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, '0')}
      </div>
      <button onClick={startTimer}>Começar</button>
      <button onClick={() => setIsActive(false)}>Pausar</button>
    </div>
  );
};