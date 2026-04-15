// ─────────────────────────────────────────────────────────────────────────────
// pages/LandingPage.jsx — Landing page waitlist CandiApply · Design system v2
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from "react";
import { B, WAITLIST_CONFIG, MARQUEE_ITEMS, PROBLEMS, FEATURES, STEPS } from "../constants";
import { getWaitlistCount } from "../lib/supabase";
import { Logo, LiveCounter, Avatars, Pill, SLabel, FeatureCard, Step } from "../components/UI";
import { WaitlistForm } from "../components/WaitlistForm";

const ease = "cubic-bezier(0.22,1,0.36,1)";

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

// ── GLOBAL STYLES ─────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  @keyframes fadeUp  { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes spin    { to { transform: rotate(360deg); } }
  @keyframes blink   { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
  @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  @keyframes ping    { 75%, 100% { transform: scale(2); opacity: 0; } }
  input::placeholder  { color: #93BBCC; font-family: 'Inter', sans-serif; }
  select option       { color: #001935; background: #fff; }
  button:hover:not(:disabled) { filter: brightness(0.93); }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12); border-radius: 4px; }
`;

// ── NAVBAR ────────────────────────────────────────────────────────────────────
function Navbar({ count, onSignup, onDemo, scrolled }) {
  const isMobile = useIsMobile();

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      height: 64, padding: isMobile ? "0 16px" : "0 40px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(255,255,255,0.9)" : B.background,
      borderBottom: `1px solid ${scrolled ? "rgba(0,0,0,0.07)" : "transparent"}`,
      backdropFilter: scrolled ? "blur(20px)" : "none",
      boxShadow: scrolled ? B.shadowNav : "none",
      transition: `all 0.25s ${ease}`,
    }}>
      <Logo size={40} />

      <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 8 : 12 }}>
        {/* Compteur live */}
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: isMobile ? "5px 8px" : "5px 12px",
          borderRadius: 9999, background: B.accent,
          border: "1px solid rgba(17,146,208,0.2)",
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: B.green, display: "inline-block", animation: "blink 2s infinite", flexShrink: 0 }} />
          <span style={{ fontSize: 11, color: B.primary, fontWeight: 600, fontFamily: "'Inter', sans-serif", whiteSpace: "nowrap" }}>
            <LiveCounter value={count} /> inscrits
          </span>
        </div>

        {!isMobile && (
          <button onClick={onDemo} style={{
            padding: "8px 16px", borderRadius: B.radius,
            border: `1px solid ${B.border}`, background: B.card,
            color: B.muted, fontSize: 13, fontWeight: 500,
            cursor: "pointer", fontFamily: "'Inter', sans-serif",
            transition: `color 0.2s ${ease}`,
          }}>
            Voir une démo
          </button>
        )}

        <button onClick={onSignup} style={{
          padding: isMobile ? "8px 14px" : "8px 20px",
          borderRadius: B.radiusMd, border: "none",
          background: B.primary, color: "#fff",
          fontSize: isMobile ? 12 : 13, fontWeight: 600,
          cursor: "pointer", fontFamily: "'Inter', sans-serif",
          boxShadow: B.shadowCard, whiteSpace: "nowrap",
          transition: `all 0.2s ${ease}`,
        }}>
          S'inscrire
        </button>
      </div>
    </nav>
  );
}

// ── HERO ──────────────────────────────────────────────────────────────────────
function Hero({ count, onSignup, onDemo }) {
  const isMobile = useIsMobile();

  return (
    <section style={{
      paddingTop: isMobile ? 96 : 120,
      paddingBottom: isMobile ? 56 : 80,
      paddingLeft: 24, paddingRight: 24,
      textAlign: "center", position: "relative", overflow: "hidden",
      background: `
        radial-gradient(ellipse 70% 50% at 25% 50%, rgba(17,146,208,0.06) 0%, transparent 70%),
        radial-gradient(ellipse 50% 40% at 75% 60%, rgba(16,185,129,0.04) 0%, transparent 70%),
        ${B.background}
      `,
    }}>
      {/* Dot grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)",
        backgroundSize: "36px 36px",
        WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black 30%, transparent 70%)",
        maskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black 30%, transparent 70%)",
      }} />

      <div style={{ position: "relative", maxWidth: 760, margin: "0 auto" }}>
        {/* Badge avec ping animé */}
        <div style={{ marginBottom: 24, animation: `fadeUp 0.6s ${ease} 0.05s both` }}>
          <Pill dot>Bêta ouverte · Marché français</Pill>
        </div>

        {/* H1 — Syne 800 */}
        <h1 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: isMobile ? "clamp(26px,7vw,36px)" : "clamp(36px,4.5vw,48px)",
          fontWeight: 800, lineHeight: 1.05,
          letterSpacing: "-0.05em", color: B.foreground,
          margin: "0 0 22px", animation: `fadeUp 0.7s ${ease} 0.1s both`,
        }}>
          Trouve ton prochain emploi<br />
          <span style={{ color: B.primary }}>sans passer des heures à chercher</span>
        </h1>

        {/* Sous-titre */}
        <p style={{
          fontSize: 17, color: B.muted,
          lineHeight: 1.72, maxWidth: 500, margin: "0 auto 30px",
          animation: `fadeUp 0.7s ${ease} 0.15s both`,
        }}>
          CandiApply analyse ton profil, détecte les offres qui te correspondent, personnalise tes candidatures et te prépare aux entretiens —{" "}
          <strong style={{ color: B.tx2 }}>tout en un, chaque matin.</strong>
        </p>

        {/* Social proof */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 30, animation: `fadeUp 0.7s ${ease} 0.2s both` }}>
          <Avatars count={count} />
        </div>

        {/* CTAs */}
        <div style={{
          display: "flex", gap: 12, justifyContent: "center",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          marginBottom: 14, animation: `fadeUp 0.7s ${ease} 0.25s both`,
          padding: isMobile ? "0 16px" : 0,
        }}>
          <button onClick={onSignup} style={{
            padding: "13px 28px", borderRadius: B.radiusMd,
            border: "none", background: B.primary, color: "#fff",
            fontSize: 15, fontWeight: 600, cursor: "pointer",
            fontFamily: "'Inter', sans-serif",
            boxShadow: B.shadowElev,
            width: isMobile ? "100%" : "auto",
            transition: `all 0.2s ${ease}`,
          }}>
            Commencer maintenant →
          </button>
          <button onClick={onDemo} style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            padding: "13px 20px", borderRadius: B.radiusMd,
            border: "none", background: "transparent",
            color: B.tx2, fontSize: 15, fontWeight: 500,
            cursor: "pointer", fontFamily: "'Inter', sans-serif",
            width: isMobile ? "100%" : "auto",
            transition: `color 0.2s ${ease}`,
          }}>
            <span style={{ width: 32, height: 32, borderRadius: "50%", background: B.accent, display: "flex", alignItems: "center", justifyContent: "center", color: B.primary, fontSize: 12, flexShrink: 0 }}>▶</span>
            Voir une démo
          </button>
        </div>

        <p style={{ fontSize: 12, color: B.muted, animation: `fadeUp 0.7s ${ease} 0.3s both`, fontFamily: "'Inter', sans-serif" }}>
          Accès prioritaire · Gratuit · Sans engagement · RGPD 🇫🇷
        </p>
      </div>

      {!isMobile && <AppPreview />}
    </section>
  );
}

// ── APP PREVIEW (mini dashboard) ──────────────────────────────────────────────
function AppPreview() {
  const offers = [
    { company: "Qonto",     role: "Product Owner", score: "92%", color: "#EF4444", badge: "🔥" },
    { company: "Alan",      role: "PM HealthTech", score: "84%", color: B.orange,  badge: "⭐" },
    { company: "Pennylane", role: "PO Finance",    score: "76%", color: B.green,   badge: "✅" },
  ];
  const routine = [
    { label: "Veille 72h",     done: true,  color: B.green },
    { label: "2 candidatures", done: true,  color: B.green },
    { label: "Tracker update", done: false, color: B.muted },
    { label: "Mock entretien", done: false, color: B.muted },
  ];
  const sidebar = [
    { icon: "🏠", label: "Dashboard", color: B.primary, active: true  },
    { icon: "⚡", label: "Veille",    color: "#0EA5E9", active: false },
    { icon: "✦",  label: "CV & LM",   color: "#7C3AED", active: false },
    { icon: "◈",  label: "Tracker",   color: B.green,   active: false },
    { icon: "◎",  label: "Coach",     color: "#F97316", active: false },
  ];

  return (
    <div style={{ maxWidth: 820, margin: "52px auto 0", position: "relative", animation: `fadeUp 0.9s ${ease} 0.3s both` }}>
      <div style={{ background: B.card, border: `1px solid ${B.border}`, borderRadius: B.radiusLg, padding: 16, boxShadow: B.shadowElev }}>
        {/* Chrome bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
          <div style={{ display: "flex", gap: 6 }}>
            {["#EF4444", B.orange, B.green].map((c) => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
            ))}
          </div>
          <div style={{ flex: 1, background: B.background, borderRadius: 6, padding: "4px 12px", border: `1px solid ${B.border}` }}>
            <span style={{ fontSize: 11, color: B.muted, fontFamily: "'Inter', sans-serif" }}>app.candiapply.fr/dashboard</span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "156px 1fr 184px", gap: 10, height: 226 }}>
          {/* Sidebar */}
          <div style={{ background: B.background, borderRadius: 10, padding: 10, display: "flex", flexDirection: "column", gap: 3, border: `1px solid ${B.border}` }}>
            <div style={{ marginBottom: 8, padding: "4px 6px" }}><Logo size={22} /></div>
            {sidebar.map(({ icon, label, color, active }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 7, padding: "6px 8px", borderRadius: 8, background: active ? `${color}12` : B.card, border: `1px solid ${active ? color + "28" : "transparent"}` }}>
                <span style={{ color, fontSize: 12 }}>{icon}</span>
                <span style={{ fontSize: 10, color: active ? color : B.muted, fontWeight: active ? 600 : 400, fontFamily: "'Inter', sans-serif" }}>{label}</span>
                {active && <div style={{ marginLeft: "auto", width: 5, height: 5, borderRadius: "50%", background: color }} />}
              </div>
            ))}
          </div>

          {/* Offres matchées */}
          <div style={{ background: B.background, borderRadius: 10, padding: 12, border: `1px solid ${B.border}`, overflow: "hidden" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 600, color: B.primary, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Inter', sans-serif" }}>⚡ Offres pour toi</div>
                <div style={{ fontSize: 9, color: B.muted, marginTop: 2, fontFamily: "'Inter', sans-serif" }}>Matching ≥ 70% · 8 offres</div>
              </div>
              <span style={{ fontSize: 9, background: "#DCFCE7", color: B.green, borderRadius: 4, padding: "2px 7px", fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>À jour</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {offers.map(({ company, role, score, color, badge }) => (
                <div key={company} style={{ background: B.card, borderRadius: 8, padding: "7px 10px", display: "flex", alignItems: "center", gap: 8, border: `1px solid ${B.border}`, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                  <div style={{ width: 26, height: 26, borderRadius: 7, background: `${color}14`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0 }}>{badge}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: B.foreground, fontFamily: "'Syne', sans-serif" }}>{company}</div>
                    <div style={{ fontSize: 10, color: B.muted, fontFamily: "'Inter', sans-serif" }}>{role}</div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color, fontFamily: "'Syne', sans-serif", flexShrink: 0 }}>{score}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Routine */}
          <div style={{ background: B.background, borderRadius: 10, padding: 10, display: "flex", flexDirection: "column", gap: 5, border: `1px solid ${B.border}` }}>
            <div style={{ fontSize: 9, fontWeight: 600, color: B.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4, fontFamily: "'Inter', sans-serif" }}>Routine du jour</div>
            {routine.map(({ label, done, color }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10, color: done ? B.muted : B.foreground, textDecoration: done ? "line-through" : "none", fontFamily: "'Inter', sans-serif" }}>
                <div style={{ width: 13, height: 13, borderRadius: 3, border: `1.5px solid ${done ? color : B.border}`, background: done ? color : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {done && <span style={{ fontSize: 7, color: "#fff", fontWeight: 700 }}>✓</span>}
                </div>
                {label}
              </div>
            ))}
            <div style={{ marginTop: "auto", background: B.accent, borderRadius: 8, padding: 8, border: `1px solid rgba(17,146,208,0.2)`, textAlign: "center" }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: B.primary, fontFamily: "'Syne', sans-serif" }}>2/4</div>
              <div style={{ fontSize: 8, color: B.muted, fontFamily: "'Inter', sans-serif" }}>tâches faites</div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 64, background: `linear-gradient(to top, ${B.background}, transparent)`, borderRadius: "0 0 18px 18px", pointerEvents: "none" }} />
    </div>
  );
}

// ── SECTION MARQUEE ───────────────────────────────────────────────────────────
function Marquee() {
  return (
    <div style={{ borderTop: `1px solid ${B.border}`, borderBottom: `1px solid ${B.border}`, padding: "14px 0", overflow: "hidden", background: B.card }}>
      <div style={{ display: "flex", animation: "marquee 30s linear infinite", width: "max-content" }}>
        {[...Array(2)].map((_, i) => (
          <div key={i} style={{ display: "flex", gap: 44, paddingRight: 44, alignItems: "center" }}>
            {MARQUEE_ITEMS.map((text) => (
              <span key={text} style={{ fontSize: 12, color: B.muted, fontWeight: 500, whiteSpace: "nowrap", fontFamily: "'Inter', sans-serif" }}>
                <span style={{ color: B.primary, marginRight: 6 }}>✦</span>{text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── SECTION PROBLÈME (fond sombre) ───────────────────────────────────────────
function ProblemSection() {
  return (
    <section style={{ padding: "80px 24px", background: B.bgDark }}>
      <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
        <div style={{ marginBottom: 14 }}><SLabel dark>Le problème</SLabel></div>
        <h2 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: "clamp(24px,3.2vw,36px)", letterSpacing: "-0.04em", lineHeight: 1.1,
          color: "#ffffff", marginBottom: 16,
        }}>
          La recherche d'emploi est<br />un travail à plein temps
        </h2>
        <p style={{ fontSize: 17, color: "rgba(255,255,255,0.45)", lineHeight: 1.72, maxWidth: 520, margin: "0 auto 44px" }}>
          Surveiller des dizaines de sites, adapter son CV pour chaque offre, relancer sans oublier personne… tout ça en parallèle d'une vie normale.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 14 }}>
          {PROBLEMS.map(({ icon, title, desc }) => (
            <div key={title} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: B.radiusLg, padding: "24px", textAlign: "left", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{icon}</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: "#ffffff", marginBottom: 8 }}>{title}</div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: "1.65", fontFamily: "'Inter', sans-serif" }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── SECTION FEATURES ──────────────────────────────────────────────────────────
function FeaturesSection() {
  return (
    <section style={{ padding: "80px 24px", background: B.background, borderBottom: `1px solid ${B.border}` }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ marginBottom: 14 }}><SLabel>6 modules · 1 pipeline</SLabel></div>
          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: "clamp(24px,3.2vw,36px)", letterSpacing: "-0.04em", lineHeight: 1.1,
            color: B.foreground,
          }}>
            Tout ce dont tu as besoin.<br />
            <span style={{ color: B.muted }}>Rien de superflu.</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16 }}>
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} {...feature} delay={0.04 + i * 0.06} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── SECTION "TA JOURNÉE" ──────────────────────────────────────────────────────
function JourneeSection() {
  return (
    <section style={{ padding: "80px 24px", background: B.card, borderBottom: `1px solid ${B.border}` }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ marginBottom: 14 }}><SLabel>Ta journée avec CandiApply</SLabel></div>
          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: "clamp(24px,3.2vw,36px)", letterSpacing: "-0.04em", lineHeight: 1.1,
            color: B.foreground,
          }}>
            1h par jour.<br />Pas plus.
          </h2>
        </div>
        {STEPS.map((step, i) => (
          <Step key={i} {...step} isLast={i === STEPS.length - 1} delay={0.05 + i * 0.08} />
        ))}
      </div>
    </section>
  );
}

// ── SECTION WAITLIST (fond sombre + glow) ─────────────────────────────────────
function WaitlistSection({ count, onSuccess, formRef }) {
  return (
    <section
      ref={formRef}
      data-waitlist-section
      style={{
        padding: "80px 20px 100px",
        background: `
          radial-gradient(ellipse 50% 50% at 50% 50%, rgba(17,146,208,0.15) 0%, transparent 70%),
          ${B.bgDark}
        `,
        borderTop: "1px solid rgba(17,146,208,0.12)",
      }}
    >
      <div style={{ maxWidth: 460, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ marginBottom: 16 }}>
            <Pill dark>🚀 Accès bêta prioritaire — Places limitées</Pill>
          </div>
          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: "clamp(22px,3.5vw,34px)", letterSpacing: "-0.04em", lineHeight: 1.1,
            color: "#ffffff", marginBottom: 12,
          }}>
            Ton prochain entretien<br />
            <span style={{ color: B.primary }}>commence ici.</span>
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: "1.65", fontFamily: "'Inter', sans-serif" }}>
            Inscris-toi maintenant. Les 100 premiers ont accès au plan Pro{" "}
            <strong style={{ color: "rgba(255,255,255,0.8)" }}>gratuit pendant 1 an.</strong>
          </p>
        </div>

        {/* Formulaire */}
        <div style={{ background: B.card, border: `1px solid ${B.border}`, borderRadius: B.radiusLg, padding: "28px 20px", boxShadow: B.shadowElev }}>
          <WaitlistForm onSuccess={onSuccess} />
        </div>

        {/* Compteur live */}
        <div style={{
          marginTop: 14,
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: B.radius,
          padding: "12px 16px",
          display: "flex", justifyContent: "space-between",
          alignItems: "center", gap: 8, flexWrap: "wrap",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: B.green, display: "inline-block", animation: "blink 1.8s infinite", flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", fontFamily: "'Inter', sans-serif" }}>
              <strong style={{ color: "#fff", fontWeight: 600 }}>
                <LiveCounter value={count} />
              </strong>{" "}personnes inscrites
            </span>
          </div>
          <span style={{ fontSize: 11, color: "#92400E", fontWeight: 700, background: "#FEF3C7", border: "1px solid #FDE68A", borderRadius: 6, padding: "2px 8px", fontFamily: "'Inter', sans-serif", whiteSpace: "nowrap" }}>
            {Math.max(0, WAITLIST_CONFIG.maxProSlots - count)} places Pro restantes
          </span>
        </div>
      </div>
    </section>
  );
}

// ── SECTION FAQ ───────────────────────────────────────────────────────────────
const FAQS = [
  {
    question: "CandiApply est-il vraiment gratuit ?",
    answer: "Oui, l'accès anticipé est 100 % gratuit. Inscris-toi à la liste d'attente et tu seras parmi les premiers à tester la plateforme sans frais.",
  },
  {
    question: "Comment CandiApply sélectionne-t-il les offres ?",
    answer: "CandiApply analyse ton profil (compétences, expérience, localisation, prétentions salariales) et le compare à des milliers d'offres chaque jour pour ne retenir que les plus pertinentes.",
  },
  {
    question: "Est-ce que mon CV est modifié automatiquement ?",
    answer: "CandiApply génère une version optimisée de ton CV adaptée à chaque offre. Tu gardes toujours le contrôle et peux valider ou modifier avant envoi.",
  },
  {
    question: "Quand la plateforme sera-t-elle disponible ?",
    answer: "Le lancement est prévu courant 2026. En rejoignant la liste d'attente, tu seras notifié dès l'ouverture de la bêta et bénéficieras d'un accès prioritaire.",
  },
];

function FAQSection() {
  const [open, setOpen] = useState(null);
  return (
    <section style={{ padding: "80px 24px", background: B.background, borderBottom: `1px solid ${B.border}` }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ marginBottom: 14 }}><SLabel>FAQ</SLabel></div>
          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: "clamp(24px,3.2vw,36px)", letterSpacing: "-0.04em", lineHeight: 1.1,
            color: B.foreground,
          }}>
            Questions fréquentes
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{ background: B.card, border: `1px solid ${isOpen ? "rgba(17,146,208,0.3)" : B.border}`, borderRadius: B.radius, overflow: "hidden", transition: `border-color 0.2s ${ease}` }}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{ width: "100%", padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}
                >
                  <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, color: B.foreground, lineHeight: 1.4 }}>{faq.question}</span>
                  <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: "50%", background: isOpen ? B.primary : B.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: isOpen ? "#fff" : B.muted, transition: `all 0.2s ${ease}`, transform: isOpen ? "rotate(45deg)" : "none" }}>+</span>
                </button>
                {isOpen && (
                  <div style={{ padding: "0 20px 18px", fontSize: 15, color: B.muted, lineHeight: "1.7", fontFamily: "'Inter', sans-serif" }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
function Footer() {
  const isMobile = useIsMobile();
  return (
    <footer style={{
      background: B.bgDarker,
      borderTop: "1px solid rgba(255,255,255,0.06)",
      padding: isMobile ? "24px 20px" : "24px 40px",
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 16,
      textAlign: isMobile ? "center" : "left",
    }}>
      <Logo size={38} inverted />
      <div style={{ display: "flex", gap: isMobile ? 20 : 24 }}>
        {["CGU", "Confidentialité", "Contact"].map((label) => (
          <span key={label} style={{ fontSize: 12, color: "rgba(255,255,255,0.28)", cursor: "pointer", fontFamily: "'Inter', sans-serif", transition: `color 0.2s ${ease}` }}
            onMouseEnter={e => (e.target.style.color = "rgba(255,255,255,0.65)")}
            onMouseLeave={e => (e.target.style.color = "rgba(255,255,255,0.28)")}
          >
            {label}
          </span>
        ))}
      </div>
      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.28)", fontFamily: "'Inter', sans-serif" }}>© 2026 CandiApply · Made in 🇫🇷</span>
    </footer>
  );
}

// ── PAGE PRINCIPALE ───────────────────────────────────────────────────────────
export function LandingPage({ onShowDemo }) {
  const [count,    setCount]    = useState(WAITLIST_CONFIG.baseCount);
  const [scrolled, setScrolled] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    getWaitlistCount().then((n) => setCount(WAITLIST_CONFIG.baseCount + n));
    const poll = setInterval(
      () => getWaitlistCount().then((n) => setCount(WAITLIST_CONFIG.baseCount + n)),
      WAITLIST_CONFIG.pollInterval
    );
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => { clearInterval(poll); window.removeEventListener("scroll", onScroll); };
  }, []);

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    <div style={{ background: B.background, color: B.tx2, fontFamily: "'Inter', sans-serif", overflowX: "hidden", minHeight: "100vh" }}>
      <style>{GLOBAL_CSS}</style>
      <Navbar    count={count} onSignup={scrollToForm} onDemo={onShowDemo} scrolled={scrolled} />
      <Hero      count={count} onSignup={scrollToForm} onDemo={onShowDemo} />
      <Marquee   />
      <ProblemSection  />
      <FeaturesSection />
      <JourneeSection  />
      <WaitlistSection count={count} onSuccess={(n) => setCount(n)} formRef={formRef} />
      <FAQSection />
      <Footer    />
    </div>
  );
}
