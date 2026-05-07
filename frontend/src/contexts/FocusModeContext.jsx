import { createContext, useState, useEffect, useRef, useCallback } from "react";

export const FocusModeContext = createContext(null);

const MODES = {
  focus: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

export function FocusModeProvider({ children }) {
  const [mode, setMode] = useState("focus");
  const [timeLeft, setTimeLeft] = useState(MODES.focus);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef(null);

  const tick = useCallback(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        setSessions((s) => {
          const next = s + 1;
          const nextMode = next % 4 === 0 ? "longBreak" : "shortBreak";
          setMode(nextMode);
          setTimeLeft(MODES[nextMode]);
          return next;
        });
        return 0;
      }
      return prev - 1;
    });
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(tick, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, tick]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setTimeLeft(MODES[mode]);
  };
  const changeMode = (newMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(MODES[newMode]);
  };

  return (
    <FocusModeContext.Provider
      value={{ mode, timeLeft, isRunning, sessions, start, pause, reset, changeMode }}
    >
      {children}
    </FocusModeContext.Provider>
  );
}