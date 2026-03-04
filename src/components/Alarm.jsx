
import { useState, useEffect } from 'react';

const Alarm = () => {
  const [alarmTime, setAlarmTime] = useState("");
  const [alarms, setAlarms] = useState(() => {
    const saved = localStorage.getItem("alarms");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("alarms", JSON.stringify(alarms));
  }, [alarms]);

  useEffect(() => {
    const check = setInterval(() => {
      const now = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      alarms.forEach((a, index) => {
        if (a.time === now && !a.triggered) {
          alert("DESPERTADOR!");
          // Marcar como disparado para não tocar todo segundo naquele minuto
          const newAlarms = [...alarms];
          newAlarms[index].triggered = true;
          setAlarms(newAlarms);
        }
      });
    }, 1000);
    return () => clearInterval(check);
  }, [alarms]);

  const addAlarm = () => {
    if (alarmTime) setAlarms([...alarms, { time: alarmTime, triggered: false }]);
  };

  const deleteAlarm = (index) => {
    setAlarms(alarms.filter((_, i) => i !== index));
  };

  return (
    <div className="alarm-container">
      <input type="time" onChange={(e) => setAlarmTime(e.target.value)} />
      <button onClick={addAlarm}>Adicionar Alarme</button>
      <div className="alarm-list">
        {alarms.map((a, i) => (
          <div key={i} className="alarm-item">
            <span>{a.time}</span>
            <button onClick={() => deleteAlarm(i)}>Remover</button>
          </div>
        ))}
      </div>
    </div>
  );
};