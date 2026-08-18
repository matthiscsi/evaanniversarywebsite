import type { Page } from "../data";

const PAGES: readonly Page[] = ["home", "photos", "horse", "food", "love"];
const VALID = new Set(PAGES);

export function pageFromHash(hash: string): Page {
  const value = hash.replace(/^#\/?/, "").trim();
  return VALID.has(value as Page) ? (value as Page) : "home";
}

export function hashFromPage(page: Page): string {
  return page === "home" ? "#/" : `#/${page}`;
}
