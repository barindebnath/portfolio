// Shared scroll-progress ref. Updated by the LenisProvider's scroll callback
// in SceneRoot and read inside useFrame by CameraRig (and any future
// scroll-reactive 3D component). Using a ref instead of state keeps the
// scroll-loop free of React re-renders.

import { useRef } from "react";

export type ScrollState = {
  /** 0..1 across the full scrollable height */
  progress: number;
  /** Float section index — e.g. 1.4 means 40% between section 1 and 2 */
  sectionIndex: number;
};

export function createScrollState(): ScrollState {
  return { progress: 0, sectionIndex: 0 };
}

// Module-level singleton — there's only ever one scroll in a page, and we
// want the camera + any decorative meshes to read the same instantaneous
// value during the same frame.
const scrollState: ScrollState = createScrollState();

export function getScrollState(): ScrollState {
  return scrollState;
}

export function updateScrollState(progress: number, sectionCount: number) {
  scrollState.progress = progress;
  // Progress 0..1 maps onto section indices 0..(count-1).
  scrollState.sectionIndex = progress * Math.max(1, sectionCount - 1);
}

// A hook-flavored alias for components that prefer the import shape, but
// note: this returns the same object on every render — values mutate in place.
export function useScrollStateRef() {
  return useRef(scrollState);
}
