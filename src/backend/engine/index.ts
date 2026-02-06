import type { EngineResult } from "./types";
import { generateArray } from "./array";
import { deriveInculcation } from "./inculcation";
import { deriveContours } from "./contours";
import { applyTransmutation } from "./transmutation";
import { deriveActuation } from "./actuation";

export function runEngine(rng: () => number = Math.random): EngineResult {
  const arrayInitial = generateArray(rng);
  const inculcation = deriveInculcation(arrayInitial);
  const contour = deriveContours(arrayInitial, inculcation);
  const transmutation = applyTransmutation(arrayInitial, contour);
  const arrayFinal = transmutation.after;
  const actuation = deriveActuation(arrayFinal, contour, inculcation, transmutation);

  return {
    arrayInitial,
    inculcation,
    contour,
    transmutation,
    arrayFinal,
    actuation,
  };
}

export type { EngineResult } from "./types";
export { buildFatePacket } from "./fate";
export type { FatePacket } from "./fate";
export type { BiasEnvelope } from "./bias";
