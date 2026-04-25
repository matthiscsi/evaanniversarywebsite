import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
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

const STORAGE_KEY = "loveHubPinnedAffirmation";
const pageTitles: Record<Page, string> = {
  home: "Silly aap site",
  photos: "Lou generator",
  horse: "Peirt generator",
  love: "Love hub"
};

const pages = new Set<Page>(["home", "photos", "horse", "love"]);

function pageFromHash(): Page {
  const value = window.location.hash.replace(/^#\/?/, "");
  return pages.has(value as Page) ? (value as Page) : "home";
}

function goTo(page: Page) {
  window.location.hash = page === "home" ? "#/" : `#/${page}`;
}

function pickRandom<T>(items: readonly T[], previous?: T): T {
  if (items.length === 0) {
    throw new Error("Cannot pick from an empty list.");
  }

  if (items.length === 1) {
    return items[0];
  }

  let next = items[Math.floor(Math.random() * items.length)];
  while (next === previous) {
    next = items[Math.floor(Math.random() * items.length)];
  }

  return next;
}

function App() {
  const [page, setPage] = useState<Page>(() => pageFromHash());

  useEffect(() => {
    const syncPage = () => setPage(pageFromHash());
    window.addEventListener("hashchange", syncPage);

    if (!window.location.hash) {
      window.history.replaceState(null, "", "#/");
    }

    return () => window.removeEventListener("hashchange", syncPage);
  }, []);

  useEffect(() => {
    document.title = pageTitles[page];
  }, [page]);

  return (
    <div className="app-shell">
      <Header activePage={page} />
      <main>
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
            Silly aap site<span className="heart">♥</span>
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
        </div>

        <div className="photo-stack" aria-label="Foto preview">
          {featuredPhotos.map((photo, index) => (
            <img
              key={photo.name}
              src={photo.src}
              alt=""
              className={`stack-photo stack-photo-${index + 1}`}
              loading={index === 0 ? "eager" : "lazy"}
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
      <span className="feature-link">{action} →</span>
    </button>
  );
}

function PhotoGenerator() {
  const [currentPhoto, setCurrentPhoto] = useState<PhotoItem | null>(() => photos[0] ?? null);
  const [status, setStatus] = useState("Klaar voor de eerste foto...");

  const renderRandomPhoto = useCallback(() => {
    if (!photos.length) {
      setCurrentPhoto(null);
      setStatus("Nog geen foto's gevonden. Voeg bestanden toe in photos/.");
      return;
    }

    const next = pickRandom(photos, currentPhoto ?? undefined);
    setCurrentPhoto(next);
    setStatus(`Nu zichtbaar: ${next.name}`);
  }, [currentPhoto]);

  useEffect(() => {
    const onKeydown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        renderRandomPhoto();
      }
    };

    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, [renderRandomPhoto]);

  return (
    <section className="tool-layout page-enter">
      <div className="tool-intro">
        <p className="eyebrow">random cuteness</p>
        <h1>
          Louli generator <span className="heart">♥</span>
        </h1>
        <p className="lead">Druk op de knop of spatie voor een nieuwe foto.</p>
        <button className="primary-action" type="button" onClick={renderRandomPhoto}>
          Nieuwe Random Foto
        </button>
        <p className="status" aria-live="polite">
          {status}
        </p>
      </div>

      <figure className="photo-stage">
        {currentPhoto ? (
          <img src={currentPhoto.src} alt="Random foto van ons" />
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

  const generateHorse = useCallback(() => {
    const baseParts: string[] = [];

    if (enabledParts.first) {
      baseParts.push(pickRandom(horseParts.first));
    }

    if (enabledParts.middle) {
      if (baseParts.length) {
        baseParts[baseParts.length - 1] += pickRandom(horseParts.middle);
      } else {
        baseParts.push(pickRandom(horseParts.middle));
      }
    }

    if (enabledParts.last) {
      baseParts.push(pickRandom(horseParts.last));
    }

    if (!baseParts.length) {
      setHorseName("Niks aangevinkt");
      setStatus("Zet minstens 1 naamstuk aan.");
      return;
    }

    const title = enabledParts.title ? pickRandom(horseParts.title) : "";
    const nextName = title ? `${baseParts.join(" ")} ${title}` : baseParts.join(" ");
    setHorseName(nextName);
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
      setStatus(`Gekopieerd: ${horseName}`);
    } catch {
      setStatus("Clipboard geblokkeerd. Kopieer handmatig.");
    }
  }

  return (
    <section className="generator-panel page-enter">
      <div className="tool-intro compact">
        <p className="eyebrow">chaos mode</p>
        <h1>
          dinkelpeirt generator <span className="heart">♥</span>
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
          Genereer Nieuw peirt!!!!
        </button>
        <button className="secondary-action" type="button" onClick={copyCurrentName}>
          Kopieer Naam
        </button>
      </div>

      <p className="status" aria-live="polite">
        {status}
      </p>
    </section>
  );
}

function LoveHub() {
  const [mood, setMood] = useState<Mood>("sad");
  const [comfort, setComfort] = useState(() => pickRandom(moodPacks.sad.comfort));
  const [affirmation, setAffirmation] = useState(() => pickRandom(moodPacks.sad.affirmations));
  const [reason, setReason] = useState(() => pickRandom(moodPacks.sad.reasons));
  const [tinyJoy, setTinyJoy] = useState(() => pickRandom(moodPacks.sad.tinyJoy));
  const [pinned, setPinned] = useState(() => {
    try {
      return window.localStorage.getItem(STORAGE_KEY) || "";
    } catch {
      return "";
    }
  });
  const [pinStatus, setPinStatus] = useState("Pin deze");
  const [hugMode, setHugMode] = useState(false);
  const [hugMessage, setHugMessage] = useState(() => pickRandom(hugMessages));
  const [hugAction, setHugAction] = useState(() => pickRandom(hugActions));
  const [breathingPrompt, setBreathingPrompt] = useState(
    "Inademen 4, vasthouden 4, uitademen 6. Rustig is genoeg."
  );
  const [breathingActive, setBreathingActive] = useState(false);
  const breathingTimer = useRef<number | null>(null);

  const currentPack = moodPacks[mood];

  const refreshMoodContent = useCallback(
    (nextMood: Mood) => {
      const pack = moodPacks[nextMood];
      setComfort((previous) => pickRandom(pack.comfort, previous));
      setAffirmation((previous) => pickRandom(pack.affirmations, previous));
      setReason((previous) => pickRandom(pack.reasons, previous));
      setTinyJoy((previous) => pickRandom(pack.tinyJoy, previous));
    },
    []
  );

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

  function toggleHugMode() {
    setHugMode((current) => {
      const next = !current;
      if (next) {
        refreshHugSupport();
        refreshMoodContent(mood);
        setBreathingPrompt("Ok bb. 1 keer samen: in 4, hou 4, uit 6. Meer hoeft nu niet.");
      }
      return next;
    });
  }

  function doHugReset() {
    setHugMode(true);
    refreshHugSupport();
    refreshMoodContent(mood);
    setBreathingPrompt("Ok bb. 1 keer samen: in 4, hou 4, uit 6. Meer hoeft niet.");
  }

  function pinCurrentAffirmation() {
    try {
      window.localStorage.setItem(STORAGE_KEY, affirmation);
      setPinned(affirmation);
      setPinStatus("Gepind");
      window.setTimeout(() => setPinStatus("Pin deze"), 1500);
    } catch {
      setPinStatus("Kon niet pinnen");
    }
  }

  function runBreathingStep(stepIndex: number) {
    setBreathingPrompt(breathingSequence[stepIndex].text);
    breathingTimer.current = window.setTimeout(() => {
      const nextIndex = stepIndex + 1;
      if (nextIndex >= breathingSequence.length) {
        breathingTimer.current = null;
        setBreathingActive(false);
        setBreathingPrompt("Rondje klaar. Nog eentje mag, niks moet.");
        return;
      }

      runBreathingStep(nextIndex);
    }, breathingSequence[stepIndex].delay);
  }

  function startBreathing() {
    if (breathingActive) {
      return;
    }

    setBreathingActive(true);
    runBreathingStep(0);
  }

  return (
    <section className={hugMode ? "love-page hug-mode page-enter" : "love-page page-enter"}>
      <div className="love-hero">
        <p className="eyebrow">voor sad, boze en drukke hoofdjes</p>
        <h1>
          Love hub <span className="heart">♥</span>
        </h1>
        <p className="lead">Als je sad bent bab, of als je hoofd veel te luid staat.</p>

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
          <button
            className="secondary-action"
            type="button"
            aria-pressed={hugMode}
            onClick={toggleHugMode}
          >
            {hugMode ? "Knuffelmodus aan" : "Knuffelmodus"}
          </button>
        </div>
      </div>

      {hugMode && (
        <section className="hug-panel" aria-live="polite">
          <p className="eyebrow">Knuffelmodus is aan</p>
          <h2>999999999999999999999999999999999999999999999999999999999999 virtuele knuffels</h2>
          <p className="hug-message">{hugMessage}</p>
          <p>{hugAction}</p>
          <div className="controls">
            <button className="primary-action" type="button" onClick={refreshHugSupport}>
              Nog een knuffelzin
            </button>
            <button className="secondary-action" type="button" onClick={doHugReset}>
              Doe mini knuffelreset
            </button>
          </div>
        </section>
      )}

      <div className="hub-grid">
        <HubCard title="Reminders">
          <p className="hub-text" aria-live="polite">
            {affirmation}
          </p>
          <div className="controls">
            <button
              className="primary-action"
              type="button"
              onClick={() =>
                setAffirmation((previous) => pickRandom(currentPack.affirmations, previous))
              }
            >
              Nieuwe zin
            </button>
            <button className="secondary-action" type="button" onClick={pinCurrentAffirmation}>
              {pinStatus}
            </button>
          </div>
        </HubCard>

        <HubCard title="Waarom ik van je hou">
          <p className="hub-text" aria-live="polite">
            {reason}
          </p>
          <button
            className="secondary-action inline-action"
            type="button"
            onClick={() => setReason((previous) => pickRandom(currentPack.reasons, previous))}
          >
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
            <button
              className="primary-action"
              type="button"
              disabled={breathingActive}
              onClick={startBreathing}
            >
              {breathingActive ? "Ademen..." : "Start ademrondje"}
            </button>
          </div>
        </HubCard>

        <HubCard title="Mini glimlach">
          <p className="hub-text" aria-live="polite">
            {tinyJoy}
          </p>
          <button
            className="secondary-action inline-action"
            type="button"
            onClick={() => setTinyJoy((previous) => pickRandom(currentPack.tinyJoy, previous))}
          >
            Nog iets liefs
          </button>
        </HubCard>

        <HubCard title="Pinned zinnen" wide>
          <p className="hub-text wide" aria-live="polite">
            {pinned || "Nog niks gepind. Als een zin goed is kan je er hier eentje zetten bb."}
          </p>
        </HubCard>

        <HubCard title="Briefje dat ik soms zal bijwerken <3" wide>
          <p className="hub-text wide">
            Hai bab,
            <br />
            <br />
            als je dit leest en je voelt je sad, boos of gewoon helemaal op, dan wil ik gewoon
            dat je weet dat ik je nog altijd suuuuper graag zie. Je hoeft niet eerst terug ok,
            lief, rustig of productief te zijn voor mij. Ook op dagen waar alles shit voelt of je
            hoofd veel te luid is, blijf jij gewoon mijn favoriete persoon ooit.
            <br />
            <br />
            Je moet niet alles in 1 keer oplossen. Je moet zelfs nu even helemaal niks oplossen.
            Adem eerst. Drink iets. Kruip in iets zachts. En als de dag stom is, dan is dat zo,
            maar jij bent daarom nog geen beetje minder waardevol of minder geliefd.
            <br />
            <br />
            Het is en zal altijd team jij en ik zijn.
          </p>
        </HubCard>
      </div>
    </section>
  );
}

function HubCard({
  title,
  children,
  wide = false
}: {
  title: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <article className={wide ? "hub-card wide-card" : "hub-card"}>
      <h2>{title}</h2>
      {children}
    </article>
  );
}

export default App;
