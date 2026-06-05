import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

const KEY = "portfolio:theme";
const EVENT = "portfolio:theme-change";

function read(): Theme {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem(KEY);
  if (stored === "light" || stored === "dark") return stored;
  
  // Default to system preference
  if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    return "light";
  }
  return "dark";
}

function subscribe(cb: () => void) {
  const handler = () => {
    const theme = read();
    const root = document.documentElement;
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
      root.style.colorScheme = "light";
    } else {
      root.removeAttribute("data-theme");
      root.style.colorScheme = "dark";
    }
    cb();
  };

  window.addEventListener(EVENT, handler);
  window.addEventListener("storage", handler);
  
  const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
  mediaQuery.addEventListener("change", handler);
  
  return () => {
    window.removeEventListener(EVENT, handler);
    window.removeEventListener("storage", handler);
    mediaQuery.removeEventListener("change", handler);
  };
}

export function setTheme(theme: Theme) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, theme);
  
  const root = document.documentElement;
  if (theme === "light") {
    root.setAttribute("data-theme", "light");
    root.style.colorScheme = "light";
  } else {
    root.removeAttribute("data-theme");
    root.style.colorScheme = "dark";
  }
  
  window.dispatchEvent(new Event(EVENT));
}

export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, read, () => "dark" as Theme);
}

// Initialize on import
if (typeof window !== "undefined") {
  const t = read();
  const root = document.documentElement;
  if (t === "light") {
    root.setAttribute("data-theme", "light");
    root.style.colorScheme = "light";
  } else {
    root.removeAttribute("data-theme");
    root.style.colorScheme = "dark";
  }
}
