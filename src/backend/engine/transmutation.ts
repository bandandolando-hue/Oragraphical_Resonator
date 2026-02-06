import type {
  ArrayPattern,
  ContourType,
  TransmutationEvent,
  TransmutationEventType,
} from "./types";

export function applyTransmutation(
  arr: ArrayPattern,
  contour: ContourType
): TransmutationEvent {
  const before: ArrayPattern = [...arr];
  let after: ArrayPattern = [...arr];
  let indices: number[] = [];
  let type: TransmutationEventType = "NONE";

  const flip = (i: number) => {
    after[i] = after[i] === 0 ? 1 : 0;
    indices.push(i);
  };

  switch (contour) {
    case "ASCENDANT":
      type = "SINGLE_FLIP"; flip(0); break;
    case "DESCENDANT":
      type = "SINGLE_FLIP"; flip(5); break;
    case "CONVERGENT":
      type = "DUAL_FLIP"; flip(2); flip(3); break;
    case "DIVERGENT":
      type = "DUAL_FLIP"; flip(0); flip(5); break;
    case "OSCILLATORY":
      type = "CASCADING"; flip(1); flip(3); flip(4); break;
    case "ANGULAR":
      type = "SINGLE_FLIP"; flip(2); break;
    case "CIRCULAR":
      type = "ROTATIONAL";
      after = rotatePattern(after);
      indices = [0, 1, 2, 3, 4, 5];
      break;
    case "SPIRAL":
      type = "CASCADING"; flip(1); flip(2); break;
  }

  return { type, indices, before, after };
}

export function rotatePattern(arr: ArrayPattern): ArrayPattern {
  return [arr[5], arr[0], arr[1], arr[2], arr[3], arr[4]];
}
