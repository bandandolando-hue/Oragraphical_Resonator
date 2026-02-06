// src/engine/castStore.ts
import type { CastRecord } from "./types";

const castHistory: CastRecord[] = [];

export function storeCast(cast: CastRecord): void {
  castHistory.push(cast);
}

export function getAllCasts(): CastRecord[] {
  return [...castHistory];
}

export function getCastsByActuationNumber(num: number): CastRecord[] {
  return castHistory.filter(c => c.result.actuation.number === num);
}
