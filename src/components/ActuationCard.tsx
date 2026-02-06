// src/components/ActuationCard.tsx
import React from "react";
import { getActuationGlyph } from "../lib/glyphs";
import { ActuationGlyph } from "./ActuationGlyph";

interface ActuationCardProps {
  number: number;
}

export const ActuationCard: React.FC<ActuationCardProps> = ({ number }) => {
  const actuation = getActuationGlyph(number);
  if (!actuation) return null;

  return (
    <section
      className="
        max-w-md rounded-2xl border border-neutral-800 bg-black/70
        p-4 sm:p-6 shadow-[0_0_40px_rgba(0,0,0,0.6)]
      "
    >
      <header className="flex items-center gap-4 mb-4">
        <ActuationGlyph
          number={number}
          size={64}
          className="text-emerald-300 drop-shadow-[0_0_12px_rgba(16,185,129,0.6)]"
        />
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            {actuation.family}
          </p>
          <h2 className="text-lg font-semibold text-neutral-50">
            {actuation.number}. {actuation.name}
          </h2>
        </div>
      </header>

      <div className="space-y-3 text-sm text-neutral-200">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Insight
          </p>
          <p>{actuation.insight}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Directive
          </p>
          <p>{actuation.directive}</p>
        </div>
      </div>
    </section>
  );
};
