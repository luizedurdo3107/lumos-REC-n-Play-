import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Feathers,
  Heading,
  Icon,
  Mascot,
  Pill,
} from "../components/UI";

export function WelcomePage() {
  const navigate = useNavigate();
  return (
    <section className="welcome-page">
      <div className="welcome-copy">
        <Pill className="welcome-pill">
          <span className="live-dot" /> UM ENCONTRO COM NOVAS POSSIBILIDADES
        </Pill>
        <h1 tabIndex={-1}>
          Bem-vindo<span className="accent-period">!</span>
        </h1>
        <p>
          Prepare-se para explorar, aprender
          <br className="desktop-only" /> e descobrir novas possibilidades.
        </p>
        <Button
          icon="arrow"
          className="welcome-button"
          onClick={() => navigate("/norya")}
        >
          Começar experiência
        </Button>
        <div className="welcome-note">
          <span className="tiny-line" />
          <span>
            Uma criação da <strong>Lumos Connect.</strong>
          </span>
        </div>
      </div>
      <div className="welcome-art">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="art-spark spark-one">
          <Icon name="sparkles" size={37} />
        </div>
        <div className="art-spark spark-two">
          <Icon name="sparkles" size={24} />
        </div>
        <Mascot lumos />
        <span className="mascot-ground" />
      </div>
    </section>
  );
}
export function IntroPage() {
  const navigate = useNavigate();
  return (
    <section className="intro-page">
      <Pill icon="sparkles">APRENDER PODE SER DO SEU JEITO</Pill>
      <Heading title="Conheça a Norya.">
        Uma experiência que se adapta
        <br className="desktop-only" /> ao seu jeito de aprender.
      </Heading>
      <div className="intro-art">
        <div className="bird-orbit" />
        <Mascot />
        <span className="intro-spark one">
          <Icon name="sparkles" size={28} />
        </span>
        <span className="intro-spark two">
          <Icon name="sparkles" size={20} />
        </span>
      </div>
      <p className="intro-invitation">
        Conclua as 3 etapas de uma missão e siga @lumos.connect para retirar seu adesivo.
      </p>
      <Button icon="arrow" onClick={() => navigate("/experiencias")}>
        Escolher experiência
      </Button>
      <p className="tiny-note">
        Sem cronômetro. Com espaço para tentar de novo.
      </p>
    </section>
  );
}
export function ExperiencePage() {
  const [selected, setSelected] = useState("labs");
  const navigate = useNavigate();
  return (
    <section className="experience-page">
      <Heading
        label="SUA PRÓXIMA DESCOBERTA"
        title="Qual caminho vamos explorar?"
      >
        Escolha seu caminho: cada missão tem 3 etapas, com dicas e novas tentativas.
      </Heading>
      <fieldset className="experience-options">
        <legend className="sr-only">Escolha sua experiência</legend>
        {[
          {
            id: "labs",
            title: "Norya Labs",
            tag: "Inteligência artificial",
            text: "Explore um assunto, peça explicações e resolva um desafio com ajuda.",
            icon: "chat",
            detail: "Curiosidade que vira conhecimento",
          },
          {
            id: "idiomas",
            title: "Norya Idiomas",
            tag: "Aprendizagem de idiomas",
            text: "Conheça novas expressões e pratique com atividades interativas.",
            icon: "globe",
            detail: "Novas palavras, novas conexões",
          },
        ].map((item) => (
          <label
            className={`experience-card ${selected === item.id ? "is-selected" : ""}`}
            key={item.id}
          >
            <input
              type="radio"
              name="experience"
              value={item.id}
              checked={selected === item.id}
              onChange={() => setSelected(item.id)}
            />
            <span className="experience-icon">
              <Icon name={item.icon} size={42} />
            </span>
            <span className="card-category">{item.tag}</span>
            <h2>{item.title}</h2>
            <p>{item.text}</p>
            <div className="card-bottom">
              <span className="choice-check">
                <Icon name="check" size={18} />
              </span>
              <small>{item.detail}</small>
            </div>
          </label>
        ))}
      </fieldset>
      <div className="page-bottom">
        <Link className="subtle-link" to="/explorar">
          <Icon name="book" size={18} />
          Conhecer outros recursos
        </Link>
        <Button icon="arrow" onClick={() => navigate(`/${selected}`)}>
          Começar missão
        </Button>
      </div>
    </section>
  );
}
export function ExtrasPage() {
  return (
    <section className="extras-page">
      <Heading label="A EXPERIÊNCIA CONTINUA" title="Tem mais para descobrir.">
        Conheça outras possibilidades da Norya, no seu ritmo.
      </Heading>
      <div className="extra-grid">
        {[
          {
            to: "/biblioteca",
            icon: "book",
            title: "Biblioteca",
            text: "Guarde descobertas e organize suas coleções.",
            color: "blue",
          },
          {
            to: "/agenda",
            icon: "calendar",
            title: "Agenda",
            text: "Transforme curiosidade em um próximo passo.",
            color: "purple",
          },
          {
            to: "/escola",
            icon: "school",
            title: "Visão da escola",
            text: "Acompanhe os caminhos desta visita.",
            color: "green",
          },
        ].map((item) => (
          <Link
            to={item.to}
            className={`extra-card ${item.color}`}
            key={item.to}
          >
            <span className="module-icon">
              <Icon name={item.icon} size={30} />
            </span>
            <h2>{item.title}</h2>
            <p>{item.text}</p>
            <span className="card-link">
              Explorar
              <Icon name="arrow" size={19} />
            </span>
          </Link>
        ))}
      </div>
      <div className="page-bottom">
        <Link className="subtle-link" to="/fim">
          Encerrar minha visita
        </Link>
        <Link className="button button-primary" to="/experiencias">
          Escolher outra missão
          <Icon name="arrow" size={20} />
        </Link>
      </div>
    </section>
  );
}
export function EndPage() {
  const navigate = useNavigate();
  return (
    <section className="end-page">
      <div className="end-art">
        <Mascot />
        <span className="end-stamp">
          <Icon name="check" size={30} />
        </span>
      </div>
      <Heading
        label="OBRIGADO POR ESTAR AQUI"
        title={
          <>
            Essa conexão
            <br />é só o começo.
          </>
        }
      >
        Muitos caminhos. O seu ritmo.
        <br />
        Uma experiência Norya, por Lumos Connect.
      </Heading>
      <Button icon="arrow" onClick={() => navigate("/experiencias")}>
        Continuar minha visita
      </Button>
      <Feathers />
    </section>
  );
}
