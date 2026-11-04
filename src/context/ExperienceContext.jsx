import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { initialSession, sessionReducer } from "../lib/game";
import {
  defaultSettings,
  loadSession,
  readStored,
  sanitizeSettings,
  writeStored,
} from "../lib/storage";

const ExperienceContext = createContext(null);
const SESSION_KEY = "norya-estande-v2-session";
const SETTINGS_KEY = "norya-estande-v2-settings";
function storage(kind) {
  try {
    return window[kind];
  } catch {
    return { getItem: () => null, setItem: () => {} };
  }
}
export function ExperienceProvider({ children }) {
  const [session, dispatch] = useReducer(sessionReducer, null, () =>
    loadSession(
      readStored(storage("sessionStorage"), SESSION_KEY, initialSession()),
    ),
  );
  const [settings, setSettings] = useState(() =>
    sanitizeSettings(
      readStored(storage("localStorage"), SETTINGS_KEY, defaultSettings),
    ),
  );
  const [toast, setToast] = useState("");
  useEffect(
    () => writeStored(storage("sessionStorage"), SESSION_KEY, session),
    [session],
  );
  useEffect(
    () => writeStored(storage("localStorage"), SETTINGS_KEY, settings),
    [settings],
  );
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(""), 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);
  const saveContent = (id) => {
    const exists = session.saved.some((item) => item.id === id);
    dispatch({ type: "SAVE", id });
    setToast(
      exists
        ? "Conteúdo removido da coleção."
        : "Conteúdo salvo em Minhas descobertas.",
    );
  };
  return (
    <ExperienceContext.Provider
      value={{
        session,
        dispatch,
        settings,
        setSettings,
        toast,
        notify: setToast,
        saveContent,
      }}
    >
      {children}
    </ExperienceContext.Provider>
  );
}
export function useExperience() {
  return useContext(ExperienceContext);
}
