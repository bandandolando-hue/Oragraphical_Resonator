import type { ArrayPattern, InculcationKey } from "./types";

export function deriveInculcation(arr: ArrayPattern): InculcationKey {
  const ones = arr.filter(x => x === 1).length;
  const transitions = countTransitions(arr);

  if (ones === 0 || ones === 6) return "PRESSURE_CLARIFIES_PURPOSE";
  if (transitions >= 4) return "DISCORD_PRECEDES_ALIGNMENT";
  if (ones <= 2) return "ADVANCE_CASTS_SHADOW";
  if (ones >= 4) return "STABILITY_DEMANDS_RESISTANCE";
  if (isSymmetric(arr)) return "CYCLES_RETURN";
  return "HIDDEN_SEEKS_EMERGENCE";
}

export function countTransitions(arr: ArrayPattern): number {
  let t = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] !== arr[i + 1]) t++;
  }
  return t;
}

export function isSymmetric(arr: ArrayPattern): boolean {
  return arr[0] === arr[5] && arr[1] === arr[4] && arr[2] === arr[3];
}
