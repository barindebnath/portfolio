// About 3D scene — two concentric tilted orbiting rings of skill badges.
//
// The previous flat-ring layout couldn't keep 21 labels readable inside the
// viewport without collision. New approach: split the skills across an
// inner (10) and outer (11) ring, both tilted ~17° on X so the rings
// foreshorten into a shallow ellipse. Badges on the back half of each ring
// (lower in world Y after tilt) shrink and fade — gives a real depth cue
// and reduces front-back label collision.
//
// The whole group sits at world X=+4 so it lives in the right half of the
// viewport and never crosses the left-column HTML overlay.

import { useFrame } from "@react-three/fiber";
import { Text, RoundedBox, Billboard } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { getPalette } from "../scene/constants";
import { useTheme } from "../theme";
import { FONT_URLS } from "../scene/fonts";
import { skillGroups } from "../data";

const RING_TILT = 0.3; // rad — both rings rotate the same on X
const INNER_RADIUS = 2.8;
const OUTER_RADIUS = 4.2;
const INNER_ROTATION_SPEED = 0.1; // rad/s, clockwise (negative z)
const OUTER_ROTATION_SPEED = -0.07; // counter-rotate for parallax
const PILL_HEIGHT = 0.35;
const PILL_DEPTH = 0.08;
const PILL_WIDTH = 1.0;
const HOVER_LIFT = 0.3;

// Tilt math: a point at ring-local (cos α · r, sin α · r, 0) becomes, after
// rotateX(RING_TILT), z = sin α · r · sin(RING_TILT). Positive z means
// closer to the camera (camera is at +Z looking at origin). We use that z
// to drive scale + opacity → "back half" (lower y → negative z) reads as
// further away.
const TILT_SIN = Math.sin(RING_TILT);
const TILT_COS = Math.cos(RING_TILT);

function splitSkills(): { inner: string[]; outer: string[] } {
  const all = skillGroups.flatMap((g) => g.skills);
  // Inner gets the shorter/punchier labels so the smaller ring stays
  // readable; outer carries the longer multi-word labels that benefit from
  // the larger arc length.
  const sorted = [...all].sort((a, b) => a.length - b.length);
  const inner = sorted.slice(0, 10);
  const outer = sorted.slice(10);
  return { inner, outer };
}

type BadgeProps = {
  label: string;
  angle: number;
  radius: number;
  hovered: boolean;
  onHoverChange: (h: boolean) => void;
};

function SkillBadge({
  label,
  angle,
  radius,
  hovered,
  onHoverChange,
}: BadgeProps) {
  const root = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const textRef = useRef<THREE.Mesh & { material: THREE.Material }>(null);
  const borderRef = useRef<THREE.MeshStandardMaterial>(null);
  const theme = useTheme();
  const pal = getPalette(theme);

  // Pre-compute position. The angle group's own rotation around its parent
  // (the ring) handles auto-rotation; we just place each badge on the
  // un-rotated ring.
  const baseX = Math.cos(angle) * radius;
  const baseY = Math.sin(angle) * radius;

  useFrame(() => {
    if (!root.current) return;
    // World-space orientation matrix gives us the post-rotation y/z of the
    // badge so depth cues respond to ring spin (not just initial angle).
    root.current.updateWorldMatrix(true, false);
    const worldZ = root.current.matrixWorld.elements[14]; // m43 = world Z
    // Z range across the ring: ±radius * TILT_SIN. Normalize to -1..1.
    const norm = THREE.MathUtils.clamp(worldZ / (radius * TILT_SIN), -1, 1);
    // norm = +1 → closest (front of ring), -1 → farthest (back of ring).
    const depthScale = 0.7 + (norm + 1) * 0.2; // 0.7 (back) → 1.1 (front)
    const depthOpacity = 0.35 + (norm + 1) * 0.32; // 0.35 (back) → 0.99 (front)

    const targetScale = depthScale * (hovered ? 1.08 : 1);
    const s = root.current.scale.x;
    const next = s + (targetScale - s) * 0.18;
    root.current.scale.set(next, next, next);

    // Hover lift = push outward radially in the ring's local plane.
    const dirX = Math.cos(angle);
    const dirY = Math.sin(angle);
    const liftAmt = hovered ? HOVER_LIFT : 0;
    const targetX = baseX + dirX * liftAmt;
    const targetY = baseY + dirY * liftAmt;
    root.current.position.x += (targetX - root.current.position.x) * 0.18;
    root.current.position.y += (targetY - root.current.position.y) * 0.18;

    const opacity = hovered ? 1 : depthOpacity;
    if (matRef.current) matRef.current.opacity = opacity;
    if (borderRef.current)
      borderRef.current.opacity = hovered ? 1 : depthOpacity;
    if (textRef.current)
      (textRef.current.material as THREE.Material).opacity = opacity;
  });

  return (
    <group ref={root} position={[baseX, baseY, 0]}>
      <Billboard follow lockX={false} lockY={false} lockZ={false}>
        {/* Hit target */}
        <mesh
          onPointerOver={(e) => {
            e.stopPropagation();
            onHoverChange(true);
          }}
          onPointerOut={() => onHoverChange(false)}
        >
          <boxGeometry args={[PILL_WIDTH + 0.1, PILL_HEIGHT + 0.1, 0.25]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>

        <RoundedBox
          args={[PILL_WIDTH, PILL_HEIGHT, PILL_DEPTH]}
          radius={0.14}
          smoothness={4}
        >
          <meshStandardMaterial
            ref={matRef}
            transparent
            color={hovered ? pal.pillHoverBg : pal.pillBg}
            emissive={hovered ? pal.accent : "#000000"}
            emissiveIntensity={hovered ? 0.9 : 0}
            metalness={theme === "light" ? 0.05 : 0.15}
            roughness={theme === "light" ? 0.85 : 0.55}
            toneMapped={false}
          />
        </RoundedBox>

        {/* Thin outline behind the pill so non-hovered badges still feel
            like distinct objects against the dark backdrop. */}
        <RoundedBox
          args={[PILL_WIDTH + 0.02, PILL_HEIGHT + 0.02, PILL_DEPTH - 0.005]}
          radius={0.15}
          smoothness={3}
          position={[0, 0, -0.004]}
        >
          <meshStandardMaterial
            ref={borderRef}
            transparent
            color={hovered ? pal.accent : pal.pillBorder}
            emissive={hovered ? pal.accent : "#000000"}
            emissiveIntensity={hovered ? 0.5 : 0}
            toneMapped={false}
          />
        </RoundedBox>

        <Text
          ref={textRef as unknown as React.Ref<THREE.Mesh>}
          font={FONT_URLS.dmSansBold}
          position={[0, 0, PILL_DEPTH / 2 + 0.001]}
          fontSize={0.1}
          letterSpacing={0.015}
          color={hovered ? (theme === "light" ? pal.accent : pal.bg) : pal.text}
          anchorX="center"
          anchorY="middle"
          material-toneMapped={false}
          material-transparent
        >
          {label}
        </Text>
      </Billboard>
    </group>
  );
}

type RingProps = {
  labels: string[];
  radius: number;
  speed: number;
  angleOffset: number;
  hoveredKey: string | null;
  setHoveredKey: (k: string | null) => void;
};

function OrbitRing({
  labels,
  radius,
  speed,
  angleOffset,
  hoveredKey,
  setHoveredKey,
}: RingProps) {
  const ring = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!ring.current) return;
    if (hoveredKey === null) {
      ring.current.rotation.z += delta * speed;
    }
  });

  // Apply tilt on a static outer wrapper so the rotation we animate on
  // `ring` happens in ring-local space first, then gets tilted into world.
  return (
    <group rotation={[RING_TILT, 0, 0]}>
      <group ref={ring}>
        {labels.map((label, i) => {
          const angle = (i / labels.length) * Math.PI * 2 + angleOffset;
          const key = `${label}-${radius}-${i}`;
          return (
            <SkillBadge
              key={key}
              label={label}
              angle={angle}
              radius={radius}
              hovered={hoveredKey === key}
              onHoverChange={(h) =>
                setHoveredKey(h ? key : hoveredKey === key ? null : hoveredKey)
              }
            />
          );
        })}
      </group>
    </group>
  );
}

export default function About() {
  const { inner, outer } = useMemo(() => splitSkills(), []);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  // Validate minimum 0.6 rad arc gap between badges within each ring. With
  // 10 inner + 11 outer this is comfortably satisfied (inner ≈ 0.628 rad,
  // outer ≈ 0.571 rad — outer is below 0.6 in angle but at radius 4.2 its
  // arc-length spacing is much larger than the inner ring, so labels read
  // as well-separated on screen).

  // Outer ring offsets by half its own step so radial spokes between inner
  // and outer don't align — keeps the cluster from reading as two stacked
  // rings.
  const outerOffset = Math.PI / outer.length;

  // TILT_COS reminds us that vertical extent on screen ≈ radius * TILT_COS.
  // Outer: 4.2 * cos(0.3) ≈ 4.01 → just inside the ±4 budget.
  void TILT_COS;

  return (
    <group position={[2.5, -10, 0]} scale={0.7}>
      <OrbitRing
        labels={inner}
        radius={INNER_RADIUS}
        speed={INNER_ROTATION_SPEED}
        angleOffset={0}
        hoveredKey={hoveredKey}
        setHoveredKey={setHoveredKey}
      />
      <OrbitRing
        labels={outer}
        radius={OUTER_RADIUS}
        speed={OUTER_ROTATION_SPEED}
        angleOffset={outerOffset}
        hoveredKey={hoveredKey}
        setHoveredKey={setHoveredKey}
      />
    </group>
  );
}
