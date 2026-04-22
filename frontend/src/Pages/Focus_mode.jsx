import { useState, useEffect } from 'react'
import '../Styles/Focus_mode.css'

function Focus_mode() {
  const [seconds, setSeconds] = useState(1500);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval = null;
    if (seconds === 0) {
  
        if (isBreak) {
    
             alert("☕ ¡El descanso terminó! Es hora de volver a concentrarse.");
        } else {
            alert("✅ ¡Excelente trabajo! Tu sesión de 25 minutos ha finalizado. Tómate 10 minutos.");
        }
        const nextModeIsBreak = !isBreak;
        setIsBreak(nextModeIsBreak);
        setSeconds(nextModeIsBreak ? 600 : 1500); 
        setIsActive(false); 
    }

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
        handleSwitchMode();
        clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const handleSwitchMode = () => {
    const nextModeIsBreak = !isBreak;
    setIsBreak(nextModeIsBreak);
    setSeconds(nextModeIsBreak ? 600 : 1500);
    setIsActive(true); 
    alert(nextModeIsBreak ? "¡Hora de descansar!" : "¡A trabajar!");
  };

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setSeconds(1500);
  };

  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const remainingSeconds = secs % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className='Pomodoro'>
      <h2>{isBreak ? 'Modo: Descanso' : 'Modo: Trabajo'}</h2>
      <h1 className='Temporizator'>{formatTime(seconds)}</h1>
      
      <div className='btn-section'>
        <button  className= 'Iniciar' onClick={toggleTimer}>
          {isActive ? 'Pausar' : 'Iniciar'}
        </button>
        <button  className= 'Reiniciar' onClick={resetTimer}>
          Reiniciar
        </button>
      </div>
    </div>
  );
};


export default Focus_mode