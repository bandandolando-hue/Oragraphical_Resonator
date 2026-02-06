import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Orb } from "./components/Orb";
import { ActuationGlyph } from "./components/ActuationGlyph";
import { buildFatePacket, runEngine } from "./backend/engine";
import type { EngineResult } from "./backend/engine/types";
import { deriveActuation } from "./backend/engine/actuation";
import { getActuationGlyph } from "./lib/glyphs";
import { composeReading } from "./backend/engine/composeReading";
import { composeMouthpiece } from "./backend/engine/mouthpiece";

export default function App() {
  const [isWaking, setIsWaking] = useState(false);
  const [cast, setCast] = useState<EngineResult | null>(null);
  const [showOrb, setShowOrb] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [seed, setSeed] = useState<number | null>(null);
  const [question, setQuestion] = useState("");

  // Restart the apparition animation every time we generate a new cast.
  useEffect(() => {
    if (!cast || seed === null) return;
    setShowOrb(false);
    const timer = setTimeout(() => setShowOrb(true), 900);
    return () => clearTimeout(timer);
  }, [cast]);

  const actuation = cast?.actuation;
  const arrayInitial = cast?.arrayInitial ?? [];
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
  
  const expanded = useMemo(() => {
    if (!cast || seed === null) return null;
    const packet = buildFatePacket(cast, seed);
    return composeReading(packet);
  }, [cast, seed]);

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

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#050710",
        color: "#e5e7eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, sans-serif",
        padding: "2rem",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto minmax(0, 1.1fr)",
          gap: "2.5rem",
          alignItems: "center",
          maxWidth: "960px",
          width: "100%",
        }}
      >
        {actuation ? <Orb show={showOrb} actuationNumber={actuation.number} /> : null}
        {/* QUERY INPUT: paste this block */}
        <div style={{ width: "100%", maxWidth: "520px" }}>
          <div
            style={{
             fontSize: "0.7rem",
             letterSpacing: "0.22em",
             textTransform: "uppercase",
             color: "#9ca3af",
             marginBottom: "0.4rem",
           }}
          >
           Query
          </div>

          <input
          {mouth ? (
  <div
    style={{
      marginTop: "0.75rem",
      padding: "0.85rem 0.95rem",
      borderRadius: "0.85rem",
      border: "1px solid rgba(148,163,184,0.18)",
      background: "rgba(2,6,23,0.55)",
      boxShadow: "inset 0 0 22px rgba(59,130,246,0.10)",
    }}
  >
    <div
      style={{
        fontSize: "0.7rem",
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: "#94a3b8",
        marginBottom: "0.35rem",
      }}
    >
      Mouthpiece
    </div>
    <div style={{ fontSize: "0.95rem", lineHeight: 1.55, color: "#e5e7eb" }}>
      {mouth.line}
    </div>
    {mouth.aside ? (
      <div style={{ marginTop: "0.4rem", fontSize: "0.9rem", lineHeight: 1.5, color: "#cbd5f5", opacity: 0.9 }}>
        {mouth.aside}
      </div>
    ) : null}
  </div>
) : null}
          value={question}
           onChange={(e) => setQuestion((e.target as HTMLInputElement).value)}
           placeholder="What are you asking the machine?"
           style={{
            width: "100%",
            padding: "0.7rem 0.85rem",
            borderRadius: "0.55rem",
            border: "1px solid rgba(75, 85, 99, 0.9)",
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            color: "#e5e7eb",
            fontSize: "0.95rem",
            outline: "none",
          }}
        />
       </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div
            style={{
              perspective: "1200px",
              width: "100%",
              maxWidth: "420px",
              margin: "0 auto",
            }}
          >
            <motion.div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "3 / 4",
                transformStyle: "preserve-3d",
              }}
              animate={isFlipped ? "back" : "front"}
              variants={flipVariants}
              transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
            >
              {cast ? (
                <>
                  {/* Front face: final actuation card */}
                  <motion.div
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "32px",
                      padding: "2rem",
                      background:
                        "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(59,7,100,0.85))",
                      border: "1px solid rgba(148,163,184,0.2)",
                      boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      visibility: isFlipped ? "hidden" : "visible",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      color: "#f8fafc",
                    }}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span
                        style={{
                          fontSize: "0.65rem",
                          letterSpacing: "0.3em",
                          textTransform: "uppercase",
                          color: "#a5b4fc",
                        }}
                      >
                        Actuation
                      </span>
                      <span style={{ fontSize: "0.7rem", color: "#94a3b8" }}>Front</span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
                      {glyphMeta ? (
                        <>
                          <motion.div
                            key={`glyph-${actuation?.number}`}
                            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                          >
                            <ActuationGlyph
                              number={actuation!.number}
                              size={96}
                              className="drop-shadow-[0_0_25px_rgba(59,130,246,0.45)]"
                            />
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                            style={{
                              width: "72px",
                              height: "72px",
                              borderRadius: "50%",
                              border: "1px solid rgba(148,163,184,0.4)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "2rem",
                              color: "#cbd5f5",
                              textShadow: "0 0 20px rgba(59,130,246,0.5)",
                            }}
                          >
                            {glyphMeta.mark}
                          </motion.div>
                        </>
                      ) : (
                        <div style={{ fontSize: "0.85rem", color: "#e2e8f0" }}>
                          Glyph unavailable
                        </div>
                      )}
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      style={{ minHeight: 0 }}
                    >
                      <h1
                        style={{
                          fontSize: "1.6rem",
                          marginBottom: "0.6rem",
                        }}
                      >
                        {actuation?.number}. {actuation?.name}
                      </h1>
                      <p
                        style={{
                          fontSize: "0.95rem",
                          color: "#cbd5f5",
                          lineHeight: 1.5,
                        }}
                      >
                        {actuation?.directive}
                      </p>
                    </motion.div>

                    {expanded ? (
                      <div style={{ marginTop: "1rem", minHeight: 0 }}>
                        <p
                          style={{
                            fontSize: "0.7rem",
                            letterSpacing: "0.22em",
                            textTransform: "uppercase",
                            color: "#94a3b8",
                            marginBottom: "0.5rem",
                          }}
                        >
                          Oracle
                        </p>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                            fontSize: "0.9rem",
                            lineHeight: 1.5,
                            color: "#e5e7eb",
                            maxHeight: "140px",
                            overflow: "auto",
                          }}
                        >
                          <div>{expanded.prose.incitement}</div>

                          {expanded.prose.mechanism.map((m, i) => (
                            <div key={i}>- {m}</div>
                          ))}

                          <div style={{ color: "#c7d2fe" }}>{expanded.prose.pressure}</div>
                        </div>
                      </div>
                    ) : null}
                  </motion.div>

                  {/* Back face: array state at inculcation */}
                  <motion.div
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "32px",
                      padding: "2rem",
                      background:
                        "linear-gradient(135deg, rgba(2,6,23,0.95), rgba(15,23,42,0.85))",
                      border: "1px solid rgba(148,163,184,0.2)",
                      boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      visibility: isFlipped ? "visible" : "hidden",
                      overflow: "hidden",
                      transform: "rotateY(180deg)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      color: "#e2e8f0",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                      <span style={{ fontSize: "0.7rem", color: "#94a3b8" }}>Back</span>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginTop: "0.75rem" }}>
                        {initialActuation && initialGlyphMeta ? (
                          <>
                            <ActuationGlyph
                              number={initialActuation.number}
                              size={88}
                              className="drop-shadow-[0_0_20px_rgba(59,130,246,0.35)]"
                            />
                            <div
                              style={{
                                width: "60px",
                                height: "60px",
                                borderRadius: "50%",
                                border: "1px solid rgba(148,163,184,0.4)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "1.6rem",
                                color: "#cbd5f5",
                                textShadow: "0 0 18px rgba(59,130,246,0.45)",
                              }}
                            >
                              {initialGlyphMeta.mark}
                            </div>
                          </>
                        ) : (
                          <div style={{ fontSize: "0.85rem", color: "#e2e8f0" }}>
                            Glyph unavailable
                          </div>
                        )}
                      </div>

                      {initialActuation ? (
                        <div style={{ marginTop: "0.9rem" }}>
                          <div style={{ fontSize: "1.1rem", color: "#e2e8f0", marginBottom: "0.4rem" }}>
                            {initialActuation.number}. {initialActuation.name}
                          </div>
                          <div style={{ fontSize: "0.9rem", color: "#cbd5f5", lineHeight: 1.5 }}>
                            {initialActuation.directive}
                          </div>
                        </div>
                      ) : null}

                      <div
                        style={{
                          fontSize: "0.65rem",
                          letterSpacing: "0.3em",
                          textTransform: "uppercase",
                          color: "#94a3b8",
                          marginTop: "1.1rem",
                        }}
                      >
                        Inculcation
                      </div>
                      <div
                        style={{
                          fontSize: "0.85rem",
                          color: "#c7d2fe",
                          marginBottom: "1.1rem",
                          marginTop: "0.5rem",
                        }}
                      >
                        {inculcation.replace(/_/g, " ")}
                      </div>
                    </motion.div>

                    <motion.p
                      style={{ fontSize: "0.8rem", color: "#94a3b8" }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                    >
                      Captured at the moment of inculcation, before any transmutation influence.
                    </motion.p>
                  </motion.div>
                </>
              ) : (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "32px",
                    padding: "2rem",
                    background:
                      "linear-gradient(135deg, rgba(2,6,23,0.95), rgba(15,23,42,0.85))",
                    border: "1px solid rgba(148,163,184,0.2)",
                    boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    color: "#e2e8f0",
                  }}
                >
                  {!cast && !isWaking && (
                    <>
                      <div style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#94a3b8", marginBottom: "0.8rem" }}>
                        Awaiting Query
                      </div>
                      <div style={{ fontSize: "1.1rem", color: "#cbd5f5", marginBottom: "1rem" }}>
                        Ask a question, then cast the array.
                      </div>
                    </>
                  )}
                  {isWaking && (
                    <div style={{ fontSize: "1.1rem", color: "#cbd5f5", marginBottom: "1rem", opacity: 0.85 }}>
                      The machine stirs.
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleRecast}
              style={{
                flex: "1 1 160px",
                padding: "0.65rem 1.25rem",
                borderRadius: "999px",
                border: "1px solid #334155",
                background: "linear-gradient(90deg, #0ea5e9, #6366f1)",
                color: "#f8fafc",
                fontSize: "0.85rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              {cast ? "Recast Array" : "Begin Reading"}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleFlip}
              style={{
                flex: "1 1 120px",
                padding: "0.65rem 1.25rem",
                borderRadius: "999px",
                border: "1px solid #475569",
                background: isFlipped ? "rgba(15,23,42,0.9)" : "rgba(15,23,42,0.6)",
                color: "#e2e8f0",
                fontSize: "0.85rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: cast ? "pointer" : "not-allowed",
                opacity: cast ? 1 : 0.5,
              }}
            >
              {isFlipped ? "Show Actuation" : "Show Inculcation"}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
