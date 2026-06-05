// Projects 3D scene — tilted glass cards floating in depth.
//
// Each card is given a deterministic static tilt (±8° on X + Y) and
// staggered on Z (±1.5 units) so the row reads as physical objects in
// space rather than a flat grid. Cards use a glassmorphism material
// (MeshPhysicalMaterial with low transmission) framed by an emissive
// lime border that pops further under bloom when hovered.
//
// On hover, the card lerps its rotation toward 0 (faces the camera),
// pushes forward on Z by 1 unit, and ramps its border intensity. Click
// opens the project's live URL (falls back to github).
//
// World position: (0, -20, 0) — matches the "projects" camera waypoint.

import { useFrame } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { getPalette } from "../scene/constants";
import { useTheme } from "../theme";
import { FONT_URLS } from "../scene/fonts";
import { projects, type Project } from "../data";

const CARD_W = 1.5;
const CARD_H = 2.4;
const CARD_DEPTH = 0.08;
// Arc carousel — 7 cards on a shallow circle. With the camera at z=8.5
// (closer than other sections, set in scene/constants.ts), ARC_SPAN must
// stay narrow so the end cards don't fly outside the camera frustum.
const ARC_RADIUS = 8.2;
const ARC_SPAN = 1.2; // radians end-to-end
const Z_STAGGER = 0.2;
const TILT_RANGE = (15 * Math.PI) / 180; // ±8°
const HOVER_FORWARD = 0.5;
// Center card sits this many world units in front of the side cards on top
// of the natural arc-z falloff. Capped at 0.9 because the camera is at
// z=8.5 — bigger values shove the centre card uncomfortably close.
const CENTER_FORWARD_BIAS = 1.4;
// Per-card uniform scale — kept at 1.0 because the camera is now close
// enough that the base CARD_W/CARD_H reads at the right pixel size
// (~190px wide center card on a 1440px viewport).
const CARD_SCALE = 1.0;
// Vertical offset within the group — 0 centres the cards in the viewport
// (camera lookAt = [0,-20,0] = group origin).
const CARD_Y_OFFSET = 0;

type CardLayout = {
  position: [number, number, number];
  // Base rotation already faces the card toward the arc centre (camera);
  // tilt is the extra static lean we apply on top.
  baseYaw: number;
  tilt: [number, number];
  zOffset: number;
};

// Deterministic layout — derived from index so React StrictMode double
// renders don't reshuffle the row between mounts.
function buildLayouts(n: number): CardLayout[] {
  const out: CardLayout[] = [];
  for (let i = 0; i < n; i++) {
    const t = n === 1 ? 0.5 : i / (n - 1);
    const angle = -ARC_SPAN / 2 + t * ARC_SPAN;
    const x = Math.sin(angle) * ARC_RADIUS;
    const z = Math.cos(angle) * ARC_RADIUS - ARC_RADIUS; // pivot at z=0
    const y = CARD_Y_OFFSET + Math.cos(i * 0.9) * 0.15;
    // Forward bias peaks at the centre card (angle=0) and tapers to 0 at
    // the ends — gives the row a clear "front card / side cards" hierarchy
    // instead of a random Z scatter.
    const centerBias = Math.cos((angle / (ARC_SPAN / 2)) * (Math.PI / 2));
    const zOffset =
      centerBias * CENTER_FORWARD_BIAS + Math.sin(i * 1.6) * Z_STAGGER * 0.25;
    const rx = Math.sin(i * 1.3 + 0.5) * TILT_RANGE;
    const ry = Math.cos(i * 1.1) * TILT_RANGE;
    out.push({
      position: [x, y, z + zOffset],
      baseYaw: angle, // face the camera at origin
      tilt: [rx, ry],
      zOffset,
    });
  }
  return out;
}

type ProjectCardProps = {
  project: Project;
  layout: CardLayout;
  hovered: boolean;
  onHoverChange: (h: boolean) => void;
};

function ProjectCard({
  project,
  layout,
  hovered,
  onHoverChange,
}: ProjectCardProps) {
  const root = useRef<THREE.Group>(null);
  const borderMat = useRef<THREE.MeshStandardMaterial>(null);
  const theme = useTheme();
  const pal = getPalette(theme);

  useFrame((state, delta) => {
    if (!root.current) return;
    const t = state.clock.elapsedTime;

    // On hover: tilt unwinds to 0 (card faces camera squarely) and the
    // card pushes forward on Z by HOVER_FORWARD. Yaw always stays at the
    // arc-facing baseYaw so the card looks at the camera.
    const targetRotX = hovered ? 0 : layout.tilt[0];
    const targetRotY = layout.baseYaw + (hovered ? 0 : layout.tilt[1]);
    const targetZ = layout.position[2] + (hovered ? HOVER_FORWARD : 0);

    const k = 1 - Math.exp(-delta * 8);
    root.current.rotation.x = THREE.MathUtils.lerp(
      root.current.rotation.x,
      targetRotX,
      k,
    );
    root.current.rotation.y = THREE.MathUtils.lerp(
      root.current.rotation.y,
      targetRotY,
      k,
    );
    root.current.position.z = THREE.MathUtils.lerp(
      root.current.position.z,
      targetZ,
      k,
    );

    // Subtle float so even non-hovered cards breathe.
    root.current.position.y =
      layout.position[1] + Math.sin(t * 0.4 + layout.position[0]) * 0.05;

    if (borderMat.current) {
      // Hover glow stays soft — bloom amplifies emissive intensity, so
      // 0.25 reads as a gentle highlight rather than a blinding flare.
      const targetIntensity = hovered ? 0.25 : 0.06;
      borderMat.current.emissiveIntensity = THREE.MathUtils.lerp(
        borderMat.current.emissiveIntensity,
        targetIntensity,
        k,
      );
    }
  });

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    const url = project.live ?? project.github;
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  const visibleTags = project.tags.slice(0, 3);
  const tagBaseY = -CARD_H / 2 + 0.6;

  return (
    <group
      ref={root}
      position={layout.position}
      rotation={[layout.tilt[0], layout.baseYaw + layout.tilt[1], 0]}
      scale={CARD_SCALE}
    >
      {/* Card body — kept fully opaque so the emissive border behind it
          cannot bleed through the bloom pass and tint the face olive. */}
      <RoundedBox
        args={[CARD_W, CARD_H, CARD_DEPTH]}
        radius={0.1}
        smoothness={4}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHoverChange(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          onHoverChange(false);
          document.body.style.cursor = "";
        }}
        onClick={handleClick}
      >
        <meshPhysicalMaterial
          color={pal.projectCardBg}
          metalness={theme === "light" ? 0.05 : 0.15}
          roughness={theme === "light" ? 0.65 : 0.35}
          clearcoat={0.5}
          clearcoatRoughness={0.3}
        />
      </RoundedBox>

      {/* Emissive lime border — slightly larger shell behind the body.
          Kept thin (0.02 oversize) so bloom doesn't smear the edge into a
          full-face glow at extreme camera angles. */}
      <RoundedBox
        args={[CARD_W + 0.02, CARD_H + 0.02, CARD_DEPTH - 0.02]}
        radius={0.11}
        smoothness={3}
        position={[0, 0, -0.015]}
      >
        <meshStandardMaterial
          ref={borderMat}
          color={pal.accent}
          emissive={pal.accent}
          emissiveIntensity={0.06}
          toneMapped={false}
        />
      </RoundedBox>

      {/* Title */}
      <Text
        font={FONT_URLS.syneBold}
        position={[0, CARD_H / 2 - 0.5, CARD_DEPTH / 2 + 0.002]}
        fontSize={0.22}
        letterSpacing={-0.01}
        color={pal.text}
        anchorX="center"
        anchorY="middle"
        maxWidth={CARD_W - 0.25}
        textAlign="center"
      >
        {project.title}
      </Text>

      {/* Description */}
      <Text
        font={FONT_URLS.dmSans}
        position={[0, 0.1, CARD_DEPTH / 2 + 0.002]}
        fontSize={0.11}
        color={pal.muted}
        anchorX="center"
        anchorY="middle"
        maxWidth={CARD_W - 0.3}
        textAlign="center"
        lineHeight={1.4}
      >
        {truncate(project.description, 90)}
      </Text>

      {/* Tag chips */}
      {visibleTags.map((tag, i) => (
        <Text
          key={tag}
          font={FONT_URLS.dmSans}
          position={[0, tagBaseY - i * 0.2, CARD_DEPTH / 2 + 0.002]}
          fontSize={0.09}
          letterSpacing={0.05}
          color={pal.projectTagText}
          anchorX="center"
          anchorY="middle"
        >
          {tag}
        </Text>
      ))}

      {/* Hover affordance */}
      <Text
        font={FONT_URLS.dmSans}
        position={[0, -CARD_H / 2 + 0.2, CARD_DEPTH / 2 + 0.002]}
        fontSize={0.085}
        letterSpacing={0.25}
        color={hovered ? pal.accent : pal.projectHoverTextDefault}
        anchorX="center"
        anchorY="middle"
        material-toneMapped={false}
      >
        {hovered ? "OPEN →" : "VIEW"}
      </Text>
    </group>
  );
}

function truncate(s: string, max: number) {
  if (s.length <= max) return s;
  return s.slice(0, max - 1).trimEnd() + "…";
}

export default function Projects() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const layouts = useMemo(() => buildLayouts(projects.length), []);

  return (
    <group position={[0, -20, 0]}>
      {projects.map((project, i) => (
        <ProjectCard
          key={project.title}
          project={project}
          layout={layouts[i]}
          hovered={hoveredIdx === i}
          onHoverChange={(h) =>
            setHoveredIdx((prev) => (h ? i : prev === i ? null : prev))
          }
        />
      ))}
    </group>
  );
}
