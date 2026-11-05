import { initialSession, evaluateAnswer, missionFinished } from "./game.js";
import { CHALLENGE_REVISION } from "../data/challenges.js";
import { catalog, getMission } from "../data/content.js";
export const defaultSettings = {
  fontSize: 18,
  lineHeight: 1.6,
  letterSpacing: 0,
  theme: "light",
  contrast: false,
  monochrome: false,
  focus: false,
  reduceMotion: false,
  hideEffects: false,
  keyboard: false,
  narration: false,
  speed: 1,
  controlSize: "comfortable",
};
export function readStored(storage, key, fallback) {
  try {
    return JSON.parse(storage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
}
export function writeStored(storage, key, value) {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch {
    /* A demonstração continua quando o armazenamento está bloqueado. */
  }
}
export function sanitizeSettings(input = {}) {
  if (!input || typeof input !== "object") input = {};
  const safe = { ...defaultSettings };
  for (const key of [
    "contrast",
    "monochrome",
    "focus",
    "reduceMotion",
    "hideEffects",
    "keyboard",
    "narration",
  ])
    safe[key] = input[key] === true;
  const ranges = {
    fontSize: [16, 24],
    lineHeight: [1.4, 2.1],
    letterSpacing: [0, 2],
    speed: [0.6, 1.4],
  };
  for (const [key, [min, max]] of Object.entries(ranges))
    if (typeof input[key] === "number" && Number.isFinite(input[key]))
      safe[key] = Math.min(max, Math.max(min, input[key]));
  if (["light", "dark", "sepia"].includes(input.theme))
    safe.theme = input.theme;
  if (["compact", "comfortable", "large"].includes(input.controlSize))
    safe.controlSize = input.controlSize;
  return safe;
}
export function loadSession(input) {
  const fresh = initialSession();
  if (
    !input ||
    input.version !== 2 ||
    !input.missions ||
    typeof input.missions !== "object"
  )
    return fresh;
  const known = new Set(catalog.map((item) => item.id));
  for (const [id, stored] of Object.entries(input.missions)) {
    if (!known.has(id) || !stored || typeof stored !== "object") continue;
    const data = getMission(id);
    const answers = {};
    for (let index = 0; index < data.questions.length; index += 1) {
      if (input.challengeRevision !== CHALLENGE_REVISION) break;
      const answer = stored.answers?.[index];
      if (!answer || (index > 0 && !answers[index - 1]?.correct)) continue;
      answers[index] = {
        value: answer.value,
        correct: evaluateAnswer(data.questions[index], answer.value),
        attempts: Math.max(1, Math.min(999, Number(answer.attempts) || 1)),
      };
    }
    const messages = Array.isArray(stored.messages)
      ? stored.messages
          .filter(
            (message) =>
              ["user", "assistant"].includes(message?.role) &&
              typeof message.text === "string",
          )
          .slice(-24)
          .map((message) => ({
            role: message.role,
            text: message.text.slice(0, 1200),
          }))
      : [];
    fresh.missions[id] = { answers, messages };
    if (missionFinished(fresh, id))
      fresh.completed[id] = {
        title: data.title,
        at:
          typeof input.completed?.[id]?.at === "string"
            ? input.completed[id].at
            : null,
      };
  }
  const collectionIds = new Set(["minhas"]);
  for (const collection of Array.isArray(input.collections)
    ? input.collections
    : []) {
    if (
      !collection ||
      typeof collection.id !== "string" ||
      typeof collection.name !== "string" ||
      !collection.name.trim() ||
      collectionIds.has(collection.id)
    )
      continue;
    collectionIds.add(collection.id);
    fresh.collections.push({
      id: collection.id.slice(0, 80),
      name: collection.name.slice(0, 45),
    });
  }
  const savedIds = new Set();
  for (const item of Array.isArray(input.saved) ? input.saved : []) {
    if (!known.has(item?.id) || savedIds.has(item.id)) continue;
    savedIds.add(item.id);
    fresh.saved.push({
      id: item.id,
      collection: collectionIds.has(item.collection)
        ? item.collection
        : "minhas",
    });
  }
  fresh.events = (Array.isArray(input.events) ? input.events : [])
    .filter(
      (event) =>
        event &&
        typeof event.id === "string" &&
        typeof event.title === "string" &&
        event.title.trim() &&
        /^\d{4}-\d{2}-\d{2}$/.test(event.date) &&
        /^([01]\d|2[0-3]):[0-5]\d$/.test(event.time),
    )
    .map((event) => ({
      id: event.id,
      title: event.title.slice(0, 90),
      date: event.date,
      time: event.time,
      done: event.done === true,
    }));
  fresh.lastCompleted = fresh.completed[input.lastCompleted]
    ? input.lastCompleted
    : Object.keys(fresh.completed).at(-1) || null;
  fresh.delivered =
    input.delivered === true && Object.keys(fresh.completed).length > 0;
  return fresh;
}
export function dateKey(date = new Date()) {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}
