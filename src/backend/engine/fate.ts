import type { EngineResult, ExpandedReading } from "./types";
import { deriveBiasEnvelope, type BiasEnvelope } from "./bias";

export type FatePacket = {
  id: string;
  seed: number;
  cast: EngineResult;
  bias: BiasEnvelope;
  expanded?: ExpandedReading;
  tags?: string[];
};

export function buildFatePacket(cast: EngineResult, seed: number): FatePacket {
  const bias = deriveBiasEnvelope(cast);

  const tags = [
    `family:${cast.actuation.family}`,
    `actuation:${cast.actuation.number}`,
    bias.volatility >= 0.45 ? "volatile" : "stable-ish",
    bias.accumulation <= -0.35 ? "transformative" : "accumulative-ish",
  ];

  const id = `${seed}:${cast.actuation.number}`;

  return { id, seed, cast, bias, tags };
}
