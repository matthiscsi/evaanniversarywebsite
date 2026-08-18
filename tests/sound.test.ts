import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { isSoundEnabled, toggleSound, playTick, playPop, playSuccess } from "../src/lib/sound";

describe("sound", () => {
  it("toggles sound correctly", () => {
    const initial = isSoundEnabled();
    const toggled = toggleSound();
    assert.equal(toggled, !initial);
    assert.equal(isSoundEnabled(), !initial);
    // restore
    toggleSound();
    assert.equal(isSoundEnabled(), initial);
  });

  it("handles sound functions without crashing in non-browser env", () => {
    assert.doesNotThrow(() => playTick());
    assert.doesNotThrow(() => playPop());
    assert.doesNotThrow(() => playSuccess());
  });
});
