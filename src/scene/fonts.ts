// Font URLs for the 3D scene.
//
// Drei <Text> delegates to troika-three-text, which only supports TTF/OTF
// (its SDF generator can't parse woff2). The TTFs live alongside the woff2
// files in public/fonts/ — the woff2 versions are still used by the CSS
// @font-face rules so HTML overlays render at normal browser-font weight
// without paying the larger TTF download.
//
// We construct URLs from import.meta.env.BASE_URL ("/portfolio/" in prod,
// configurable via vite.config) so the same code works in dev, prod, and
// any future base-path change without touching string literals.

const BASE = import.meta.env.BASE_URL; // ends with "/"

export const FONT_URLS = {
  syne: `${BASE}fonts/Syne-Variable.ttf`,
  syneBold: `${BASE}fonts/Syne-Bold.ttf`,
  dmSans: `${BASE}fonts/DMSans-Variable.ttf`,
  dmSansBold: `${BASE}fonts/DMSans-Bold.ttf`,
} as const;

// One-time log so we can verify in the browser console that the URL the
// troika worker will fetch is exactly what we expect.
if (typeof window !== "undefined") {
  console.log("[fonts] FONT_URLS resolved →", {
    syne: new URL(FONT_URLS.syne, window.location.href).href,
    dmSans: new URL(FONT_URLS.dmSans, window.location.href).href,
  });
}
