import { useCallback, useRef, useState } from "react";
import { foodOptions, type FoodOption } from "../data";
import { pickRandom } from "../lib/random";
import { playSuccess, playWheelTick } from "../lib/sound";
import { ConfettiCanvas, triggerConfetti } from "./Confetti";

export function FoodWheel() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState<FoodOption | null>(null);
  const [hypeMessage, setHypeMessage] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const spinWheel = useCallback(() => {
    if (isSpinning) return;

    setIsSpinning(true);
    setWinner(null);
    setHypeMessage("");

    // Choose random winner
    const winningIndex = Math.floor(Math.random() * foodOptions.length);
    const chosenFood = foodOptions[winningIndex];

    // Jitter inside the 120 degree slice (safe zone between -35 and +35 from center)
    const jitter = (Math.random() - 0.5) * 70;
    const sliceCenterAngle = winningIndex * 120 + 60;
    const targetRemainder = (360 - (sliceCenterAngle + jitter) % 360 + 360) % 360;

    // Spin at least 5 to 7 full rotations
    const extraSpins = (5 + Math.floor(Math.random() * 3)) * 360;
    const currentRemainder = rotation % 360;
    const delta = ((targetRemainder - currentRemainder + 360) % 360) + extraSpins;
    const nextRotation = rotation + delta;

    setRotation(nextRotation);

    // Audio tick simulation matching easing curve
    let tickDelay = 60;
    let elapsed = 0;
    const scheduleNextTick = () => {
      if (elapsed >= 3400) return;
      playWheelTick();
      elapsed += tickDelay;
      // Exponentially slow down tick rate
      tickDelay = Math.min(450, tickDelay * 1.08 + 2);
      window.setTimeout(scheduleNextTick, tickDelay);
    };
    scheduleNextTick();

    window.setTimeout(() => {
      setIsSpinning(false);
      setWinner(chosenFood);
      setHypeMessage(pickRandom(chosenFood.hype));
      playSuccess();
      triggerConfetti(canvasRef.current);
    }, 3600);
  }, [isSpinning, rotation]);

  return (
    <section className="tool-layout food-layout page-enter" aria-labelledby="food-title">
      <ConfettiCanvas canvasRef={canvasRef} />

      <div className="tool-intro">
        <h1 id="food-title">
          WTF gaan wij eten <span className="heart">{"\u2665"}</span>
        </h1>
        <p className="lead">
          Frietjes, piesta of pokebowl.
        </p>

        <div className="controls">
          <button
            className="primary-action spin-btn"
            type="button"
            onClick={spinWheel}
            disabled={isSpinning}
          >
            {isSpinning ? "Aan het draaien..." : "Draai rad"}
          </button>
        </div>

        {winner && (
          <div className="winner-card" aria-live="polite">
            <span className="winner-emoji" aria-hidden="true">{winner.emoji}</span>
            <div className="winner-info">
              <p className="winner-eyebrow">Het lot heeft gekozen:</p>
              <h2 className="winner-title">{winner.name}!</h2>
              <p className="winner-hype">{hypeMessage}</p>
            </div>
          </div>
        )}
      </div>

      <div className="wheel-container">
        <div className="wheel-pointer" aria-hidden="true">
          ▼
        </div>

        <div
          className={`wheel-disc ${isSpinning ? "is-spinning" : ""}`}
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? "transform 3.6s cubic-bezier(0.15, 0.95, 0.35, 1.02)" : "none"
          }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 400 400" className="wheel-svg">
            <defs>
              {/* Drop shadow on wheel */}
              <filter id="wheel-shadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.15" />
              </filter>
            </defs>

            {/* Slice 0: frietjes (0° to 120° from 12 o'clock) */}
            {/* SVG path: center (200,200), arc from (200, 10) to (200 + 190*sin(120°), 200 - 190*cos(120°)) = (364.5, 295) */}
            <path
              d="M 200 200 L 200 10 A 190 190 0 0 1 364.54 295 Z"
              fill="#f6be74"
              stroke="#fff"
              strokeWidth="4"
            />
            {/* Slice 1: piesta (120° to 240°) */}
            {/* Arc from (364.5, 295) to (200 - 190*sin(60°), 200 - 190*cos(120°)) = (35.46, 295) */}
            <path
              d="M 200 200 L 364.54 295 A 190 190 0 0 1 35.46 295 Z"
              fill="#e26482"
              stroke="#fff"
              strokeWidth="4"
            />
            {/* Slice 2: pokebowl (240° to 360° / 0°) */}
            {/* Arc from (35.46, 295) to (200, 10) */}
            <path
              d="M 200 200 L 35.46 295 A 190 190 0 0 1 200 10 Z"
              fill="#88b28f"
              stroke="#fff"
              strokeWidth="4"
            />

            {/* Outer border */}
            <circle cx="200" cy="200" r="190" fill="none" stroke="#fff" strokeWidth="8" />

            {/* Text and emoji in slice 0 (Frietjes - 60°) */}
            <g transform="rotate(60 200 200) translate(200 70)">
              <text textAnchor="middle" fill="#573611" fontWeight="900" fontSize="22" fontFamily="Nunito, sans-serif">
                🍟 FRIETJES
              </text>
            </g>

            {/* Text and emoji in slice 1 (Piesta - 180°) */}
            <g transform="rotate(180 200 200) translate(200 70)">
              <text textAnchor="middle" fill="#4f1624" fontWeight="900" fontSize="22" fontFamily="Nunito, sans-serif">
                🍝 PIESTA
              </text>
            </g>

            {/* Text and emoji in slice 2 (Pokebowl - 300°) */}
            <g transform="rotate(300 200 200) translate(200 70)">
              <text textAnchor="middle" fill="#1d3d23" fontWeight="900" fontSize="22" fontFamily="Nunito, sans-serif">
                🥗 POKEBOWL
              </text>
            </g>

            {/* Center cap */}
            <circle cx="200" cy="200" r="32" fill="#fffdf9" stroke="#edd7d0" strokeWidth="4" />
            <text x="200" y="206" textAnchor="middle" fontSize="16" fill="#402733" fontWeight="900">
              ❤️
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}
