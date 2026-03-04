import { useState, useEffect } from "react";

const Clock = () => {
    const [time, setTime] = useState(new Date());
}

useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);

}, []);

return (
    <div classname="clock-container">
        <h1>{time.toLocaleTimeString('pt-BR')}</h1>
        <p>{time.toLocaleDateString('pt-BR', 
            {weekday: 'long', day: 'numeric', month: 'long'})}</p>
    </div>
);


