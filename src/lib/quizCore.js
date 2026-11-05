export function canSubmit(question, answer) {
  if (!question || typeof question !== "object") return false;
  if (question.type === "choice")
    return Number.isInteger(answer) && answer >= 0 && answer < question.options.length;
  if (!Array.isArray(answer) || new Set(answer).size !== answer.length) return false;
  if (question.type === "multi")
    return answer.length > 0 && answer.every(value => Number.isInteger(value) && value >= 0 && value < question.options.length);
  if (question.type === "order")
    return answer.length > 0 && answer.every(value => question.tokens.some(token => token.id === value));
  if (question.type === "match")
    return answer.length === question.pairs.length && question.pairs.every(pair => answer.includes(pair.id));
  return false;
}

export function evaluateAnswer(question, answer) {
  if (!canSubmit(question, answer)) return false;
  if (question.type === "choice") return answer === question.answer;
  if (question.type === "multi")
    return answer.length === question.answer.length && question.answer.every(value => answer.includes(value));
  if (question.type === "order")
    return answer.length === question.answer.length && answer.every((value, index) => value === question.answer[index]);
  return question.type === "match";
}

export function getMissionStats(session, id, mission) {
  const answers = session.missions[id]?.answers || {};
  const valid = mission?.questions.map((question, index) => ({
    answer: answers[index],
    correct: answers[index]?.correct === true && evaluateAnswer(question, answers[index]?.value),
  })) || [];
  return {
    total: valid.length,
    completed: valid.filter(item => item.correct).length,
    firstChecks: valid.filter(item => item.correct && item.answer.attempts === 1).length,
    checks: valid.reduce((sum, item) => sum + (Number.isFinite(item.answer?.attempts) ? item.answer.attempts : 0), 0),
  };
}
