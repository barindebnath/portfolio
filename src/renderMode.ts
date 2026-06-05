// User-controlled render-mode override.
//
// "auto" → follow capability detection (WebGL + viewport + reduced motion).
// "flat" → force the fallback 2D layout regardless of capability.
// "rich" → force the 3D scene even if heuristics would skip it.
//
// Persisted to localStorage so the choice survives reloads. A custom event
// lets components in different subtrees stay in sync without prop drilling.

import { useSyncExternalStore } from "react";

export type RenderMode = "auto" | "flat" | "rich";

const KEY = "portfolio:render-mode";
const EVENT = "portfolio:render-mode-change";

function read(): RenderMode {
  if (typeof window === "undefined") return "auto";
  const v = window.localStorage.getItem(KEY);
  return v === "flat" || v === "rich" ? v : "auto";
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

export function setRenderMode(mode: RenderMode) {
  if (typeof window === "undefined") return;
  if (mode === "auto") window.localStorage.removeItem(KEY);
  else window.localStorage.setItem(KEY, mode);
  window.dispatchEvent(new Event(EVENT));
}

export function useRenderMode(): RenderMode {
  return useSyncExternalStore(subscribe, read, () => "auto" as RenderMode);
}
