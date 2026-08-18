import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { CORRECT_PIN, isValidPin, PIN_LENGTH } from "../src/lib/auth";

describe("auth", () => {
  it("has pin 467946 and length 6", () => {
    assert.equal(CORRECT_PIN, "467946");
    assert.equal(PIN_LENGTH, 6);
  });

  it("validates pin correctly", () => {
    assert.equal(isValidPin("467946"), true);
    assert.equal(isValidPin("000000"), false);
    assert.equal(isValidPin("123456"), false);
    assert.equal(isValidPin("4679"), false);
    assert.equal(isValidPin(""), false);
  });
});
