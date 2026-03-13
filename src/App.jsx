import React, { useState, useEffect } from 'react';
import { 
  Clock as ClockIcon, 
  Timer as TimerIcon, 
  AlarmClock, 
  Coffee, 
  Timer as StopwatchIcon, 
  Sun, 
  Moon, 
  HelpCircle 
} from 'lucide-react';

// --- IMPORTANDO SEUS COMPONENTES ---
import Clock from './components/Clock';
import Stopwatch from './components/Stopwatch';
import Timer from './components/Timer';
import Alarm from './components/Alarm';
import Pomodoro from './components/Pomodoro';

import './App.scss';

function App() {
  // --- ESTADOS GERAIS ---
  const [activeTab, setActiveTab] = useState('Relógio 24h');
  const [theme, setTheme] = useState('dark');
  const [studyMode, setStudyMode] = useState('Iniciante');

  // Aplica o tema escuro/claro no atributo do HTML para o SCSS funcionar
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Definição dos itens do Menu Lateral
  const menuItems = [
    { id: 'Relógio 24h', icon: <ClockIcon size={20}/> },
    { id: 'Cronômetro', icon: <StopwatchIcon size={20}/> },
    { id: 'Temporizador', icon: <TimerIcon size={20}/> },
    { id: 'Alarme', icon: <AlarmClock size={20}/> },
    { id: 'Pomodoro', icon: <Coffee size={20}/> },
  ];

  return (
    <div className="app-container">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="logo">
          <ClockIcon size={28} />
          <span>FocusTime</span>
        </div>

        <nav>
          {menuItems.map((item) => (
            <div 
              key={item.id} 
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`} 
              onClick={() => setActiveTab(item.id)}
            >
              {item.icon} {item.id}
            </div>
          ))}
        </nav>

        {/* SELETOR DE TEMA NO RODAPÉ DA SIDEBAR */}
        <div className="theme-section">
          <p>Tema:</p>
          <div className="theme-buttons">
            <button 
              className={theme === 'light' ? 'active' : ''} 
              onClick={() => setTheme('light')}
            >
              <Sun size={16}/> Claro
            </button>
            <button 
              className={theme === 'dark' ? 'active' : ''} 
              onClick={() => setTheme('dark')}
            >
              <Moon size={16}/> Escuro
            </button>
          </div>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <main className="main-content">
        <header>
          <div className="mode-selector">
            <span>Modo de Estudo:</span>
            <div className="modes">
              {['Iniciante', 'Mediano', 'Avançado'].map(m => (
                <button 
                  key={m} 
                  className={studyMode === m ? 'active' : ''} 
                  onClick={() => setStudyMode(m)}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </header>

        <section className="content-area">
          {/* RENDERIZAÇÃO DOS COMPONENTES BASEADA NA ABA ATIVA */}
          
          {activeTab === 'Relógio 24h' && <Clock />}

          {activeTab === 'Cronômetro' && <Stopwatch />}

          {activeTab === 'Temporizador' && <Timer />}

          {activeTab === 'Alarme' && <Alarm />}

          {/* Passamos o studyMode para o Pomodoro saber se carrega 15, 25 ou 45 min */}
          {activeTab === 'Pomodoro' && <Pomodoro studyMode={studyMode} />}
          
        </section>

        {/* BOTÃO DE AJUDA FLUTUANTE */}
        <div className="help-icon">
          <HelpCircle size={20} />
        </div>
      </main>
    </div>
  );
}

export default App;