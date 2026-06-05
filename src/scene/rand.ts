// Deterministic PRNG so particle positions are stable across renders and
// satisfy the react-hooks/purity rule (Math.random is impure inside useMemo).
//
// Mulberry32 — tiny, decent distribution, MIT-public-domain. Seeded with a
// constant so the same scene is reproducible on every load.

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function rand() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
