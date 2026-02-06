import type { EngineResult } from "./types";

export type BiasEnvelope = {
  stability: number; // -1..+1
  closure: number; // -1..+1
  accumulation: number; // -1..+1
  convergence: number; // -1..+1
  volatility: number; // 0..+1
};

function clamp(x: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, x));
}

// counts changing lines if final exists, else uses transmutation indices if present
function deltaMagnitude(cast: EngineResult): number {
  const initial = cast.arrayInitial;
  const finalArr = (cast as any).arrayFinal as number[] | undefined;
  if (Array.isArray(finalArr) && finalArr.length === initial.length) {
    let d = 0;
    for (let i = 0; i < initial.length; i++) if (initial[i] !== finalArr[i]) d++;
    return d;
  }
  const idxs = (cast as any).transmutation?.indices as number[] | undefined;
  return Array.isArray(idxs) ? idxs.length : 0;
}

export function deriveBiasEnvelope(cast: EngineResult): BiasEnvelope {
  const family = cast.actuation.family; // Ascendant, Angular, Spiral, etc.
  const d = deltaMagnitude(cast); // 0..6
  const strength = clamp(d / 4, 0, 1); // 0..1 (how strongly to bias)

  // base all at 0
  let stability = 0;
  let closure = 0;
  let accumulation = 0;
  let convergence = 0;
  let volatility = 0;

  // family -> primary axis nudges
  switch (family) {
    case "Convergent":
      convergence += 0.8;
      stability += 0.2;
      break;
    case "Divergent":
      convergence -= 0.8;
      volatility += 0.1;
      break;
    case "Angular":
      stability -= 0.8;
      volatility += 0.25;
      break;
    case "Oscillatory":
      volatility += 0.5;
      stability -= 0.2;
      break;
    case "Circular":
      closure += 0.7;
      stability += 0.2;
      break;
    case "Spiral":
      accumulation -= 0.7; // toward transformation
      volatility += 0.1;
      break;
    case "Ascendant":
      closure -= 0.2;
      stability -= 0.1;
      break;
    case "Descendant":
      closure += 0.2;
      stability += 0.1;
      break;
  }

  // scale by strength (delta)
  stability *= strength;
  closure *= strength;
  accumulation *= strength;
  convergence *= strength;

  // volatility is always 0..1
  volatility = clamp(volatility * (0.4 + 0.6 * strength), 0, 1);

  // clamp all axes
  return {
    stability: clamp(stability, -1, 1),
    closure: clamp(closure, -1, 1),
    accumulation: clamp(accumulation, -1, 1),
    convergence: clamp(convergence, -1, 1),
    volatility,
  };
}
