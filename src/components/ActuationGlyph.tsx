// src/components/ActuationGlyph.tsx
import React from "react";
import {
  getActuationGlyph,
  getActuationGlyphPath,
} from "../lib/glyphs";

interface ActuationGlyphProps {
  /** Actuation number, 1–64 */
  number: number;
  /** Size in px or CSS size (e.g. "4rem"). Default: 64 */
  size?: number | string;
  /** Extra CSS classes */
  className?: string;
  /** Show tooltip with name? */
  title?: boolean;
}

export const ActuationGlyph: React.FC<ActuationGlyphProps> = ({
  number,
  size = 64,
  className = "",
  title = true,
}) => {
  const actuation = getActuationGlyph(number);

  if (!actuation) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`flex items-center justify-center text-xs text-red-500 border border-red-500 rounded ${className}`}
      >
        ?
      </div>
    );
  }

  const src = getActuationGlyphPath(actuation);
  const pixelSize =
    typeof size === "number" ? `${size}px` : size;

  return (
    <img
      src={src}
      alt={actuation.name}
      title={title ? actuation.name : undefined}
      style={{ width: pixelSize, height: pixelSize }}
      className={className}
    />
  );
};
