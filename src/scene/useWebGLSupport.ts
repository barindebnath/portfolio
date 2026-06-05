// Feature detect for WebGL + caller preferences that should disable the
// heavy 3D scene (reduced-motion, very small viewports, missing GL context).
// Runs once on mount; resize is intentionally NOT watched — switching scenes
// mid-session would be jarring and would re-mount the whole tree.

import { useState } from "react";

function detectWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    return !!gl;
  } catch {
    return false;
  }
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isSmallViewport(): boolean {
  if (typeof window === "undefined") return false;
  // Mobile gets the fallback per spec — coarse pointer OR narrow viewport.
  const narrow = window.innerWidth < 768;
  const coarse =
    window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
  return narrow || coarse;
}

function computeDecision(): boolean | null {
  // Pre-render (no window) → null lets App show a neutral shell instead of
  // committing to a tree it may have to swap on hydration.
  if (typeof window === "undefined") return null;
  return detectWebGL() && !prefersReducedMotion() && !isSmallViewport();
}

export function useShouldRender3D(): boolean | null {
  // Lazy initializer — runs once during first render, no effect needed,
  // so we never trip react-hooks/set-state-in-effect.
  const [decision] = useState<boolean | null>(computeDecision);
  return decision;
}
