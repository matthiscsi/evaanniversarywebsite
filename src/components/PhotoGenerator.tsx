import { useCallback, useEffect, useMemo, useState } from "react";
import { safeGetLocalStorage, safeSetLocalStorage } from "../lib/storage";
import { pickRandom } from "../lib/random";
import { playPop, playSuccess } from "../lib/sound";
import { photos, type PhotoItem } from "../photos";
import { LouliClicker } from "./LouliClicker";

const FAVORITE_PHOTO_KEY = "lou.favorite.v1";

export function PhotoGenerator() {
  const [brokenPhotoIds, setBrokenPhotoIds] = useState<string[]>([]);
  const [history, setHistory] = useState<PhotoItem[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [status, setStatus] = useState("Lou gereed.");
  const [favoritePhotoId, setFavoritePhotoId] = useState(() => safeGetLocalStorage(FAVORITE_PHOTO_KEY));
  const [heartBurst, setHeartBurst] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

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

    playPop();
    setHistory((current) => [...current.slice(0, historyIndex + 1), next]);
    setHistoryIndex((current) => current + 1);
    setStatus("Lou gereed.");
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
      } else if (event.code === "ArrowLeft") {
        if (historyIndex > 0) {
          playPop();
          setHistoryIndex((v) => v - 1);
        }
      } else if (event.code === "ArrowRight") {
        if (historyIndex < history.length - 1) {
          playPop();
          setHistoryIndex((v) => v + 1);
        } else {
          showRandomPhoto();
        }
      } else if (event.code === "Escape") {
        setIsLightboxOpen(false);
      }
    };

    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, [showRandomPhoto, historyIndex, history.length]);

  function markPhotoBroken(photo: PhotoItem) {
    setBrokenPhotoIds((current) => (current.includes(photo.id) ? current : [...current, photo.id]));
    setStatus("Deze foto kon niet geladen worden, we slaan hem over.");
  }

  function toggleFavorite() {
    if (!currentPhoto) return;

    const next = favoritePhotoId === currentPhoto.id ? "" : currentPhoto.id;
    setFavoritePhotoId(next);
    safeSetLocalStorage(FAVORITE_PHOTO_KEY, next);
    if (next) {
      playSuccess();
      triggerHeartAnimation();
    } else {
      playPop();
    }
  }

  function triggerHeartAnimation() {
    setHeartBurst(true);
    window.setTimeout(() => setHeartBurst(false), 900);
  }

  function handlePhotoTap() {
    triggerHeartAnimation();
    playPop();
  }

  return (
    <div className="photo-page-wrapper page-enter">
      <section className="tool-layout" aria-labelledby="lou-title">
        <div className="tool-intro">
          <h1 id="lou-title">
            Louli generator <span className="heart">{"\u2665"}</span>
          </h1>
          <p className="lead">
            Druk op de knop, spatie of tik op de foto voor een nieuw momentje van onze allerliefste baby.
          </p>
          <div className="controls photo-controls">
            <button className="primary-action" type="button" onClick={showRandomPhoto}>
              Nieuwe random foto
            </button>
            <button
              className="secondary-action"
              type="button"
              onClick={() => {
                playPop();
                setHistoryIndex((v) => Math.max(0, v - 1));
              }}
              disabled={historyIndex <= 0}
              title="Vorige foto (Pijltje links)"
            >
              ← Vorige
            </button>
            <button
              className="secondary-action"
              type="button"
              onClick={() => {
                playPop();
                setHistoryIndex((v) => Math.min(history.length - 1, v + 1));
              }}
              disabled={historyIndex >= history.length - 1}
              title="Volgende foto (Pijltje rechts)"
            >
              Volgende →
            </button>
            <button
              className="secondary-action"
              type="button"
              onClick={toggleFavorite}
              disabled={!currentPhoto}
            >
              {currentPhoto && favoritePhotoId === currentPhoto.id ? "★ Favoriet vast" : "☆ Pin favoriet"}
            </button>
          </div>
          <p className="status" aria-live="polite">
            {status}
          </p>
        </div>

        <figure className="photo-stage" onClick={handlePhotoTap} role="button" tabIndex={0} aria-label="Tik voor liefde">
          {heartBurst && <span className="heart-burst" aria-hidden="true">❤️</span>}

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
                {favoritePhotoId === currentPhoto.id ? "★ " : ""}
                {currentPhoto.caption}
                <button
                  type="button"
                  className="zoom-hint-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsLightboxOpen(true);
                  }}
                  aria-label="Vergroot foto"
                  title="Vergroot foto"
                >
                  🔍
                </button>
              </figcaption>
            </>
          ) : (
            <figcaption>Geen foto's gevonden in /photos.</figcaption>
          )}
        </figure>

        {/* Lightbox Modal */}
        {isLightboxOpen && currentPhoto && (
          <div className="lightbox-overlay" onClick={() => setIsLightboxOpen(false)}>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <img src={currentPhoto.src} alt={currentPhoto.caption} />
              <button
                type="button"
                className="lightbox-close"
                onClick={() => setIsLightboxOpen(false)}
                aria-label="Sluit vergroting"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </section>

      <LouliClicker />
    </div>
  );
}
