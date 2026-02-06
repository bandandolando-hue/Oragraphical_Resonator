// src/engine/types.ts

export type Channel = 0 | 1;

export type ArrayPattern = Channel[];  // 6 elements, but use runtime check

export type InculcationKey =
  | "PRESSURE_CLARIFIES_PURPOSE"
  | "ADVANCE_CASTS_SHADOW"
  | "HIDDEN_SEEKS_EMERGENCE"
  | "STABILITY_DEMANDS_RESISTANCE"
  | "CYCLES_RETURN"
  | "DISCORD_PRECEDES_ALIGNMENT";

export type ContourType =
  | "ASCENDANT"
  | "DESCENDANT"
  | "CONVERGENT"
  | "DIVERGENT"
  | "OSCILLATORY"
  | "ANGULAR"
  | "CIRCULAR"
  | "SPIRAL";

export type TransmutationEventType =
  | "NONE"
  | "SINGLE_FLIP"
  | "DUAL_FLIP"
  | "CASCADING"
  | "ROTATIONAL";

export interface TransmutationEvent {
  type: TransmutationEventType;
  indices: number[];
  before: ArrayPattern;
  after: ArrayPattern;
}

export type ActuationFamily =
  | "ASCENDANT"
  | "DESCENDANT"
  | "CONVERGENT"
  | "DIVERGENT"
  | "OSCILLATORY"
  | "ANGULAR"
  | "CIRCULAR"
  | "SPIRAL";

export interface Actuation {
  number: number;       // 1â€“64
  name: string;
  family: ActuationFamily | string; // allow string for now
  insight: string;
  directive: string;
}

export interface EngineResult {
  arrayInitial: ArrayPattern;
  inculcation: InculcationKey;
  contour: ContourType;
  transmutation: TransmutationEvent;
  arrayFinal: ArrayPattern;
  actuation: Actuation;
}

// Optional: keep these utility types if you want them
export interface ArrayConfig {
  size?: number;
  precision?: number;
}

export interface OperationResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export interface CastRecord {
  id: string;
seed: number;             // RNG seed used for this cast
  timestamp: number;        // ms since epoch when the cast ran
  result: EngineResult;     // Full engine output (arrays, actuation, etc.)
  notes?: string;           // Optional freeform annotation
  tags?: string[];          // Optional categorization
}
