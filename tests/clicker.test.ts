import test from "node:test";
import assert from "node:assert/strict";
import { UPGRADES, getUpgradeCost, calculateStats } from "../src/lib/clicker";

test("clicker: base stats without inventory", () => {
  const stats = calculateStats({});
  assert.equal(stats.kps, 0);
  assert.equal(stats.kpt, 1);
});

test("clicker: cost increases with count exponentially", () => {
  const catnip = UPGRADES.find((u) => u.id === "catnip")!;
  assert.ok(catnip);

  const cost0 = getUpgradeCost(catnip, 0);
  const cost1 = getUpgradeCost(catnip, 1);
  const cost5 = getUpgradeCost(catnip, 5);

  assert.equal(cost0, 15);
  assert.ok(cost1 > cost0, "Cost for 1 should be higher than cost for 0");
  assert.ok(cost5 > cost1, "Cost for 5 should be higher than cost for 1");
});

test("clicker: stats calculation with inventory upgrades", () => {
  const inventory = {
    catnip: 2, // 2 * 1 kps = 2
    tweezers: 3, // 3 * 2 kpt = +6 kpt
    smoothie: 1 // 1 * 6 kps = +6 kps, 1 * 1 kpt = +1 kpt
  };

  const stats = calculateStats(inventory);
  assert.equal(stats.kps, 2 + 6); // 8 kps
  assert.equal(stats.kpt, 1 + 6 + 1); // 8 kpt
});
