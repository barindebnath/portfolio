// Hero 3D scene.
//
// Centerpiece is the floating 3D name "Barin Debnath" rendered via Drei
// <Text> (troika-three-text). Behind it: a dense spherical particle shell
// that drifts on multiple axes so the void feels alive without competing
// with the type.
//
// Sits at world Y=0; the camera waypoint for "hero" looks at (0,0,0).

import { useFrame } from "@react-three/fiber";
import { Text, Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { getPalette } from "../scene/constants";
import { useTheme } from "../theme";
import { mulberry32 } from "../scene/rand";
import { FONT_URLS } from "../scene/fonts";

const PARTICLE_COUNT = 1800;
const PARTICLE_RADIUS = 14;
const PARTICLE_SEED = 0xb1d3e7a1;

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const theme = useTheme();
  const pal = getPalette(theme);

  // Deterministic spherical-shell distribution around the hero so the
  // camera moves through depth-cued specks rather than a flat plane.
  const positions = useMemo(() => {
    const rand = mulberry32(PARTICLE_SEED);
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const u = rand();
      const v = rand();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = PARTICLE_RADIUS * (0.45 + rand() * 0.75);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.025;
    ref.current.rotation.x += delta * 0.008;
    // Slow vertical drift — sells the floating-dust feel.
    const t = state.clock.elapsedTime;
    ref.current.position.y = Math.sin(t * 0.12) * 0.35;
    ref.current.position.x = Math.cos(t * 0.09) * 0.25;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color={pal.text}
        size={0.022}
        sizeAttenuation
        depthWrite={false}
        opacity={theme === "light" ? 0.35 : 0.7}
      />
    </Points>
  );
}

const NAME_BASE_Y = 0.4;

function FloatingName() {
  const group = useRef<THREE.Group>(null);
  const theme = useTheme();
  const pal = getPalette(theme);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.position.y = NAME_BASE_Y + Math.sin(t * 0.6) * 0.06;
    group.current.rotation.y = Math.sin(t * 0.25) * 0.16;
  });

  return (
    <group ref={group} position={[0, NAME_BASE_Y, 0]}>
      <Text
        font={FONT_URLS.syneBold}
        fontSize={0.8}
        anchorX="center"
        anchorY="middle"
        letterSpacing={-0.02}
        maxWidth={7}
        textAlign="center"
        color={pal.text}
        outlineWidth={theme === "light" ? 0.0025 : 0.004}
        outlineColor={pal.bg}
      >
        Barin Debnath
      </Text>
      <Text
        font={FONT_URLS.syne}
        position={[0, -0.95, 0]}
        fontSize={0.14}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.34}
        color={pal.accent}
        material-toneMapped={false}
      >
        SENIOR SOFTWARE ENGINEER
      </Text>
    </group>
  );
}

export default function Hero() {
  return (
    <group position={[0, 0, 0]}>
      <ParticleField />
      <FloatingName />
    </group>
  );
}
