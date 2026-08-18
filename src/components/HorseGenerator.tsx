import { useCallback, useEffect, useState } from "react";
import { horseParts } from "../data";
import { pickRandom } from "../lib/random";
import { playPop, playSuccess } from "../lib/sound";
import { safeGetLocalStorage, safeSetLocalStorage } from "../lib/storage";

const SAVED_HORSES_KEY = "horses.favorites.v1";

export function HorseGenerator() {
  const [enabledParts, setEnabledParts] = useState({
    first: true,
    middle: true,
    last: true,
    title: true
  });
  const [horseName, setHorseName] = useState("Druk op genereer");
  const [status, setStatus] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [savedHorses, setSavedHorses] = useState<string[]>(() => {
    try {
      const parsed = JSON.parse(safeGetLocalStorage(SAVED_HORSES_KEY)) as unknown;
      return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === "string") : [];
    } catch {
      return [];
    }
  });

  const generateHorse = useCallback((playSound = true) => {
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
    if (playSound) playPop();
    setHorseName(nextName);
    setHistory((current) => [nextName, ...current.filter((name) => name !== nextName)].slice(0, 6));
    setStatus("");
  }, [enabledParts]);

  useEffect(() => {
    generateHorse(false);
  }, [generateHorse]);

  async function copyCurrentName() {
    if (!horseName || horseName === "Druk op genereer" || horseName === "Niks aangevinkt") {
      setStatus("Genereer eerst een naam.");
      return;
    }

    playSuccess();
    try {
      await navigator.clipboard.writeText(horseName);
      setStatus("Naam gekopieerd naar klembord! ✨");
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = horseName;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(textarea);
      setStatus(ok ? "Naam gekopieerd naar klembord! ✨" : "Kopiëren lukte niet. Selecteer handmatig.");
    }
  }

  function toggleSaveHorse(nameToSave: string) {
    if (!nameToSave || nameToSave === "Druk op genereer" || nameToSave === "Niks aangevinkt") return;

    setSavedHorses((prev) => {
      const isAlreadySaved = prev.includes(nameToSave);
      const next = isAlreadySaved ? prev.filter((h) => h !== nameToSave) : [nameToSave, ...prev];
      safeSetLocalStorage(SAVED_HORSES_KEY, JSON.stringify(next));
      if (!isAlreadySaved) {
        playSuccess();
        setStatus("Peirt opgeslagen in je stal! 🐴");
      } else {
        playPop();
        setStatus("Peirt verwijderd uit je stal.");
      }
      return next;
    });
  }

  const isCurrentSaved = savedHorses.includes(horseName);

  return (
    <section className="generator-panel page-enter" aria-labelledby="horse-title">
      <div className="tool-intro compact">
        <p className="eyebrow">chaos mode</p>
        <h1 id="horse-title">
          dinkelpeirt generator <span className="heart">{"\u2665"}</span>
        </h1>
        <p className="lead">woooo</p>
      </div>

      <div className="name-reveal" aria-live="polite">
        <span>{horseName}</span>
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
        <button className="primary-action" type="button" onClick={() => generateHorse(true)}>
          Genereer nieuw peirt 🐴
        </button>
        <button className="secondary-action" type="button" onClick={copyCurrentName}>
          Kopieer naam 📋
        </button>
        <button
          className="secondary-action"
          type="button"
          onClick={() => toggleSaveHorse(horseName)}
        >
          {isCurrentSaved ? "★ In je stal" : "☆ Zet in stal"}
        </button>
      </div>

      <p className="status" aria-live="polite">
        {status}
      </p>

      {savedHorses.length > 0 && (
        <div className="history-wrap">
          <p className="history-label">Jouw favoriete stal 🌟</p>
          <ul className="history-list" aria-label="Opgeslagen paarden">
            {savedHorses.map((name) => (
              <li key={name}>
                <span>🐴 {name}</span>
                <button
                  type="button"
                  className="unpin-btn"
                  onClick={() => toggleSaveHorse(name)}
                  title="Verwijder uit stal"
                  aria-label="Verwijder uit stal"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {history.length > 0 && (
        <div className="history-wrap">
          <p className="history-label">Recente peirt hall of fame</p>
          <ul className="history-list" aria-label="Recente peirtnamen">
            {history.map((name) => (
              <li key={name}>
                <span>{name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
