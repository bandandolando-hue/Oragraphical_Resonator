import { runEngine } from ".";
import { createSeededRng } from "./seededRng";
import type { CastRecord } from "./types";

export function runSeededCast(seed: number): CastRecord {
  const rng = createSeededRng(seed);
  const result = runEngine(rng);
  const id = `${seed}:${result.actuation.number}`;

  return {
    id,
    seed,
    timestamp: Date.now(),
    result,
  };
}
