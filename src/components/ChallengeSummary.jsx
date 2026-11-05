import { getMission } from "../data/content";
import { getMissionStats } from "../lib/quizCore";

export function ChallengeSummary({ session, id }) {
  const stats = getMissionStats(session, id, getMission(id));
  return (
    <dl className="challenge-summary" aria-label="Resumo da missão">
      <div><dt>Etapas concluídas</dt><dd>{stats.completed}/{stats.total}</dd></div>
      <div><dt>Na primeira verificação</dt><dd>{stats.firstChecks}</dd></div>
      <div><dt>Verificações de resposta</dt><dd>{stats.checks}</dd></div>
    </dl>
  );
}
