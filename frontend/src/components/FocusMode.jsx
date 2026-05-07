import { useFocusMode } from "../hooks/FocusMode";
import "../styles/Focus_mode.css";

export function FocusModeWidget() {
  const { timeLeft, isRunning, mode, start, pause, reset } = useFocusMode();

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="widget">
      <span className="mode">{mode === "focus" ? "🎯 Focus" : "☕ Break"}</span>
      <span className="time">{minutes}:{seconds}</span>
      <div className="controls">
        <button onClick={isRunning ? pause : start}>{isRunning ? "⏸" : "▶️"}</button>
        <button onClick={reset}>🔄</button>
      </div>
    </div>
  );
}


  
