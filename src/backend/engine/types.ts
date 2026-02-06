// Shared engine types

export type Channel = 0 | 1;

export type ArrayPattern = Channel[]; // six elements enforced at runtime

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
  number: number; // 1â€“64
  name: string;
  family: ActuationFamily | string;
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
seed: number;
  timestamp: number;
  result: EngineResult;
  notes?: string;
  tags?: string[];
}
export type ExpandedReading = {
  // Instrument readout
  instrument: {
    initial: string;
    final?: string;
    deltaMagnitude: number;
    changedLines: number[];
    contour?: string;
    transmutationType?: string;
  };

  // Oracle prose
  prose: {
    incitement: string;
    mechanism: string[];
    pressure: string;
    cautions: string[];
    leverage: string[];
    residual?: string;
  };
};


