// Global palette + tunable constants for the 3D scene.
// Keep all numeric tweakables here so design iterations don't require
// editing the scene components themselves.

export const palette = {
  dark: {
    bg: "#0a0a0a",
    accent: "#e8ff47",
    accentDim: "#5c6a1c",
    text: "#f0f0f0",
    muted: "#888888",
    // About Section
    pillBg: "#111111",
    pillHoverBg: "#1c1c1c",
    pillBorder: "#222222",
    // Projects Section
    projectCardBg: "#0f0f0f",
    projectTagText: "#7a7a7a",
    projectHoverTextDefault: "#444444",
    // Experience Section
    expCardBg: "#0e0e0e",
  },
  light: {
    bg: "#f4f4f5", // Zinc-100: Slightly deeper for better contrast against white cards
    accent: "#059669", // Emerald-600: Punchy, modern, high contrast
    accentDim: "#d1fae5", // Emerald-100: Soft pill/badge highlights
    text: "#09090b", // Zinc-950: Near black for razor-sharp typography
    muted: "#71717a", // Zinc-500: Clean, neutral gray
    // About Section
    pillBg: "#ffffff",
    pillHoverBg: "#f4f4f5",
    pillBorder: "#e4e4e7", // Zinc-200: Defined structural lines
    // Projects Section
    projectCardBg: "#ffffff", // Pops beautifully against the Zinc-100 bg
    projectTagText: "#52525b", // Zinc-600: Highly readable
    projectHoverTextDefault: "#d4d4d8", // Zinc-300: Subtle unselected state
    // Experience Section
    expCardBg: "#ffffff",
  },
} as const;

export const getPalette = (theme: "light" | "dark") =>
  theme === "light" ? palette.light : palette.dark;

// Each entry is a "room" the scroll-driven camera moves toward.
// Position + lookAt are in world units. Adding a new section = appending a waypoint.
export type SectionWaypoint = {
  id: "hero" | "about" | "projects" | "experience" | "contact";
  position: [number, number, number];
  lookAt: [number, number, number];
};

export const sections: SectionWaypoint[] = [
  { id: "hero", position: [0, 0, 6], lookAt: [0, 0, 0] },
  { id: "about", position: [0, -10, 6], lookAt: [0, -10, 0] },
  // Projects: camera sits closer than the other sections (z=8.5 vs 6) so
  // the 7 taller cards fill ~70% of the viewport vertically. Pulled in
  // rather than pushed out — pushing back made cards small in absolute
  // pixels even when they fit horizontally.
  { id: "projects", position: [0, -20, 8.5], lookAt: [0, -20, 0] },
  { id: "experience", position: [0, -30, 6], lookAt: [0, -30, 0] },
  { id: "contact", position: [0, -40, 6], lookAt: [0, -40, 0] },
];

// One viewport (100vh) of scroll per section. The CameraRig maps
// window.scrollY → progress 0..(sections.length-1) → interpolated waypoint.
export const SECTION_VH = 100;
