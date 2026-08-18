import { useEffect, useRef, useState } from "react";
import { breathingSequence } from "../data";
import { nextBreathingStep } from "../lib/breathing";
import { playPop, playSuccess, playTick } from "../lib/sound";

type Phase = "idle" | "inhale" | "hold" | "exhale" | "rest";

export function BreathingCircle() {
  const [isActive, setIsActive] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [prompt, setPrompt] = useState("Inademen 4, vasthouden 4, uitademen 6. Rustig is genoeg.");
  const [phase, setPhase] = useState<Phase>("idle");
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const getPhaseFromStep = (index: number): Phase => {
    switch (index) {
      case 0:
        return "inhale";
      case 1:
        return "hold";
      case 2:
        return "exhale";
      default:
        return "rest";
    }
  };

  const runStep = (index: number) => {
    setStepIndex(index);
    setPrompt(breathingSequence[index].text);
    setPhase(getPhaseFromStep(index));
    playTick(index === 0 ? 320 : index === 1 ? 380 : index === 2 ? 260 : 300);

    timerRef.current = window.setTimeout(() => {
      const next = nextBreathingStep(breathingSequence, index);
      if (next === null) {
        timerRef.current = null;
        setIsActive(false);
        setPhase("idle");
        playSuccess();
        setPrompt("Rondje klaar. Goed gedaan bb. Nog eentje mag, niks moet.");
        return;
      }
      runStep(next);
    }, breathingSequence[index].delay);
  };

  const startBreathing = () => {
    if (isActive) return;
    playPop();
    setIsActive(true);
    runStep(0);
  };

  const stopBreathing = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsActive(false);
    setPhase("idle");
    setPrompt("Stop gezet. Je mag straks opnieuw proberen.");
  };

  return (
    <div className="breathing-box">
      <h3>Adem even mee</h3>

      <div className={`breathing-circle-wrapper ${phase}`}>
        <div className="breathing-circle-outer">
          <div className="breathing-circle-inner" />
        </div>
        <span className="breathing-phase-label" aria-hidden="true">
          {phase === "inhale" && "In..."}
          {phase === "hold" && "Vast..."}
          {phase === "exhale" && "Uit..."}
          {phase === "rest" && "Rust..."}
          {phase === "idle" && "❤️"}
        </span>
      </div>

      <p className="breathing-prompt" aria-live="polite">
        {prompt}
      </p>

      <div className="controls">
        <button
          className="primary-action"
          type="button"
          disabled={isActive}
          onClick={startBreathing}
        >
          {isActive ? "Ademen..." : "Start ademrondje"}
        </button>
        <button
          className="secondary-action"
          type="button"
          onClick={stopBreathing}
          disabled={!isActive}
        >
          Stop
        </button>
      </div>
    </div>
  );
}
