// src/lib/glyphs.ts
import { ACTUATIONS_WITH_GLYPHS, ActuationGlyph } from "../data/actuationsWithGlyphs";

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getActuationGlyph(number: number): ActuationGlyph | undefined {
  return ACTUATIONS_WITH_GLYPHS.find((a) => a.number === number);
}

export function getActuationGlyphPath(actuation: ActuationGlyph): string {
  const num = String(actuation.number).padStart(2, "0");
  const slug = slugify(actuation.name);
  return `/glyphs/actuations/${num}-${slug}.svg`;
}
