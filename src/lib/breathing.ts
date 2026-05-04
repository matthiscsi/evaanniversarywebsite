export interface BreathingStep {
  text: string;
  delay: number;
}

export function nextBreathingStep(steps: readonly BreathingStep[], index: number): number | null {
  const nextIndex = index + 1;
  return nextIndex >= steps.length ? null : nextIndex;
}
