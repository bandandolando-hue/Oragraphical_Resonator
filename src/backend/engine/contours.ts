import type { ArrayPattern, ContourType, InculcationKey } from "./types";
import { countTransitions, isSymmetric } from "./inculcation";

export function deriveContours(
  arr: ArrayPattern,
  inculcation: InculcationKey
): ContourType {
  const ones = arr.filter(x => x === 1).length;
  const transitions = countTransitions(arr);
  const lower = arr[0] + arr[1] + arr[2];
  const upper = arr[3] + arr[4] + arr[5];

  if (upper > lower && transitions <= 2) return "ASCENDANT";
  if (lower > upper && transitions <= 2) return "DESCENDANT";
  if (isSymmetric(arr)) return "CIRCULAR";
  if (transitions >= 4) return "OSCILLATORY";
  if (ones === 3 && arr[2] !== arr[3]) return "ANGULAR";

  if (ones <= 2 || ones >= 4) {
    if (inculcation === "CYCLES_RETURN") return "CIRCULAR";
    return "CONVERGENT";
  }

  return "SPIRAL";
}
