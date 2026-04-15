// ─────────────────────────────────────────────────────────────────────────────
// components/UI.jsx — Composants UI réutilisables
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from "react";
import { B, AVATAR_EMOJIS } from "../constants";

const ease = "cubic-bezier(0.22,1,0.36,1)";

// ── LOGO ─────────────────────────────────────────────────────────────────────
export function Logo({ size = 32, inverted = false }) {
  const height = size;
  const src = inverted ? "/logo-dark.png" : "/logo-light.png";
  return (
    <img
      src={src}
      alt="CandiApply"
      style={{ height: height, width: "auto", display: "block" }}
    />
  );
}

// ── LIVE COUNTER (animation tick) ────────────────────────────────────────────
export function LiveCounter({ value }) {
  const [displayed, setDisplayed] = useState(value);
  const prev = useRef(value);

  useEffect(() => {
    if (value === prev.current) return;
    let current = prev.current;
    const dir = value > current ? 1 : -1;
    const timer = setInterval(() => {
      current += dir;
      setDisplayed(current);
      if (current === value) {
        clearInterval(timer);
        prev.current = value;
      }
    }, 22);
    return () => clearInterval(timer);
  }, [value]);

  return <>{displayed.toLocaleString("fr-FR")}</>;
}

// ── AVATAR STACK ─────────────────────────────────────────────────────────────
export function Avatars({ count }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ display: "flex" }}>
        {AVATAR_EMOJIS.map((emoji, i) => (
          <div
            key={i}
            style={{
              width: 30, height: 30, borderRadius: "50%",
              background: B.accent, border: `2px solid ${B.card}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, marginLeft: i === 0 ? 0 : -9,
              zIndex: AVATAR_EMOJIS.length - i,
            }}
          >
            {emoji}
          </div>
        ))}
      </div>
      <span style={{ fontSize: 13, color: B.muted, fontFamily: "'Inter', sans-serif" }}>
        <strong style={{ color: B.tx2, fontWeight: 600 }}>
          <LiveCounter value={count} />
        </strong>{" "}
        personnes déjà inscrites
      </span>
    </div>
  );
}

// ── PILL BADGE ────────────────────────────────────────────────────────────────
export function Pill({ children, dot = false, dark = false }) {
  const bg = dark ? "rgba(17,146,208,0.1)" : B.accent;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      background: bg, color: B.primary,
      border: "1px solid rgba(17,146,208,0.18)",
      borderRadius: 9999, padding: "6px 16px",
      fontSize: 13, fontWeight: 600,
      fontFamily: "'Inter', sans-serif",
    }}>
      {dot && (
        <span style={{ position: "relative", display: "inline-flex", width: 8, height: 8 }}>
          <span style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            background: B.primary, opacity: 0.75,
            animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite",
          }} />
          <span style={{
            position: "relative", display: "inline-flex",
            width: 8, height: 8, borderRadius: "50%", background: B.primary,
          }} />
        </span>
      )}
      {children}
    </span>
  );
}

// ── SECTION LABEL ─────────────────────────────────────────────────────────────
export function SLabel({ children, dark = false }) {
  return (
    <span style={{
      display: "inline-block",
      background: dark ? "rgba(17,146,208,0.1)" : B.accent,
      color: B.primary,
      fontSize: 11, fontWeight: 700,
      padding: "5px 13px", borderRadius: 9999,
      letterSpacing: "0.04em", textTransform: "uppercase",
      fontFamily: "'Inter', sans-serif",
      marginBottom: 14,
    }}>
      {children}
    </span>
  );
}

// ── FEATURE CARD ──────────────────────────────────────────────────────────────
export function FeatureCard({ icon, color = B.primary, title, desc, soon = false, delay = 0 }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: B.card,
        border: `1px solid ${hovered ? "rgba(17,146,208,0.25)" : B.border}`,
        borderRadius: B.radiusLg,
        padding: "24px",
        transition: `all 0.2s ${ease}`,
        animation: `fadeUp 0.5s ${ease} ${delay}s both`,
        position: "relative",
        boxShadow: hovered ? `${B.shadowCard}, 0 0 0 2px rgba(17,146,208,0.12)` : B.shadowCard,
        cursor: "default",
      }}
    >
      {soon && (
        <span style={{
          position: "absolute", top: 14, right: 14,
          fontSize: 10, fontWeight: 700,
          background: "#FEF3C7", color: "#92400E",
          border: "1px solid #FDE68A", borderRadius: 9999,
          padding: "2px 8px", fontFamily: "'Inter', sans-serif",
          letterSpacing: "0.04em", textTransform: "uppercase",
        }}>
          Bientôt
        </span>
      )}

      <div style={{
        width: 48, height: 48, borderRadius: B.radius,
        background: `${color}18`, border: `1.5px solid ${color}40`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 24, marginBottom: 16,
      }}>
        {icon}
      </div>

      <div style={{
        fontSize: 17, fontWeight: 700, color: B.foreground,
        marginBottom: 8, fontFamily: "'Syne', sans-serif", lineHeight: 1.3,
      }}>
        {title}
      </div>

      <div style={{ fontSize: 14, color: B.muted, lineHeight: "1.65", fontFamily: "'Inter', sans-serif" }}>
        {desc}
      </div>
    </div>
  );
}

// ── STEP (journée) ────────────────────────────────────────────────────────────
export function Step({ icon, color, title, desc, isLast = false, delay = 0 }) {
  return (
    <div style={{ display: "flex", gap: 16, animation: `fadeUp 0.5s ${ease} ${delay}s both` }}>
      <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{
          width: 48, height: 48, borderRadius: "50%",
          background: `${color}12`, border: `2px solid ${color}30`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 20,
        }}>
          {icon}
        </div>
        {!isLast && (
          <div style={{ width: 2, flex: 1, minHeight: 20, background: B.border, marginTop: 4, marginBottom: 4 }} />
        )}
      </div>

      <div style={{ flex: 1, paddingBottom: isLast ? 0 : 20 }}>
        <div style={{
          background: B.card, border: `1px solid ${B.border}`,
          borderRadius: B.radius, padding: "16px 20px",
          boxShadow: B.shadowCard,
        }}>
          <div style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 16, fontWeight: 700, color: B.foreground, marginBottom: 6,
          }}>
            {title}
          </div>
          <p style={{ fontSize: 14, color: B.muted, margin: 0, lineHeight: "1.65", fontFamily: "'Inter', sans-serif" }}>
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
}
