import { useEffect, useState } from "react";
import { navItems, type Page } from "../data";
import { isSoundEnabled, playPop, toggleSound } from "../lib/sound";
import { applyTheme, getInitialTheme, type Theme } from "../lib/theme";
import louLogo from "../assets/lou-logo.png";

interface HeaderProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
  onLock?: () => void;
}

export function Header({ activePage, onNavigate, onLock }: HeaderProps) {
  const [soundOn, setSoundOn] = useState(() => isSoundEnabled());
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const handleNav = (page: Page) => {
    playPop();
    onNavigate(page);
  };

  const handleToggleSound = () => {
    const next = toggleSound();
    setSoundOn(next);
    if (next) playPop();
  };

  const handleToggleTheme = () => {
    playPop();
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  };

  return (
    <header className="site-header">
      <button className="brand-button" type="button" onClick={() => handleNav("home")}>
        <img className="brand-mark" src={louLogo} alt="Louli" width="44" height="44" />
        <span>
          <span className="brand-name">Silly aap site</span>
          <span className="brand-subtitle">officiele aap site 2026</span>
        </span>
      </button>

      <nav className="site-nav" aria-label="Hoofdmenu">
        {navItems.map((item) => (
          <button
            className={item.page === activePage ? "nav-chip is-active" : "nav-chip"}
            key={item.page}
            type="button"
            aria-current={item.page === activePage ? "page" : undefined}
            onClick={() => handleNav(item.page)}
          >
            {item.label}
          </button>
        ))}

        <button
          className="nav-chip icon-chip"
          type="button"
          title={theme === "dark" ? "Lichte modus" : "Nachtmodus"}
          aria-label={theme === "dark" ? "Lichte modus" : "Nachtmodus"}
          onClick={handleToggleTheme}
        >
          {theme === "dark" ? "🌙" : "☀️"}
        </button>

        <button
          className="nav-chip icon-chip"
          type="button"
          title={soundOn ? "Geluid dempen" : "Geluid aanzetten"}
          aria-label={soundOn ? "Geluid dempen" : "Geluid aanzetten"}
          onClick={handleToggleSound}
        >
          {soundOn ? "🔊" : "🔇"}
        </button>

        {onLock && (
          <button
            className="nav-chip icon-chip"
            type="button"
            title="Vergrendel site"
            aria-label="Vergrendel site met pincode"
            onClick={() => {
              playPop();
              onLock();
            }}
          >
            🔒
          </button>
        )}
      </nav>
    </header>
  );
}
