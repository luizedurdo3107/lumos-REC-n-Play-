import { Icon } from "./UI";

export const LUMOS_INSTAGRAM_URL = "https://www.instagram.com/lumos.connect/";

export function FollowLumos() {
  return (
    <aside className="lumos-follow-card" aria-labelledby="lumos-follow-title">
      <a className="lumos-follow-qr" href={LUMOS_INSTAGRAM_URL}
        target="_blank" rel="noopener noreferrer"
        aria-label="Abrir Instagram da Lumos em uma nova aba">
        <img src={`${import.meta.env.BASE_URL}brand/lumos-instagram-qr.png`}
          width="144" height="144"
          alt="QR code para o Instagram @lumos.connect" />
      </a>
      <div className="lumos-follow-copy">
        <span className="lumos-follow-kicker">SEU ÚLTIMO PASSO</span>
        <h2 id="lumos-follow-title">Siga @lumos.connect</h2>
        <p>Para retirar seu adesivo, é obrigatório seguir a Lumos no Instagram.
          Mostre o perfil à equipe do estande.</p>
        <a className="button button-primary lumos-follow-button"
          href={LUMOS_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
          Abrir Instagram da Lumos <Icon name="external" size={18} />
        </a>
        <small>Já segue? É só mostrar à equipe.</small>
      </div>
    </aside>
  );
}
