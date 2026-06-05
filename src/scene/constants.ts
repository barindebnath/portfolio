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
    bg: "#faf9f6",
    accent: "#719400",
    accentDim: "rgba(190, 243, 5, 0.12)",
    text: "#121211",
    muted: "#6b6b63",
    // About Section
    pillBg: "#ffffff",
    pillHoverBg: "#f5f4ef",
    pillBorder: "#e2e0d7",
    // Projects Section
    projectCardBg: "#ffffff",
    projectTagText: "#4a4a44",
    projectHoverTextDefault: "#a19e95",
    // Experience Section
    expCardBg: "#ffffff",
  },
} as const;

export const getPalette = (theme: "light" | "dark") =>
  theme === "light" ? palette.light : palette.dark;

// Each entry is a "room" the scroll-driven camera moves toward.
// Position + lookAt are in world units. Adding a new section = appending a waypoin
export type SectionWaypoint = {
  id: "hero" | "about" | "projects" | "experience" | "contact";
  position: [number, number, number];
  lookAt: [number, number, number];
};

export const sections: SectionWaypoint[] = [
  { id: "hero", position: [0, 0, 6], lookAt: [0, 0, 0] },
  { id: "about", position: [0, -10, 6], lookAt: [0, -10, 0] },
  { id: "projects", position: [0, -20, 8.5], lookAt: [0, -20, 0] },
  { id: "experience", position: [0, -30, 6], lookAt: [0, -30, 0] },
  { id: "contact", position: [0, -40, 6], lookAt: [0, -40, 0] },
];

// One viewport (100vh) of scroll per section. The CameraRig maps
// window.scrollY → progress 0..(sections.length-1) → interpolated waypoint.
export const SECTION_VH = 100;
