import type {
  Actuation,
  ArrayPattern,
  ContourType,
  InculcationKey,
  TransmutationEvent,
} from "./types";
import { ACTUATIONS } from "../data/actuations";

export function arrayToIndex(arr: ArrayPattern): number {
  if (arr.length !== 6) {
    throw new Error("ArrayPattern must be length 6");
  }
  let index = 0;
  for (let i = 0; i < 6; i++) {
    index = (index << 1) | arr[i];
  }
  return index; // 0–63
}

export function deriveActuation(
  finalArray: ArrayPattern,
  _contour: ContourType,
  _inculcation: InculcationKey,
  _transmutation: TransmutationEvent
): Actuation {
  const idx = arrayToIndex(finalArray);
  const act = ACTUATIONS[idx];
  if (!act) throw new Error(`No Actuation defined for index ${idx}`);
  return act;
}
