import type { ArrayPattern, Channel } from "./types";

export function generateArray(rng: () => number = Math.random): ArrayPattern {
  const arr: Channel[] = [];
  for (let i = 0; i < 6; i++) {
    arr.push(rng() < 0.5 ? 0 : 1);
  }
  return arr;
}
