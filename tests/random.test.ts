import assert from "node:assert/strict";
import test from "node:test";
import { pickRandom } from "../src/lib/random";

test("pickRandom returns only item when array length is 1", () => {
  assert.equal(pickRandom(["eva"]), "eva");
});

test("pickRandom avoids immediate repeats when alternatives exist", () => {
  const items = ["a", "b", "c"];
  for (let i = 0; i < 40; i += 1) {
    assert.notEqual(pickRandom(items, "a"), "a");
  }
});

test("pickRandom throws for empty arrays", () => {
  assert.throws(() => pickRandom([]), /empty list/i);
});
