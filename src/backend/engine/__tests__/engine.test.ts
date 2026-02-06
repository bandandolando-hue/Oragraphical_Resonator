import { describe, expect, it, vi } from "vitest";
import { generateArray } from "../array";
import { deriveContours } from "../contours";
import { countTransitions, deriveInculcation, isSymmetric } from "../inculcation";
import { runEngine } from "..";
import { runSeededCast } from "../seededCast";
import { createSeededRng } from "../seededRng";

describe("seeded RNG", () => {
  it("produces a deterministic sequence for a fixed seed", () => {
    const rng = createSeededRng(123);
    expect(rng()).toBeCloseTo(0.283736921447268, 12);
    expect(rng()).toBeCloseTo(0.43513002373164755, 12);
    expect(rng()).toBeCloseTo(0.03865125776237139, 12);
  });
});

describe("array generation", () => {
  it("builds a six-element array of channels", () => {
    const values = [0.2, 0.7, 0.1, 0.9, 0.49, 0.5];
    let index = 0;
    const rng = () => values[index++ % values.length];

    expect(generateArray(rng)).toEqual([0, 1, 0, 1, 0, 1]);
  });
});

describe("inculcation helpers", () => {
  it("counts transitions across the array", () => {
    expect(countTransitions([0, 0, 1, 1, 0, 1])).toBe(3);
  });

  it("detects symmetry", () => {
    expect(isSymmetric([1, 0, 0, 0, 0, 1])).toBe(true);
    expect(isSymmetric([1, 0, 1, 0, 0, 1])).toBe(false);
  });

  it("derives inculcations from array patterns", () => {
    expect(deriveInculcation([0, 0, 0, 0, 0, 0])).toBe(
      "PRESSURE_CLARIFIES_PURPOSE"
    );
    expect(deriveInculcation([0, 1, 0, 1, 0, 1])).toBe(
      "DISCORD_PRECEDES_ALIGNMENT"
    );
    expect(deriveInculcation([0, 0, 0, 1, 0, 0])).toBe("ADVANCE_CASTS_SHADOW");
    expect(deriveInculcation([1, 1, 1, 1, 0, 1])).toBe(
      "STABILITY_DEMANDS_RESISTANCE"
    );
  });
});

describe("contour derivation", () => {
  it("selects the expected contour branch", () => {
    expect(deriveContours([0, 0, 0, 1, 1, 1], "ADVANCE_CASTS_SHADOW")).toBe(
      "ASCENDANT"
    );
    expect(deriveContours([1, 1, 1, 0, 0, 0], "ADVANCE_CASTS_SHADOW")).toBe(
      "DESCENDANT"
    );
    expect(deriveContours([1, 0, 0, 0, 0, 1], "ADVANCE_CASTS_SHADOW")).toBe(
      "CIRCULAR"
    );
    expect(deriveContours([0, 1, 0, 1, 0, 1], "ADVANCE_CASTS_SHADOW")).toBe(
      "OSCILLATORY"
    );
    expect(deriveContours([1, 1, 0, 1, 0, 0], "ADVANCE_CASTS_SHADOW")).toBe(
      "ANGULAR"
    );
    expect(deriveContours([1, 0, 0, 1, 0, 0], "ADVANCE_CASTS_SHADOW")).toBe(
      "CONVERGENT"
    );
    expect(deriveContours([1, 0, 1, 1, 0, 0], "ADVANCE_CASTS_SHADOW")).toBe(
      "SPIRAL"
    );
  });
});

describe("engine output", () => {
  it("produces deterministic results for a seeded rng", () => {
    const rng = createSeededRng(42);
    const result = runEngine(rng);

    expect(result.arrayInitial).toHaveLength(6);
    expect(result.arrayFinal).toHaveLength(6);
    result.arrayInitial.forEach(value => expect([0, 1]).toContain(value));
    result.arrayFinal.forEach(value => expect([0, 1]).toContain(value));
    expect(result.actuation.number).toBeGreaterThanOrEqual(1);
    expect(result.actuation.number).toBeLessThanOrEqual(64);
  });
});

describe("seeded cast", () => {
  it("builds a stable id and timestamp for a seed", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-01-01T00:00:00Z"));

    const record = runSeededCast(7);

    expect(record.id).toBe(`7:${record.result.actuation.number}`);
    expect(record.seed).toBe(7);
    expect(record.timestamp).toBe(new Date("2024-01-01T00:00:00Z").valueOf());

    vi.useRealTimers();
  });
});
