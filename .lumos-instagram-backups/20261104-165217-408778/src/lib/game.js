import { getMission } from "../data/content.js";

export function evaluateAnswer(question, answer) {
  if (!question) return false;
  if (question.type === "choice")
    return Number.isInteger(answer) && answer === question.answer;
  if (question.type === "order")
    return (
      Array.isArray(answer) &&
      answer.length === question.answer.length &&
      answer.every((value, index) => value === question.answer[index])
    );
  if (question.type === "match")
    return (
      Array.isArray(answer) &&
      answer.length === question.pairs.length &&
      question.pairs.every((pair) => answer.includes(pair.id))
    );
  return false;
}
export function canSubmit(question, answer) {
  if (question.type === "choice")
    return (
      Number.isInteger(answer) &&
      answer >= 0 &&
      answer < question.options.length
    );
  if (question.type === "order")
    return Array.isArray(answer) && answer.length > 0;
  return question.type === "match" && evaluateAnswer(question, answer);
}
export function missionFinished(session, id) {
  const mission = getMission(id);
  return Boolean(
    mission &&
    mission.questions.every(
      (_, index) => session.missions[id]?.answers[index]?.correct,
    ),
  );
}
export function hasReward(session) {
  return Object.keys(session.completed).some((id) =>
    missionFinished(session, id),
  );
}
export function firstUnfinished(session, id) {
  const data = getMission(id);
  const index = data?.questions.findIndex(
    (_, i) => !session.missions[id]?.answers[i]?.correct,
  );
  return index === -1 ? 0 : Math.max(0, index ?? 0);
}
export const initialSession = () => ({
  version: 2,
  missions: {},
  completed: {},
  saved: [],
  collections: [{ id: "minhas", name: "Minhas descobertas" }],
  events: [],
  delivered: false,
  lastCompleted: null,
});
export function sessionReducer(state, action) {
  switch (action.type) {
    case "START":
      return state.missions[action.id]
        ? state
        : {
            ...state,
            missions: {
              ...state.missions,
              [action.id]: { answers: {}, messages: [] },
            },
          };
    case "MESSAGE": {
      const mission = state.missions[action.id] || {
        answers: {},
        messages: [],
      };
      return {
        ...state,
        missions: {
          ...state.missions,
          [action.id]: {
            ...mission,
            messages: [...mission.messages, ...action.messages].slice(-24),
          },
        },
      };
    }
    case "ANSWER": {
      const data = getMission(action.id);
      const question = data?.questions[action.index];
      const current = state.missions[action.id] || {
        answers: {},
        messages: [],
      };
      if (!question || current.answers[action.index]?.correct) return state;
      if (action.index > 0 && !current.answers[action.index - 1]?.correct)
        return state;
      const correct = evaluateAnswer(question, action.answer);
      const answer = {
        value: action.answer,
        correct,
        attempts: (current.answers[action.index]?.attempts || 0) + 1,
      };
      const next = {
        ...state,
        missions: {
          ...state.missions,
          [action.id]: {
            ...current,
            answers: { ...current.answers, [action.index]: answer },
          },
        },
      };
      if (!missionFinished(next, action.id)) return next;
      return {
        ...next,
        lastCompleted: action.id,
        completed: {
          ...state.completed,
          [action.id]: { title: data.title, at: action.at },
        },
      };
    }
    case "SAVE":
      return state.saved.some((item) => item.id === action.id)
        ? {
            ...state,
            saved: state.saved.filter((item) => item.id !== action.id),
          }
        : {
            ...state,
            saved: [
              ...state.saved,
              { id: action.id, collection: action.collection || "minhas" },
            ],
          };
    case "MOVE_SAVED":
      return {
        ...state,
        saved: state.saved.map((item) =>
          item.id === action.id
            ? { ...item, collection: action.collection }
            : item,
        ),
      };
    case "COLLECTION":
      return state.collections.some(
        (c) => c.name.toLowerCase() === action.name.toLowerCase(),
      )
        ? state
        : {
            ...state,
            collections: [
              ...state.collections,
              { id: action.id, name: action.name },
            ],
          };
    case "ADD_EVENT":
      return {
        ...state,
        events: [...state.events, { ...action.event, done: false }],
      };
    case "TOGGLE_EVENT":
      return {
        ...state,
        events: state.events.map((event) =>
          event.id === action.id ? { ...event, done: !event.done } : event,
        ),
      };
    case "DELETE_EVENT":
      return {
        ...state,
        events: state.events.filter((event) => event.id !== action.id),
      };
    case "DELIVER":
      return hasReward(state) ? { ...state, delivered: true } : state;
    case "RESET":
      return initialSession();
    default:
      return state;
  }
}
