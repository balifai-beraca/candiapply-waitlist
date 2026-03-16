// ─────────────────────────────────────────────────────────────────────────────
// pages/LandingPage.jsx — Landing page waitlist CandiApply (RESPONSIVE FIX)
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from "react";
import { B, WAITLIST_CONFIG, MARQUEE_ITEMS, PROBLEMS, FEATURES, STEPS } from "../constants";
import { getWaitlistCount } from "../lib/supabase";
import { Logo, LiveCounter, Avatars, Pill, SLabel, FeatureCard, Step } from "../components/UI";
import { WaitlistForm } from "../components/WaitlistForm";

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
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  @keyframes fadeUp  { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes spin    { to { transform: rotate(360deg); } }
  @keyframes blink   { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
  @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  input::placeholder  { color: #6B7280; font-family: 'Inter', sans-serif; }
  select option       { color: #17304A; background: #fff; }
  button:hover:not(:disabled) { filter: brightness(0.92); }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-thumb { background: #E2E6EA; border-radius: 4px; }
`;

// ── NAVBAR ────────────────────────────────────────────────────────────────────
function Navbar({ count, onSignup, onDemo, scrolled }) {
  const isMobile = useIsMobile();

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      height: 60, padding: isMobile ? "0 16px" : "0 32px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(246,248,250,0.96)" : B.background,
      borderBottom: `1px solid ${scrolled ? B.border : "transparent"}`,
      backdropFilter: scrolled ? "blur(10px)" : "none",
      transition: "all 0.25s",
    }}>
      <Logo size={32} />

      <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 8 : 12 }}>
        {/* Compteur live */}
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: isMobile ? "5px 8px" : "5px 12px",
          borderRadius: 100, background: B.accent,
          border: `1px solid ${B.primary}25`,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: B.green, display: "inline-block", animation: "blink 2s infinite", flexShrink: 0 }} />
          <span style={{ fontSize: 11, color: B.primary, fontWeight: 600, fontFamily: "'Inter', sans-serif", whiteSpace: "nowrap" }}>
            <LiveCounter value={count} /> inscrits
          </span>
        </div>

        {/* Bouton démo — masqué sur mobile */}
        {!isMobile && (
          <button onClick={onDemo} style={{
            padding: "8px 16px", borderRadius: B.radius,
            border: `1px solid ${B.border}`, background: B.card,
            color: B.muted, fontSize: 13, fontWeight: 600,
            cursor: "pointer", fontFamily: "'Inter', sans-serif",
          }}>
            Voir une démo
          </button>
        )}

        <button onClick={onSignup} style={{
          padding: isMobile ? "8px 14px" : "8px 20px",
          borderRadius: B.radius, border: "none",
          background: B.primary, color: "#fff",
          fontSize: isMobile ? 12 : 13, fontWeight: 700,
          cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif",
          boxShadow: B.shadowCard, whiteSpace: "nowrap",
        }}>
          {isMobile ? "S'inscrire" : "S'inscrire"}
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
      paddingTop: isMobile ? 88 : 108,
      paddingBottom: isMobile ? 48 : 72,
      paddingLeft: 24, paddingRight: 24,
      textAlign: "center", background: B.background,
      position: "relative", overflow: "hidden",
    }}>
      {/* Halo */}
      <div style={{
        position: "absolute", top: 60, left: "50%",
        transform: "translateX(-50%)",
        width: isMobile ? 320 : 700, height: isMobile ? 200 : 400,
        borderRadius: "50%", background: B.accent,
        opacity: 0.5, filter: "blur(60px)", pointerEvents: "none",
      }} />

      <div style={{ position: "relative", maxWidth: 740, margin: "0 auto" }}>
        {/* Badge */}
        <div style={{ marginBottom: 22, animation: "fadeUp 0.4s ease 0.05s both" }}>
          <Pill dot>Bientôt disponible — Inscriptions ouvertes</Pill>
        </div>

        {/* H1 */}
        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "clamp(24px,4.5vw,52px)",
          fontWeight: 700, lineHeight: 1.2,
          letterSpacing: "-0.03em", color: B.foreground,
          margin: "0 0 20px", animation: "fadeUp 0.4s ease 0.1s both",
        }}>
          Trouvez votre prochain emploi<br />
          <span style={{ color: B.primary }}>sans passer des heures à chercher</span>
        </h1>

        {/* Sous-titre */}
        <p style={{
          fontSize: "clamp(14px,2vw,17px)", color: B.muted,
          lineHeight: "1.7", maxWidth: 500, margin: "0 auto 28px",
          animation: "fadeUp 0.4s ease 0.15s both",
        }}>
          CandiApply analyse votre profil, détecte les offres qui vous correspondent, personnalise vos candidatures et vous prépare aux entretiens —{" "}
          <strong style={{ color: B.foreground }}>tout en un, chaque matin.</strong>
        </p>

        {/* Social proof */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 28, animation: "fadeUp 0.4s ease 0.2s both" }}>
          <Avatars count={count} />
        </div>

        {/* CTAs */}
        <div style={{
          display: "flex", gap: 12, justifyContent: "center",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          marginBottom: 12, animation: "fadeUp 0.4s ease 0.25s both",
          padding: isMobile ? "0 16px" : 0,
        }}>
          <button onClick={onSignup} style={{
            padding: "13px 28px", borderRadius: B.radius,
            border: "none", background: B.primary, color: "#fff",
            fontSize: 15, fontWeight: 700, cursor: "pointer",
            fontFamily: "'Space Grotesk', sans-serif",
            boxShadow: B.shadowElev,
            width: isMobile ? "100%" : "auto",
          }}>
            Rejoindre la liste d'attente →
          </button>
          <button onClick={onDemo} style={{
            padding: "13px 22px", borderRadius: B.radius,
            border: `1.5px solid ${B.border}`, background: B.card,
            color: B.muted, fontSize: 15, fontWeight: 600,
            cursor: "pointer", fontFamily: "'Inter', sans-serif",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            width: isMobile ? "100%" : "auto",
          }}>
            Voir une démo <span style={{ fontSize: 11 }}>▶</span>
          </button>
        </div>

        <p style={{ fontSize: 12, color: B.muted, animation: "fadeUp 0.4s ease 0.3s both", fontFamily: "'Inter', sans-serif" }}>
          Accès prioritaire · Gratuit · Sans engagement · RGPD 🇫🇷
        </p>
      </div>

      {/* App preview — masquée sur mobile */}
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
    <div style={{ maxWidth: 820, margin: "52px auto 0", position: "relative", animation: "fadeUp 0.6s ease 0.35s both" }}>
      <div style={{ background: B.card, border: `1px solid ${B.border}`, borderRadius: 18, padding: 16, boxShadow: B.shadowElev }}>
        {/* Chrome */}
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

        {/* Grid 3 colonnes */}
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
                    <div style={{ fontSize: 11, fontWeight: 700, color: B.foreground, fontFamily: "'Space Grotesk', sans-serif" }}>{company}</div>
                    <div style={{ fontSize: 10, color: B.muted, fontFamily: "'Inter', sans-serif" }}>{role}</div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color, fontFamily: "'Space Grotesk', sans-serif", flexShrink: 0 }}>{score}</div>
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
            <div style={{ marginTop: "auto", background: B.accent, borderRadius: 8, padding: 8, border: `1px solid ${B.primary}25`, textAlign: "center" }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: B.primary, fontFamily: "'Space Grotesk', sans-serif" }}>2/4</div>
              <div style={{ fontSize: 8, color: B.muted, fontFamily: "'Inter', sans-serif" }}>tâches faites</div>
            </div>
          </div>
        </div>
      </div>
      {/* Fade bas */}
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

// ── SECTION PROBLÈME ─────────────────────────────────────────────────────────
function ProblemSection() {
  return (
    <section style={{ padding: "72px 24px", background: B.card, borderBottom: `1px solid ${B.border}` }}>
      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <SLabel>Le problème</SLabel>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(22px,4vw,38px)", fontWeight: 700, color: B.foreground, letterSpacing: "-0.025em", lineHeight: 1.2, marginBottom: 16 }}>
          La recherche d'emploi est<br />un travail à plein temps
        </h2>
        <p style={{ fontSize: 15, color: B.muted, lineHeight: "1.7", maxWidth: 520, margin: "0 auto 40px" }}>
          Surveiller des dizaines de sites, adapter son CV pour chaque offre, relancer sans oublier personne… tout ça en parallèle d'une vie normale.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 14 }}>
          {PROBLEMS.map(({ icon, title, desc }) => (
            <div key={title} style={{ background: B.background, border: `1px solid ${B.border}`, borderRadius: B.radius, padding: "20px", textAlign: "left", boxShadow: B.shadowCard }}>
              <div style={{ fontSize: 26, marginBottom: 10 }}>{icon}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: B.foreground, marginBottom: 6 }}>{title}</div>
              <div style={{ fontSize: 13, color: B.muted, lineHeight: "1.6", fontFamily: "'Inter', sans-serif" }}>{desc}</div>
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
    <section style={{ padding: "72px 24px", background: B.background, borderBottom: `1px solid ${B.border}` }}>
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <SLabel>6 modules · 1 pipeline</SLabel>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(22px,4vw,38px)", fontWeight: 700, color: B.foreground, letterSpacing: "-0.025em", lineHeight: 1.2 }}>
            Tout ce dont vous avez besoin.<br />
            <span style={{ color: B.muted }}>Rien de superflu.</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 14 }}>
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
    <section style={{ padding: "72px 24px", background: B.card, borderBottom: `1px solid ${B.border}` }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <SLabel>Ta journée avec CandiApply</SLabel>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(22px,4vw,38px)", fontWeight: 700, color: B.foreground, letterSpacing: "-0.025em", lineHeight: 1.2 }}>
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

// ── SECTION WAITLIST ──────────────────────────────────────────────────────────
function WaitlistSection({ count, onSuccess, formRef }) {
  return (
    <section
      ref={formRef}
      data-waitlist-section
      style={{ padding: "72px 20px 96px", background: B.accent, borderTop: `1px solid ${B.primary}20` }}
    >
      <div style={{ maxWidth: 460, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ marginBottom: 14 }}>
            <Pill>🚀 Accès bêta prioritaire — Places limitées</Pill>
          </div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(24px,4.5vw,38px)", fontWeight: 700, color: B.foreground, letterSpacing: "-0.025em", lineHeight: 1.2, marginBottom: 10 }}>
            Ton prochain entretien<br />
            <span style={{ color: B.primary }}>commence ici.</span>
          </h2>
          <p style={{ fontSize: 14, color: B.muted, lineHeight: "1.65", fontFamily: "'Inter', sans-serif" }}>
            Inscris-toi maintenant. Les 100 premiers ont accès au plan Pro{" "}
            <strong>gratuit pendant 1 an.</strong>
          </p>
        </div>

        {/* Formulaire */}
        <div style={{ background: B.card, border: `1px solid ${B.border}`, borderRadius: 16, padding: "28px 20px", boxShadow: B.shadowElev }}>
          <WaitlistForm onSuccess={onSuccess} />
        </div>

        {/* Compteur live */}
        <div style={{
          marginTop: 14, background: B.card,
          border: `1px solid ${B.border}`, borderRadius: B.radius,
          padding: "12px 16px",
          display: "flex", justifyContent: "space-between",
          alignItems: "center", gap: 8, flexWrap: "wrap",
          boxShadow: B.shadowCard,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: B.green, display: "inline-block", animation: "blink 1.8s infinite", flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: B.muted, fontFamily: "'Inter', sans-serif" }}>
              <strong style={{ color: B.foreground, fontWeight: 600 }}>
                <LiveCounter value={count} />
              </strong>{" "}personnes inscrites
            </span>
          </div>
          <span style={{ fontSize: 11, color: "#92400E", fontWeight: 600, background: "#FEF3C7", border: "1px solid #FDE68A", borderRadius: 6, padding: "2px 8px", fontFamily: "'Inter', sans-serif", whiteSpace: "nowrap" }}>
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
    answer: "Oui, l'accès anticipé est 100 % gratuit. Inscrivez-vous à la liste d'attente et vous serez parmi les premiers à tester la plateforme sans frais.",
  },
  {
    question: "Comment l'IA sélectionne-t-elle les offres ?",
    answer: "Notre IA analyse votre profil (compétences, expérience, localisation, prétentions salariales) et le compare à des milliers d'offres chaque jour pour ne retenir que les plus pertinentes.",
  },
  {
    question: "Est-ce que mon CV est modifié automatiquement ?",
    answer: "L'IA génère une version optimisée de votre CV adaptée à chaque offre. Vous gardez toujours le contrôle et pouvez valider ou modifier avant envoi.",
  },
  {
    question: "Quand la plateforme sera-t-elle disponible ?",
    answer: "Le lancement est prévu courant 2026. En rejoignant la liste d'attente, vous serez notifié dès l'ouverture de la bêta et bénéficierez d'un accès prioritaire.",
  },
];

function FAQSection() {
  const [open, setOpen] = useState(null);
  return (
    <section style={{ padding: "72px 24px", background: B.background, borderBottom: `1px solid ${B.border}` }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <SLabel>FAQ</SLabel>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(22px,4vw,38px)", fontWeight: 700, color: B.foreground, letterSpacing: "-0.025em", lineHeight: 1.2 }}>
            Questions fréquentes
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{ background: B.card, border: `1px solid ${isOpen ? B.primary + "40" : B.border}`, borderRadius: B.radius, overflow: "hidden", transition: "border-color 0.2s" }}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{ width: "100%", padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}
                >
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 600, color: B.foreground, lineHeight: 1.4 }}>{faq.question}</span>
                  <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: "50%", background: isOpen ? B.primary : B.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: isOpen ? "#fff" : B.muted, transition: "all 0.2s", transform: isOpen ? "rotate(45deg)" : "none" }}>+</span>
                </button>
                {isOpen && (
                  <div style={{ padding: "0 20px 18px", fontSize: 14, color: B.muted, lineHeight: "1.7", fontFamily: "'Inter', sans-serif" }}>
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
      background: B.foreground,
      padding: isMobile ? "24px 20px" : "24px 32px",
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 16,
      textAlign: isMobile ? "center" : "left",
    }}>
      <Logo size={28} inverted />
      <div style={{ display: "flex", gap: isMobile ? 20 : 24 }}>
        {["CGU", "Confidentialité", "Contact"].map((label) => (
          <span key={label} style={{ fontSize: 12, color: "#94A3B8", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>{label}</span>
        ))}
      </div>
      <span style={{ fontSize: 11, color: "#475569", fontFamily: "'Inter', sans-serif" }}>© 2026 CandiApply · Made in 🇫🇷</span>
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
    <div style={{ background: B.background, color: B.foreground, fontFamily: "'Inter', sans-serif", overflowX: "hidden", minHeight: "100vh" }}>
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