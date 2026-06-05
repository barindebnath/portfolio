// Drives the perspective camera from the shared scroll state.
//
// Reads the float section index (0..N-1) from scrollState each frame and
// interpolates position + lookAt between adjacent waypoints. Runs inside
// useFrame so it never causes a React re-render.

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Vector3 } from "three";
import { sections } from "./constants";
import { getScrollState } from "./scrollState";

const tmpPos = new Vector3();
const tmpLook = new Vector3();
const currentLook = new Vector3(0, 0, 0);

export function CameraRig() {
  const { camera } = useThree();
  const initialized = useRef(false);

  useFrame((_, delta) => {
    const { sectionIndex } = getScrollState();

    const lower = Math.floor(sectionIndex);
    const upper = Math.min(lower + 1, sections.length - 1);
    const t = sectionIndex - lower;

    const a = sections[lower];
    const b = sections[upper];

    tmpPos.set(
      a.position[0] + (b.position[0] - a.position[0]) * t,
      a.position[1] + (b.position[1] - a.position[1]) * t,
      a.position[2] + (b.position[2] - a.position[2]) * t,
    );
    tmpLook.set(
      a.lookAt[0] + (b.lookAt[0] - a.lookAt[0]) * t,
      a.lookAt[1] + (b.lookAt[1] - a.lookAt[1]) * t,
      a.lookAt[2] + (b.lookAt[2] - a.lookAt[2]) * t,
    );

    // Snap on first frame so we don't see the camera fly in from origin.
    if (!initialized.current) {
      camera.position.copy(tmpPos);
      currentLook.copy(tmpLook);
      camera.lookAt(currentLook);
      initialized.current = true;
      return;
    }

    // Frame-rate independent smoothing.
    const lerpFactor = 1 - Math.exp(-delta * 6);
    camera.position.lerp(tmpPos, lerpFactor);
    currentLook.lerp(tmpLook, lerpFactor);
    camera.lookAt(currentLook);
  });

  return null;
}
