// Subscribe to the module-level Lenis singleton via useSyncExternalStore so
// consumers re-render when the instance is created / torn down.

import { useSyncExternalStore } from "react";
import type Lenis from "lenis";
import { subscribe, getLenis } from "./lenisStore";

const getServerSnapshot = (): Lenis | null => null;

export function useLenis(): Lenis | null {
  return useSyncExternalStore(subscribe, getLenis, getServerSnapshot);
}
