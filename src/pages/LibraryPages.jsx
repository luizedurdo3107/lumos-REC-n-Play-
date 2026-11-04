import { createId } from "../lib/id";
import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Button, EmptyState, Heading, Icon, Pill } from "../components/UI";
import { Modal } from "../components/Modal";
import { TextInput } from "../components/VirtualInput";
import { useExperience } from "../context/ExperienceContext";
import { catalog, contentById } from "../data/content";
import { useSpeech } from "../lib/useSpeech";
export function LibraryPage() {
  const { session, dispatch, saveContent, notify } = useExperience();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("todos");
  const [collectionOpen, setCollectionOpen] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const normalized = (text) =>
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  const contents = catalog
    .filter((item) =>
      normalized(`${item.title} ${item.subject}`).includes(normalized(search)),
    )
    .filter(
      (item) =>
        filter === "todos" ||
        (filter === "salvos"
          ? session.saved.some((saved) => saved.id === item.id)
          : session.saved.some(
              (saved) => saved.id === item.id && saved.collection === filter,
            )),
    );
  function createCollection(e) {
    e.preventDefault();
    const name = collectionName.trim();
    if (!name) return;
    if (
      session.collections.some(
        (collection) => collection.name.toLowerCase() === name.toLowerCase(),
      )
    ) {
      notify("Você já tem uma coleção com esse nome.");
      return;
    }
    const id = createId("collection");
    dispatch({ type: "COLLECTION", id, name });
    setCollectionOpen(false);
    setCollectionName("");
    setFilter(id);
    notify("Nova coleção criada. Salve um conteúdo e mova para ela.");
  }
  return (
    <section className="library-page">
      <Heading
        label="BIBLIOTECA"
        title="Suas descobertas, por perto."
        align="left"
      >
        Explore conteúdos e crie uma coleção com a sua cara.
      </Heading>
      <div className="library-toolbar">
        <div className="search-input">
          <Icon name="search" size={21} />
          <TextInput
            value={search}
            onChange={setSearch}
            placeholder="Buscar uma descoberta"
            aria-label="Buscar conteúdos na biblioteca"
          />
        </div>
        <Button
          variant="secondary"
          icon="folder"
          onClick={() => setCollectionOpen(true)}
        >
          Nova coleção
        </Button>
      </div>
      <div className="library-layout">
        <aside className="collection-list" aria-label="Filtrar conteúdos">
          <span className="eyebrow">SUA BIBLIOTECA</span>
          <button
            className={filter === "todos" ? "active" : ""}
            onClick={() => setFilter("todos")}
          >
            <Icon name="book" size={20} />
            Todos os conteúdos<span>{catalog.length}</span>
          </button>
          <button
            className={filter === "salvos" ? "active" : ""}
            onClick={() => setFilter("salvos")}
          >
            <Icon name="bookmark" size={20} />
            Todos os salvos<span>{session.saved.length}</span>
          </button>
          <span className="eyebrow collections-label">COLEÇÕES</span>
          {session.collections.map((collection) => (
            <button
              className={filter === collection.id ? "active" : ""}
              onClick={() => setFilter(collection.id)}
              key={collection.id}
            >
              <Icon name="folder" size={19} />
              <span className="collection-name">{collection.name}</span>
              <span>
                {
                  session.saved.filter(
                    (item) => item.collection === collection.id,
                  ).length
                }
              </span>
            </button>
          ))}
        </aside>
        <div className="library-results">
          {contents.length ? (
            <div className="content-grid">
              {contents.map((item) => {
                const saved = session.saved.find(
                  (entry) => entry.id === item.id,
                );
                return (
                  <article className="content-card" key={item.id}>
                    <div
                      className={`content-cover content-${item.subject.toLowerCase()}`}
                    >
                      <Icon name={item.icon} size={42} />
                      <span>{item.subject}</span>
                    </div>
                    <div className="content-card-body">
                      <small>
                        {item.module === "labs"
                          ? "NORYA LABS"
                          : "NORYA IDIOMAS"}
                      </small>
                      <h2>{item.title}</h2>
                      <p>{item.short}</p>
                      <div className="content-card-bottom">
                        <Link
                          to={`/biblioteca/${item.id}`}
                          className="subtle-link"
                        >
                          Ler conteúdo
                          <Icon name="arrow" size={17} />
                        </Link>
                        <Button
                          variant="icon"
                          icon={saved ? "check" : "bookmark"}
                          aria-label={`${saved ? "Remover" : "Salvar"} ${item.title}`}
                          onClick={() => saveContent(item.id)}
                        />
                      </div>
                      {saved && session.collections.length > 1 && (
                        <label className="collection-select">
                          <span className="sr-only">
                            Coleção de {item.title}
                          </span>
                          <select
                            value={saved.collection}
                            onChange={(e) =>
                              dispatch({
                                type: "MOVE_SAVED",
                                id: item.id,
                                collection: e.target.value,
                              })
                            }
                          >
                            {session.collections.map((collection) => (
                              <option value={collection.id} key={collection.id}>
                                {collection.name}
                              </option>
                            ))}
                          </select>
                        </label>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <EmptyState
              title={
                search
                  ? "Nenhuma descoberta por aqui."
                  : "Uma coleção pronta para começar."
              }
            >
              {search
                ? "Tente buscar por IA, natureza, tecnologia ou um idioma."
                : "Salve um conteúdo e escolha esta coleção para organizar sua próxima descoberta."}
            </EmptyState>
          )}
        </div>
      </div>
      {collectionOpen && (
        <Modal title="Biblioteca" onClose={() => setCollectionOpen(false)}>
          <form onSubmit={createCollection}>
            <div className="modal-form-heading">
              <Icon name="folder" size={32} />
              <h2>Uma nova coleção.</h2>
              <p>Dê um nome ao seu próximo caminho de descobertas.</p>
            </div>
            <label className="form-label" htmlFor="collection-name">
              Nome da coleção
            </label>
            <TextInput
              id="collection-name"
              value={collectionName}
              onChange={setCollectionName}
              placeholder="Ex.: Ideias para explorar"
              maxLength={45}
              required
              autoFocus
            />
            <div className="dialog-actions">
              <Button variant="ghost" onClick={() => setCollectionOpen(false)}>
                Cancelar
              </Button>
              <Button
                type="submit"
                icon="plus"
                disabled={!collectionName.trim()}
              >
                Criar coleção
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </section>
  );
}
export function ArticlePage() {
  const { contentId } = useParams();
  const item = contentById(contentId);
  const { session, saveContent } = useExperience();
  const { speak, stop, speaking } = useSpeech();
  if (!item) return <Navigate to="/biblioteca" replace />;
  const saved = session.saved.some((entry) => entry.id === item.id);
  return (
    <article className="article-page">
      <Pill icon={item.icon}>{item.subject}</Pill>
      <Heading title={item.title} align="left">
        {item.subtitle}
      </Heading>
      <div className="article-actions">
        <Button
          variant="soft"
          icon={speaking ? "mute" : "volume"}
          onClick={() => (speaking ? stop() : speak(item.paragraphs.join(" ")))}
        >
          {speaking ? "Parar leitura" : "Ouvir conteúdo"}
        </Button>
        <Button
          variant="ghost"
          icon={saved ? "check" : "bookmark"}
          onClick={() => saveContent(item.id)}
        >
          {saved ? "Salvo na coleção" : "Salvar conteúdo"}
        </Button>
      </div>
      <div className="article-body">
        {item.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <div className="article-takeaway">
        <Icon name="bulb" size={25} />
        <p>
          {item.takeaway ||
            "Pequenas expressões podem abrir espaço para novas conversas. Pratique no seu ritmo."}
        </p>
      </div>
      <div className="page-bottom">
        <Link className="subtle-link" to="/agenda">
          <Icon name="calendar" size={19} />
          Planejar uma próxima descoberta
        </Link>
        <Link
          className="button button-primary"
          to={
            item.module === "labs"
              ? `/labs/${item.id.slice(5)}`
              : `/idiomas/${item.id.slice(8)}`
          }
        >
          Experimentar missão
          <Icon name="arrow" size={20} />
        </Link>
      </div>
    </article>
  );
}
