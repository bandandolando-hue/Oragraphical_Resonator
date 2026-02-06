// src/engine/describe.ts
import type { EngineResult } from "./types";

export function describeResult(r: EngineResult): string {
  const initial = r.arrayInitial.join(" ");
  const final = r.arrayFinal.join(" ");

  const trans =
    r.transmutation.type === "NONE"
      ? "No transmutation occurred."
      : `${r.transmutation.type} at indices [${r.transmutation.indices.join(", ")}].`;

  return [
    `Initial Array: ${initial}`,
    `Inculcation: ${r.inculcation}`,
    `Contour: ${r.contour}`,
    `Transmutation: ${trans}`,
    `Final Array: ${final}`,
    `Actuation: ${r.actuation.number} — ${r.actuation.name}`,
    `Insight: ${r.actuation.insight}`,
    `Directive: ${r.actuation.directive}`,
  ].join("\n");
}
