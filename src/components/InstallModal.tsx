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
              <span className="install-app-subtitle">Official Louli App</span>
            </div>
          </div>
          <h2>Installeer die shit op je iPhone 📱</h2>
          <p className="install-lead">
            Zodat ge nie elke keer Safari moet openen lijk een holbewoner. Ge krijgt een echt Louli icoontje op uw beginscherm en zero browserbalken!
          </p>
        </div>

        <div className="install-steps-list">
          <div className="install-step-card">
            <div className="install-step-badge">1</div>
            <div className="install-step-content">
              <strong>Open in Safari</strong>
              <span>Zit ge in WhatsApp of Instagram? Klik direct weg en open deze link in de <strong>echte Safari app</strong>, anders gaat Steve Jobs huilen.</span>
            </div>
            <span className="install-step-icon">🧭</span>
          </div>

          <div className="install-step-card">
            <div className="install-step-badge">2</div>
            <div className="install-step-content">
              <strong>Tik op de Deelknop</strong>
              <span>Tik onderaan op dat vierkantje met de pijl omhoog (<span className="share-icon-glyph">⎋</span>). Alsof ge het naar iemand gaat sturen, maar ge stuurt het naar uzelf.</span>
            </div>
            <span className="install-step-icon">📤</span>
          </div>

          <div className="install-step-card">
            <div className="install-step-badge">3</div>
            <div className="install-step-content">
              <strong>Kies &quot;Zet op beginscherm&quot;</strong>
              <span>Scroll een klein stukje naar beneden en tik op <strong>&quot;Zet op beginscherm&quot;</strong> (of <em>Add to Home Screen</em>). Druk daarop.</span>
            </div>
            <span className="install-step-icon">➕</span>
          </div>

          <div className="install-step-card">
            <div className="install-step-badge">4</div>
            <div className="install-step-content">
              <strong>Tik op &quot;Voeg toe&quot;</strong>
              <span>Rechtsboven op <strong>&quot;Voeg toe&quot;</strong> rammen. Louli staat nu op u gsm!</span>
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
            Oka ratje 💕
          </button>
        </div>
      </div>
    </div>
  );
}
