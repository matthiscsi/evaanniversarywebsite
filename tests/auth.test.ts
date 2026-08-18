import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { CORRECT_PIN, isValidPin, PIN_LENGTH } from "../src/lib/auth";

describe("auth", () => {
  it("has pin 4679 and length 4", () => {
    assert.equal(CORRECT_PIN, "4679");
    assert.equal(PIN_LENGTH, 4);
  });

  it("validates pin correctly", () => {
    assert.equal(isValidPin("4679"), true);
    assert.equal(isValidPin("0000"), false);
    assert.equal(isValidPin("1234"), false);
    assert.equal(isValidPin(""), false);
  });
});
