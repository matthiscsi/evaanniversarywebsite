import assert from "node:assert/strict";
import test from "node:test";
import { hashFromPage, pageFromHash } from "../src/lib/routing";

test("pageFromHash handles valid and invalid hashes", () => {
  assert.equal(pageFromHash("#/photos"), "photos");
  assert.equal(pageFromHash("#/food"), "food");
  assert.equal(pageFromHash("#love"), "love");
  assert.equal(pageFromHash("#/bucketlist"), "bucketlist");
  assert.equal(pageFromHash("#/wishlist"), "wishlist");
  assert.equal(pageFromHash("#/unknown"), "home");
  assert.equal(pageFromHash(""), "home");
});

test("hashFromPage creates stable hashes", () => {
  assert.equal(hashFromPage("home"), "#/");
  assert.equal(hashFromPage("horse"), "#/horse");
  assert.equal(hashFromPage("food"), "#/food");
  assert.equal(hashFromPage("bucketlist"), "#/bucketlist");
  assert.equal(hashFromPage("wishlist"), "#/wishlist");
});
