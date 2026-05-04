import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  breathingSequence,
  horseParts,
  hugActions,
  hugMessages,
  moodPacks,
  navItems,
  type Mood,
  type Page
} from "./data";
import { photos, type PhotoItem } from "./photos";
import { nextBreathingStep } from "./lib/breathing";
import { pickRandom } from "./lib/random";
import { hashFromPage, pageFromHash } from "./lib/routing";
import { safeGetLocalStorage, safeSetLocalStorage } from "./lib/storage";

const PINNED_STORAGE_KEY = "loveHub.pinned.v2";
const FAVORITE_PHOTO_KEY = "lou.favorite.v1";

const pageTitles: Record<Page, string> = {
  home: "Silly aap site",
  photos: "Lou generator",
  horse: "Peirt generator",
  love: "Love hub"
};

function goTo(page: Page) {
  window.location.hash = hashFromPage(page);
}

function App() {
  const [page, setPage] = useState<Page>(() => pageFromHash(window.location.hash));

  useEffect(() => {
    const syncPage = () => setPage(pageFromHash(window.location.hash));
    window.addEventListener("hashchange", syncPage);

    if (!window.location.hash) {
      window.history.replaceState(null, "", hashFromPage("home"));
    }

    return () => window.removeEventListener("hashchange", syncPage);
  }, []);

  useEffect(() => {
    document.title = `${pageTitles[page]} | Eva`;
  }, [page]);

  return (
    <div className="app-shell">
      <Header activePage={page} />
      <main id="main-content">
        {page === "home" && <Home />}
        {page === "photos" && <PhotoGenerator />}
        {page === "horse" && <HorseGenerator />}
        {page === "love" && <LoveHub />}
      </main>
    </div>
  );
}

function Header({ activePage }: { activePage: Page }) {
  return (
    <header className="site-header">
      <button className="brand-button" type="button" onClick={() => goTo("home")}>
        <span className="brand-mark" aria-hidden="true">
          S
        </span>
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
            onClick={() => goTo(item.page)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
}

function Home() {
  const featuredPhotos = photos.slice(0, 4);

  return (
    <section className="home-layout page-enter">
      <div className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">ily bb</p>
          <h1>
            Silly aap site<span className="heart">{"\u2665"}</span>
          </h1>
          <p className="lead">
            Een zacht mini-hoekje voor random Lou fotos, ster stabel peirt namen en een Love hub
            voor minder leuke momenten.
          </p>

          <div className="hero-actions">
            <button className="primary-action" type="button" onClick={() => goTo("love")}>
              Naar Sad center
            </button>
            <button className="secondary-action" type="button" onClick={() => goTo("photos")}>
              Random Lou
            </button>
          </div>
          <p className="soft-note">Geen stress-app. Gewoon een zacht hoekje voor jou, bb.</p>
          <div className="hero-badges" aria-label="Sfeertje">
            <span className="hero-badge">100% Eva approved</span>
            <span className="hero-badge">geen corporate vibes</span>
            <span className="hero-badge">veel liefde + chaos</span>
          </div>
        </div>

        <div className="photo-stack" aria-label="Foto preview">
          {featuredPhotos.map((photo, index) => (
            <img
              key={photo.id}
              src={photo.src}
              alt=""
              className={`stack-photo stack-photo-${index + 1}`}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          ))}
        </div>
      </div>

      <div className="feature-grid">
        <FeatureCard
          kicker="random cuteness"
          title="Lou generator"
          text="Een foto surprise knop voor instant zachte serotonin."
          action="Open"
          page="photos"
        />
        <FeatureCard
          kicker="chaos mode"
          title="Peirt generator"
          text="Genereer een compleet ridiculous ster-stabel paardje."
          action="Genereer"
          page="horse"
        />
        <FeatureCard
          kicker="soft place"
          title="Love hub"
          text="Mood knopjes, reminders, knuffelmodus en een mini reset."
          action="Land hier"
          page="love"
          highlighted
        />
      </div>
    </section>
  );
}

function FeatureCard({
  kicker,
  title,
  text,
  action,
  page,
  highlighted = false
}: {
  kicker: string;
  title: string;
  text: string;
  action: string;
  page: Page;
  highlighted?: boolean;
}) {
  return (
    <button
      className={highlighted ? "feature-card is-highlighted" : "feature-card"}
      type="button"
      onClick={() => goTo(page)}
    >
      <span className="eyebrow">{kicker}</span>
      <span className="feature-title">{title}</span>
      <span className="feature-text">{text}</span>
      <span className="feature-link">
        {action} {"\u2192"}
      </span>
    </button>
  );
}

function PhotoGenerator() {
  const [brokenPhotoIds, setBrokenPhotoIds] = useState<string[]>([]);
  const [history, setHistory] = useState<PhotoItem[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [status, setStatus] = useState("Klaar voor een nieuwe foto.");
  const [favoritePhotoId, setFavoritePhotoId] = useState(() => safeGetLocalStorage(FAVORITE_PHOTO_KEY));

  const availablePhotos = useMemo(
    () => photos.filter((photo) => !brokenPhotoIds.includes(photo.id)),
    [brokenPhotoIds]
  );

  const currentPhoto = history[historyIndex] ?? null;

  const showRandomPhoto = useCallback(() => {
    if (availablePhotos.length === 0) {
      setStatus("Geen bruikbare foto's gevonden. Zet foto's in /photos.");
      return;
    }

    const previous = currentPhoto ?? undefined;
    const next = pickRandom(availablePhotos, previous);

    setHistory((current) => [...current.slice(0, historyIndex + 1), next]);
    setHistoryIndex((current) => current + 1);
    setStatus("Nieuw Lou momentje klaar.");
  }, [availablePhotos, currentPhoto, historyIndex]);

  useEffect(() => {
    if (historyIndex < 0 && availablePhotos.length > 0) {
      setHistory([availablePhotos[0]]);
      setHistoryIndex(0);
    }
  }, [availablePhotos, historyIndex]);

  useEffect(() => {
    const onKeydown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA", "BUTTON", "SELECT"].includes(target.tagName)) {
        return;
      }
      if (event.code === "Space") {
        event.preventDefault();
        showRandomPhoto();
      }
    };

    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, [showRandomPhoto]);

  function markPhotoBroken(photo: PhotoItem) {
    setBrokenPhotoIds((current) => (current.includes(photo.id) ? current : [...current, photo.id]));
    setStatus("Deze foto kon niet geladen worden, we slaan hem over.");
  }

  function toggleFavorite() {
    if (!currentPhoto) {
      return;
    }

    const next = favoritePhotoId === currentPhoto.id ? "" : currentPhoto.id;
    setFavoritePhotoId(next);
    safeSetLocalStorage(FAVORITE_PHOTO_KEY, next);
  }

  return (
    <section className="tool-layout page-enter" aria-labelledby="lou-title">
      <div className="tool-intro">
        <p className="eyebrow">random cuteness</p>
        <h1 id="lou-title">
          Louli generator <span className="heart">{"\u2665"}</span>
        </h1>
        <p className="lead">Druk op de knop of spatie voor een nieuwe foto. Geen dubbele direct na elkaar.</p>
        <div className="controls photo-controls">
          <button className="primary-action" type="button" onClick={showRandomPhoto}>
            Nieuwe random foto
          </button>
          <button className="secondary-action" type="button" onClick={() => setHistoryIndex((v) => Math.max(0, v - 1))} disabled={historyIndex <= 0}>
            Vorige
          </button>
          <button className="secondary-action" type="button" onClick={() => setHistoryIndex((v) => Math.min(history.length - 1, v + 1))} disabled={historyIndex >= history.length - 1}>
            Volgende
          </button>
          <button className="secondary-action" type="button" onClick={toggleFavorite} disabled={!currentPhoto}>
            {currentPhoto && favoritePhotoId === currentPhoto.id ? "Favoriet vast" : "Pin favoriet"}
          </button>
        </div>
        <p className="status" aria-live="polite">{status}</p>
      </div>

      <figure className="photo-stage">
        {currentPhoto ? (
          <>
            <img
              src={currentPhoto.src}
              alt={currentPhoto.caption}
              loading="lazy"
              decoding="async"
              onError={() => markPhotoBroken(currentPhoto)}
            />
            <figcaption>
              {favoritePhotoId === currentPhoto.id ? "\u2605 " : ""}
              {currentPhoto.caption}
            </figcaption>
          </>
        ) : (
          <figcaption>Geen fotos gevonden.</figcaption>
        )}
      </figure>
    </section>
  );
}

function HorseGenerator() {
  const [enabledParts, setEnabledParts] = useState({
    first: true,
    middle: true,
    last: true,
    title: true
  });
  const [horseName, setHorseName] = useState("Druk op genereer");
  const [status, setStatus] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  const generateHorse = useCallback(() => {
    const baseParts: string[] = [];

    if (enabledParts.first) baseParts.push(pickRandom(horseParts.first));
    if (enabledParts.middle) {
      if (baseParts.length) {
        baseParts[baseParts.length - 1] += pickRandom(horseParts.middle);
      } else {
        baseParts.push(pickRandom(horseParts.middle));
      }
    }
    if (enabledParts.last) baseParts.push(pickRandom(horseParts.last));

    if (!baseParts.length) {
      setHorseName("Niks aangevinkt");
      setStatus("Zet minstens 1 naamstuk aan.");
      return;
    }

    const title = enabledParts.title ? pickRandom(horseParts.title) : "";
    const nextName = title ? `${baseParts.join(" ")} ${title}` : baseParts.join(" ");
    setHorseName(nextName);
    setHistory((current) => [nextName, ...current.filter((name) => name !== nextName)].slice(0, 6));
    setStatus("");
  }, [enabledParts]);

  useEffect(() => {
    generateHorse();
  }, [generateHorse]);

  async function copyCurrentName() {
    if (!horseName || horseName === "Druk op genereer" || horseName === "Niks aangevinkt") {
      setStatus("Genereer eerst een naam.");
      return;
    }

    try {
      await navigator.clipboard.writeText(horseName);
      setStatus("Naam gekopieerd.");
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = horseName;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(textarea);
      setStatus(ok ? "Naam gekopieerd." : "Kopieren lukte niet. Selecteer handmatig.");
    }
  }

  return (
    <section className="generator-panel page-enter" aria-labelledby="horse-title">
      <div className="tool-intro compact">
        <p className="eyebrow">chaos mode</p>
        <h1 id="horse-title">
          dinkelpeirt generator <span className="heart">{"\u2665"}</span>
        </h1>
        <p className="lead">wooooo. Maak een naam die onmogelijk serieus te nemen is.</p>
      </div>

      <div className="name-reveal" aria-live="polite">
        {horseName}
      </div>

      <fieldset className="part-selector">
        <legend>Kies je naamstukken</legend>
        {([
          ["first", "Voornaam"],
          ["middle", "Middenstuk"],
          ["last", "Achternaam"],
          ["title", "Extra titel"]
        ] as const).map(([key, label]) => (
          <label className="toggle-pill" key={key}>
            <input
              type="checkbox"
              checked={enabledParts[key]}
              onChange={(event) =>
                setEnabledParts((current) => ({ ...current, [key]: event.target.checked }))
              }
            />
            <span>{label}</span>
          </label>
        ))}
      </fieldset>

      <div className="controls">
        <button className="primary-action" type="button" onClick={generateHorse}>
          Genereer nieuw peirt
        </button>
        <button className="secondary-action" type="button" onClick={copyCurrentName}>
          Kopieer naam
        </button>
      </div>

      <p className="status" aria-live="polite">{status}</p>
      {history.length > 0 && (
        <div className="history-wrap">
          <p className="history-label">Recente peirt hall of fame</p>
          <ul className="history-list" aria-label="Recente peirtnamen">
            {history.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

function LoveHub() {
  const [mood, setMood] = useState<Mood>("sad");
  const [comfort, setComfort] = useState(() => pickRandom(moodPacks.sad.comfort));
  const [affirmation, setAffirmation] = useState(() => pickRandom(moodPacks.sad.affirmations));
  const [reason, setReason] = useState(() => pickRandom(moodPacks.sad.reasons));
  const [tinyJoy, setTinyJoy] = useState(() => pickRandom(moodPacks.sad.tinyJoy));
  const [pinned, setPinned] = useState<string[]>(() => {
    try {
      const parsed = JSON.parse(safeGetLocalStorage(PINNED_STORAGE_KEY)) as unknown;
      return Array.isArray(parsed) ? parsed.filter((value): value is string => typeof value === "string") : [];
    } catch {
      return [];
    }
  });
  const [pinStatus, setPinStatus] = useState("Pin deze");
  const [hugMode, setHugMode] = useState(false);
  const [hugMessage, setHugMessage] = useState(() => pickRandom(hugMessages));
  const [hugAction, setHugAction] = useState(() => pickRandom(hugActions));
  const [breathingPrompt, setBreathingPrompt] = useState("Inademen 4, vasthouden 4, uitademen 6. Rustig is genoeg.");
  const [breathingActive, setBreathingActive] = useState(false);
  const breathingTimer = useRef<number | null>(null);

  const currentPack = moodPacks[mood];

  const refreshMoodContent = useCallback((nextMood: Mood) => {
    const pack = moodPacks[nextMood];
    setComfort((previous) => pickRandom(pack.comfort, previous));
    setAffirmation((previous) => pickRandom(pack.affirmations, previous));
    setReason((previous) => pickRandom(pack.reasons, previous));
    setTinyJoy((previous) => pickRandom(pack.tinyJoy, previous));
  }, []);

  const refreshHugSupport = useCallback(() => {
    setHugMessage((previous) => pickRandom(hugMessages, previous));
    setHugAction((previous) => pickRandom(hugActions, previous));
  }, []);

  useEffect(() => {
    return () => {
      if (breathingTimer.current) {
        window.clearTimeout(breathingTimer.current);
      }
    };
  }, []);

  function selectMood(nextMood: Mood) {
    setMood(nextMood);
    refreshMoodContent(nextMood);
  }

  function pinCurrentAffirmation() {
    const next = [affirmation, ...pinned.filter((line) => line !== affirmation)].slice(0, 5);
    const ok = safeSetLocalStorage(PINNED_STORAGE_KEY, JSON.stringify(next));
    if (!ok) {
      setPinStatus("Kon niet pinnen");
      return;
    }
    setPinned(next);
    setPinStatus("Gepind");
    window.setTimeout(() => setPinStatus("Pin deze"), 1400);
  }

  function clearPinned() {
    const ok = safeSetLocalStorage(PINNED_STORAGE_KEY, JSON.stringify([]));
    if (ok) {
      setPinned([]);
    }
  }

  function stopBreathing() {
    if (breathingTimer.current) {
      window.clearTimeout(breathingTimer.current);
      breathingTimer.current = null;
    }
    setBreathingActive(false);
    setBreathingPrompt("Stop gezet. Je mag straks opnieuw proberen.");
  }

  function runBreathingStep(stepIndex: number) {
    setBreathingPrompt(breathingSequence[stepIndex].text);
    breathingTimer.current = window.setTimeout(() => {
      const nextIndex = nextBreathingStep(breathingSequence, stepIndex);
      if (nextIndex === null) {
        breathingTimer.current = null;
        setBreathingActive(false);
        setBreathingPrompt("Rondje klaar. Nog eentje mag, niks moet.");
        return;
      }
      runBreathingStep(nextIndex);
    }, breathingSequence[stepIndex].delay);
  }

  function startBreathing() {
    if (breathingActive) return;
    setBreathingActive(true);
    runBreathingStep(0);
  }

  return (
    <section className={hugMode ? "love-page hug-mode page-enter" : "love-page page-enter"}>
      <div className="love-hero">
        <p className="eyebrow">voor sad, boze en drukke hoofdjes</p>
        <h1>
          Love hub <span className="heart">{"\u2665"}</span>
        </h1>
        <p className="lead">Als je sad bent bab, of als je hoofd veel te luid staat.</p>
        <p className="soft-note">Alles hier is bedoeld als comfort. Niks moet, alles mag traag.</p>

        <div className="comfort-banner">
          <span>Voor nu</span>
          <p aria-live="polite">{comfort}</p>
        </div>

        <div className="mood-controls" aria-label="Hoe voel je je vandaag?">
          {(Object.keys(moodPacks) as Mood[]).map((moodKey) => (
            <button
              key={moodKey}
              className={moodKey === mood ? "mood-button is-active" : "mood-button"}
              type="button"
              aria-pressed={moodKey === mood}
              onClick={() => selectMood(moodKey)}
            >
              {moodPacks[moodKey].label}
            </button>
          ))}
          <button className="secondary-action" type="button" aria-pressed={hugMode} onClick={() => setHugMode((v) => !v)}>
            {hugMode ? "Knuffelmodus aan" : "Knuffelmodus"}
          </button>
          <button className="secondary-action" type="button" onClick={() => refreshMoodContent(mood)}>
            Quick comfort
          </button>
        </div>
      </div>

      {hugMode && (
        <section className="hug-panel" aria-live="polite">
          <p className="eyebrow">Knuffelmodus is aan</p>
          <h2>9999999999999999999999 virtuele knuffels</h2>
          <p className="hug-message">{hugMessage}</p>
          <p>{hugAction}</p>
          <div className="controls">
            <button className="primary-action" type="button" onClick={refreshHugSupport}>
              Nog een knuffelzin
            </button>
            <button className="secondary-action" type="button" onClick={() => refreshMoodContent(mood)}>
              Mini knuffelreset
            </button>
          </div>
        </section>
      )}

      <div className="hub-grid">
        <HubCard title="Reminders">
          <p className="hub-text" aria-live="polite">{affirmation}</p>
          <div className="controls">
            <button className="primary-action" type="button" onClick={() => setAffirmation((previous) => pickRandom(currentPack.affirmations, previous))}>
              Nieuwe zin
            </button>
            <button className="secondary-action" type="button" onClick={pinCurrentAffirmation}>
              {pinStatus}
            </button>
          </div>
        </HubCard>

        <HubCard title="Waarom ik van je hou">
          <p className="hub-text" aria-live="polite">{reason}</p>
          <button className="secondary-action inline-action" type="button" onClick={() => setReason((previous) => pickRandom(currentPack.reasons, previous))}>
            Nog eentje
          </button>
        </HubCard>

        <HubCard title="Kleine reset">
          <ul className="mini-steps">
            {currentPack.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
          <div className="breathing-box">
            <h3>Adem even mee</h3>
            <p aria-live="polite">{breathingPrompt}</p>
            <div className="controls">
              <button className="primary-action" type="button" disabled={breathingActive} onClick={startBreathing}>
                {breathingActive ? "Ademen..." : "Start ademrondje"}
              </button>
              <button className="secondary-action" type="button" onClick={stopBreathing} disabled={!breathingActive}>
                Stop
              </button>
            </div>
          </div>
        </HubCard>

        <HubCard title="Mini glimlach">
          <p className="hub-text" aria-live="polite">{tinyJoy}</p>
          <button className="secondary-action inline-action" type="button" onClick={() => setTinyJoy((previous) => pickRandom(currentPack.tinyJoy, previous))}>
            Nog iets liefs
          </button>
        </HubCard>

        <HubCard title="Pinned zinnen" wide>
          {pinned.length ? (
            <ul className="history-list" aria-live="polite">
              {pinned.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          ) : (
            <p className="hub-text wide">Nog niks gepind. Als een zin goed is kan je er hier eentje zetten bb.</p>
          )}
          {pinned.length > 0 && (
            <button className="secondary-action inline-action" type="button" onClick={clearPinned}>
              Clear pinned
            </button>
          )}
        </HubCard>
      </div>
    </section>
  );
}

function HubCard({ title, children, wide = false }: { title: string; children: ReactNode; wide?: boolean }) {
  return (
    <article className={wide ? "hub-card wide-card" : "hub-card"}>
      <h2>{title}</h2>
      {children}
    </article>
  );
}

export default App;
