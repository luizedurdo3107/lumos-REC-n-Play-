import test from "node:test";
import { createId } from "../src/lib/id.js";
import assert from "node:assert/strict";
import { topics, languages, getGuidedReply } from "../src/data/content.js";
import {
  initialSession,
  sessionReducer,
  hasReward,
  evaluateAnswer,
  missionFinished,
  firstUnfinished,
} from "../src/lib/game.js";
import {
  loadSession,
  sanitizeSettings,
  readStored,
  writeStored,
} from "../src/lib/storage.js";

function answer(state, id, index, value) {
  return sessionReducer(state, {
    type: "ANSWER",
    id,
    index,
    answer: value,
    at: "2026-11-01T12:00:00Z",
  });
}
test("não libera adesivo sem missão completa nem deixa pular a primeira atividade", () => {
  let state = initialSession();
  state = answer(state, "labs-ia", 1, 1);
  assert.equal(hasReward(state), false);
  assert.equal(state.missions["labs-ia"], undefined);
  state = answer(state, "labs-ia", 0, 0);
  assert.equal(firstUnfinished(state, "labs-ia"), 1);
  assert.equal(hasReward(state), false);
  state = answer(state, "labs-ia", 1, 1);
  assert.equal(hasReward(state), true);
  assert.equal(missionFinished(state, "labs-ia"), true);
  assert.equal(Object.keys(state.completed).length, 1);
});
test("dá novas tentativas, sem duplicar a conquista nem alterar resposta já concluída", () => {
  let state = answer(initialSession(), "labs-ia", 0, 2);
  assert.equal(state.missions["labs-ia"].answers[0].correct, false);
  state = answer(state, "labs-ia", 0, 0);
  assert.equal(state.missions["labs-ia"].answers[0].attempts, 2);
  state = answer(state, "labs-ia", 1, 1);
  const completed = state;
  state = answer(state, "labs-ia", 1, 0);
  assert.equal(state, completed);
  assert.equal(Object.keys(state.completed).length, 1);
});
test("uma missão de qualquer módulo já libera a conquista", () => {
  for (const [module, items] of [
    ["labs", topics],
    ["idiomas", languages],
  ]) {
    for (const item of items) {
      let state = initialSession();
      item.questions.forEach((question, index) => {
        state = answer(
          state,
          `${module}-${item.id}`,
          index,
          question.type === "match"
            ? question.pairs.map((pair) => pair.id)
            : question.answer,
        );
      });
      assert.equal(hasReward(state), true, `${module}-${item.id}`);
      const restored = loadSession(JSON.parse(JSON.stringify(state)));
      assert.equal(missionFinished(restored, `${module}-${item.id}`), true);
    }
  }
});
test("montagem respeita a ordem e associações exigem todos os pares, sem duplicatas", () => {
  const [order, match] = languages[0].questions;
  assert.equal(evaluateAnswer(order, ["morning", "good"]), false);
  assert.equal(evaluateAnswer(order, ["good", "morning"]), true);
  assert.equal(evaluateAnswer(match, ["hello", "hello", "hello"]), false);
  assert.equal(evaluateAnswer(match, ["hello", "bye", "thanks"]), true);
});
test("conversa guiada responde ao tema e explica os limites em perguntas não cobertas", () => {
  for (const topic of topics) {
    assert.equal(getGuidedReply(topic, "Me dê um exemplo"), topic.example);
    assert.equal(
      getGuidedReply(topic, "Explique de outro jeito"),
      topic.simple,
    );
    assert.equal(getGuidedReply(topic, "Faça um resumo"), topic.takeaway);
    assert.match(
      getGuidedReply(topic, "Uma pergunta fora do roteiro"),
      /demonstração/,
    );
  }
});
test("reinício limpa entregas, progresso, coleções e agenda", () => {
  let state = answer(
    answer(initialSession(), "labs-ia", 0, 0),
    "labs-ia",
    1,
    1,
  );
  state = sessionReducer(state, { type: "SAVE", id: "labs-ia" });
  state = sessionReducer(state, {
    type: "ADD_EVENT",
    event: { id: "a", title: "Aprender", date: "2026-11-01", time: "15:00" },
  });
  state = sessionReducer(state, { type: "DELIVER" });
  assert.equal(state.delivered, true);
  assert.deepEqual(sessionReducer(state, { type: "RESET" }), initialSession());
});
test("não aceita entrega sem conquista nem confiança em um completed salvo isoladamente", () => {
  assert.equal(
    sessionReducer(initialSession(), { type: "DELIVER" }).delivered,
    false,
  );
  const restored = loadSession({
    ...initialSession(),
    completed: { "labs-ia": {} },
    delivered: true,
  });
  assert.equal(hasReward(restored), false);
  assert.equal(restored.delivered, false);
});
test("preferências e sessão corrompidas não interrompem a experiência", () => {
  assert.equal(
    sanitizeSettings({
      fontSize: 900,
      lineHeight: NaN,
      theme: "other",
      contrast: "yes",
    }).fontSize,
    24,
  );
  assert.equal(sanitizeSettings({ theme: "other" }).theme, "light");
  assert.deepEqual(loadSession(null), initialSession());
  assert.deepEqual(
    loadSession({
      version: 2,
      missions: {},
      completed: null,
      saved: null,
      collections: null,
      events: null,
    }),
    initialSession(),
  );
  const blocked = {
    getItem() {
      throw new Error("blocked");
    },
    setItem() {
      throw new Error("blocked");
    },
  };
  assert.equal(readStored(blocked, "key", "fallback"), "fallback");
  assert.doesNotThrow(() => writeStored(blocked, "key", {}));
});

test("lembretes e coleções também recebem IDs únicos sem HTTPS", () => {
  const values = Array.from({ length: 100 }, () => createId("note", {}));
  assert.equal(new Set(values).size, 100);
  assert.ok(values.every((value) => value.startsWith("note-")));
});
