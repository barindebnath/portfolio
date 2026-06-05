// Experience 3D scene — floating glass cards in space.
//
// 4 jobs, each rendered as a dark emissive-bordered panel floating at a
// different Z depth and a small random tilt. Cards stagger diagonally
// (alternating left/right of the vertical axis) so the eye reads them as
// a path through space rather than a stacked list. A TubeGeometry snake
// in accent lime threads through every card position, replacing the old
// flat spine. Each card glows brighter as the camera approaches it, and
// 6 particles orbit each card on a shallow horizontal ring.
//
// HTML text content rides on top of each panel via Drei <Html transform>
// so we get crisp text + native accessibility instead of fighting troika
// for layout at small sizes.
//
// World position: (0, -30, 0) — matches the "experience" camera waypoint.

import { useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, Html } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { getPalette } from "../scene/constants";
import { useTheme } from "../theme";
import { getScrollState } from "../scene/scrollState";
import { experience, type ExperienceItem } from "../data";

// Experience is section index 3 in src/scene/constants.ts. Cards begin
// revealing as the camera leaves the Projects waypoint and finish by the
// time the camera fully arrives at Experience. Per-card stagger spreads
// the reveal across that window so they pop in one-by-one.
const REVEAL_START = 2.4;
const REVEAL_END = 3.05;
const REVEAL_STAGGER = 0.18;

const CARD_W = 3.6;
const CARD_H = 2.2;
const CARD_DEPTH = 0.12;
const PARTICLE_COUNT = 6;
const PARTICLE_RADIUS = 1.6;

// Static layout: alternate X sides, walk down in Y, vary Z. Tilts are
// deterministic (derived from index) so React StrictMode double-renders
// don't shuffle the scene between mounts.
type CardLayout = {
  position: [number, number, number];
  rotation: [number, number, number];
};

function buildLayouts(n: number): CardLayout[] {
  const layouts: CardLayout[] = [];
  const totalH = (n - 1) * 2.6;
  const topY = totalH / 2;
  for (let i = 0; i < n; i++) {
    const side = i % 2 === 0 ? -1 : 1;
    const x = side * 2.2;
    const y = topY - i * 2.6;
    // Wobble Z between -1.2 and +0.8 in a smooth wave for parallax.
    const z = Math.sin(i * 1.3) * 1.0 - 0.2;
    // ±5° tilt, alternating direction, with a small Y rotation toward
    // the central axis so cards "face" the spine.
    const tiltZ = ((i % 2 === 0 ? 1 : -1) * Math.PI) / 36; // ~5°
    const tiltY = -side * 0.12; // slight yaw toward center
    layouts.push({
      position: [x, y, z],
      rotation: [0, tiltY, tiltZ],
    });
  }
  return layouts;
}

type CardProps = {
  job: ExperienceItem;
  layout: CardLayout;
  index: number;
};

function FloatingCard({ job, layout, index }: CardProps) {
  const root = useRef<THREE.Group>(null);
  const borderMat = useRef<THREE.MeshStandardMaterial>(null);
  const bodyMat = useRef<THREE.MeshStandardMaterial>(null);
  const particleMat = useRef<THREE.PointsMaterial>(null);
  const htmlWrap = useRef<HTMLDivElement>(null);
  const particles = useRef<THREE.Points>(null);
  const { camera } = useThree();
  const cardWorldPos = useRef(new THREE.Vector3());
  const theme = useTheme();
  const pal = getPalette(theme);

  // Deterministic particle ring around the card. Each particle gets a
  // distinct phase so they don't all clump at one angle on first frame.
  const particlePositions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const a = (i / PARTICLE_COUNT) * Math.PI * 2;
      arr[i * 3] = Math.cos(a) * PARTICLE_RADIUS;
      arr[i * 3 + 1] = Math.sin(a) * PARTICLE_RADIUS * 0.4; // shallow ellipse
      arr[i * 3 + 2] = 0;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!root.current) return;
    const t = state.clock.elapsedTime;

    // Per-card reveal: stagger across the Experience approach window.
    // reveal 0 = hidden (offset down + transparent), 1 = fully in place.
    const { sectionIndex } = getScrollState();
    const span = REVEAL_END - REVEAL_START;
    const cardStart = REVEAL_START + index * REVEAL_STAGGER;
    const cardEnd = cardStart + Math.max(0.35, span - index * REVEAL_STAGGER * 0.5);
    const raw = (sectionIndex - cardStart) / (cardEnd - cardStart);
    const reveal = THREE.MathUtils.clamp(raw, 0, 1);
    // Ease-out cubic for a soft settle.
    const eased = 1 - Math.pow(1 - reveal, 3);
    const revealOffsetY = (1 - eased) * -1.4;

    // Float bob + tiny rotation breath on the card itself.
    root.current.position.y =
      layout.position[1] +
      Math.sin(t * 0.5 + layout.position[0]) * 0.08 +
      revealOffsetY;
    root.current.rotation.z =
      layout.rotation[2] + Math.sin(t * 0.4 + layout.position[1]) * 0.012;

    // Distance-based glow. World-space distance from card centre to camera,
    // normalised: closest expected ~5, farthest ~15. Map to 0.3 .. 1.6
    // emissive intensity so the focused card pops without flatlining the rest.
    root.current.getWorldPosition(cardWorldPos.current);
    const d = cardWorldPos.current.distanceTo(camera.position);
    const norm = THREE.MathUtils.clamp((d - 4) / 11, 0, 1);
    const intensity = THREE.MathUtils.lerp(1.6, 0.3, norm) * eased;
    if (borderMat.current) {
      borderMat.current.emissiveIntensity = intensity;
      borderMat.current.opacity = eased;
      borderMat.current.transparent = eased < 1;
    }
    if (bodyMat.current) {
      bodyMat.current.opacity = eased;
      bodyMat.current.transparent = eased < 1;
    }
    if (particleMat.current) {
      particleMat.current.opacity = 0.85 * eased;
    }
    if (htmlWrap.current) {
      htmlWrap.current.style.opacity = String(eased);
    }

    // Particle ring slow orbit — rotate the whole Points object on Z so
    // particles stay on the card's local plane regardless of card tilt.
    if (particles.current) {
      particles.current.rotation.z = t * 0.35;
    }
  });

  return (
    <group
      ref={root}
      position={layout.position}
      rotation={layout.rotation}
    >
      {/* Panel body — dark, slightly metallic. Kept opaque (no
          transmission) so we stay well clear of the bloom + RT budget
          ceiling that triggered earlier context-loss issues. */}
      <RoundedBox args={[CARD_W, CARD_H, CARD_DEPTH]} radius={0.12} smoothness={4}>
        <meshStandardMaterial
          ref={bodyMat}
          color={pal.expCardBg}
          metalness={theme === "light" ? 0.05 : 0.35}
          roughness={theme === "light" ? 0.65 : 0.45}
          toneMapped={false}
        />
      </RoundedBox>

      {/* Emissive border — thin shell scaled up; its emissive intensity is
          animated from camera distance for the "closest card glows" cue. */}
      <RoundedBox
        args={[CARD_W + 0.06, CARD_H + 0.06, CARD_DEPTH - 0.01]}
        radius={0.14}
        smoothness={3}
        position={[0, 0, -0.005]}
      >
        <meshStandardMaterial
          ref={borderMat}
          color={pal.accent}
          emissive={pal.accent}
          emissiveIntensity={1.0}
          toneMapped={false}
        />
      </RoundedBox>

      {/* HTML text content — sits a hair in front of the panel surface.
          `transform` projects the DOM into 3D so it inherits the card's
          tilt; `occlude="blending"` lets the dark panel cover the text
          when the camera goes behind. */}
      <Html
        transform
        occlude="blending"
        position={[0, 0, CARD_DEPTH / 2 + 0.01]}
        distanceFactor={2.4}
        style={{ pointerEvents: "none", userSelect: "none" }}
      >
        <div className="exp-card" ref={htmlWrap} style={{ opacity: 0, transition: "opacity 0.05s linear" }}>
          <p className="exp-period">{job.period}</p>
          <h3 className="exp-role">{job.role}</h3>
          <p className="exp-company">{job.company}</p>
          <ul className="exp-highlights">
            {job.highlights.slice(0, 3).map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
      </Html>

      {/* Orbiting particles — drawn on the card's local XY plane. */}
      <points ref={particles}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={particleMat}
          color={pal.accent}
          size={0.08}
          sizeAttenuation
          transparent
          opacity={0.85}
          depthWrite={false}
          toneMapped={false}
        />
      </points>
    </group>
  );
}

function SnakingTube({ layouts }: { layouts: CardLayout[] }) {
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const theme = useTheme();
  const pal = getPalette(theme);

  // CatmullRom through every card centre gives a smooth curve that the
  // tube wraps. Closed=false; tension defaults are fine for our spacing.
  const geometry = useMemo(() => {
    const points = layouts.map(
      (l) => new THREE.Vector3(l.position[0], l.position[1], l.position[2]),
    );
    const curve = new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.4);
    return new THREE.TubeGeometry(curve, 120, 0.035, 12, false);
  }, [layouts]);

  // Fade the tube in across the same window as the first card so it draws
  // itself onto the scene rather than popping in fully lit.
  useFrame(() => {
    if (!matRef.current) return;
    const { sectionIndex } = getScrollState();
    const raw = (sectionIndex - REVEAL_START) / (REVEAL_END - REVEAL_START);
    const eased = THREE.MathUtils.clamp(raw, 0, 1);
    matRef.current.opacity = eased;
    matRef.current.emissiveIntensity = 1.4 * eased;
  });

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        ref={matRef}
        color={pal.accent}
        emissive={pal.accent}
        emissiveIntensity={1.4}
        transparent
        opacity={0}
        toneMapped={false}
      />
    </mesh>
  );
}

export default function Experience() {
  const layouts = useMemo(() => buildLayouts(experience.length), []);
  return (
    <group position={[0, -30, 0]}>
      <SnakingTube layouts={layouts} />
      {experience.map((job, i) => (
        <FloatingCard key={job.company} job={job} layout={layouts[i]} index={i} />
      ))}
    </group>
  );
}
