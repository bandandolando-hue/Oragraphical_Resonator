// src/components/ActuationChip.tsx
import React from "react";
import { getActuationGlyph } from "../lib/glyphs";
import { ActuationGlyph } from "./ActuationGlyph";

interface ActuationChipProps {
  number: number;
  compact?: boolean;
}

export const ActuationChip: React.FC<ActuationChipProps> = ({
  number,
  compact = false,
}) => {
  const actuation = getActuationGlyph(number);
  if (!actuation) return null;

  return (
    <div
      className={`
        inline-flex items-center gap-3 rounded-lg border border-neutral-700
        bg-neutral-900/70 px-3 py-2
      `}
    >
      <ActuationGlyph
        number={number}
        size={compact ? 32 : 48}
        className="text-emerald-300"
      />
      <div className="flex flex-col leading-tight">
        <span className="text-xs uppercase tracking-wide text-neutral-400">
          {actuation.family}
        </span>
        <span className="text-sm font-medium text-neutral-100">
          {actuation.number}. {actuation.name}
        </span>
      </div>
    </div>
  );
};
