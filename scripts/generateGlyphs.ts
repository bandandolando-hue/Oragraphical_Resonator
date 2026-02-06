// scripts/generateGlyphs.ts

import * as fs from "fs";
import * as path from "path";

const { ACTUATIONS_WITH_GLYPHS } = require("../src/data/actuationsWithGlyphs");
type ActuationGlyph = any;

// -------------- CONFIG --------------

const VIEWBOX = "0 0 100 100";
const OUTPUT_DIR = path.resolve(process.cwd(), "public/glyphs/actuations");

// -------------- ROOT GEOMETRIES --------------
// Each root is just the inner SVG content (no <svg> wrapper).

const ROOTS: Record<string, string> = {
  Ascendant: `
    <!-- Ascendant Root: upward triangle -->
    <path d="M20 80 L50 20 L80 80" />
  `,
  Descendant: `
    <!-- Descendant Root: downward triangle -->
    <path d="M20 20 L50 80 L80 20" />
  `,
  Convergent: `
    <!-- Convergent Root: >─< -->
    <path d="M20 50 L45 30" />
    <path d="M20 50 L45 70" />
    <line x1="45" y1="50" x2="55" y2="50" />
    <path d="M80 50 L55 30" />
    <path d="M80 50 L55 70" />
  `,
  Divergent: `
    <!-- Divergent Root: <─> -->
    <path d="M30 30 L10 50 L30 70" />
    <line x1="30" y1="50" x2="70" y2="50" />
    <path d="M70 30 L90 50 L70 70" />
  `,
  Oscillatory: `
    <!-- Oscillatory Root: ~|~ -->
    <line x1="50" y1="20" x2="50" y2="80" />
    <path d="M20 50 Q35 40 50 50" />
    <path d="M50 50 Q65 60 80 50" />
  `,
  Angular: `
    <!-- Angular Root: /┼\\ -->
    <line x1="20" y1="80" x2="50" y2="50" />
    <line x1="80" y1="80" x2="50" y2="50" />
    <line x1="50" y1="20" x2="50" y2="80" />
  `,
  Circular: `
    <!-- Circular Root: ○ -->
    <circle cx="50" cy="50" r="30" />
  `,
  Spiral: `
    <!-- Spiral Root: ◎ -->
    <circle cx="50" cy="50" r="30" />
    <circle cx="50" cy="50" r="15" />
  `,
};

// -------------- MARK GEOMETRIES --------------
// Marks are also inner SVG fragments, positioned in the top-right quadrant.

const MARKS: Record<string, string> = {
  "•": `
    <!-- Mark: Seed (•) -->
    <circle cx="75" cy="25" r="6" fill="currentColor" stroke="none" />
  `,
  ":": `
    <!-- Mark: Duality (:) -->
    <circle cx="72" cy="22" r="4" fill="currentColor" stroke="none" />
    <circle cx="78" cy="28" r="4" fill="currentColor" stroke="none" />
  `,
  "′": `
    <!-- Mark: Impulse (′) -->
    <line x1="70" y1="20" x2="80" y2="30" />
  `,
  "″": `
    <!-- Mark: Double Impulse (″) -->
    <line x1="70" y1="20" x2="78" y2="28" />
    <line x1="75" y1="25" x2="83" y2="33" />
  `,
  "×": `
    <!-- Mark: Stress (×) -->
    <line x1="70" y1="20" x2="80" y2="30" />
    <line x1="80" y1="20" x2="70" y2="30" />
  `,
  "=": `
    <!-- Mark: Bind (=) -->
    <line x1="68" y1="22" x2="82" y2="22" />
    <line x1="68" y1="28" x2="82" y2="28" />
  `,
  "∴": `
    <!-- Mark: Triad (∴) -->
    <circle cx="72" cy="20" r="4" fill="currentColor" stroke="none" />
    <circle cx="80" cy="20" r="4" fill="currentColor" stroke="none" />
    <circle cx="76" cy="30" r="4" fill="currentColor" stroke="none" />
  `,
  "∵": `
    <!-- Mark: Inverse Triad (∵) -->
    <circle cx="76" cy="20" r="4" fill="currentColor" stroke="none" />
    <circle cx="72" cy="30" r="4" fill="currentColor" stroke="none" />
    <circle cx="80" cy="30" r="4" fill="currentColor" stroke="none" />
  `,
};

// -------------- HELPERS --------------

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function buildSvgContent(act: ActuationGlyph): string {
  const root = ROOTS[act.family];
  if (!root) {
    throw new Error(`No root SVG defined for family '${act.family}'`);
  }

  const mark = MARKS[act.mark];
  if (!mark) {
    throw new Error(`No mark SVG defined for mark '${act.mark}'`);
  }

  const inner = `
    ${root}
    ${mark}
  `;

  // Theming: currentColor so UI can control color
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg
  viewBox="${VIEWBOX}"
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  stroke="currentColor"
  stroke-width="6"
  stroke-linecap="round"
  stroke-linejoin="round"
>
${inner}
</svg>
`;
}

// -------------- MAIN --------------

function ensureOutputDir() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
}

function generateGlyphs() {
  ensureOutputDir();

  for (const act of ACTUATIONS_WITH_GLYPHS) {
    const slug = slugify(act.name);
    const filename = `${String(act.number).padStart(2, "0")}-${slug}.svg`;
    const filepath = path.join(OUTPUT_DIR, filename);

    const svg = buildSvgContent(act);
    fs.writeFileSync(filepath, svg, "utf8");
    console.log(`Wrote ${filepath}`);
  }
}

generateGlyphs();
