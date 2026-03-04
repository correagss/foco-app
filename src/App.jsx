import { useState, useEffect } from 'react'
import { 
  Clock as ClockIcon, 
  Timer, 
  AlarmClock, 
  Coffee, 
  Timer as StopwatchIcon,
  Sun,
  Moon,
  HelpCircle
} from 'lucide-react'
import './App.scss'

function App() {
  const [activeTab, setActiveTab] = useState('Relógio 24h')
  const [theme, setTheme] = useState('dark')
  const [studyMode, setStudyMode] = useState('Iniciante')
  const [currentTime, setCurrentTime] = useState(new Date())

  // Atualiza o relógio a cada segundo
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Aplica o tema escuro/claro no atributo do HTML
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const menuItems = [
    { id: 'Relógio 24h', icon: <ClockIcon size={20}/> },
    { id: 'Cronômetro', icon: <StopwatchIcon size={20}/> },
    { id: 'Temporizador', icon: <Timer size={20}/> },
    { id: 'Alarme', icon: <AlarmClock size={20}/> },
    { id: 'Pomodoro', icon: <Coffee size={20}/> },
  ]

  const formatTime = (date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
  }

  return (
    <div className="app-container">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="logo">
          <ClockIcon size={28} strokeWidth={3} />
          <span>FocusTime</span>
        </div>

        <nav>
          {menuItems.map((item) => (
            <div 
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.icon}
              {item.id}
            </div>
          ))}
        </nav>

        <div className="theme-section">
          <p>Tema:</p>
          <div className="theme-buttons">
            <button 
              className={theme === 'light' ? 'active' : ''} 
              onClick={() => setTheme('light')}
            >
              <Sun size={16} /> Claro
            </button>
            <button 
              className={theme === 'dark' ? 'active' : ''} 
              onClick={() => setTheme('dark')}
            >
              <Moon size={16} /> Escuro
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
          {activeTab === 'Relógio 24h' && (
            <div className="clock-wrapper">
              {/* Fundo 88:88:88 para efeito de visor real */}
              <span className="clock-background">88:88:88</span>
              <h1 className="main-clock">{formatTime(currentTime)}</h1>
            </div>
          )}
          
          {activeTab !== 'Relógio 24h' && (
            <div style={{textAlign: 'center'}}>
              <h2 style={{opacity: 0.5, color: 'var(--text-secondary)', fontWeight: 400}}>
                Página de {activeTab} em construção
              </h2>
            </div>
          )}
        </section>

        <div className="help-icon">
          <HelpCircle size={20} />
        </div>
      </main>
    </div>
  )
}

export default App