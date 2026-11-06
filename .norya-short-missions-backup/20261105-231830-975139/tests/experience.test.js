import test from "node:test";
import assert from "node:assert/strict";
import { createId } from "../src/lib/id.js";
import { catalog, topics, languages, getMission, getGuidedReply } from "../src/data/content.js";
import { initialSession, sessionReducer, hasReward, evaluateAnswer, canSubmit, missionFinished, firstUnfinished } from "../src/lib/game.js";
import { getMissionStats } from "../src/lib/quizCore.js";
import { loadSession, sanitizeSettings, readStored, writeStored } from "../src/lib/storage.js";

const solution = question => question.type === "match" ? question.pairs.map(pair => pair.id) : question.answer;
function answer(state, id, index, value) {
  return sessionReducer(state, { type: "ANSWER", id, index, answer: value, at: "2026-11-04T12:00:00Z" });
}
function finish(id, state=initialSession()) {
  getMission(id).questions.forEach((question, index) => { state=answer(state,id,index,solution(question)); });
  return state;
}

test("cada caminho tem seis etapas, IDs únicos e respostas válidas", () => {
  assert.equal(catalog.length, 5);
  const ids=new Set();
  for (const item of catalog) {
    assert.equal(item.questions.length,6,item.id);
    for (const q of item.questions) {
      assert.ok(q.context && q.stage && q.hint && q.explanation, q.id);
      assert.ok(!ids.has(q.id),q.id); ids.add(q.id);
      assert.equal(canSubmit(q,solution(q)),true,q.id);
      assert.equal(evaluateAnswer(q,solution(q)),true,q.id);
      if (q.type === "choice" || q.type === "multi") assert.equal(q.options.length,4);
      if (q.type === "order") {
        assert.equal(q.tokens.length,q.answer.length+1);
        assert.equal(new Set(q.tokens.map(token=>token.id)).size,q.tokens.length);
      }
      if (q.type === "match") assert.deepEqual([...q.rightOrder].sort(),q.pairs.map(pair=>pair.id).sort());
    }
  }
  assert.equal(ids.size,30);
});
test("não permite pular etapas, índices inválidos ou prêmio com duas respostas", () => {
  let state=initialSession(); const mission=getMission("labs-ia");
  for (const index of [-1,0.5,"0",99]) assert.equal(answer(state,"labs-ia",index,1),state);
  assert.equal(answer(state,"labs-ia",1,solution(mission.questions[1])),state);
  state=answer(state,"labs-ia",0,solution(mission.questions[0]));
  assert.equal(firstUnfinished(state,"labs-ia"),1);
  state=answer(state,"labs-ia",1,solution(mission.questions[1]));
  assert.equal(hasReward(state),false);
  assert.equal(missionFinished(state,"labs-ia"),false);
});
test("novas tentativas são contadas sem duplicar respostas corretas", () => {
  let state=answer(initialSession(),"labs-ia",0,0);
  assert.equal(state.missions["labs-ia"].answers[0].correct,false);
  state=answer(state,"labs-ia",0,1);
  assert.equal(state.missions["labs-ia"].answers[0].attempts,2);
  assert.equal(answer(state,"labs-ia",0,0),state);
  const done=finish("labs-ia",state);
  assert.equal(Object.keys(done.completed).length,1);
  assert.deepEqual(getMissionStats(done,"labs-ia",getMission("labs-ia")),{total:6,completed:6,firstChecks:5,checks:7});
});
test("múltipla seleção exige conjunto exato e rejeita duplicatas e tipos inválidos", () => {
  const q=getMission("labs-ia").questions[1];
  assert.equal(evaluateAnswer(q,[2,0]),true);
  for (const value of [[0],[0,1,2,3],[0,0],[0,"2"],[-1,2],[99],null,{},"0,2"]) assert.equal(evaluateAnswer(q,value),false);
  for (const value of [[],[0,0],["0"],[-1],[Infinity],null,{}]) assert.equal(canSubmit(q,value),false);
});
test("ordenação exige sequência inteira e associação exige pares distintos", () => {
  const order=getMission("labs-ia").questions[2];
  assert.equal(evaluateAnswer(order,[...order.answer].reverse()),false);
  assert.equal(evaluateAnswer(order,order.answer.slice(0,2)),false);
  assert.equal(canSubmit(order,[order.answer[0],order.answer[0]]),false);
  assert.equal(canSubmit(order,["desconhecido"]),false);
  const match=getMission("labs-ia").questions[3];
  assert.equal(evaluateAnswer(match,match.pairs.map(pair=>pair.id)),true);
  assert.equal(evaluateAnswer(match,Array(4).fill(match.pairs[0].id)),false);
});
test("todos os cinco caminhos podem ser concluídos e restaurados", () => {
  for (const item of catalog) {
    const done=finish(item.id);
    assert.equal(hasReward(done),true,item.id);
    assert.equal(missionFinished(loadSession(JSON.parse(JSON.stringify(done))),item.id),true,item.id);
  }
});
test("dados inválidos e completed forjado não liberam a conquista", () => {
  const state=initialSession();
  assert.equal(sessionReducer(state,{type:"DELIVER",followChecked:true}),state);
  const loaded=loadSession({...state,completed:{"labs-ia":{}},delivered:true});
  assert.equal(hasReward(loaded),false); assert.equal(loaded.delivered,false);
  const done=finish("labs-ia");
  const tampered=structuredClone(done);tampered.missions["labs-ia"].answers[2].value=["inventado"];
  assert.equal(missionFinished(tampered,"labs-ia"),false);
  assert.equal(hasReward(loadSession(tampered)),false);
});
test("revisão nova descarta respostas antigas preservando coleção, agenda e preferências", () => {
  const old={...finish("labs-ia"),challengeRevision:undefined, saved:[{id:"labs-ia",collection:"minhas"}],events:[{id:"a",title:"Aprender",date:"2026-11-04",time:"15:00",done:false}],delivered:true};
  const restored=loadSession(old);
  assert.equal(hasReward(restored),false);assert.equal(restored.delivered,false);
  assert.equal(restored.saved.length,1);assert.equal(restored.events.length,1);
});
test("reinício limpa a visita e mantém uma sessão válida", () => {
  let state=finish("labs-ia");
  state=sessionReducer(state,{type:"SAVE",id:"labs-ia"});
  state=sessionReducer(state,{type:"ADD_EVENT",event:{id:"a",title:"Aprender",date:"2026-11-04",time:"15:00"}});
  state=sessionReducer(state,{type:"DELIVER",followChecked:true});
  assert.equal(state.delivered,true);
  assert.deepEqual(sessionReducer(state,{type:"RESET"}),initialSession());
});
test("conversa guiada e vocabulário continuam disponíveis", () => {
  for (const topic of topics) {
    assert.equal(getGuidedReply(topic,"Me dê um exemplo"),topic.example);
    assert.equal(getGuidedReply(topic,"Explique de outro jeito"),topic.simple);
    assert.equal(getGuidedReply(topic,"Faça um resumo"),topic.takeaway);
    assert.match(getGuidedReply(topic,"Uma pergunta fora do roteiro"),/demonstração/);
  }
  for (const language of languages) assert.equal(language.words.length,8);
});
test("sessões corrompidas e armazenamento bloqueado não interrompem o uso", () => {
  assert.equal(sanitizeSettings({fontSize:900,lineHeight:NaN,theme:"other",contrast:"yes"}).fontSize,24);
  assert.deepEqual(loadSession(null),initialSession());
  assert.deepEqual(loadSession({version:2,missions:{},completed:null,saved:null,collections:null,events:null}),initialSession());
  const blocked={getItem(){throw Error("blocked")},setItem(){throw Error("blocked")}};
  assert.equal(readStored(blocked,"key","fallback"),"fallback");
  assert.doesNotThrow(()=>writeStored(blocked,"key",{}));
});
test("IDs de agenda e coleções continuam únicos", () => {
  const values=Array.from({length:100},()=>createId("note",{}));
  assert.equal(new Set(values).size,100);
});
