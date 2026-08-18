import { useEffect, useState } from "react";
import { playPop } from "../lib/sound";
import louLogo from "../assets/lou-logo.png";

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InstallModal({ isOpen, onClose }: InstallModalProps) {
  const [isIOS, setIsIOS] = useState(true);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="install-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Installeer als app">
      <div className="install-modal page-enter" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="install-close-btn"
          onClick={() => {
            playPop();
            onClose();
          }}
          aria-label="Sluiten"
        >
          ✕
        </button>

        <div className="install-header">
          <div className="install-app-preview">
            <img src={louLogo} alt="Aap site logo" className="install-app-icon" />
            <div className="install-app-meta">
              <span className="install-app-title">Aap site</span>
              <span className="install-app-subtitle">Silly app voor Eva</span>
            </div>
          </div>
          <h2>Zet als échte app op je iPhone 📱</h2>
          <p className="install-lead">
            Je kunt deze site rechtstreeks op je beginscherm zetten. Hij opent dan full-screen zonder Safari balken, net zoals een échte app!
          </p>
        </div>

        <div className="install-steps-list">
          <div className="install-step-card">
            <div className="install-step-badge">1</div>
            <div className="install-step-content">
              <strong>Open in Safari</strong>
              <span>Zorg dat je de link in de <strong>Safari browser</strong> opent (niet binnen Instagram of WhatsApp).</span>
            </div>
            <span className="install-step-icon">🧭</span>
          </div>

          <div className="install-step-card">
            <div className="install-step-badge">2</div>
            <div className="install-step-content">
              <strong>Tik op het Deel-icoontje</strong>
              <span>Tik onderaan in het midden op de Deel-knop (het vierkantje met het pijltje omhoog <span className="share-icon-glyph">⎋</span>).</span>
            </div>
            <span className="install-step-icon">📤</span>
          </div>

          <div className="install-step-card">
            <div className="install-step-badge">3</div>
            <div className="install-step-content">
              <strong>Kies &quot;Zet op beginscherm&quot;</strong>
              <span>Scroll een klein stukje naar beneden in het menu en tik op <strong>&quot;Zet op beginscherm&quot;</strong> (Add to Home Screen).</span>
            </div>
            <span className="install-step-icon">➕</span>
          </div>

          <div className="install-step-card">
            <div className="install-step-badge">4</div>
            <div className="install-step-content">
              <strong>Tik op &quot;Voeg toe&quot;</strong>
              <span>Tik rechtsboven op <strong>&quot;Voeg toe&quot;</strong>. Klaar! Het Louli icoontje staat nu tussen al je apps.</span>
            </div>
            <span className="install-step-icon">✨</span>
          </div>
        </div>

        <div className="install-footer">
          <button
            type="button"
            className="primary-action"
            onClick={() => {
              playPop();
              onClose();
            }}
          >
            Begrepen! 💕
          </button>
        </div>
      </div>
    </div>
  );
}
