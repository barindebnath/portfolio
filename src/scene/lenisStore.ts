// Module-level Lenis singleton.
//
// The smooth-scroll instance has app-global lifetime, so we keep it outside
// React state. Consumers subscribe via useLenis() (useSyncExternalStore),
// which avoids the react-hooks/set-state-in-effect violation that a plain
// useState-in-provider pattern would cause.

import type Lenis from "lenis";

let lenis: Lenis | null = null;
const listeners = new Set<() => void>();

export function setLenis(instance: Lenis | null) {
  lenis = instance;
  for (const l of listeners) l();
}

export function getLenis(): Lenis | null {
  return lenis;
}

export function subscribe(cb: () => void): () => void {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}
