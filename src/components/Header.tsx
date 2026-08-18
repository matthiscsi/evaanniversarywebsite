import { useEffect, useRef, useState } from "react";
import { type Page } from "../data";
import { isSoundEnabled, playPop, toggleSound } from "../lib/sound";
import { applyTheme, getInitialTheme, type Theme } from "../lib/theme";
import louLogo from "../assets/lou-logo.png";

interface HeaderProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
  onLock?: () => void;
  onOpenInstall?: () => void;
}

interface NavItem {
  page: Page;
  label: string;
  icon: string;
  desc: string;
}

const GENERATOR_ITEMS: NavItem[] = [
  { page: "photos", label: "Lou generator", icon: "🐱", desc: "Random Lou fotootjes & clicker" },
  { page: "horse", label: "Peirt generator", icon: "🐴", desc: "Dendermondse peirt namen" },
  { page: "food", label: "WTF gaan wij eten", icon: "🍟", desc: "Draai aan het keuzewiel" }
];

const LOVE_ITEMS: NavItem[] = [
  { page: "love", label: "Love hub", icon: "💖", desc: "Afstemmen, knuffels & rust" },
  { page: "bucketlist", label: "Bucketlist", icon: "📝", desc: "Al onze plannetjes & herinneringen" },
  { page: "wishlist", label: "Eva's wishlist", icon: "🎁", desc: "Cadeautjes en wensjes" }
];

export function Header({ activePage, onNavigate, onLock, onOpenInstall }: HeaderProps) {
  const [soundOn, setSoundOn] = useState(() => isSoundEnabled());
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());
  const [openDropdown, setOpenDropdown] = useState<"generators" | "love" | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleNav = (page: Page) => {
    playPop();
    setOpenDropdown(null);
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

  const toggleDropdown = (name: "generators" | "love") => {
    playPop();
    setOpenDropdown((current) => (current === name ? null : name));
  };

  const isGeneratorsActive = GENERATOR_ITEMS.some((i) => i.page === activePage);
  const isLoveActive = LOVE_ITEMS.some((i) => i.page === activePage);

  return (
    <header className="site-header" ref={headerRef}>
      <button className="brand-button" type="button" onClick={() => handleNav("home")}>
        <img className="brand-mark" src={louLogo} alt="Louli" width="44" height="44" />
        <span>
          <span className="brand-name">Silly aap site</span>
          <span className="brand-subtitle">officiele aap site 2026</span>
        </span>
      </button>

      <nav className="site-nav" aria-label="Hoofdmenu">
        {/* Home */}
        <button
          className={activePage === "home" ? "nav-chip is-active" : "nav-chip"}
          type="button"
          aria-current={activePage === "home" ? "page" : undefined}
          onClick={() => handleNav("home")}
        >
          <span className="nav-chip-icon">🏠</span> Home
        </button>

        {/* Dropdown: Generators */}
        <div className="nav-dropdown-wrap">
          <button
            className={`nav-chip nav-dropdown-trigger ${isGeneratorsActive ? "is-active" : ""} ${
              openDropdown === "generators" ? "is-open" : ""
            }`}
            type="button"
            aria-haspopup="true"
            aria-expanded={openDropdown === "generators"}
            onClick={() => toggleDropdown("generators")}
          >
            <span className="nav-chip-icon">🎲</span> Generators <span className="dropdown-caret">▾</span>
          </button>

          {openDropdown === "generators" && (
            <div className="nav-dropdown-menu page-enter" role="menu">
              {GENERATOR_ITEMS.map((item) => (
                <button
                  key={item.page}
                  type="button"
                  role="menuitem"
                  className={`dropdown-item ${activePage === item.page ? "is-active" : ""}`}
                  onClick={() => handleNav(item.page)}
                >
                  <span className="dropdown-item-icon">{item.icon}</span>
                  <div className="dropdown-item-text">
                    <span className="dropdown-item-title">{item.label}</span>
                    <span className="dropdown-item-desc">{item.desc}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dropdown: Ons plekje */}
        <div className="nav-dropdown-wrap">
          <button
            className={`nav-chip nav-dropdown-trigger ${isLoveActive ? "is-active" : ""} ${
              openDropdown === "love" ? "is-open" : ""
            }`}
            type="button"
            aria-haspopup="true"
            aria-expanded={openDropdown === "love"}
            onClick={() => toggleDropdown("love")}
          >
            <span className="nav-chip-icon">💕</span> Ons plekje <span className="dropdown-caret">▾</span>
          </button>

          {openDropdown === "love" && (
            <div className="nav-dropdown-menu page-enter" role="menu">
              {LOVE_ITEMS.map((item) => (
                <button
                  key={item.page}
                  type="button"
                  role="menuitem"
                  className={`dropdown-item ${activePage === item.page ? "is-active" : ""}`}
                  onClick={() => handleNav(item.page)}
                >
                  <span className="dropdown-item-icon">{item.icon}</span>
                  <div className="dropdown-item-text">
                    <span className="dropdown-item-title">{item.label}</span>
                    <span className="dropdown-item-desc">{item.desc}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Control cluster */}
        <div className="nav-controls-group">
          <button
            className="nav-chip icon-chip"
            type="button"
            title="Zet als app op je iPhone"
            aria-label="Zet als app op je iPhone"
            onClick={() => {
              playPop();
              setOpenDropdown(null);
              onOpenInstall?.();
            }}
          >
            📱
          </button>

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
                setOpenDropdown(null);
                onLock();
              }}
            >
              🔒
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
