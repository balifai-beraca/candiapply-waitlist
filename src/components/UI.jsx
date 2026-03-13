// ─────────────────────────────────────────────────────────────────────────────
// components/UI.jsx — Composants UI réutilisables
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from "react";
import { B, AVATAR_EMOJIS } from "../constants";

// ── LOGO SVG ─────────────────────────────────────────────────────────────────
export function Logo({ size = 32, inverted = false }) {
  const ringColor = inverted ? "rgba(255,255,255,0.5)" : B.foreground;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="19" stroke={ringColor} strokeWidth="2.5" fill="none" />
        <path d="M30 20a10 10 0 1 1-10-10" stroke={B.primary} strokeWidth="3" strokeLinecap="round" fill="none" />
        <circle cx="30" cy="20" r="3.5" fill={B.primary} />
      </svg>
      <span style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: size * 0.56,
        fontWeight: 700,
        color: inverted ? "#fff" : B.foreground,
        letterSpacing: "-0.02em",
      }}>
        Candi<span style={{ color: B.primary }}>Apply</span>
      </span>
    </div>
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
      {/* Emojis superposés */}
      <div style={{ display: "flex" }}>
        {AVATAR_EMOJIS.map((emoji, i) => (
          <div
            key={i}
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: B.accent,
              border: `2px solid ${B.card}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              marginLeft: i === 0 ? 0 : -9,
              zIndex: AVATAR_EMOJIS.length - i,
              boxShadow: "0 1px 3px rgba(0,0,0,0.10)",
            }}
          >
            {emoji}
          </div>
        ))}
      </div>
      {/* Texte */}
      <span style={{ fontSize: 13, color: B.muted, fontFamily: "'Inter', sans-serif" }}>
        <strong style={{ color: B.foreground, fontWeight: 600 }}>
          <LiveCounter value={count} />
        </strong>{" "}
        personnes déjà inscrites
      </span>
    </div>
  );
}

// ── PILL BADGE ────────────────────────────────────────────────────────────────
export function Pill({ children, dot = false }) {
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      background: B.accent,
      color: B.primary,
      border: `1px solid ${B.primary}28`,
      borderRadius: 100,
      padding: "5px 14px",
      fontSize: 12,
      fontWeight: 600,
      fontFamily: "'Inter', sans-serif",
    }}>
      {dot && (
        <span style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: B.green,
          display: "inline-block",
          animation: "blink 2s infinite",
        }} />
      )}
      {children}
    </span>
  );
}

// ── SECTION LABEL ─────────────────────────────────────────────────────────────
export function SLabel({ children }) {
  return (
    <p style={{
      fontSize: 11,
      fontWeight: 600,
      color: B.primary,
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      margin: "0 0 12px",
      fontFamily: "'Inter', sans-serif",
    }}>
      {children}
    </p>
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
        border: `1px solid ${hovered ? B.primary + "40" : B.border}`,
        borderRadius: B.radius,
        padding: "22px",
        transition: "all 0.2s",
        animation: `fadeUp 0.5s ease ${delay}s both`,
        position: "relative",
        boxShadow: hovered ? B.shadowCard : "none",
        cursor: "default",
      }}
    >
      {/* Badge "Bientôt" */}
      {soon && (
        <span style={{
          position: "absolute",
          top: 14,
          right: 14,
          fontSize: 10,
          fontWeight: 600,
          background: "#FEF3C7",
          color: "#92400E",
          border: "1px solid #FDE68A",
          borderRadius: 20,
          padding: "2px 8px",
          fontFamily: "'Inter', sans-serif",
        }}>
          Bientôt
        </span>
      )}

      {/* Icône */}
      <div style={{
        width: 46,
        height: 46,
        borderRadius: 12,
        background: `${color}18`,
        border: `1.5px solid ${color}45`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 24,
        marginBottom: 14,
        boxShadow: `0 2px 10px ${color}25`,
      }}>
        {icon}
      </div>

      {/* Titre en bleu */}
      <div style={{
        fontSize: 14,
        fontWeight: 700,
        color: B.primary,
        marginBottom: 6,
        fontFamily: "'Space Grotesk', sans-serif",
      }}>
        {title}
      </div>

      {/* Description */}
      <div style={{ fontSize: 13, color: B.muted, lineHeight: "1.65", fontFamily: "'Inter', sans-serif" }}>
        {desc}
      </div>
    </div>
  );
}

// ── STEP (journée) ────────────────────────────────────────────────────────────
export function Step({ icon, color, title, desc, isLast = false, delay = 0 }) {
  return (
    <div style={{ display: "flex", gap: 16, animation: `fadeUp 0.5s ease ${delay}s both` }}>
      {/* Icône + ligne verticale */}
      <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: `${color}12`,
          border: `2px solid ${color}30`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 19,
        }}>
          {icon}
        </div>
        {!isLast && (
          <div style={{ width: 2, flex: 1, minHeight: 20, background: B.border, marginTop: 4, marginBottom: 4 }} />
        )}
      </div>

      {/* Carte */}
      <div style={{ flex: 1, paddingBottom: isLast ? 0 : 20 }}>
        <div style={{
          background: B.card,
          border: `1px solid ${B.border}`,
          borderRadius: B.radius,
          padding: "16px 20px",
          boxShadow: B.shadowCard,
        }}>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 15,
            fontWeight: 700,
            color: B.foreground,
            marginBottom: 6,
          }}>
            {title}
          </div>
          <p style={{ fontSize: 13, color: B.muted, margin: 0, lineHeight: "1.65", fontFamily: "'Inter', sans-serif" }}>
            {desc}
          </p>
        </div>
      </div>
    </div>
  );

}
