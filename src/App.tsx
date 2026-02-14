import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ActuationGlyph } from "./components/ActuationGlyph";
import { buildFatePacket, runEngine } from "./backend/engine";
import type { EngineResult } from "./backend/engine/types";
import { deriveActuation } from "./backend/engine/actuation";
import { getActuationGlyph } from "./lib/glyphs";
import { composeReading } from "./backend/engine/composeReading";
import { composeMouthpiece } from "./backend/engine/mouthpiece";

export default function App() {
  const storageKey = "oragraphical_resonator:cast_history";
  const [isWaking, setIsWaking] = useState(false);
  const [cast, setCast] = useState<EngineResult | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [seed, setSeed] = useState<number | null>(null);
  const [question, setQuestion] = useState("");
  const [history, setHistory] = useState<
    {
      id: string;
      seed: number;
      timestamp: number;
      question: string;
      actuationNumber: number;
      actuationName: string;
      actuationFamily: string;
      inculcation: string;
      arrayInitial: number[];
      arrayFinal: number[];
    }[]
  >(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const actuation = cast?.actuation;
  const inculcation = cast?.inculcation ?? "";
  const glyphMeta = actuation ? getActuationGlyph(actuation.number) : null;
  const initialActuation = useMemo(() => {
    if (!cast || seed === null) return null;
    return deriveActuation(
      cast.arrayInitial,
      cast.contour,
      cast.inculcation,
      cast.transmutation
    );
  }, [cast]);
  const initialGlyphMeta = initialActuation
    ? getActuationGlyph(initialActuation.number)
    : null;
  const flipVariants = useMemo(() => {
    return {
      front: { rotateY: 0 },
      back: { rotateY: 180 },
    };
  }, []);

  const packet = useMemo(() => {
    if (!cast || seed === null) return null;
    return buildFatePacket(cast, seed);
  }, [cast, seed]);

  const expanded = useMemo(() => {
    if (!packet) return null;
    return composeReading(packet);
  }, [packet]);

  const mouth = useMemo(() => {
    if (!packet) return null;
    return composeMouthpiece(packet, question);
  }, [packet, question]);

  const tickerLines = useMemo(() => {
    if (!packet) return [] as string[];

    const lines: string[] = [];
    if (mouth?.line) lines.push(mouth.line);
    if (mouth?.aside) lines.push(mouth.aside);
    if (expanded?.prose.incitement) lines.push(expanded.prose.incitement);
    if (expanded?.prose.mechanism?.length) {
      expanded.prose.mechanism.forEach((line) => lines.push(`- ${line}`));
    }
    if (expanded?.prose.pressure) lines.push(expanded.prose.pressure);

    const seen = new Set<string>();
    const unique = lines.filter((line) => {
      const key = line.trim();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    return unique.slice(0, 8);
  }, [expanded, mouth, packet]);

  const handleRecast = () => {
    setIsFlipped(false);
    setIsWaking(true);

    const newSeed = Math.floor(Math.random() * 1e9);

    setTimeout(() => {
      setSeed(newSeed);
      setCast(runEngine());
      setIsWaking(false);
    }, 650); // ~half second feels right
  };

  const handleFlip = () => {
    if (!cast || seed === null) return;
    setIsFlipped(prev => !prev);
  };

  useEffect(() => {
    if (!cast || seed === null) return;
    const entry = {
      id: `${seed}:${cast.actuation.number}`,
      seed,
      timestamp: Date.now(),
      question: question.trim(),
      actuationNumber: cast.actuation.number,
      actuationName: cast.actuation.name,
      actuationFamily: cast.actuation.family,
      inculcation: cast.inculcation,
      arrayInitial: cast.arrayInitial,
      arrayFinal: cast.arrayFinal,
    };

    setHistory((prev) => {
      const next = [entry, ...prev].slice(0, 50);
      try {
        localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {
        // Ignore storage failures (private mode, quota, etc.)
      }
      return next;
    });
  }, [cast, question, seed]);

  const displayActuation = isFlipped ? initialActuation : actuation;
  const displayGlyphMeta = isFlipped ? initialGlyphMeta : glyphMeta;
  const formatInculcation = (value: string) => {
    return value
      .toLowerCase()
      .split("_")
      .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : ""))
      .join(" ")
      .trim();
  };
  const frameByline = isFlipped
    ? formatInculcation(inculcation)
    : displayActuation?.insight ?? "";

  return (
    <div className="landing-shell">
      <div className="machine">
        <div className="machine-top">
          <div>
            <div className="machine-kicker">Oragraphical Resonator</div>
            <div className="machine-title">Instrument of the Array</div>
          </div>
          <div className={`status-light${isWaking ? " is-waking" : cast ? " is-active" : ""}`}>
            <span className="status-label">Status</span>
          </div>
        </div>

        <div className="machine-body">
          <div className="viewport">
            <motion.div
              className={`viewport-frame${isFlipped ? " is-flipped" : ""}`}
              animate={isFlipped ? "back" : "front"}
              variants={flipVariants}
              transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
            >
              {displayActuation ? (
                <div className="viewport-face">
                  <div className="viewport-label">
                    {isFlipped ? "Inculcation Frame" : "Actuation Frame"}
                  </div>
                  {frameByline ? (
                    <div className="viewport-byline">{frameByline}</div>
                  ) : null}
                  <div className="viewport-stack">
                    {displayGlyphMeta ? (
                      <div className="glyph-ring">
                        <ActuationGlyph
                          number={displayActuation.number}
                          size={84}
                          className="drop-shadow-[0_0_15px_rgba(148,163,184,0.35)]"
                        />
                        <div className="glyph-mark-steam">{displayGlyphMeta.mark}</div>
                      </div>
                    ) : (
                      <div className="viewport-muted">Glyph unavailable</div>
                    )}
                    <div className="viewport-text">
                      <div className="viewport-title">
                        {displayActuation.number}. {displayActuation.name}
                      </div>
                      <div className="viewport-scroll">
                        <div className="viewport-body">
                          {displayActuation.directive}
                        </div>
                        {tickerLines.length ? (
                          <div className="viewport-reading">
                            <div className="viewport-divider">Output</div>
                            {tickerLines.map((line, index) => (
                              <div className="viewport-section" key={`${line}-${index}`}>
                                {line}
                              </div>
                            ))}
                          </div>
                        ) : null}
                        {expanded ? (
                          <div className="viewport-reading">
                            <div className="viewport-section">{expanded.prose.incitement}</div>
                            {expanded.prose.mechanism.map((line, index) => (
                              <div className="viewport-section" key={`${line}-${index}`}>- {line}</div>
                            ))}
                            <div className="viewport-section viewport-emphasis">
                              {expanded.prose.pressure}
                            </div>
                          </div>
                        ) : null}
                        {isFlipped && inculcation ? (
                          <div className="viewport-reading">
                            <div className="viewport-divider">Inculcation</div>
                            <div className="viewport-section">
                              {inculcation.replace(/_/g, " ")}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="viewport-face">
                  <div className="viewport-muted">
                    {isWaking ? "The machine stirs." : "Awaiting a query."}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

        </div>
      </div>

      <div className="console">
        <div className="console-label">Prompt Intake</div>
        <input
          className="console-input"
          value={question}
          onChange={(e) => setQuestion(e.currentTarget.value)}
          placeholder="Speak to the machine."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleRecast();
            }
          }}
        />

        <div className="action-row">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleRecast}
            className="action-button action-primary"
          >
            {cast ? "Recast Array" : "Begin Reading"}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleFlip}
            className="action-button action-ghost"
            disabled={!cast}
          >
            {isFlipped ? "Back to Actuation" : "See Inculcation Reading"}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
