import { safeGetLocalStorage, safeSetLocalStorage } from "./storage";

export type Theme = "light" | "dark";
const THEME_KEY = "aap.theme.v1";

export function getInitialTheme(): Theme {
  const saved = safeGetLocalStorage(THEME_KEY);
  if (saved === "dark" || saved === "light") {
    return saved;
  }
  if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

export function applyTheme(theme: Theme): void {
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-theme", theme);
    safeSetLocalStorage(THEME_KEY, theme);
  }
}
