// Entry: pick the 3D scene if WebGL is supported, the viewport is large
// enough, and the user hasn't requested reduced motion. Otherwise render
// the original flat layout (preserved verbatim under src/fallback/).
//
// A user-controlled override (see renderMode.ts) can force either path
// regardless of capability — useful on corporate laptops or slow links.
//
// We render nothing on the first paint (decision === null) to avoid a
// flash of the wrong tree before the feature detect runs.

import { lazy, Suspense } from "react";
import { useShouldRender3D } from "./scene/useWebGLSupport";
import { useRenderMode } from "./renderMode";
import Fallback from "./fallback/Fallback";

// Lazy-load the 3D bundle so the WebGL-disabled path never downloads
// three.js, drei, postprocessing, etc.
const SceneRoot = lazy(() => import("./scene/SceneRoot"));

export default function App() {
  const auto = useShouldRender3D();
  const mode = useRenderMode();

  if (mode === "flat") return <Fallback />;

  if (mode === "auto" && auto === null) {
    return <div className="min-h-screen bg-bg" />;
  }

  if (mode === "auto" && !auto) return <Fallback />;

  return (
    <Suspense fallback={<div className="min-h-screen bg-bg" />}>
      <SceneRoot />
    </Suspense>
  );
}
