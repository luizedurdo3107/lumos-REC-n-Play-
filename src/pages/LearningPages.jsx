import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Button, Heading, Icon, Mascot, Pill } from "../components/UI";
import { TextInput } from "../components/VirtualInput";
import { useExperience } from "../context/ExperienceContext";
import {
  findLanguage,
  findTopic,
  getGuidedReply,
  languages,
  topics,
} from "../data/content";
import { canSubmit, firstUnfinished } from "../lib/game";
import { useSpeech } from "../lib/useSpeech";

export function TopicPage() {
  const [selected, setSelected] = useState("ia");
  const navigate = useNavigate();
  const { dispatch } = useExperience();
  return (
    <section>
      <Heading label="NORYA LABS" title="O que você quer descobrir?">
        Escolha um assunto. A curiosidade faz o resto.
      </Heading>
      <fieldset className="topic-options">
        <legend className="sr-only">Assunto da missão</legend>
        {topics.map((topic, index) => (
          <label
            className={`topic-card ${selected === topic.id ? "is-selected" : ""}`}
            key={topic.id}
          >
            <input
              type="radio"
              name="topic"
              value={topic.id}
              checked={selected === topic.id}
              onChange={() => setSelected(topic.id)}
            />
            <div className={`topic-art topic-art-${topic.id}`}>
              <Icon name={topic.icon} size={76} />
              <span className="art-ring" />
              <i className="art-dot one" />
              <i className="art-dot two" />
            </div>
            <span className="topic-number">0{index + 1}</span>
            <h2>{topic.title}</h2>
            <p>{topic.description}</p>
            <span className="choice-check">
              <Icon name="check" size={18} />
            </span>
          </label>
        ))}
      </fieldset>
      <div className="page-bottom">
        <span className="quiet-meta">
          <Icon name="bulb" size={18} />
          Uma descoberta por vez.
        </span>
        <Button
          icon="arrow"
          onClick={() => {
            dispatch({ type: "START", id: `labs-${selected}` });
            navigate(`/labs/${selected}`);
          }}
        >
          Explorar assunto
        </Button>
      </div>
    </section>
  );
}
export function LabsPage() {
  const { topicId } = useParams();
  const topic = findTopic(topicId);
  if (!topic) return <Navigate to="/labs" replace />;
  return <LabsWorkspace key={topicId} topic={topic} />;
}
function LabsWorkspace({ topic }) {
  const id = `labs-${topic.id}`;
  const { session, dispatch, saveContent } = useExperience();
  const [input, setInput] = useState("");
  const { speak, stop, speaking } = useSpeech();
  const navigate = useNavigate();
  const chatScroll = useRef(null);
  const messages = session.missions[id]?.messages || [];
  const saved = session.saved.some((item) => item.id === id);
  useEffect(() => {
    dispatch({ type: "START", id });
  }, [id]);
  useEffect(() => {
    if (messages.length && chatScroll.current)
      chatScroll.current.scrollTo({
        top: chatScroll.current.scrollHeight,
        behavior: "instant",
      });
  }, [messages.length]);
  function send(text) {
    if (!text.trim()) return;
    dispatch({
      type: "MESSAGE",
      id,
      messages: [
        { role: "user", text: text.trim() },
        { role: "assistant", text: getGuidedReply(topic, text) },
      ],
    });
    setInput("");
  }
  return (
    <section className="labs-page">
      <div className="workspace-heading">
        <Pill icon="sparkles">Norya Labs</Pill>
        <h1 tabIndex={-1}>Vamos entender juntos.</h1>
        <p>Um assunto. Diferentes formas de aprender.</p>
      </div>
      <div className="labs-workspace">
        <aside className="labs-discovery">
          <span className="eyebrow">SUA DESCOBERTA</span>
          <span className={`discovery-icon ${topic.id}`}>
            <Icon name={topic.icon} size={30} />
          </span>
          <h2>{topic.title}</h2>
          <p>{topic.short}</p>
          <Mascot />
          <span className="discovery-note">
            <Icon name="bulb" size={18} />
            Pode perguntar de outro jeito.
          </span>
        </aside>
        <div className="chat-panel">
          <div className="chat-top">
            <span>
              <span className="chat-status" />
              Conversa guiada
            </span>
            <Pill>Demonstração</Pill>
          </div>
          <div
            ref={chatScroll}
            className="chat-messages"
            aria-label="Conversa sobre o assunto"
            aria-live="polite"
            aria-relevant="additions"
          >
            <div className="message assistant">
              <span className="message-avatar">
                <Icon name="sparkles" size={18} />
              </span>
              <div>
                <small>NORYA LABS</small>
                <p>{topic.intro}</p>
              </div>
            </div>
            {messages.map((message, index) => (
              <div
                className={`message ${message.role}`}
                key={`${index}-${message.role}`}
              >
                {message.role === "assistant" && (
                  <span className="message-avatar">
                    <Icon name="sparkles" size={18} />
                  </span>
                )}
                <div>
                  {message.role === "assistant" && <small>NORYA LABS</small>}
                  <p>{message.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="chat-suggestions">
            {[
              "Me dê um exemplo",
              "Explique de outro jeito",
              "Faça um resumo",
            ].map((text) => (
              <button key={text} onClick={() => send(text)}>
                {text}
                <Icon name="plus" size={15} />
              </button>
            ))}
          </div>
          <form
            className="chat-form"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <TextInput
              value={input}
              onChange={setInput}
              maxLength={220}
              aria-label="Sua pergunta sobre o assunto"
              placeholder="O que você quer entender?"
            />
            <Button
              variant="icon"
              icon="send"
              aria-label="Enviar pergunta"
              type="submit"
              disabled={!input.trim()}
            />
          </form>
          <p className="chat-caption">
            Conversa com respostas preparadas para esta experiência.
          </p>
        </div>
      </div>
      <div className="workspace-actions">
        <div className="inline-actions">
          <Button
            variant="ghost"
            icon={saved ? "check" : "bookmark"}
            onClick={() => saveContent(id)}
          >
            {saved ? "Salvo na biblioteca" : "Salvar descoberta"}
          </Button>
          <Button
            variant="ghost"
            icon={speaking ? "mute" : "volume"}
            onClick={() =>
              speaking
                ? stop()
                : speak(
                    [
                      topic.intro,
                      ...messages
                        .filter((message) => message.role === "assistant")
                        .map((message) => message.text),
                    ].join(" "),
                  )
            }
          >
            {speaking ? "Parar leitura" : "Ouvir explicação"}
          </Button>
        </div>
        <Button
          icon="arrow"
          onClick={() =>
            navigate(
              `/labs/${topic.id}/desafio/${firstUnfinished(session, id)}`,
            )
          }
        >
          Ir para o desafio
        </Button>
      </div>
    </section>
  );
}
export function LanguagesPage() {
  const [selected, setSelected] = useState("en");
  const navigate = useNavigate();
  const { dispatch } = useExperience();
  return (
    <section className="languages-page">
      <Heading label="NORYA IDIOMAS" title="Toda conexão começa com um olá.">
        Qual idioma você quer experimentar?
      </Heading>
      <fieldset className="language-options">
        <legend className="sr-only">Escolha um idioma</legend>
        {languages.map((language) => (
          <label
            className={`language-card ${selected === language.id ? "is-selected" : ""}`}
            key={language.id}
          >
            <input
              type="radio"
              name="language"
              checked={selected === language.id}
              onChange={() => setSelected(language.id)}
            />
            <span className="language-code">{language.id.toUpperCase()}</span>
            <div className="language-greeting" lang={language.id}>
              {language.hello}
            </div>
            <h2>{language.title}</h2>
            <p>{language.description}</p>
            <span className="choice-check">
              <Icon name="check" size={18} />
            </span>
          </label>
        ))}
      </fieldset>
      <div className="page-bottom">
        <span className="quiet-meta">
          <Icon name="volume" size={19} />
          Com áudio e apoio em texto.
        </span>
        <Button
          icon="arrow"
          onClick={() => {
            dispatch({ type: "START", id: `idiomas-${selected}` });
            navigate(`/idiomas/${selected}`);
          }}
        >
          Começar descoberta
        </Button>
      </div>
    </section>
  );
}
export function LanguageLessonPage() {
  const { languageId } = useParams();
  const language = findLanguage(languageId);
  if (!language) return <Navigate to="/idiomas" replace />;
  return <LanguageLesson key={languageId} language={language} />;
}
function LanguageLesson({ language }) {
  const [wordIndex, setWordIndex] = useState(0);
  const { session, dispatch, saveContent } = useExperience();
  const { speak, stop, speaking } = useSpeech();
  const navigate = useNavigate();
  const word = language.words[wordIndex];
  const id = `idiomas-${language.id}`;
  const saved = session.saved.some((item) => item.id === id);
  useEffect(() => {
    dispatch({ type: "START", id });
  }, [id]);
  return (
    <section className="language-lesson">
      <div className="workspace-heading">
        <Pill icon="globe">Norya Idiomas · {language.title}</Pill>
        <h1 tabIndex={-1}>Pequenas palavras. Novas conexões.</h1>
        <p>Explore as expressões e ouça como elas soam.</p>
      </div>
      <div className="language-learning">
        <div className="language-mascot">
          <Mascot />
          <div className="speech-bubble" lang={language.id}>
            {language.hello}
            <span />
          </div>
        </div>
        <div className="phrase-card">
          <div className="phrase-card-top">
            <span className="eyebrow">PRIMEIRAS CONEXÕES</span>
            <span className="quiet-meta">
              {wordIndex + 1} de {language.words.length}
            </span>
          </div>
          <div className="phrase-content">
            <h2 lang={language.id}>{word.phrase}</h2>
            <p className="phrase-translation">{word.meaning}</p>
            <p>{word.context}</p>
            <Button
              variant="soft"
              icon={speaking ? "mute" : "volume"}
              onClick={() =>
                speaking ? stop() : speak(word.phrase, language.locale)
              }
            >
              {speaking ? "Parar áudio" : "Ouvir pronúncia"}
            </Button>
          </div>
          <div className="phrase-navigation">
            <Button
              variant="icon"
              icon="chevronLeft"
              aria-label="Expressão anterior"
              disabled={wordIndex === 0}
              onClick={() => {
                stop();
                setWordIndex(wordIndex - 1);
              }}
            />
            <div className="word-dots" aria-label="Expressões">
              {language.words.map((item, index) => (
                <button
                  className={index === wordIndex ? "active" : ""}
                  aria-label={`Ver expressão ${index + 1}: ${item.phrase}`}
                  aria-current={index === wordIndex ? "step" : undefined}
                  key={item.phrase}
                  onClick={() => {
                    stop();
                    setWordIndex(index);
                  }}
                />
              ))}
            </div>
            <Button
              variant="icon"
              icon="chevronRight"
              aria-label="Próxima expressão"
              disabled={wordIndex === language.words.length - 1}
              onClick={() => {
                stop();
                setWordIndex(wordIndex + 1);
              }}
            />
          </div>
        </div>
      </div>
      <div className="workspace-actions">
        <Button
          variant="ghost"
          icon={saved ? "check" : "bookmark"}
          onClick={() => saveContent(id)}
        >
          {saved ? "Salvo na biblioteca" : "Salvar expressões"}
        </Button>
        <Button
          icon="arrow"
          onClick={() =>
            navigate(
              `/idiomas/${language.id}/desafio/${firstUnfinished(session, id)}`,
            )
          }
        >
          Praticar agora
        </Button>
      </div>
    </section>
  );
}

export function ActivityPage({ module }) {
  const params = useParams();
  const key = module === "labs" ? params.topicId : params.languageId;
  const data = module === "labs" ? findTopic(key) : findLanguage(key);
  const index = Number(params.index);
  if (
    !data ||
    !Number.isInteger(index) ||
    index < 0 ||
    index >= data.questions.length
  )
    return <Navigate to={`/${module}`} replace />;
  return (
    <Activity
      key={`${module}-${key}-${index}`}
      module={module}
      data={data}
      index={index}
    />
  );
}
function Activity({ module, data, index }) {
  const id = `${module}-${data.id}`;
  const { session, dispatch } = useExperience();
  const previous = session.missions[id]?.answers[index];
  const question = data.questions[index];
  const [answer, setAnswer] = useState(
    previous?.correct ? previous.value : question.type === "choice" ? null : [],
  );
  const [status, setStatus] = useState(previous?.correct ? "correct" : "idle");
  const [hint, setHint] = useState(false);
  const [matchLeft, setMatchLeft] = useState(null);
  const [matchError, setMatchError] = useState(false);
  const navigate = useNavigate();
  if (index > 0 && !session.missions[id]?.answers[index - 1]?.correct)
    return <Navigate to={`/${module}/${data.id}/desafio/0`} replace />;
  function update(value) {
    if (status === "correct") return;
    setAnswer(value);
    setStatus("idle");
  }
  function check() {
    if (!canSubmit(question, answer)) return;
    dispatch({
      type: "ANSWER",
      id,
      index,
      answer,
      at: new Date().toISOString(),
    });
    const correct =
      question.type === "choice"
        ? answer === question.answer
        : question.type === "order"
          ? answer.join("|") === question.answer.join("|")
          : answer.length === question.pairs.length;
    setStatus(correct ? "correct" : "wrong");
  }
  function connect(rightId) {
    if (!matchLeft || status === "correct") return;
    if (rightId === matchLeft) {
      update([...answer, rightId]);
      setMatchLeft(null);
      setMatchError(false);
    } else {
      setMatchError(true);
      setHint(true);
      setMatchLeft(null);
    }
  }
  return (
    <section className="activity-page">
      <div className="activity-meta">
        <Pill icon={module === "labs" ? "sparkles" : "globe"}>
          {module === "labs" ? "Norya Labs" : `Norya Idiomas · ${data.title}`}
        </Pill>
        <span>
          Atividade {index + 1} de {data.questions.length}
        </span>
      </div>
      <div
        className="activity-progress"
        role="progressbar"
        aria-valuenow={index + (status === "correct" ? 1 : 0)}
        aria-valuemin={0}
        aria-valuemax={data.questions.length}
        aria-label="Progresso da missão"
      >
        {data.questions.map((_, i) => (
          <span
            key={i}
            className={
              i < index || (i === index && status === "correct")
                ? "complete"
                : i === index
                  ? "current"
                  : ""
            }
          />
        ))}
      </div>
      <Heading
        title={
          status === "correct"
            ? "Uma nova conexão feita."
            : "Agora é a sua vez."
        }
      >
        {status === "correct"
          ? "Você pode continuar no seu ritmo."
          : "Sem pressa. Você pode pedir uma dica sempre que precisar."}
      </Heading>
      <div
        className={`activity-card ${status === "correct" ? "activity-correct" : ""}`}
      >
        <h2>{question.prompt}</h2>
        {question.type === "choice" && (
          <fieldset className="answer-options" disabled={status === "correct"}>
            <legend className="sr-only">Escolha a resposta</legend>
            {question.options.map((option, i) => (
              <label
                className={`answer-option ${answer === i ? "selected" : ""}`}
                key={option}
              >
                <input
                  type="radio"
                  name="answer"
                  checked={answer === i}
                  onChange={() => update(i)}
                />
                <span className="answer-letter" aria-hidden="true">
                  {String.fromCharCode(65 + i)}
                </span>
                <span>{option}</span>
                {answer === i && (
                  <Icon
                    name={status === "correct" ? "circleCheck" : "check"}
                    size={21}
                  />
                )}
              </label>
            ))}
          </fieldset>
        )}
        {question.type === "order" && (
          <>
            <p className="activity-instruction">
              Toque nas palavras para montar a expressão. Toque novamente para
              remover.
            </p>
            <div
              className={`sentence-builder ${answer.length ? "has-words" : ""}`}
              aria-label="Sua expressão"
            >
              {!answer.length && <span>Sua expressão aparece aqui</span>}
              {answer.map((tokenId) => (
                <button
                  key={tokenId}
                  disabled={status === "correct"}
                  onClick={() =>
                    update(answer.filter((value) => value !== tokenId))
                  }
                  aria-label={`Remover ${question.tokens.find((token) => token.id === tokenId)?.text}`}
                  lang={data.id}
                >
                  {question.tokens.find((token) => token.id === tokenId)?.text}
                  <Icon name="close" size={15} />
                </button>
              ))}
            </div>
            <div className="word-bank" aria-label="Palavras disponíveis">
              {question.tokens.map((token) => (
                <button
                  disabled={answer.includes(token.id) || status === "correct"}
                  key={token.id}
                  onClick={() => update([...answer, token.id])}
                  lang={data.id}
                >
                  {token.text}
                </button>
              ))}
            </div>
          </>
        )}
        {question.type === "match" && (
          <>
            <p className="activity-instruction">
              Escolha uma expressão à esquerda e seu significado à direita.
            </p>
            <div className="matching-grid">
              <div>
                {question.pairs.map((pair) => (
                  <button
                    key={pair.id}
                    lang={data.id}
                    className={`${answer.includes(pair.id) ? "matched" : ""} ${matchLeft === pair.id ? "selected" : ""}`}
                    disabled={answer.includes(pair.id) || status === "correct"}
                    onClick={() => {
                      setMatchLeft(pair.id);
                      setMatchError(false);
                    }}
                  >
                    {pair.phrase}
                    {answer.includes(pair.id) && (
                      <Icon name="check" size={18} />
                    )}
                  </button>
                ))}
              </div>
              <div>
                {question.rightOrder.map((pairId) => {
                  const pair = question.pairs.find(
                    (item) => item.id === pairId,
                  );
                  return (
                    <button
                      key={pair.id}
                      className={answer.includes(pair.id) ? "matched" : ""}
                      disabled={
                        answer.includes(pair.id) ||
                        status === "correct" ||
                        !matchLeft
                      }
                      onClick={() => connect(pair.id)}
                    >
                      {pair.meaning}
                      {answer.includes(pair.id) && (
                        <Icon name="check" size={18} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
            <p className="match-status" aria-live="polite">
              {matchError
                ? "Essas expressões ainda não formam um par. Experimente de novo."
                : `${answer.length} de ${question.pairs.length} conexões feitas.`}
            </p>
          </>
        )}
        <div aria-live="polite">
          {status === "correct" && (
            <div className="activity-feedback correct">
              <Icon name="circleCheck" size={24} />
              <div>
                <strong>Isso mesmo!</strong>
                <p>{question.explanation}</p>
              </div>
            </div>
          )}
          {status !== "correct" && (status === "wrong" || hint) && (
            <div className="activity-feedback hint">
              <Icon name="bulb" size={24} />
              <div>
                <strong>
                  {status === "wrong"
                    ? "Vamos pensar de outro jeito?"
                    : "Uma pista para você"}
                </strong>
                <p>{question.hint}</p>
              </div>
            </div>
          )}
        </div>
        <div className="activity-bottom">
          <Button
            variant="ghost"
            icon="bulb"
            onClick={() => setHint(!hint)}
            disabled={status === "correct"}
          >
            {hint ? "Ocultar dica" : "Pedir dica"}
          </Button>
          {status === "correct" ? (
            <Button
              icon="arrow"
              onClick={() =>
                navigate(
                  index === data.questions.length - 1
                    ? "/conquista"
                    : `/${module}/${data.id}/desafio/${index + 1}`,
                )
              }
            >
              {index === data.questions.length - 1
                ? "Concluir missão"
                : "Próxima atividade"}
            </Button>
          ) : (
            <Button
              icon="arrow"
              onClick={check}
              disabled={!canSubmit(question, answer)}
            >
              Verificar resposta
            </Button>
          )}
        </div>
      </div>
      <p className="activity-footnote">
        Tentar de novo também faz parte de aprender.
      </p>
    </section>
  );
}
