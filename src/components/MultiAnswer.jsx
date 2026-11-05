import { Icon } from "./UI";

export function MultiAnswer({ question, answer, onChange, disabled }) {
  return (
    <fieldset className="answer-options multi-answer-options" disabled={disabled}>
      <legend className="activity-instruction">Selecione todas as alternativas corretas.</legend>
      {question.options.map((option, index) => {
        const selected = answer.includes(index);
        return (
          <label key={option} className={`answer-option ${selected ? "selected" : ""}`}>
            <input type="checkbox" checked={selected}
              onChange={() => onChange(selected ? answer.filter(value => value !== index) : [...answer, index])} />
            <span className="answer-letter multi-answer-mark" aria-hidden="true">{selected ? <Icon name="check" size={17} /> : null}</span>
            <span>{option}</span>
          </label>
        );
      })}
      <p className="challenge-selection" aria-live="polite">
        {answer.length === 1 ? "1 alternativa selecionada" : `${answer.length} alternativas selecionadas`}
      </p>
    </fieldset>
  );
}
