/**
 * CLI Demo for the 64-Actuation Oracle Engine
 * 
 * Run with: npx ts-node src/cli/demo.ts
 */

import { describeResult } from "../engine/describe";
import { runSeededCast } from "../engine/seededCast";
import { storeCast, getAllCasts } from "../engine/castStore";

const seed = 42;
const cast = runSeededCast(seed);

storeCast(cast);

console.log("\n=== ORAGRAPHICAL RESONATOR OUTPUT ===\n");
console.log("Seed:", cast.seed);
console.log("Timestamp:", new Date(cast.timestamp).toISOString());
console.log(describeResult(cast.result));

console.log("\nTotal stored casts:", getAllCasts().length);

console.log("\n=====================================\n");
