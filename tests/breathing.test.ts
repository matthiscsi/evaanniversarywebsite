import assert from "node:assert/strict";
import test from "node:test";
import { nextBreathingStep } from "../src/lib/breathing";

const steps = [
  { text: "in", delay: 1000 },
  { text: "uit", delay: 1000 }
] as const;

test("nextBreathingStep returns null at sequence end", () => {
  assert.equal(nextBreathingStep(steps, 0), 1);
  assert.equal(nextBreathingStep(steps, 1), null);
});
