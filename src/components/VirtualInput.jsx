import { useState } from "react";
import { useExperience } from "../context/ExperienceContext";
import { Button, Icon } from "./UI";
export function VirtualKeyboard({ onKey, onClose }) {
  return (
    <div className="virtual-keyboard">
      <div className="keyboard-top">
        <span>
          <Icon name="keyboard" size={17} /> Teclado virtual
        </span>
        <Button
          variant="icon"
          icon="close"
          aria-label="Fechar teclado virtual"
          onClick={onClose}
        />
      </div>
      {["qwertyuiop", "asdfghjklç", "zxcvbnm"].map((row) => (
        <div className="keyboard-row" key={row}>
          {[...row].map((key) => (
            <button type="button" key={key} onClick={() => onKey(key)}>
              {key}
            </button>
          ))}
        </div>
      ))}
      <div className="keyboard-row">
        <button type="button" onClick={() => onKey(" ")}>
          Espaço
        </button>
        <button type="button" onClick={() => onKey("BACKSPACE")}>
          Apagar
        </button>
      </div>
    </div>
  );
}
export function TextInput({ value, onChange, maxLength = 140, ...props }) {
  const { settings } = useExperience();
  const [open, setOpen] = useState(false);
  return (
    <div className="text-input-wrap">
      <input
        {...props}
        value={value}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
      />
      {settings.keyboard && (
        <Button
          variant="icon"
          className="keyboard-open"
          icon="keyboard"
          aria-label="Abrir teclado virtual"
          onClick={() => setOpen(!open)}
        />
      )}
      {settings.keyboard && open && (
        <VirtualKeyboard
          onClose={() => setOpen(false)}
          onKey={(key) =>
            onChange(
              key === "BACKSPACE"
                ? value.slice(0, -1)
                : (value + key).slice(0, maxLength),
            )
          }
        />
      )}
    </div>
  );
}
