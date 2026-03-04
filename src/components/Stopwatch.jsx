import { useState, useRef } from "react";

const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const timerRef = useRef(null);
}

const start = () => {
    if (!running) {
        setRunning(true);
        const startTime = Date.now() - time;
        timerRef.current = setInterval(() => {
            setTime(Date.now() - startTime);
        }, 10);
    }
}


const pause = () => {
    setRunning(false);
    clearInterval(timerRef.current);
}

const reset = () => {
    setRunning(false);
    clearInterval(timerRef.current);
}

const formartTime = (ms) => {
    const min = Math.floor(ms / 60000);
    const sec = Math.floor((ms % 60000) / 1000);
    const msec = Math.floor((ms % 1000) /10);
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}:${msec.toString().padStart(2, '0')}`;
};

return (
    <div className="stopwatch-container">
      <div className="display">{formatTime(time)}</div>
      <div className="controls">
        {!running ? <button onClick={start}>Iniciar</button> : <button onClick={pause}>Pausar</button>}
        <button onClick={reset}>Zerar</button>
      </div>
    </div>
  );
