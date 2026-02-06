import React, { useEffect, useState } from "react";
import { Orb } from "./components/Orb";

export default function App() {
  const [showOrb, setShowOrb] = useState(false);

  // For now, we hardcode a known actuation number.
  // Later, we’ll pipe in whatever the engine returns.
  const actuationNumber = 24;

  useEffect(() => {
    const timer = setTimeout(() => setShowOrb(true), 1200);
    return () => clearTimeout(timer);
  }, []);

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
        <Orb show={showOrb} actuationNumber={actuationNumber} />

        <div>
          <p
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#9ca3af",
              marginBottom: "0.4rem",
            }}
          >
            Inculcated Contour Array
          </p>
          <h1
            style={{
              fontSize: "1.6rem",
              marginBottom: "0.25rem",
            }}
          >
            24. Central Bearing
          </h1>
          <p
            style={{
              fontSize: "0.9rem",
              color: "#d1d5db",
              marginBottom: "1rem",
            }}
          >
            The situation demands a stable center; things rotate around a core.
          </p>
          <p
            style={{
              fontSize: "0.85rem",
              color: "#a5b4fc",
            }}
          >
            <span
              style={{
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "#6b7280",
              }}
            >
              Directive:
            </span>{" "}
            Decide what the center is—and defend it.
          </p>
        </div>
      </div>
    </div>
  );
}
