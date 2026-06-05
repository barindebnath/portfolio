// Contact 3D scene — "Let's build something." headline that follows the
// pointer with a magnetic lean. Scattered accent particles drift through
// the surrounding space; no solid background shape (it competed with the
// contact info overlay and read as a UFO under the bloom pass).
//
// World position: (0, -40, 0) — matches the "contact" camera waypoint.

import { useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { getPalette } from "../scene/constants";
import { useTheme } from "../theme";
import { FONT_URLS } from "../scene/fonts";

const HEADLINE_BASE_Y = 0.8;
const MAGNET_STRENGTH = 0.3;
const MAGNET_ROT = 0.12;
const PARTICLE_COUNT = 50;

function MagneticHeadline() {
  const group = useRef<THREE.Group>(null);
  const { mouse } = useThree();
  const theme = useTheme();
  const pal = getPalette(theme);

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const targetX = mouse.x * MAGNET_STRENGTH;
    const targetY = HEADLINE_BASE_Y + mouse.y * MAGNET_STRENGTH * 0.6;
    const targetRotY = mouse.x * MAGNET_ROT;
    const targetRotX = -mouse.y * MAGNET_ROT * 0.5;

    const k = 1 - Math.exp(-delta * 6);
    group.current.position.x += (targetX - group.current.position.x) * k;
    group.current.position.y += (targetY - group.current.position.y) * k;
    group.current.rotation.y += (targetRotY - group.current.rotation.y) * k;
    group.current.rotation.x += (targetRotX - group.current.rotation.x) * k;

    group.current.position.y += Math.sin(t * 0.6) * 0.0015;
  });

  // Camera at z=6 with 50° FOV → visible width ≈ 5.6 world units at z=0.
  // fontSize 0.38 keeps "Let's build something." on one line within that.
  return (
    <group ref={group} position={[0, HEADLINE_BASE_Y, 0]}>
      <Text
        font={FONT_URLS.syneBold}
        fontSize={0.38}
        letterSpacing={-0.025}
        maxWidth={6}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
        color={pal.text}
        outlineWidth={0.002}
        outlineColor={pal.bg}
      >
        Let&apos;s build something.
      </Text>
    </group>
  );
}

function DriftingParticles() {
  const ref = useRef<THREE.Points>(null);
  const theme = useTheme();
  const pal = getPalette(theme);

  const positions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Even scatter across the full visible viewport. Camera at z=6 /
      // 50° FOV sees ~5.6 wide × ~4.7 tall at z=0; widening X to 14 and
      // Y to 8 covers the full section incl. parallax depths.
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = -Math.random() * 4 - 0.2;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={pal.accent}
        size={0.04}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
        toneMapped={false}
      />
    </points>
  );
}

export default function Contact() {
  return (
    <group position={[0, -40, 0]}>
      <DriftingParticles />
      <MagneticHeadline />
    </group>
  );
}
