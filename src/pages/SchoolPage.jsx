import { Link } from "react-router-dom";
import { useExperience } from "../context/ExperienceContext";
import { EmptyState, Heading, Icon, Pill } from "../components/UI";
import { topics, languages } from "../data/content";
export function SchoolPage() {
  const { session } = useExperience();
  const completed = Object.entries(session.completed);
  const rows = [
    ...topics.map((topic) => ({
      id: `labs-${topic.id}`,
      name: topic.title,
      module: "Norya Labs",
      icon: topic.icon,
    })),
    ...languages.map((language) => ({
      id: `idiomas-${language.id}`,
      name: language.title,
      module: "Norya Idiomas",
      icon: "globe",
    })),
  ].filter((row) => session.missions[row.id]);
  return (
    <section className="school-page">
      <Heading
        label="VISÃO DA ESCOLA"
        title="Cada caminho merece atenção."
        align="left"
      >
        Uma visão das descobertas feitas nesta visita.
      </Heading>
      <div className="school-notice">
        <Icon name="help" size={19} />
        <p>
          Demonstração com as ações deste visitante. Nenhum dado de estudante
          real.
        </p>
      </div>
      <div className="metrics-grid">
        {[
          {
            value: completed.length,
            label: "Missões concluídas",
            icon: "circleCheck",
            color: "blue",
          },
          {
            value: session.saved.length,
            label: "Descobertas salvas",
            icon: "bookmark",
            color: "purple",
          },
          {
            value: session.events.length,
            label: "Próximos passos",
            icon: "calendar",
            color: "green",
          },
        ].map((metric) => (
          <div className={`metric-card ${metric.color}`} key={metric.label}>
            <span>
              <Icon name={metric.icon} size={23} />
            </span>
            <strong>{metric.value}</strong>
            <p>{metric.label}</p>
          </div>
        ))}
      </div>
      <div className="journey-table">
        <div className="table-heading">
          <h2>Caminhos explorados</h2>
          <Pill>
            {rows.length} {rows.length === 1 ? "experiência" : "experiências"}
          </Pill>
        </div>
        {rows.length ? (
          <div className="journey-rows">
            {rows.map((row) => {
              const count = Object.values(
                session.missions[row.id]?.answers || {},
              ).filter((answer) => answer.correct).length;
              return (
                <div className="journey-row" key={row.id}>
                  <span className="journey-icon">
                    <Icon name={row.icon} />
                  </span>
                  <div className="journey-name">
                    <strong>{row.name}</strong>
                    <small>{row.module}</small>
                  </div>
                  <div className="journey-progress">
                    <span style={{ width: `${count * 50}%` }} />
                  </div>
                  <span
                    className={`journey-status ${session.completed[row.id] ? "complete" : ""}`}
                  >
                    {session.completed[row.id] ? "Concluída" : "Em descoberta"}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState icon="school" title="Os primeiros passos aparecem aqui.">
            Experimente uma missão para acompanhar as descobertas desta visita.
          </EmptyState>
        )}
      </div>
      <div className="page-bottom">
        <p className="quiet-meta">
          Participação e progresso, sem competição entre pessoas.
        </p>
        <Link className="button button-primary" to="/experiencias">
          Explorar uma missão
          <Icon name="arrow" size={20} />
        </Link>
      </div>
    </section>
  );
}
