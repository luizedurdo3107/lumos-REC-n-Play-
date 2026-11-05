import { getMission } from "../data/content.js";
import { CHALLENGE_REVISION } from "../data/challenges.js";
import { evaluateAnswer, canSubmit } from "./quizCore.js";
export { evaluateAnswer, canSubmit } from "./quizCore.js";

// Validação compartilhada em quizCore.js.
export function missionFinished(session, id) {
  const mission = getMission(id);
  return Boolean(
    mission && mission.questions.length > 0 &&
    mission.questions.every((question, index) => {
      const answer = session.missions[id]?.answers[index];
      return answer?.correct === true && evaluateAnswer(question, answer.value);
    }),
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
  challengeRevision: CHALLENGE_REVISION,
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
      if (!Number.isInteger(action.index) || action.index < 0) return state;
      const data = getMission(action.id);
      const question = data?.questions[action.index];
      const current = state.missions[action.id] || {
        answers: {},
        messages: [],
      };
      if (!question || current.answers[action.index]?.correct || !canSubmit(question, action.answer)) return state;
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
      return hasReward(state) && action.followChecked === true
        ? { ...state, delivered: true }
        : state;
    case "RESET":
      return initialSession();
    default:
      return state;
  }
}
