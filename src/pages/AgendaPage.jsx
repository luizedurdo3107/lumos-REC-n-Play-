import { createId } from "../lib/id";
import { useState } from "react";
import { Button, EmptyState, Heading, Icon, Pill } from "../components/UI";
import { Modal } from "../components/Modal";
import { TextInput } from "../components/VirtualInput";
import { useExperience } from "../context/ExperienceContext";
import { dateKey } from "../lib/storage";
const weekdays = ["dom.", "seg.", "ter.", "qua.", "qui.", "sex.", "sáb."];
function getWeek(date) {
  const start = new Date(`${date}T12:00:00`);
  const weekday = start.getDay();
  start.setDate(start.getDate() - ((weekday + 6) % 7));
  return Array.from({ length: 7 }, (_, index) => {
    const day = new Date(start);
    day.setDate(start.getDate() + index);
    return day;
  });
}
export function AgendaPage() {
  const { session, dispatch, notify } = useExperience();
  const [selectedDate, setSelectedDate] = useState(dateKey());
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [eventDate, setEventDate] = useState(selectedDate);
  const [time, setTime] = useState("15:00");
  const week = getWeek(selectedDate);
  const events = session.events
    .filter((event) => event.date === selectedDate)
    .sort((a, b) => a.time.localeCompare(b.time));
  const month = new Date(`${selectedDate}T12:00:00`).toLocaleDateString(
    "pt-BR",
    { month: "long", year: "numeric" },
  );
  function moveWeek(offset) {
    const date = new Date(`${selectedDate}T12:00:00`);
    date.setDate(date.getDate() + offset * 7);
    setSelectedDate(dateKey(date));
  }
  function add(e) {
    e.preventDefault();
    if (!title.trim() || !eventDate || !time) return;
    dispatch({
      type: "ADD_EVENT",
      event: {
        id: createId("event"),
        title: title.trim(),
        date: eventDate,
        time,
      },
    });
    setSelectedDate(eventDate);
    setModalOpen(false);
    setTitle("");
    notify("Lembrete adicionado à sua agenda.");
  }
  return (
    <section className="agenda-page">
      <div className="section-heading-row">
        <Heading
          label="AGENDA"
          title="Um próximo passo, no seu tempo."
          align="left"
        >
          Organize o que você quer descobrir depois.
        </Heading>
        <Button
          icon="plus"
          onClick={() => {
            setEventDate(selectedDate);
            setModalOpen(true);
          }}
        >
          Novo lembrete
        </Button>
      </div>
      <div className="agenda-surface">
        <div className="calendar-top">
          <h2>{month}</h2>
          <div>
            <Button variant="ghost" onClick={() => setSelectedDate(dateKey())}>
              Hoje
            </Button>
            <Button
              variant="icon"
              icon="chevronLeft"
              aria-label="Semana anterior"
              onClick={() => moveWeek(-1)}
            />
            <Button
              variant="icon"
              icon="chevronRight"
              aria-label="Próxima semana"
              onClick={() => moveWeek(1)}
            />
          </div>
        </div>
        <div className="week-strip" aria-label="Dias da semana">
          {week.map((day) => {
            const key = dateKey(day);
            return (
              <button
                key={key}
                className={key === selectedDate ? "selected" : ""}
                onClick={() => setSelectedDate(key)}
                aria-label={day.toLocaleDateString("pt-BR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
                aria-pressed={key === selectedDate}
              >
                <span>{weekdays[day.getDay()]}</span>
                <strong>{day.getDate()}</strong>
                <i
                  className={
                    session.events.some((event) => event.date === key)
                      ? "has-events"
                      : ""
                  }
                />
              </button>
            );
          })}
        </div>
        <div className="day-agenda">
          <div className="agenda-day-label">
            <h3>
              {new Date(`${selectedDate}T12:00:00`).toLocaleDateString(
                "pt-BR",
                { weekday: "long", day: "numeric", month: "long" },
              )}
            </h3>
            <Pill>
              {events.length} {events.length === 1 ? "lembrete" : "lembretes"}
            </Pill>
          </div>
          {events.length ? (
            <ul className="agenda-events">
              {events.map((event) => (
                <li key={event.id} className={event.done ? "event-done" : ""}>
                  <time>{event.time}</time>
                  <label>
                    <input
                      type="checkbox"
                      checked={event.done}
                      onChange={() =>
                        dispatch({ type: "TOGGLE_EVENT", id: event.id })
                      }
                    />
                    <span>{event.title}</span>
                  </label>
                  <Button
                    variant="icon"
                    icon="trash"
                    aria-label={`Excluir lembrete ${event.title}`}
                    onClick={() => {
                      dispatch({ type: "DELETE_EVENT", id: event.id });
                      notify("Lembrete excluído.");
                    }}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              icon="calendar"
              title="Um espaço para sua próxima ideia."
              action={
                <Button
                  variant="soft"
                  icon="plus"
                  onClick={() => {
                    setEventDate(selectedDate);
                    setModalOpen(true);
                  }}
                >
                  Criar um lembrete
                </Button>
              }
            >
              Planeje uma leitura, uma prática ou algo que despertou sua
              curiosidade.
            </EmptyState>
          )}
        </div>
      </div>
      <p className="quiet-note">
        <Icon name="help" size={17} />
        Os lembretes ficam nesta visita e não enviam notificações.
      </p>
      {modalOpen && (
        <Modal title="Agenda" onClose={() => setModalOpen(false)}>
          <form onSubmit={add}>
            <div className="modal-form-heading">
              <Icon name="calendar" size={32} />
              <h2>O que vem depois?</h2>
              <p>Um pequeno plano para continuar aprendendo.</p>
            </div>
            <label className="form-label" htmlFor="event-title">
              Seu próximo passo
            </label>
            <TextInput
              id="event-title"
              value={title}
              onChange={setTitle}
              placeholder="Ex.: Praticar novas expressões"
              maxLength={90}
              required
              autoFocus
            />
            <div className="form-row">
              <label className="form-label">
                Data
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  required
                />
              </label>
              <label className="form-label">
                Horário
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="dialog-actions">
              <Button variant="ghost" onClick={() => setModalOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" icon="check" disabled={!title.trim()}>
                Salvar lembrete
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </section>
  );
}
