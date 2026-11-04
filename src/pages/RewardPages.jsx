import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useExperience } from "../context/ExperienceContext";
import { hasReward } from "../lib/game";
import { Button, Heading, Icon, Mascot, Pill } from "../components/UI";
import { Modal } from "../components/Modal";
export function SuccessPage() {
  const { session } = useExperience();
  const navigate = useNavigate();
  if (!hasReward(session)) return <Navigate to="/experiencias" replace />;
  const last = session.completed[session.lastCompleted];
  return (
    <section className="success-page">
      <div className="success-visual">
        <span className="success-circle">
          <Icon name="check" size={48} />
        </span>
        <span className="success-ray one" />
        <span className="success-ray two" />
        <span className="success-ray three" />
      </div>
      <Pill icon="circleCheck" className="green-pill">
        MISSÃO CONCLUÍDA
      </Pill>
      <Heading title="Você fez novas conexões!">
        Cada descoberta conta.
        <br />
        Seu adesivo já está liberado.
      </Heading>
      <div className="completion-summary">
        <span className="summary-icon">
          <Icon
            name={
              session.lastCompleted?.startsWith("labs") ? "sparkles" : "globe"
            }
            size={24}
          />
        </span>
        <div>
          <small>
            {session.lastCompleted?.startsWith("labs")
              ? "NORYA LABS"
              : "NORYA IDIOMAS"}
          </small>
          <strong>{last?.title}</strong>
        </div>
        <Icon name="circleCheck" size={22} />
      </div>
      <Button icon="gift" onClick={() => navigate("/adesivo")}>
        Ver minha conquista
      </Button>
      <Link className="subtle-link" to="/experiencias">
        Experimentar outra missão
        <Icon name="arrow" size={18} />
      </Link>
    </section>
  );
}
export function RewardPage() {
  const { session, dispatch, notify } = useExperience();
  const [deliveryOpen, setDeliveryOpen] = useState(false);
  if (!hasReward(session)) return <Navigate to="/experiencias" replace />;
  function deliver() {
    dispatch({ type: "DELIVER" });
    setDeliveryOpen(false);
    notify("Entrega registrada nesta visita. Obrigado por participar!");
  }
  return (
    <section className="reward-page">
      <div className="reward-copy">
        <Pill icon={session.delivered ? "done" : "gift"}>
          {session.delivered ? "CONQUISTA CELEBRADA" : "CONQUISTA DESBLOQUEADA"}
        </Pill>
        <h1 tabIndex={-1}>
          {session.delivered ? (
            <>
              Uma lembrança
              <br />
              dessa conexão.
            </>
          ) : (
            <>
              Sua descoberta
              <br />
              virou conquista.
            </>
          )}
        </h1>
        <p>
          {session.delivered
            ? "Seu adesivo foi marcado como entregue nesta visita. Continue explorando tudo o que a Norya pode oferecer."
            : "Mostre esta tela à equipe do estande para receber seu adesivo Norya."}
        </p>
        <div
          className={`delivery-status ${session.delivered ? "delivered" : ""}`}
        >
          <Icon name={session.delivered ? "circleCheck" : "gift"} size={24} />
          <div>
            <strong>
              {session.delivered ? "Adesivo entregue" : "Pronto para retirar"}
            </strong>
            <small>
              {session.delivered
                ? "Obrigado por aprender com a gente."
                : "Entrega pela equipe, conforme disponibilidade."}
            </small>
          </div>
        </div>
        <Link className="button button-primary" to="/explorar">
          Continuar explorando
          <Icon name="arrow" size={20} />
        </Link>
        <Link className="subtle-link" to="/fim">
          Encerrar minha visita
        </Link>
      </div>
      <div className="reward-art">
        <div className="reward-orbit" />
        <div className="physical-sticker">
          <span className="sticker-heading">EU FIZ NOVAS</span>
          <strong>conexões.</strong>
          <Mascot />
          <span className="sticker-wordmark">
            <img
              src={`${import.meta.env.BASE_URL}brand/norya-wordmark.png`}
              alt="Norya, by Lumos Connect"
            />
            <span>REC’N’PLAY</span>
          </span>
        </div>
        <span className="reward-spark one">
          <Icon name="sparkles" size={28} />
        </span>
        <span className="reward-spark two">
          <Icon name="sparkles" size={20} />
        </span>
      </div>
      <div className="staff-action">
        <Icon name="help" size={16} />
        <span>Equipe do estande</span>
        <Button
          variant="ghost"
          disabled={session.delivered}
          onClick={() => setDeliveryOpen(true)}
        >
          {session.delivered ? "Entrega registrada" : "Confirmar entrega"}
        </Button>
      </div>
      {deliveryOpen && (
        <Modal title="Equipe do estande" onClose={() => setDeliveryOpen(false)}>
          <div className="confirmation-content">
            <Icon name="gift" size={38} />
            <h2>Adesivo entregue?</h2>
            <p>
              Confirme depois de entregar o adesivo ao participante. O registro
              vale apenas para esta visita neste navegador.
            </p>
          </div>
          <div className="dialog-actions">
            <Button variant="secondary" onClick={() => setDeliveryOpen(false)}>
              Voltar
            </Button>
            <Button icon="check" onClick={deliver}>
              Marcar como entregue
            </Button>
          </div>
        </Modal>
      )}
    </section>
  );
}
