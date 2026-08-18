import { useCallback, useState, type ReactNode } from "react";
import { hugActions, hugMessages, moodPacks, type Mood } from "../data";
import { pickRandom } from "../lib/random";
import { playPop, playSuccess } from "../lib/sound";
import { safeGetLocalStorage, safeSetLocalStorage } from "../lib/storage";
import { BreathingCircle } from "./BreathingCircle";

const PINNED_STORAGE_KEY = "loveHub.pinned.v2";

export function LoveHub() {
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
  const [copyStatus, setCopyStatus] = useState("");

  const currentPack = moodPacks[mood];

  const refreshMoodContent = useCallback((nextMood: Mood) => {
    const pack = moodPacks[nextMood];
    setComfort((previous) => pickRandom(pack.comfort, previous));
    setAffirmation((previous) => pickRandom(pack.affirmations, previous));
    setReason((previous) => pickRandom(pack.reasons, previous));
    setTinyJoy((previous) => pickRandom(pack.tinyJoy, previous));
  }, []);

  const refreshHugSupport = useCallback(() => {
    playPop();
    setHugMessage((previous) => pickRandom(hugMessages, previous));
    setHugAction((previous) => pickRandom(hugActions, previous));
  }, []);

  function selectMood(nextMood: Mood) {
    playPop();
    setMood(nextMood);
    refreshMoodContent(nextMood);
  }

  function toggleHugMode() {
    playSuccess();
    setHugMode((v) => !v);
  }

  function pinCurrentAffirmation() {
    const next = [affirmation, ...pinned.filter((line) => line !== affirmation)].slice(0, 6);
    const ok = safeSetLocalStorage(PINNED_STORAGE_KEY, JSON.stringify(next));
    if (!ok) {
      setPinStatus("Kon niet pinnen");
      return;
    }
    playSuccess();
    setPinned(next);
    setPinStatus("Gepind! ✨");
    window.setTimeout(() => setPinStatus("Pin deze"), 1400);
  }

  function unpinSentence(indexToRemove: number) {
    playPop();
    const next = pinned.filter((_, idx) => idx !== indexToRemove);
    safeSetLocalStorage(PINNED_STORAGE_KEY, JSON.stringify(next));
    setPinned(next);
  }

  function clearPinned() {
    playPop();
    const ok = safeSetLocalStorage(PINNED_STORAGE_KEY, JSON.stringify([]));
    if (ok) {
      setPinned([]);
    }
  }

  async function copyText(text: string) {
    playSuccess();
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus("Gekopieerd! ✨");
      window.setTimeout(() => setCopyStatus(""), 1500);
    } catch {}
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

        <div className="mood-selection-bar" role="group" aria-label="Hoe voel je je vandaag?">
          <div className="mood-pills">
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
          </div>
          <div className="hub-quick-actions">
            <button
              className={hugMode ? "secondary-action is-active" : "secondary-action"}
              type="button"
              aria-pressed={hugMode}
              onClick={toggleHugMode}
            >
              {hugMode ? "Knuffelmodus aan 🫂" : "Knuffelmodus 🫂"}
            </button>
            <button
              className="secondary-action"
              type="button"
              onClick={() => {
                playPop();
                refreshMoodContent(mood);
              }}
            >
              Quick comfort ✨
            </button>
          </div>
        </div>
      </div>

      {hugMode && (
        <section className="hug-panel page-enter" aria-live="polite">
          <p className="eyebrow">Knuffelmodus is aan</p>
          <h2>9999999999999999999999 virtuele knuffels</h2>
          <p className="hug-message">{hugMessage}</p>
          <p>{hugAction}</p>
          <div className="controls">
            <button className="primary-action" type="button" onClick={refreshHugSupport}>
              Nog een knuffelzin 🫂
            </button>
            <button
              className="secondary-action"
              type="button"
              onClick={() => {
                playPop();
                refreshMoodContent(mood);
              }}
            >
              Mini knuffelreset
            </button>
          </div>
        </section>
      )}

      <div className="hub-grid">
        <HubCard title="Reminders">
          <p className="hub-text" aria-live="polite">{affirmation}</p>
          <div className="controls">
            <button
              className="primary-action"
              type="button"
              onClick={() => {
                playPop();
                setAffirmation((previous) => pickRandom(currentPack.affirmations, previous));
              }}
            >
              Nieuwe zin ✨
            </button>
            <button className="secondary-action" type="button" onClick={pinCurrentAffirmation}>
              {pinStatus}
            </button>
            <button className="secondary-action" type="button" onClick={() => copyText(affirmation)}>
              {copyStatus || "Kopieer 📋"}
            </button>
          </div>
        </HubCard>

        <HubCard title="Waarom ik van je hou">
          <p className="hub-text" aria-live="polite">{reason}</p>
          <button
            className="secondary-action inline-action"
            type="button"
            onClick={() => {
              playPop();
              setReason((previous) => pickRandom(currentPack.reasons, previous));
            }}
          >
            Nog eentje ❤️
          </button>
        </HubCard>

        <HubCard title="Kleine reset">
          <ul className="mini-steps">
            {currentPack.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
          <BreathingCircle />
        </HubCard>

        <HubCard title="Mini glimlach">
          <p className="hub-text" aria-live="polite">{tinyJoy}</p>
          <button
            className="secondary-action inline-action"
            type="button"
            onClick={() => {
              playPop();
              setTinyJoy((previous) => pickRandom(currentPack.tinyJoy, previous));
            }}
          >
            Nog iets liefs 🌸
          </button>
        </HubCard>

        <HubCard title="Pinned zinnen" wide>
          {pinned.length ? (
            <div className="pinned-items-grid" aria-live="polite">
              {pinned.map((line, idx) => (
                <div key={idx} className="pinned-item-card">
                  <p>{line}</p>
                  <button
                    type="button"
                    className="unpin-btn"
                    title="Verwijder van pinned"
                    aria-label="Verwijder zin"
                    onClick={() => unpinSentence(idx)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="hub-text wide">Nog niks gepind. Als een zin goed voelt kan je er hier eentje zetten bb.</p>
          )}
          {pinned.length > 0 && (
            <button className="secondary-action inline-action" type="button" onClick={clearPinned}>
              Clear all pinned
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
