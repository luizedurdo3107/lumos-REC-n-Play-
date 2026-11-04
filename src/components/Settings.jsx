import { useState } from "react";
import { useExperience } from "../context/ExperienceContext";
import { defaultSettings } from "../lib/storage";
import { useSpeech } from "../lib/useSpeech";
import { Modal } from "./Modal";
import { Button, Feathers, Icon, Pill, Toggle } from "./UI";
const tabs = [
  { id: "reading", label: "Leitura", icon: "type" },
  { id: "focus", label: "Foco e aparência", icon: "eye" },
  { id: "interaction", label: "Interação e áudio", icon: "volume" },
];
function Range({
  label,
  value,
  onChange,
  min,
  max,
  step,
  unit = "",
  endpoints,
}) {
  return (
    <label className="range-field">
      <span>
        {label}
        <output aria-hidden="true">
          {Number(value).toLocaleString("pt-BR", { maximumFractionDigits: 2 })}
          {unit}
        </output>
      </span>
      <span className="range-controls">
        <span aria-hidden="true">{endpoints?.[0] || "−"}</span>
        <input
          aria-label={label}
          aria-valuetext={`${value}${unit}`}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <span aria-hidden="true">{endpoints?.[1] || "+"}</span>
      </span>
    </label>
  );
}
export function Settings({ onClose }) {
  const { settings, setSettings, notify } = useExperience();
  const [draft, setDraft] = useState(settings);
  const [tab, setTab] = useState("reading");
  const { speak, stop, speaking } = useSpeech();
  const update = (key, value) =>
    setDraft((current) => ({ ...current, [key]: value }));
  function apply() {
    setSettings(draft);
    notify("SeuModo atualizado. A experiência agora está do seu jeito.");
    onClose();
  }
  return (
    <Modal title="SeuModo" wide onClose={onClose} className="settings-dialog">
      <div className="settings-intro">
        <h2>Deixe do seu jeito.</h2>
        <p>Encontre uma combinação confortável para você.</p>
      </div>
      <div
        className="settings-tabs"
        role="tablist"
        aria-label="Categorias de ajustes"
      >
        {tabs.map((item) => (
          <button
            role="tab"
            aria-selected={tab === item.id}
            tabIndex={tab === item.id ? 0 : -1}
            onKeyDown={(event) => {
              if (
                ["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)
              ) {
                event.preventDefault();
                const current = tabs.findIndex((entry) => entry.id === tab);
                const next =
                  event.key === "Home"
                    ? 0
                    : event.key === "End"
                      ? tabs.length - 1
                      : (current +
                          (event.key === "ArrowRight" ? 1 : -1) +
                          tabs.length) %
                        tabs.length;
                setTab(tabs[next].id);
                document.getElementById(`tab-${tabs[next].id}`)?.focus();
              }
            }}
            aria-controls="settings-panel"
            id={`tab-${item.id}`}
            key={item.id}
            onClick={() => setTab(item.id)}
          >
            <Icon name={item.icon} size={19} />
            {item.label}
          </button>
        ))}
      </div>
      <div className="settings-grid">
        <div
          className="settings-controls"
          role="tabpanel"
          id="settings-panel"
          aria-labelledby={`tab-${tab}`}
        >
          {tab === "reading" && (
            <>
              <Range
                label="Tamanho do texto"
                value={draft.fontSize}
                onChange={(v) => update("fontSize", v)}
                min={16}
                max={24}
                step={1}
                unit=" px"
                endpoints={["A", "A"]}
              />
              <Range
                label="Espaçamento entre linhas"
                value={draft.lineHeight}
                onChange={(v) => update("lineHeight", v)}
                min={1.4}
                max={2.1}
                step={0.1}
              />
              <Range
                label="Espaçamento entre letras"
                value={draft.letterSpacing}
                onChange={(v) => update("letterSpacing", v)}
                min={0}
                max={2}
                step={0.25}
                unit=" px"
                endpoints={["ab", "a b"]}
              />
            </>
          )}
          {tab === "focus" && (
            <>
              <fieldset className="theme-picker">
                <legend>Tema da plataforma</legend>
                {[
                  ["light", "sun", "Claro"],
                  ["dark", "moon", "Escuro"],
                  ["sepia", "sprout", "Sépia"],
                ].map(([value, icon, label]) => (
                  <label
                    className={draft.theme === value ? "active" : ""}
                    key={value}
                  >
                    <input
                      type="radio"
                      name="theme"
                      value={value}
                      checked={draft.theme === value}
                      onChange={() => update("theme", value)}
                    />
                    <Icon name={icon} />
                    <span>{label}</span>
                  </label>
                ))}
              </fieldset>
              <Toggle
                label="Alto contraste"
                checked={draft.contrast}
                onChange={(v) => update("contrast", v)}
              />
              <Toggle
                label="Monocromático"
                checked={draft.monochrome}
                onChange={(v) => update("monochrome", v)}
              />
              <Toggle
                label="Modo foco"
                description="Oculta ilustrações decorativas."
                checked={draft.focus}
                onChange={(v) => update("focus", v)}
              />
              <Toggle
                label="Reduzir movimento"
                checked={draft.reduceMotion}
                onChange={(v) => update("reduceMotion", v)}
              />
              <Toggle
                label="Ocultar efeitos visuais"
                checked={draft.hideEffects}
                onChange={(v) => update("hideEffects", v)}
              />
            </>
          )}
          {tab === "interaction" && (
            <>
              <label className="select-field">
                Tamanho dos controles
                <select
                  value={draft.controlSize}
                  onChange={(e) => update("controlSize", e.target.value)}
                >
                  <option value="compact">Padrão</option>
                  <option value="comfortable">Confortável</option>
                  <option value="large">Ampliado</option>
                </select>
              </label>
              <Toggle
                label="Teclado virtual"
                description="Disponível nos campos de texto."
                checked={draft.keyboard}
                onChange={(v) => update("keyboard", v)}
              />
              <Toggle
                label="Narração de páginas"
                description="Lê o conteúdo ao mudar de tela."
                checked={draft.narration}
                onChange={(v) => update("narration", v)}
              />
              <Range
                label="Velocidade da voz"
                value={draft.speed}
                onChange={(v) => update("speed", v)}
                min={0.6}
                max={1.4}
                step={0.1}
                unit="×"
              />
              <Button
                variant="secondary"
                icon={speaking ? "mute" : "volume"}
                onClick={() =>
                  speaking
                    ? stop()
                    : speak(
                        "Cada descoberta começa com você. Aprenda no seu ritmo.",
                        "pt-BR",
                        draft.speed,
                      )
                }
              >
                {speaking ? "Parar narração" : "Ouvir exemplo"}
              </Button>
            </>
          )}
          <Button
            variant="ghost"
            icon="reset"
            onClick={() => setDraft({ ...defaultSettings })}
          >
            Restaurar padrão
          </Button>
        </div>
        <div
          className={`reading-preview theme-${draft.theme} ${draft.contrast ? "high-contrast" : ""} ${draft.monochrome ? "monochrome" : ""}`}
          style={{
            "--reading-size": `${draft.fontSize}px`,
            "--reading-line": draft.lineHeight,
            "--reading-spacing": `${draft.letterSpacing}px`,
          }}
        >
          <span className="preview-label">
            <Icon name="book" size={22} /> PRÉVIA DA LEITURA
          </span>
          <Pill>Seu ritmo</Pill>
          <h3>Cada descoberta começa com você.</h3>
          <p>
            Aprender é descobrir novos caminhos. Aqui, o texto pode acompanhar o
            seu ritmo, com o tamanho e o espaço que fazem sentido para você.
          </p>
          <Feathers />
          <small>Os ajustes serão aplicados ao concluir.</small>
        </div>
      </div>
      <div className="dialog-actions">
        <Button variant="ghost" onClick={onClose}>
          Continuar sem alterar
        </Button>
        <Button icon="check" onClick={apply}>
          Aplicar ajustes
        </Button>
      </div>
    </Modal>
  );
}
