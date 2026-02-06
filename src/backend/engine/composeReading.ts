import type { EngineResult, ExpandedReading } from "./types";
import type { FatePacket } from "./fate";
import { FAMILY_INCITEMENT } from "../data/omen.family";
import { CONTOUR_PRESSURE } from "../data/omen.contour";
import { TRANSMUTATION_OMENS } from "../data/omen.transmutation";

// deterministic pick from a list
function pick(list: string[] | undefined, seed: number, salt: number) {
  const arr = list && list.length ? list : ["?"];
  return arr[(seed + salt) % arr.length];
}

function countOnes(bits: number[]) {
  let c = 0;
  for (const b of bits) if (b === 1) c++;
  return c;
}

export function composeReading(packet: FatePacket): ExpandedReading {
  const cast = packet.cast as EngineResult;
  const seed = packet.seed;
  const family = cast.actuation.family;
  const initial = cast.arrayInitial;
  const finalArr = cast.arrayFinal as number[];

  // changed lines (1..6)
  const changedLines: number[] = (() => {
    if (Array.isArray(finalArr) && finalArr.length === initial.length) {
      const out: number[] = [];
      for (let i = 0; i < initial.length; i++) {
        if (initial[i] !== finalArr[i]) out.push(i + 1);
      }
      return out;
    }
    const idxs = (cast as any).transmutation?.indices as number[] | undefined;
    if (Array.isArray(idxs) && idxs.length) return idxs.map((i) => i + 1);
    return [];
  })();

  const deltaMagnitude = changedLines.length;

  const contour = (cast as any).contour as string | undefined;
  const transTypeRaw = (cast as any).transmutation?.type as string | undefined;
  const transmutationType =
    transTypeRaw ??
    (deltaMagnitude === 0
      ? "NONE"
      : deltaMagnitude === 1
        ? "SINGLE_FLIP"
        : deltaMagnitude === 2
          ? "DUAL_FLIP"
          : "MULTI_FLIP");

  // pressure line comes mostly from contour if present, else family fallback
  const pressureLine =
    contour && CONTOUR_PRESSURE[contour]
      ? pick(CONTOUR_PRESSURE[contour], seed, 31)
      : pick(FAMILY_INCITEMENT[family], seed, 41);

  // mechanism lines: short, factual-but-poetic
  const mechanism: string[] = [];
  if (deltaMagnitude === 0) {
    mechanism.push(pick(TRANSMUTATION_OMENS["NONE"], seed, 52));
  } else if (deltaMagnitude === 1) {
    mechanism.push(pick(TRANSMUTATION_OMENS["SINGLE_FLIP"], seed, 52));
    mechanism.push(`Changing line: ${changedLines[0]}.`);
  } else if (deltaMagnitude === 2) {
    mechanism.push(pick(TRANSMUTATION_OMENS["DUAL_FLIP"], seed, 52));
    mechanism.push(`Changing lines: ${changedLines[0]} and ${changedLines[1]}.`);
  } else {
    mechanism.push(pick(TRANSMUTATION_OMENS["MULTI_FLIP"], seed, 52));
    mechanism.push(`Changing lines: ${changedLines.join(", ")}.`);
  }

  // cautions/leverage: lean on family, then sharpen by polarity
  const ones = finalArr ? countOnes(finalArr) : countOnes(initial);
  const polarity = ones >= 4 ? "bright" : ones <= 2 ? "dark" : "neutral";

  const cautionsBase: Record<string, string[]> = {
    Convergent: ["Do not negotiate the center into pieces.", "Avoid confusing speed with direction."],
    Divergent: ["Do not chase every branch.", "Avoid scattering effort to prove freedom."],
    Angular: ["Do not patch what must be re-aimed.", "Avoid treating rupture as a minor inconvenience."],
    Oscillatory: ["Do not lock decisions while the needle swings.", "Avoid feeding the trigger that flips the circuit."],
    Circular: ["Do not mistake repetition repetition for progress.", "Avoid living inside the loop without marking the cadence."],
    Spiral: ["Do not skim the surface when depth is demanded.", "Avoid forcing the coil to stay open."],
    Ascendant: ["Do not overextend above your supports.", "Avoid carrying dead weight into ascent."],
    Descendant: ["Do not cling to a failing height.", "Avoid an uncontrolled slide; choose your floor."],
  };

  const leverageBase: Record<string, string[]> = {
    Convergent: ["Name the core constraint and enforce it consistently.", "Anchor one objective; rotate everything else around it."],
    Divergent: ["Choose one strand and commit for a cycle.", "Set bounds; explore inside them, not beyond them."],
    Angular: ["Use the break to change what you've avoided changing.", "Re-aim cleanly; redirection beats denial."],
    Oscillatory: ["Act in reversible moves; keep exits open.", "Remove the trigger; the swing will calm."],
    Circular: ["Intervene at the leverage point in the loop.", "Close one circuit completely before starting another."],
    Spiral: ["Enter the center willingly; deal with the core.", "Let the old pattern unwind, then shape what remains."],
    Ascendant: ["Advance deliberately; ride the climb.", "Secure your base as you rise."],
    Descendant: ["Set clear lower bounds; steer the landing.", "Step down willingly; preserve what matters."],
  };

  const cautions = [
    pick(cautionsBase[family], seed, 70),
    polarity === "bright"
      ? "Beware overconfidence; light can blind."
      : polarity === "dark"
        ? "Beware fatalism; darkness can seduce."
        : "Beware drift; neutrality can anesthetize.",
  ];

  const leverage = [
    pick(leverageBase[family], seed, 81),
    deltaMagnitude >= 2 ? "Expect secondary effects; plan for them." : "Small corrections compound; keep it clean.",
  ];

  // residual: one closing line, tied to family + delta
  const residual =
    deltaMagnitude === 0
      ? "The pattern holds. Meaning comes from what you refuse to change."
      : deltaMagnitude >= 3
        ? "A phase shift is underway. Treat the next move as consequential."
        : "The lattice adjusted. Don't pretend you're in the same room as before.";

  return {
    instrument: {
      initial: initial.join(" "),
      final: finalArr ? finalArr.join(" ") : undefined,
      deltaMagnitude,
      changedLines,
      contour,
      transmutationType,
    },
    prose: {
      incitement: pick(FAMILY_INCITEMENT[family], seed, 11),
      mechanism,
      pressure: pressureLine,
      cautions,
      leverage,
      residual,
    },
  };
}
