import test from "node:test";
import assert from "node:assert/strict";
import { initialSession, sessionReducer } from "../src/lib/game.js";
import { loadSession } from "../src/lib/storage.js";

function completeMission() {
  let state = initialSession();
  for (const [index, answer] of [0, 1].entries()) {
    state = sessionReducer(state, { type: "ANSWER", id: "labs-ia", index, answer });
  }
  return state;
}

test("entrega exige missão e conferência presencial explícita", () => {
  assert.equal(sessionReducer(initialSession(), { type: "DELIVER", followChecked: true }).delivered, false);
  const completed = completeMission();
  for (const followChecked of [undefined, false, "true", 1]) {
    assert.equal(sessionReducer(completed, { type: "DELIVER", followChecked }).delivered, false);
  }
  const delivered = sessionReducer(completed, { type: "DELIVER", followChecked: true });
  assert.equal(delivered.delivered, true);
  assert.equal(loadSession(JSON.parse(JSON.stringify(delivered))).delivered, true);
  assert.equal(sessionReducer(delivered, { type: "RESET" }).delivered, false);
});
