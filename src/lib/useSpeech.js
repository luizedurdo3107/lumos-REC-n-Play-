import { useCallback, useEffect, useState } from "react";
import { useExperience } from "../context/ExperienceContext";
export function useSpeech() {
  const { settings, notify } = useExperience();
  const [speaking, setSpeaking] = useState(false);
  const stop = useCallback(() => {
    window.speechSynthesis?.cancel();
    setSpeaking(false);
  }, []);
  useEffect(() => () => window.speechSynthesis?.cancel(), []);
  const speak = useCallback(
    (text, language = "pt-BR", rate = settings.speed) => {
      if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
        notify(
          "Este navegador não oferece narração. Você pode acompanhar todo o conteúdo em texto.",
        );
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      utterance.rate = rate;
      const voice = window.speechSynthesis
        .getVoices()
        .find((item) => item.lang.toLowerCase() === language.toLowerCase());
      if (voice) utterance.voice = voice;
      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = (event) => {
        setSpeaking(false);
        if (["canceled", "interrupted"].includes(event.error)) return;
        notify(
          "Não foi possível reproduzir a voz. A disponibilidade depende do navegador e das vozes do dispositivo.",
        );
      };
      window.speechSynthesis.speak(utterance);
    },
    [settings.speed, notify],
  );
  return { speak, stop, speaking };
}
