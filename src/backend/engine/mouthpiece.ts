import type { FatePacket } from "./fate";

function pick(list: string[], seed: number, salt: number) {
  return list[(seed + salt) % list.length];
}

function clamp01(x: number) {
  return Math.max(0, Math.min(1, x));
}

export type Mouthpiece = {
  line: string;      // the “spoken” line
  aside?: string;    // optional smaller follow-up
};

export function composeMouthpiece(packet: FatePacket, question?: string): Mouthpiece {
  const { seed, cast, bias } = packet;

  const family = cast.actuation.family;

  const openings = [
    "You want an answer.",
    "You brought a question.",
    "You pulled the lever.",
    "You asked the machine to speak.",
    "You came for certainty.",
  ];

  const stingers = [
    "I don’t negotiate meaning.",
    "Don’t confuse motion with progress.",
    "You will still have to act.",
    "The reading is not the outcome.",
    "Keep your hands off the center if you won’t defend it.",
  ];

  const familyTone: Record<string, string[]> = {
    Convergent: [
      "Everything rotates around one thing. Name it.",
      "Pick the center. Stop pretending you can have three.",
      "If you won’t anchor it, it will drift anyway.",
    ],
    Divergent: [
      "You’re multiplying options to avoid choosing.",
      "Scatter looks like freedom until it costs you.",
      "Choose a strand. The rest are noise.",
    ],
    Angular: [
      "A hard turn is coming. You can steer or be thrown.",
      "The structure will not hold. Don’t patch—re-aim.",
      "Impact collects at the joint you avoid looking at.",
    ],
    Oscillatory: [
      "The needle swings. Stop locking decisions mid-swing.",
      "Find the trigger. Remove it.",
      "You’re calling it fate. It’s feedback.",
    ],
    Circular: [
      "You’re in a loop. Mark the cadence.",
      "Repeat it if you want—just don’t call it new.",
      "Intervene where the loop has leverage, not where it’s loud.",
    ],
    Spiral: [
      "Depth is invited. Surface answers won’t work.",
      "You will return, but not as the same self.",
      "Let the old pattern unwind—then shape what remains.",
    ],
    Ascendant: [
      "Yes, it rises. No, you can’t carry everything.",
      "Advance deliberately. Don’t sprint the climb.",
      "Higher means thinner support. Plan accordingly.",
    ],
    Descendant: [
      "Guide the descent. Choose the floor.",
      "Let it drop—controlled.",
      "Release is not loss unless you cling.",
    ],
  };

  // Use bias to choose an "aside" style: volatile/transformative/etc.
  const volatility = clamp01(bias.volatility);
  const transformative = clamp01((-bias.accumulation + 1) / 2); // accumulation axis -1..1 → 0..1 transform-ish

  const asidesVolatile = [
    "Expect secondary effects.",
    "Small shifts will echo.",
    "The tail is heavy today. Don’t gamble blind.",
  ];

  const asidesTransform = [
    "This favors change, not gain.",
    "If you insist on stacking, you’ll lose the point.",
    "Something becomes something else here.",
  ];

  const asidesNeutral = [
    "Keep it clean.",
    "Don’t embellish it.",
    "Read it once, then move.",
  ];

  const opening = pick(openings, seed, 3);
  const core = pick(familyTone[family] ?? ["The pattern speaks. Listen."], seed, 11);
  const stinger = pick(stingers, seed, 19);

  // Optional: very light acknowledgement of having a question without “flavor sets”
  const hasQuestion = Boolean(question && question.trim().length >= 3);
  const qTag = hasQuestion ? "Good." : "Ask, or don’t. The machine still runs.";

  let aside = pick(asidesNeutral, seed, 29);
  if (volatility >= 0.55) aside = pick(asidesVolatile, seed, 31);
  else if (transformative >= 0.55) aside = pick(asidesTransform, seed, 37);

  return {
    line: `${opening} ${core}`,
    aside: `${qTag} ${aside} ${stinger}`,
  };
}