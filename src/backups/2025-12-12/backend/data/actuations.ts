import type { Actuation } from "../engine/types";

// You can tweak this to extend your existing Actuation type instead:
export interface ActuationGlyph {
  number: number;
  name: string;
  family: string;     // "Ascendant" | "Descendant" | etc.
  glyph: string;      // composed glyph: root + mark
  mark: string;       // variation mark only: • : ′ ″ × = ∴ ∵
  insight: string;
  directive: string;
}

export const ACTUATIONS_WITH_GLYPHS: ActuationGlyph[] = [
  // 1–8 ASCENDANT
  {
    number: 1,
    name: "Ascendant Vector",
    family: "Ascendant",
    glyph: "↑•",
    mark: "•",
    insight:
      "Momentum climbs in a clear direction; forces align toward elevation.",
    directive: "Advance deliberately; ride the climb rather than sprinting it.",
  },
  {
    number: 2,
    name: "Tempered Climb",
    family: "Ascendant",
    glyph: "↑:",
    mark: ":",
    insight:
      "Progress upward is slow but steady; resistance refines strength.",
    directive: "Accept the drag; persistence is the true gain.",
  },
  {
    number: 3,
    name: "Lantern Apex",
    family: "Ascendant",
    glyph: "↑′",
    mark: "′",
    insight:
      "A high vantage point is within reach; visibility is improving.",
    directive:
      "Seek perspective; make decisions from the highest view you can access.",
  },
  {
    number: 4,
    name: "Overloaded Rise",
    family: "Ascendant",
    glyph: "↑″",
    mark: "″",
    insight: "Ascent is burdened; too much is being carried upward.",
    directive:
      "Lighten the load before proceeding, or the climb will fail.",
  },
  {
    number: 5,
    name: "Cresting Arc",
    family: "Ascendant",
    glyph: "↑×",
    mark: "×",
    insight:
      "The situation approaches its peak; gains are near maximum.",
    directive: "Make your key move now, before the curve starts to fall.",
  },
  {
    number: 6,
    name: "Thinning Atmosphere",
    family: "Ascendant",
    glyph: "↑=",
    mark: "=",
    insight:
      "Higher elevation yields isolation; support structures thin out.",
    directive: "Do not overextend; secure your base as you rise.",
  },
  {
    number: 7,
    name: "Rung of Ascent",
    family: "Ascendant",
    glyph: "↑∴",
    mark: "∴",
    insight:
      "This is a step, not the summit; progress is incremental by design.",
    directive: "Treat this as staging, not arrival; plan the next rung.",
  },
  {
    number: 8,
    name: "Radiant Apex",
    family: "Ascendant",
    glyph: "↑∵",
    mark: "∵",
    insight:
      "Visibility and influence radiate outward from your current position.",
    directive:
      "Use your reach carefully; illumination draws attention as well as admiration.",
  },

  // 9–16 DESCENDANT
  {
    number: 9,
    name: "Descending Span",
    family: "Descendant",
    glyph: "↓•",
    mark: "•",
    insight:
      "Pressure is easing; a long-held tension begins to fall away.",
    directive: "Loosen your grip; allow decline where it relieves strain.",
  },
  {
    number: 10,
    name: "Controlled Descent",
    family: "Descendant",
    glyph: "↓:",
    mark: ":",
    insight:
      "Downshift is manageable; you can guide how far things fall.",
    directive: "Set clear lower bounds; steer the landing.",
  },
  {
    number: 11,
    name: "Exhausted Summit",
    family: "Descendant",
    glyph: "↓′",
    mark: "′",
    insight:
      "What once peaked is now spent; continuation at this level is unsustainable.",
    directive: "Step down willingly; preserve what remains.",
  },
  {
    number: 12,
    name: "Draining Meridian",
    family: "Descendant",
    glyph: "↓″",
    mark: "″",
    insight:
      "Energy leaks quietly; slow loss rather than immediate crash.",
    directive:
      "Identify the slow leaks and seal them or accept the fade.",
  },
  {
    number: 13,
    name: "Settled Sediment",
    family: "Descendant",
    glyph: "↓×",
    mark: "×",
    insight:
      "Matters sink into place; residues of past actions accumulate.",
    directive:
      "Sort and process what has settled; don't let it harden into dead weight.",
  },
  {
    number: 14,
    name: "Hollow Tread",
    family: "Descendant",
    glyph: "↓=",
    mark: "=",
    insight:
      "Continuing on this path yields diminishing returns.",
    directive:
      "Stop repeating motions that no longer matter; redesign the route.",
  },
  {
    number: 15,
    name: "Terminal Gradient",
    family: "Descendant",
    glyph: "↓∴",
    mark: "∴",
    insight: "The slope ends soon; a floor or bottom is near.",
    directive:
      "Prepare for transition; decide how you want to meet the level ground.",
  },
  {
    number: 16,
    name: "Soft Collapse",
    family: "Descendant",
    glyph: "↓∵",
    mark: "∵",
    insight:
      "Structures fail gently rather than catastrophically—yet they do fail.",
    directive:
      "Allow non-critical supports to fall; rebuild on what remains stable.",
  },

  // 17–24 CONVERGENT
  {
    number: 17,
    name: "Harmonic Convergence",
    family: "Convergent",
    glyph: ">─<•",
    mark: "•",
    insight:
      "Disparate forces lock into harmony; alignment emerges.",
    directive: "Coordinate with others; shared timing amplifies impact.",
  },
  {
    number: 18,
    name: "Tempered Span",
    family: "Convergent",
    glyph: ">─<:",
    mark: ":",
    insight:
      "Strength has been forged through sustained pressure; coherence is hardened.",
    directive: "Commit; the structure can bear more than before.",
  },
  {
    number: 19,
    name: "Focal Aperture",
    family: "Convergent",
    glyph: ">─<′",
    mark: "′",
    insight:
      "Attention narrows; one path or problem stands out above others.",
    directive: "Accept the narrowing; go deep where focus insists.",
  },
  {
    number: 20,
    name: "Crossed Bearings",
    family: "Convergent",
    glyph: ">─<″",
    mark: "″",
    insight:
      "Multiple trajectories intersect; decisions at this node have extended consequence.",
    directive: "Choose consciously; crossings are not neutral.",
  },
  {
    number: 21,
    name: "Crystallized Intent",
    family: "Convergent",
    glyph: ">─<×",
    mark: "×",
    insight:
      "A once-vague desire or plan solidifies into something actionable.",
    directive: "Translate clarity into specific commitments.",
  },
  {
    number: 22,
    name: "Lattice of Accord",
    family: "Convergent",
    glyph: ">─<=",
    mark: "=",
    insight:
      "A grid of mutual interests forms; cooperation becomes structurally possible.",
    directive: "Formalize agreements; write them into the frame.",
  },
  {
    number: 23,
    name: "Locked Coupling",
    family: "Convergent",
    glyph: ">─<∴",
    mark: "∴",
    insight:
      "Two elements bind closely; separation now has cost.",
    directive:
      "Honor the bond or undo it deliberately; drifting is not an option.",
  },
  {
    number: 24,
    name: "Central Bearing",
    family: "Convergent",
    glyph: ">─<∵",
    mark: "∵",
    insight:
      "The situation demands a stable center; things rotate around a core.",
    directive: "Decide what the center is—and defend it.",
  },

  // 25–32 DIVERGENT
  {
    number: 25,
    name: "Divergent Coil",
    family: "Divergent",
    glyph: "<─>•",
    mark: "•",
    insight:
      "Energy unwinds outward; intentions or obligations multiply.",
    directive:
      "Decide which strands to follow; not every offshoot is worth your time.",
  },
  {
    number: 26,
    name: "Radiant Aperture",
    family: "Divergent",
    glyph: "<─>:",
    mark: ":",
    insight:
      "A channel opens wide; new options spill into view.",
    directive:
      "Explore, but set limits; unbounded expansion overwhelms.",
  },
  {
    number: 27,
    name: "Fractured Span",
    family: "Divergent",
    glyph: "<─>′",
    mark: "′",
    insight:
      "A once-unified effort splits into competing tracks.",
    directive:
      "Either reconcile the split or treat them as separate projects.",
  },
  {
    number: 28,
    name: "Scatterfield",
    family: "Divergent",
    glyph: "<─>″",
    mark: "″",
    insight:
      "Focus fragments under too many stimuli.",
    directive:
      "Intentionally drop some threads; concentration is a finite resource.",
  },
  {
    number: 29,
    name: "Peripheral Drift",
    family: "Divergent",
    glyph: "<─>×",
    mark: "×",
    insight:
      "Attention gravitates toward edge cases and side concerns.",
    directive:
      "Decide whether the margins are worth the center's neglect.",
  },
  {
    number: 30,
    name: "Unbound Trajectory",
    family: "Divergent",
    glyph: "<─>=",
    mark: "=",
    insight:
      "A path continues without constraint; no clear end in sight.",
    directive:
      "Define your own stopping point; don't wait for one to appear.",
  },
  {
    number: 31,
    name: "Flaring Vector",
    family: "Divergent",
    glyph: "<─>∴",
    mark: "∴",
    insight:
      "Action has wider radius than expected; secondary effects intensify.",
    directive: "Consider the blast radius before you act.",
  },
  {
    number: 32,
    name: "Shattered Meridian",
    family: "Divergent",
    glyph: "<─>∵",
    mark: "∵",
    insight:
      "Coherent direction breaks; no single 'true north' remains.",
    directive: "Re-establish orientation from first principles.",
  },

  // 33–40 OSCILLATORY
  {
    number: 33,
    name: "Oscillated Bearing",
    family: "Oscillatory",
    glyph: "~|~•",
    mark: "•",
    insight:
      "Conditions swing between states; no stable baseline yet.",
    directive: "Delay final judgments; act in reversible ways.",
  },
  {
    number: 34,
    name: "Binary Tremor",
    family: "Oscillatory",
    glyph: "~|~:",
    mark: ":",
    insight:
      "The system flips repeatedly between two poles.",
    directive: "Look for the trigger; remove what keeps flipping the switch.",
  },
  {
    number: 35,
    name: "Stuttering Span",
    family: "Oscillatory",
    glyph: "~|~′",
    mark: "′",
    insight:
      "Progress advances and stalls in erratic bursts.",
    directive:
      "Work in short pushes; rest during the stalls instead of forcing.",
  },
  {
    number: 36,
    name: "Ambient Flutter",
    family: "Oscillatory",
    glyph: "~|~″",
    mark: "″",
    insight:
      "Minor fluctuations create noise but not yet structural threat.",
    directive: "Don't overreact; filter signal from chatter.",
  },
  {
    number: 37,
    name: "Phase Misalignment",
    family: "Oscillatory",
    glyph: "~|~×",
    mark: "×",
    insight:
      "Timings are out of phase; cooperation stutters.",
    directive:
      "Reschedule, retune, or simplify; timing matters more than effort.",
  },
  {
    number: 38,
    name: "Standing Wave",
    family: "Oscillatory",
    glyph: "~|~=",
    mark: "=",
    insight:
      "Disturbance persists in place; agitation without movement.",
    directive:
      "Change the medium or boundary conditions; nothing shifts otherwise.",
  },
  {
    number: 39,
    name: "Hammocked Drift",
    family: "Oscillatory",
    glyph: "~|~∴",
    mark: "∴",
    insight:
      "The system swings but returns to a soft middle.",
    directive:
      "Use the calm midpoint for important actions.",
  },
  {
    number: 40,
    name: "Volatile Lattice",
    family: "Oscillatory",
    glyph: "~|~∵",
    mark: "∵",
    insight:
      "Many connections are live but unstable; relationships or factors are in flux.",
    directive:
      "Avoid locking in commitments until the network settles.",
  },

  // 41–48 ANGULAR / FAULTLINE
  {
    number: 41,
    name: "Catalytic Faultline",
    family: "Angular",
    glyph: "/┼\\•",
    mark: "•",
    insight:
      "A fracture introduces radical possibility; old structure cannot continue unchanged.",
    directive:
      "Exploit the break for necessary change; don't just patch it.",
  },
  {
    number: 42,
    name: "Aetheric Breach",
    family: "Angular",
    glyph: "/┼\\:",
    mark: ":",
    insight:
      "An outside influence pierces the system unexpectedly.",
    directive:
      "Study the intruder before reacting; it may be threat or gift.",
  },
  {
    number: 43,
    name: "Sheared Span",
    family: "Angular",
    glyph: "/┼\\′",
    mark: "′",
    insight:
      "Something is cut cleanly; a decisive split rather than gradual drift.",
    directive:
      "Accept that a chapter is over; do not cling to severed parts.",
  },
  {
    number: 44,
    name: "Impact Meridian",
    family: "Angular",
    glyph: "/┼\\″",
    mark: "″",
    insight:
      "A collision occurs at a critical axis of the situation.",
    directive:
      "Stabilize the core first; let non-essential pieces fall where they may.",
  },
  {
    number: 45,
    name: "Bent Vector",
    family: "Angular",
    glyph: "/┼\\×",
    mark: "×",
    insight:
      "A force is sharply redirected; original aim no longer holds.",
    directive:
      "Re-aim consciously; don't pretend the original target still applies.",
  },
  {
    number: 46,
    name: "Shunt Channel",
    family: "Angular",
    glyph: "/┼\\=",
    mark: "=",
    insight:
      "Load or responsibility is diverted to an unexpected path.",
    directive:
      "Track where the diverted flow now runs; follow the new channel.",
  },
  {
    number: 47,
    name: "Split Bearing",
    family: "Angular",
    glyph: "/┼\\∴",
    mark: "∴",
    insight:
      "Two incompatible orientations exist simultaneously.",
    directive:
      "Choose one to privilege; compromise here weakens both.",
  },
  {
    number: 48,
    name: "Jagged Aperture",
    family: "Angular",
    glyph: "/┼\\∵",
    mark: "∵",
    insight:
      "An opening appears, but it is rough, risky, and irregular.",
    directive:
      "Proceed only if you're willing to accept uneven costs.",
  },

  // 49–56 CIRCULAR / ENCLOSED
  {
    number: 49,
    name: "Enclosed Meridian",
    family: "Circular",
    glyph: "○•",
    mark: "•",
    insight:
      "Matters revolve within a defined boundary; outside inputs are limited.",
    directive:
      "Work with what's inside the ring; external rescue is unlikely.",
  },
  {
    number: 50,
    name: "Recurrent Interval",
    family: "Circular",
    glyph: "○:",
    mark: ":",
    insight:
      "Patterns return on a rhythm; cycles are in effect.",
    directive:
      "Mark the cadence; intervene at the point in the loop where leverage is highest.",
  },
  {
    number: 51,
    name: "Closing Circuit",
    family: "Circular",
    glyph: "○′",
    mark: "′",
    insight:
      "Loose ends tie together; the loop nears completion.",
    directive:
      "Finish what you started; leave as little hanging as possible.",
  },
  {
    number: 52,
    name: "Ring of Delay",
    family: "Circular",
    glyph: "○″",
    mark: "″",
    insight:
      "Progress circles without advancing; stalled motion in loops.",
    directive:
      "Break the ring deliberately or accept that this is a holding pattern.",
  },
  {
    number: 53,
    name: "Girded Span",
    family: "Circular",
    glyph: "○×",
    mark: "×",
    insight:
      "Boundaries reinforce stability; constraints protect the interior.",
    directive:
      "Respect the limit; test it only if you're prepared for structural shift.",
  },
  {
    number: 54,
    name: "Perimeter Drift",
    family: "Circular",
    glyph: "○=",
    mark: "=",
    insight:
      "Attention clings to the edge of the circle, not the center.",
    directive:
      "Decide whether to re-center or step outside the frame entirely.",
  },
  {
    number: 55,
    name: "Nested Orbits",
    family: "Circular",
    glyph: "○∴",
    mark: "∴",
    insight:
      "Multiple cycles interlock; shorter patterns ride inside longer ones.",
    directive:
      "Align your actions with the largest cycle you can perceive.",
  },
  {
    number: 56,
    name: "Quiet Enclosure",
    family: "Circular",
    glyph: "○∵",
    mark: "∵",
    insight:
      "Things are held, even if not fully understood; containment over clarity.",
    directive:
      "Use the safety of the enclosure to observe, learn, and prepare.",
  },

  // 57–64 SPIRAL
  {
    number: 57,
    name: "Spiral Ingress",
    family: "Spiral",
    glyph: "◎•",
    mark: "•",
    insight:
      "The path curves inward; surface layers give way to deeper strata.",
    directive:
      "Follow the descent consciously; don't skim when depth is invited.",
  },
  {
    number: 58,
    name: "Emergent Helix",
    family: "Spiral",
    glyph: "◎:",
    mark: ":",
    insight:
      "Two forces twist around each other, co-evolving.",
    directive:
      "Treat growth as mutual; changes in one strand affect the other.",
  },
  {
    number: 59,
    name: "Decaying Loop",
    family: "Spiral",
    glyph: "◎′",
    mark: "′",
    insight:
      "A repeating pattern loses amplitude over time.",
    directive:
      "Support its fading if it's harmful; revive it only if it still serves.",
  },
  {
    number: 60,
    name: "Ascending Coil",
    family: "Spiral",
    glyph: "◎″",
    mark: "″",
    insight:
      "The cycle repeats but each turn rises; you revisit, but not as the same self.",
    directive:
      "Recognize your progress; treat familiar problems as upgraded tests.",
  },
  {
    number: 61,
    name: "Compression Vortex",
    family: "Spiral",
    glyph: "◎×",
    mark: "×",
    insight:
      "Forces tighten around a central issue; avoidance becomes impossible.",
    directive:
      "Enter the center willingly; deal directly with the core.",
  },
  {
    number: 62,
    name: "Dissolving Spiral",
    family: "Spiral",
    glyph: "◎=",
    mark: "=",
    insight:
      "The structure unwinds; previously solid patterns loosen into fog.",
    directive:
      "Let go of trying to re-tighten what is meant to unravel.",
  },
  {
    number: 63,
    name: "Threshold Gyre",
    family: "Spiral",
    glyph: "◎∴",
    mark: "∴",
    insight:
      "You orbit a boundary between phases; neither inside nor fully out.",
    directive:
      "Choose crossing or retreat; lingering at the threshold drains energy.",
  },
  {
    number: 64,
    name: "Radiant Aperture",
    family: "Spiral",
    glyph: "◎∵",
    mark: "∵",
    insight:
      "An opening blooms from the center outward; transformation seeks expression.",
    directive:
      "Step through while it's open; shaping the change is easier now than later.",
  },
];

export const ACTUATIONS: Actuation[] = ACTUATIONS_WITH_GLYPHS.map(
  ({ number, name, family, insight, directive }) => ({
    number,
    name,
    family,
    insight,
    directive,
  })
);
