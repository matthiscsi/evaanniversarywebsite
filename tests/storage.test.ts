import assert from "node:assert/strict";
import test from "node:test";
import { safeGetLocalStorage, safeSetLocalStorage } from "../src/lib/storage";

class MemoryStorage {
  private data = new Map<string, string>();
  getItem(key: string): string | null { return this.data.get(key) ?? null; }
  setItem(key: string, value: string): void { this.data.set(key, value); }
}

test("safe storage reads and writes", () => {
  (globalThis as any).window = { localStorage: new MemoryStorage() };
  assert.equal(safeSetLocalStorage("k", "v"), true);
  assert.equal(safeGetLocalStorage("k"), "v");
});

test("safe storage handles throwing implementations", () => {
  (globalThis as any).window = {
    localStorage: {
      getItem() { throw new Error("blocked"); },
      setItem() { throw new Error("blocked"); }
    }
  };

  assert.equal(safeGetLocalStorage("k"), "");
  assert.equal(safeSetLocalStorage("k", "v"), false);
});
