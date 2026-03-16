// ─────────────────────────────────────────────────────────────────────────────
// components/WaitlistForm.jsx — Formulaire d'inscription (RESPONSIVE FIX)
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import { B, ROLE_OPTIONS, WAITLIST_CONFIG } from "../constants";
import { addToWaitlist } from "../lib/supabase";

// ── Chargement du script Tally (une seule fois) ───────────────────────────────
function useTallyScript() {
  useEffect(() => {
    if (document.querySelector('script[src="https://tally.so/widgets/embed.js"]')) return;
    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
}

// ── HOOK RESPONSIVE ───────────────────────────────────────────────────────────
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);
  return isMobile;
}

const inputStyle = {
  width: "100%",
  padding: "11px 14px",
  borderRadius: B.radius,
  fontSize: 14,
  border: `1.5px solid ${B.border}`,
  background: B.card,
  color: B.foreground,
  fontFamily: "'Inter', sans-serif",
  outline: "none",
  transition: "border-color 0.18s",
  boxSizing: "border-box",
};

export function WaitlistForm({ onSuccess }) {
  const isMobile = useIsMobile();
  useTallyScript();

  const [firstName, setFirstName] = useState("");
  const [email,     setEmail]     = useState("");
  const [role,      setRole]      = useState("");
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");
  const [success,   setSuccess]   = useState(false);
  const [position,  setPosition]  = useState(null);
  const [otherRole, setOtherRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstName.trim()) { setError("Ton prénom est requis 👋"); return; }
    if (!email.includes("@")) { setError("Adresse email invalide."); return; }
    setError("");
    setLoading(true);
    try {
      const finalRole = role === "Autres (préciser)" ? `Autre : ${otherRole}` : role;
      const pos = await addToWaitlist({ firstName, email, role: finalRole });
      setPosition(pos);
      setSuccess(true);
      onSuccess?.(pos);
    } catch (err) {
      setError(err.message || "Une erreur est survenue. Réessaie.");
    } finally {
      setLoading(false);
    }
  };

  // ── État succès ─────────────────────────────────────────────────────────
  if (success) {
    return (
      <div style={{
        textAlign: "center", padding: "28px 16px",
        background: "#F0FDF4", border: "1px solid #BBF7D0",
        borderRadius: B.radius, animation: "fadeUp 0.4s ease",
      }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🎉</div>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, color: B.foreground, marginBottom: 8 }}>
          Bienvenue {firstName} !
        </div>
        <p style={{ fontSize: 13, color: B.muted, lineHeight: "1.65", marginBottom: 18, fontFamily: "'Inter', sans-serif" }}>
          Tu es la{" "}
          <strong style={{ color: B.green, fontSize: 17 }}>
            #{(position + WAITLIST_CONFIG.baseCount)?.toLocaleString("fr-FR")}
          </strong>{" "}
          personne sur la liste.<br />
          Confirmation envoyée à <strong style={{ color: B.foreground }}>{email}</strong>
        </p>

        {/* Bouton questionnaire Tally */}
        <button
          data-tally-open="44jKYB"
          data-tally-emoji-text="👋"
          data-tally-emoji-animation="wave"
          style={{
            width: "100%", padding: "12px", borderRadius: B.radius,
            background: B.primary, color: "#fff", border: "none",
            fontSize: 14, fontWeight: 700, cursor: "pointer",
            fontFamily: "'Space Grotesk', sans-serif",
            boxShadow: B.shadowCard, marginBottom: 12,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}
        >
          📋 Répondre au questionnaire (2 min)
        </button>
        <p style={{ fontSize: 11, color: B.muted, marginBottom: 16, fontFamily: "'Inter', sans-serif" }}>
          Aide-nous à construire l'outil dont tu as vraiment besoin 💙
        </p>

        {/* Partage */}
        <div style={{ background: B.card, border: `1px solid ${B.border}`, borderRadius: B.radius, padding: "12px 16px" }}>
          <p style={{ fontSize: 12, color: B.muted, marginBottom: 8, fontFamily: "'Inter', sans-serif" }}>
            📣 Partage pour monter dans la liste
          </p>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
            {[
              ["𝕏 Twitter",  "#1DA1F2", `https://twitter.com/intent/tweet?text=Je%20viens%20de%20rejoindre%20la%20waitlist%20de%20CandiApply%20!%20%F0%9F%9A%80%20candiapply.fr`],
              ["💼 LinkedIn", "#0A66C2", `https://www.linkedin.com/sharing/share-offsite/?url=https://candiapply.fr`],
            ].map(([label, color, url]) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "7px 16px", borderRadius: 8,
                  background: `${color}12`, border: `1px solid ${color}30`,
                  color, fontSize: 12, fontWeight: 600, cursor: "pointer",
                  fontFamily: "'Inter', sans-serif", textDecoration: "none",
                }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Formulaire ──────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>

      {/* Prénom + Email — colonne unique sur mobile, côte à côte sur desktop */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        gap: 10,
      }}>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Ton prénom"
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = B.primary)}
          onBlur={(e)  => (e.target.style.borderColor = B.border)}
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ton@email.com"
          type="email"
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = B.primary)}
          onBlur={(e)  => (e.target.style.borderColor = B.border)}
        />
      </div>

      {/* Profil */}
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={{ ...inputStyle, color: role ? B.foreground : B.muted }}
      >
        <option value="">Ton profil (optionnel)</option>
        {ROLE_OPTIONS.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>

      {/* Champ libre si "Autre" */}
      {role.startsWith("Autres") && (
        <input
          value={otherRole}
          onChange={(e) => setOtherRole(e.target.value)}
          placeholder="Précise ton profil..."
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = B.primary)}
          onBlur={(e)  => (e.target.style.borderColor = B.border)}
        />
      )}

      {/* Message d'erreur */}
      {error && (
        <div style={{
          fontSize: 12, color: "#991B1B",
          background: "#FEF2F2", border: "1px solid #FECACA",
          borderRadius: 8, padding: "8px 12px",
          fontFamily: "'Inter', sans-serif",
        }}>
          ⚠️ {error}
        </div>
      )}

      {/* Bouton submit */}
      <button
        type="submit"
        disabled={loading}
        style={{
          padding: "13px", borderRadius: B.radius, border: "none",
          background: loading ? B.muted : B.primary,
          color: "#fff", fontSize: 14, fontWeight: 700,
          cursor: loading ? "not-allowed" : "pointer",
          fontFamily: "'Space Grotesk', sans-serif",
          boxShadow: loading ? "none" : B.shadowCard,
          transition: "all 0.2s", marginTop: 2,
        }}
      >
        {loading ? (
          <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <span style={{
              width: 14, height: 14,
              border: "2px solid rgba(255,255,255,0.3)",
              borderTop: "2px solid #fff",
              borderRadius: "50%",
              animation: "spin 0.7s linear infinite",
              display: "inline-block",
            }} />
            Inscription…
          </span>
        ) : (
          "Rejoindre la liste d'attente →"
        )}
      </button>

      {/* Trust badges */}
      <div style={{ display: "flex", gap: isMobile ? 12 : 20, justifyContent: "center", marginTop: 2, flexWrap: "wrap" }}>
        {["✓ Gratuit", "✓ Sans engagement", "✓ RGPD 🇫🇷"].map((t) => (
          <span key={t} style={{ fontSize: 11, color: B.muted, fontWeight: 500, fontFamily: "'Inter', sans-serif" }}>
            {t}
          </span>
        ))}
      </div>
    </form>
  );
}