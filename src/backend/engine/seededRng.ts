// src/engine/seededRng.ts
export function createSeededRng(seed: number): () => number {
  // Simple linear congruential generator
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 0xffffffff;
  };
}
