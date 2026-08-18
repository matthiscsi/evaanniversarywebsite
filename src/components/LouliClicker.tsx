import { useEffect, useState, useRef } from "react";
import { UPGRADES, getUpgradeCost, calculateStats } from "../lib/clicker";
import { safeGetLocalStorage, safeSetLocalStorage } from "../lib/storage";
import { playPop, playSuccess } from "../lib/sound";
import louLogo from "../assets/lou-logo.png";

const CLICKER_STORAGE_KEY = "lou.clicker.save.v1";

interface ClickerSave {
  kroels: number;
  inventory: Record<string, number>;
  totalTaps: number;
}

interface FloatingParticle {
  id: number;
  text: string;
  x: number;
  y: number;
}

export function LouliClicker() {
  const [isOpen, setIsOpen] = useState(false);
  const [kroels, setKroels] = useState<number>(0);
  const [inventory, setInventory] = useState<Record<string, number>>({});
  const [totalTaps, setTotalTaps] = useState<number>(0);
  const [isSquishing, setIsSquishing] = useState(false);
  const [particles, setParticles] = useState<FloatingParticle[]>([]);
  const particleIdRef = useRef(0);

  // Load initial state
  useEffect(() => {
    const raw = safeGetLocalStorage(CLICKER_STORAGE_KEY);
    if (raw) {
      try {
        const parsed: ClickerSave = JSON.parse(raw);
        if (typeof parsed.kroels === "number") setKroels(parsed.kroels);
        if (parsed.inventory && typeof parsed.inventory === "object") setInventory(parsed.inventory);
        if (typeof parsed.totalTaps === "number") setTotalTaps(parsed.totalTaps);
      } catch {
        // ignore parse error
      }
    }
  }, []);

  // Save state on change (debounced/throttled via interval or periodic save)
  useEffect(() => {
    const save: ClickerSave = { kroels, inventory, totalTaps };
    safeSetLocalStorage(CLICKER_STORAGE_KEY, JSON.stringify(save));
  }, [kroels, inventory, totalTaps]);

  const { kps, kpt } = calculateStats(inventory);

  // Passive income ticker (every 100ms for smooth increments)
  useEffect(() => {
    if (kps <= 0) return;

    const interval = window.setInterval(() => {
      setKroels((prev) => +(prev + kps / 10).toFixed(1));
    }, 100);

    return () => window.clearInterval(interval);
  }, [kps]);

  const handleTap = (e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
    playPop();
    setIsSquishing(true);
    window.setTimeout(() => setIsSquishing(false), 140);

    const gain = kpt;
    setKroels((prev) => Math.round((prev + gain) * 10) / 10);
    setTotalTaps((prev) => prev + 1);

    // Particle calculation relative to button
    const rect = e.currentTarget.getBoundingClientRect();
    let clientX = rect.left + rect.width / 2;
    let clientY = rect.top + rect.height / 2;

    if ("clientX" in e && e.clientX) {
      clientX = e.clientX;
      clientY = e.clientY;
    } else if ("touches" in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }

    const randomOffsetX = (Math.random() - 0.5) * 40;
    const newParticle: FloatingParticle = {
      id: ++particleIdRef.current,
      text: `+${gain}`,
      x: clientX - rect.left + randomOffsetX,
      y: clientY - rect.top - 10
    };

    setParticles((prev) => [...prev.slice(-15), newParticle]);
    window.setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
    }, 900);
  };

  const buyUpgrade = (upgradeId: string) => {
    const upgrade = UPGRADES.find((u) => u.id === upgradeId);
    if (!upgrade) return;

    const currentCount = inventory[upgradeId] || 0;
    const cost = getUpgradeCost(upgrade, currentCount);

    if (kroels >= cost) {
      playSuccess();
      setKroels((prev) => Math.max(0, +(prev - cost).toFixed(1)));
      setInventory((prev) => ({
        ...prev,
        [upgradeId]: (prev[upgradeId] || 0) + 1
      }));
    }
  };

  const resetGame = () => {
    if (window.confirm("Wil je alle kroeltjes en upgrades resetten?")) {
      setKroels(0);
      setInventory({});
      setTotalTaps(0);
      safeSetLocalStorage(CLICKER_STORAGE_KEY, JSON.stringify({ kroels: 0, inventory: {}, totalTaps: 0 }));
    }
  };

  return (
    <div className="clicker-container">
      <button
        type="button"
        className="clicker-toggle-btn"
        onClick={() => {
          playPop();
          setIsOpen((v) => !v);
        }}
        aria-expanded={isOpen}
      >
        <span className="clicker-toggle-icon">🐾</span>
        <span className="clicker-toggle-title">
          {isOpen ? "Sluit Louli Kroel Clicker" : "Open Louli Kroel Clicker"}
        </span>
        <span className="clicker-mini-badge">{Math.floor(kroels)} kroels</span>
      </button>

      {isOpen && (
        <div className="clicker-panel page-enter">
          <div className="clicker-header">
            <div>
              <h2 className="clicker-title">Louli Kroel Clicker</h2>
              <p className="clicker-subtitle">Tik op Louli om haar te kroelen en upgrades te kopen!</p>
            </div>
            <button type="button" className="clicker-reset-btn" onClick={resetGame} title="Reset spel">
              ↺ Reset
            </button>
          </div>

          <div className="clicker-main-grid">
            {/* Mascot Tap Area */}
            <div className="clicker-mascot-card">
              <div className="clicker-score-display">
                <span className="clicker-score-number">{Math.floor(kroels)}</span>
                <span className="clicker-score-label">kroeltjes</span>
              </div>

              <div className="clicker-rate-badges">
                <span className="clicker-rate-badge">⚡ {kpt} / tap</span>
                <span className="clicker-rate-badge">⏱️ {kps.toFixed(1)} / sec</span>
              </div>

              <div className="clicker-tap-stage">
                <button
                  type="button"
                  className={`clicker-mascot-btn ${isSquishing ? "is-squished" : ""}`}
                  onClick={handleTap}
                  aria-label="Kroel Louli"
                >
                  <img src={louLogo} alt="Kroel Louli" className="clicker-mascot-img" />
                  <span className="clicker-tap-hint">Tik mij! 🐱</span>
                </button>

                {/* Floating score particles */}
                {particles.map((p) => (
                  <span
                    key={p.id}
                    className="clicker-particle"
                    style={{ left: `${p.x}px`, top: `${p.y}px` }}
                  >
                    {p.text}
                  </span>
                ))}
              </div>

              <p className="clicker-stats-note">
                Totaal gekroeld: <strong>{totalTaps}</strong> keer
              </p>
            </div>

            {/* Upgrades Shop */}
            <div className="clicker-shop-card">
              <h3 className="clicker-shop-title">Upgrades & Snacks</h3>
              <div className="clicker-upgrade-list">
                {UPGRADES.map((upgrade) => {
                  const count = inventory[upgrade.id] || 0;
                  const cost = getUpgradeCost(upgrade, count);
                  const canAfford = kroels >= cost;

                  return (
                    <button
                      key={upgrade.id}
                      type="button"
                      className={`clicker-upgrade-item ${canAfford ? "can-afford" : "cant-afford"}`}
                      onClick={() => buyUpgrade(upgrade.id)}
                      disabled={!canAfford}
                    >
                      <span className="upgrade-icon">{upgrade.icon}</span>
                      <div className="upgrade-info">
                        <div className="upgrade-name-row">
                          <span className="upgrade-name">{upgrade.name}</span>
                          {count > 0 && <span className="upgrade-count">x{count}</span>}
                        </div>
                        <span className="upgrade-desc">{upgrade.description}</span>
                      </div>
                      <div className="upgrade-cost-badge">
                        <span>{cost}</span>
                        <span className="cost-unit">🐾</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
