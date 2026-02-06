// src/cli/huntAll.ts
import { runSeededCast } from "../engine/seededCast";

const seen = new Set<number>();
let attempts = 0;

while (seen.size < 64) {
  const seed = attempts;     // simple: seed = attempt index
  const cast = runSeededCast(seed);

  attempts++;
  seen.add(cast.result.actuation.number);

  // Optional: log when we find a new one
  if (seen.size % 8 === 0) {
    console.log(`Discovered ${seen.size}/64 after ${attempts} casts...`);
  }
}

console.log(`All 64 Actuations discovered after ${attempts} casts.`);
