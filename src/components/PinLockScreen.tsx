import { useEffect, useState, useCallback } from "react";
import { isValidPin, PIN_LENGTH } from "../lib/auth";
import { playPop, playSuccess, playTick } from "../lib/sound";

interface PinLockScreenProps {
  onUnlock: () => void;
}

export function PinLockScreen({ onUnlock }: PinLockScreenProps) {
  const [pin, setPin] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDigit = useCallback((digit: string) => {
    playTick(500 + Math.random() * 50);
    setPin((prev) => {
      if (prev.length >= PIN_LENGTH) return prev;
      const next = prev + digit;
      return next;
    });
    setIsError(false);
    setErrorMessage("");
  }, []);

  const handleBackspace = useCallback(() => {
    playPop();
    setPin((prev) => prev.slice(0, -1));
    setIsError(false);
    setErrorMessage("");
  }, []);

  // Check pin when it reaches PIN_LENGTH
  useEffect(() => {
    if (pin.length === PIN_LENGTH) {
      if (isValidPin(pin)) {
        playSuccess();
        onUnlock();
      } else {
        setIsError(true);
        setErrorMessage("Nope, foute code bab! Probeer opnieuw.");
        const timer = setTimeout(() => {
          setPin("");
          setIsError(false);
        }, 800);
        return () => clearTimeout(timer);
      }
    }
  }, [pin, onUnlock]);

  // Physical keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/^[0-9]$/.test(e.key)) {
        e.preventDefault();
        handleDigit(e.key);
      } else if (e.key === "Backspace") {
        e.preventDefault();
        handleBackspace();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleDigit, handleBackspace]);

  return (
    <div className="pin-screen-overlay page-enter">
      <div className={`pin-card ${isError ? "is-shaking" : ""}`}>
        <div className="pin-header">
          <div className="pin-icon" aria-hidden="true">
            🔒
          </div>
          <h1>Silly aap site</h1>
          <p className="pin-subtitle">
            Officiele aap controle.<br />Voer de 6-cijferige code in om binnen te geraken.
          </p>
        </div>

        <div className="pin-dots" aria-label={`Pincode invoer: ${pin.length} van ${PIN_LENGTH} cijfers ingevoerd`}>
          {Array.from({ length: PIN_LENGTH }).map((_, index) => (
            <div
              key={index}
              className={`pin-dot ${index < pin.length ? "is-filled" : ""} ${isError ? "is-error" : ""}`}
            />
          ))}
        </div>

        {errorMessage && (
          <p className="pin-error" role="alert">
            {errorMessage}
          </p>
        )}

        <div className="pin-numpad" aria-label="Nummerblok">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              type="button"
              className="pin-key"
              onClick={() => handleDigit(num.toString())}
            >
              {num}
            </button>
          ))}
          <div className="pin-key-spacer" />
          <button
            type="button"
            className="pin-key"
            onClick={() => handleDigit("0")}
          >
            0
          </button>
          <button
            type="button"
            className="pin-key pin-backspace"
            onClick={handleBackspace}
            aria-label="Verwijder cijfer"
          >
            ⌫
          </button>
        </div>

        <p className="pin-hint">
          Tip: jouw gsm 📱
        </p>
      </div>
    </div>
  );
}
