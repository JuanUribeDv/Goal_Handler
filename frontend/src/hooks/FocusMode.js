import { useContext } from "react";
import { FocusModeContext } from "../contexts/FocusModeContext";

export function useFocusMode() {
  const ctx = useContext(FocusModeContext);
  if (!ctx) throw new Error("useFocusMode debe usarse dentro de FocusModeProvider");
  return ctx;
}