// Post-processing stack.
//
// Bloom is tuned for the lime accent (#e8ff47, linear luminance ~0.83).
// Threshold sits below that so the accent reliably blooms, while plain
// white text (0.5–0.6 after tonemap) stays crisp. Any mesh that should
// glow must set `toneMapped={false}` so its colour isn't compressed
// before bloom samples it.

import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

export function Effects() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={1.1}
        luminanceThreshold={0.4}
        luminanceSmoothing={0.25}
        mipmapBlur
      />
      <Vignette eskil={false} offset={0.15} darkness={0.7} />
    </EffectComposer>
  );
}
