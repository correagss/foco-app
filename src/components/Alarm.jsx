import React, { useState, useEffect } from 'react';
import { Plus, Trash2, AlarmClock } from 'lucide-react';

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
    const checkAlarms = setInterval(() => {
      const now = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      alarms.forEach((a, index) => {
        if (a.time === now && !a.triggered) {
          alert(`ALERTA: Alarme das ${a.time}!`);
          const newAlarms = [...alarms];
          newAlarms[index].triggered = true;
          setAlarms(newAlarms);
        }
      });
    }, 1000);
    return () => clearInterval(checkAlarms);
  }, [alarms]);

  return (
    <div className="tool-container">
      <div className="clock-wrapper" style={{ marginBottom: '30px' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 400 }}>
          <AlarmClock color="#8b5cf6" /> Novo Alarme
        </h2>
      </div>

      <div style={{ background: 'var(--border)', padding: '20px', borderRadius: '15px', width: '350px', display: 'flex', gap: '10px' }}>
        <input 
          type="time" 
          value={alarmTime}
          onChange={(e) => setAlarmTime(e.target.value)}
          style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#000', color: '#fff' }}
        />
        <button className="btn-main" style={{ padding: '10px' }} onClick={() => {
          if (alarmTime) setAlarms([...alarms, { time: alarmTime, triggered: false }]);
        }}>
          <Plus size={20} />
        </button>
      </div>

      <div style={{ marginTop: '30px', width: '350px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {alarms.map((a, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <span style={{ fontFamily: 'DSEG7-Classic', fontSize: '1.4rem', color: 'var(--accent-purple)' }}>{a.time}</span>
            <button onClick={() => setAlarms(alarms.filter((_, idx) => idx !== i))} style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer' }}>
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alarm;