import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ActuationGlyph } from "./ActuationGlyph";

interface OrbProps {
  show: boolean;
  actuationNumber: number;
}

export const Orb: React.FC<OrbProps> = ({ show, actuationNumber }) => {
  return (
    <div
      style={{
        position: "relative",
        width: "16rem",
        height: "16rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Background orb */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "999px",
          background:
            "radial-gradient(circle at 50% 50%, rgba(80,200,255,0.25) 0%, rgba(40,80,120,0.15) 40%, rgba(10,10,20,0.1) 70%, rgba(0,0,0,0.5) 100%)",
        }}
        initial={{ opacity: 0.2, scale: 0.9 }}
        animate={{
          opacity: show ? 0.5 : 0.2,
          scale: show ? 1 : 0.9,
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />

      {/* Ether flicker */}
      <AnimatePresence>
        {show && (
          <motion.div
            key="flicker"
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "999px",
              mixBlendMode: "screen",
              pointerEvents: "none",
              background:
                "repeating-radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 10%, rgba(0,0,0,0.2) 20%)",
              filter: "blur(6px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0.3, 0.8, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          />
        )}
      </AnimatePresence>

      {/* Glyph apparition */}
      <AnimatePresence>
        {show && (
          <motion.div
            key="glyph"
            style={{
              position: "relative",
              zIndex: 10,
              filter: "drop-shadow(0 0 15px rgba(0,200,255,0.7))",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0, 0.4, 0.7, 1],
              scale: [0.8, 0.9, 1.0, 1.05, 1.0],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* If ActuationGlyph has different props, we’ll tweak this after the first error */}
            <ActuationGlyph number={actuationNumber} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Soft aura */}
      {show && (
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "999px",
            pointerEvents: "none",
            background:
              "radial-gradient(circle, rgba(0,200,255,0.12), rgba(0,0,0,0))",
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.25, 0.45, 0.25],
            scale: [1.0, 1.1, 1.15, 1.1],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </div>
  );
};
