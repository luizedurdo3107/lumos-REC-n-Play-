import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useExperience } from "../context/ExperienceContext";
import { hasReward } from "../lib/game";
import { useSpeech } from "../lib/useSpeech";
import { Brand, Button, Feathers, Icon } from "./UI";
import { Modal } from "./Modal";
import { Settings } from "./Settings";
function parentPath(path) {
  if (path === "/norya") return "/";
  if (path === "/experiencias") return "/norya";
  if (/^\/(labs|idiomas)$/.test(path)) return "/experiencias";
  const match = path.match(/^\/(labs|idiomas)\/([^/]+)(?:\/desafio\/(\d))?$/);
  if (match)
    return match[3]
      ? Number(match[3]) > 0
        ? `/${match[1]}/${match[2]}/desafio/0`
        : `/${match[1]}/${match[2]}`
      : `/${match[1]}`;
  if (path.startsWith("/biblioteca/")) return "/biblioteca";
  if (["/biblioteca", "/agenda", "/escola"].includes(path)) return "/explorar";
  return "/experiencias";
}
export function Layout() {
  const { session, settings, toast, dispatch } = useExperience();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const main = useRef(null);
  const { speak, stop } = useSpeech();
  const welcome = location.pathname === "/";
  useLayoutEffect(() => {
    main.current?.querySelector("h1")?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);
  useEffect(() => {
    if (settings.narration) speak(main.current?.innerText || "");
    return stop;
  }, [location.pathname, settings.narration]);
  function reset() {
    dispatch({ type: "RESET" });
    setResetOpen(false);
    navigate("/");
  }
  return (
    <div
      className={`app ${welcome ? "lumos-world" : "norya-world"} theme-${settings.theme} ${settings.contrast ? "high-contrast" : ""} ${settings.monochrome ? "monochrome" : ""} ${settings.focus ? "focus-mode" : ""} ${settings.reduceMotion ? "reduce-motion" : ""} ${settings.hideEffects ? "hide-effects" : ""} controls-${settings.controlSize}`}
      style={{
        "--reading-size": `${settings.fontSize}px`,
        "--reading-line": settings.lineHeight,
        "--reading-spacing": `${settings.letterSpacing}px`,
      }}
    >
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          main.current?.focus();
        }}
      >
        Pular para o conteúdo
      </a>
      <div className="ambient" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <header className="site-header">
        <Link to={welcome ? "/" : "/norya"} className="brand-link">
          <Brand lumos={welcome} />
        </Link>
        <div className="header-right">
          {welcome && (
            <span className="event-label">
              <span />
              REC’N’PLAY
            </span>
          )}
          {hasReward(session) && !welcome && (
            <Link
              to="/adesivo"
              className="reward-link"
              aria-label="Meu adesivo"
            >
              <Icon name="gift" size={20} />
              <span>Meu adesivo</span>
            </Link>
          )}
          <Button
            variant="soft"
            icon="accessibility"
            className="seumodo-trigger"
            onClick={() => setSettingsOpen(true)}
          >
            SeuModo
          </Button>
          {!welcome && (
            <Link
              to={parentPath(location.pathname)}
              className="back-link"
              aria-label="Voltar"
            >
              <Icon name="back" size={20} />
              <span>Voltar</span>
            </Link>
          )}
        </div>
      </header>
      <main ref={main} id="main-content" tabIndex={-1} className="main-content">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="footer-brand">
          <Feathers />
          <span>
            {welcome ? "Lumos Connect" : "Muitos caminhos. O seu ritmo."}
          </span>
        </div>
        <span className="demo-label">Demonstração interativa</span>
        {!welcome && (
          <Button
            variant="ghost"
            className="new-visit"
            icon="reset"
            onClick={() => setResetOpen(true)}
          >
            Nova visita
          </Button>
        )}
      </footer>
      <div
        className={`toast ${toast ? "visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        {toast && (
          <>
            <Icon name="circleCheck" size={20} />
            {toast}
          </>
        )}
      </div>
      {settingsOpen && <Settings onClose={() => setSettingsOpen(false)} />}
      {resetOpen && (
        <Modal title="Nova visita" onClose={() => setResetOpen(false)}>
          <div className="confirmation-content">
            <Icon name="reset" size={36} />
            <h2>Vamos começar de novo?</h2>
            <p>
              As descobertas e os lembretes desta visita serão limpos. Seus
              ajustes do SeuModo serão mantidos.
            </p>
          </div>
          <div className="dialog-actions">
            <Button variant="secondary" onClick={() => setResetOpen(false)}>
              Continuar visita
            </Button>
            <Button onClick={reset}>Iniciar nova visita</Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
