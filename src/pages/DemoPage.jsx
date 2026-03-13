// ─────────────────────────────────────────────────────────────────────────────
// pages/DemoPage.jsx — Page démo interactive (4 modules)
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { B, DEMO_MODULES } from "../constants";
import { Logo, SLabel } from "../components/UI";

// ── Écran : Veille intelligente ───────────────────────────────────────────────
function ScreenVeille() {
  const offers = [
    { company: "Qonto",      role: "Product Owner SaaS", location: "Paris · Hybride", salary: "52–62K€", score: 92, badge: "🔥", color: "#EF4444" },
    { company: "Alan",       role: "PM HealthTech",      location: "Paris · Remote",  salary: "50–60K€", score: 84, badge: "⭐", color: B.orange },
    { company: "Pennylane",  role: "PO Finance",         location: "Paris · Hybride", salary: "48–58K€", score: 76, badge: "✅", color: B.green },
    { company: "Swile",      role: "Lead PO",            location: "Paris · Présentiel", salary: "55–65K€", score: 71, badge: "✅", color: B.green },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 700, color: B.foreground }}>Offres du jour</div>
          <div style={{ fontSize: 11, color: B.muted, fontFamily: "'Inter',sans-serif" }}>Publiées &lt; 48h · Scorées par IA</div>
        </div>
        <span style={{ fontSize: 10, background: "#DCFCE7", color: B.green, borderRadius: 6, padding: "3px 8px", fontWeight: 600, fontFamily: "'Inter',sans-serif", border: "1px solid #BBF7D0" }}>🔄 À jour</span>
      </div>

      {offers.map(({ company, role, location, salary, score, badge, color }) => (
        <div key={company} style={{ background: B.card, borderRadius: 10, padding: "10px 14px", display: "flex", alignItems: "center", gap: 12, border: `1px solid ${B.border}`, boxShadow: B.shadowCard }}>
          <div style={{ width: 36, height: 36, borderRadius: 9, background: `${color}12`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{badge}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 700, color: B.foreground }}>{company}</div>
            <div style={{ fontSize: 11, color: B.muted, fontFamily: "'Inter',sans-serif" }}>{role} · {location}</div>
            <div style={{ fontSize: 11, color: B.muted, fontFamily: "'Inter',sans-serif" }}>{salary}</div>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 700, color }}>{score}%</div>
            <div style={{ fontSize: 9, color: B.muted, fontFamily: "'Inter',sans-serif" }}>match</div>
          </div>
        </div>
      ))}
      <div style={{ textAlign: "center", fontSize: 11, color: B.muted, fontFamily: "'Inter',sans-serif", marginTop: 4 }}>+ 4 autres offres ≥ 70%</div>
    </div>
  );
}

// ── Écran : CV & LM ───────────────────────────────────────────────────────────
function ScreenCV() {
  const [step,   setStep]   = useState(0);
  const [typing, setTyping] = useState(false);

  const generate = () => {
    setTyping(true);
    setTimeout(() => { setTyping(false); setStep(1); }, 1600);
  };

  if (step === 0) return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ background: B.background, borderRadius: 10, border: `1px solid ${B.border}`, padding: "12px 14px" }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: B.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8, fontFamily: "'Inter',sans-serif" }}>Offre collée</div>
        <div style={{ fontSize: 12, color: B.foreground, lineHeight: "1.6", fontFamily: "'Inter',sans-serif" }}>
          <strong>Qonto — Product Owner SaaS</strong><br />
          Nous cherchons un PO expérimenté pour piloter notre roadmap paiement B2B. Stack : Jira, Figma, Amplitude. 5 ans d'exp. min.
        </div>
      </div>
      <button
        onClick={generate}
        disabled={typing}
        style={{ padding: "11px", borderRadius: B.radius, border: "none", background: typing ? "#7C3AED80" : "#7C3AED", color: "#fff", fontSize: 13, fontWeight: 700, cursor: typing ? "not-allowed" : "pointer", fontFamily: "'Space Grotesk',sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
      >
        {typing ? (
          <><span style={{ width: 13, height: 13, border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block" }} /> Génération en cours…</>
        ) : "✦ Générer CV + Lettre de motivation"}
      </button>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, animation: "fadeUp 0.4s ease" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <div style={{ background: "#7C3AED12", border: "1px solid #7C3AED25", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 700, color: "#7C3AED" }}>9/10</div>
          <div style={{ fontSize: 10, color: B.muted, fontFamily: "'Inter',sans-serif" }}>Matching ATS</div>
        </div>
        <div style={{ background: `${B.green}12`, border: `1px solid ${B.green}25`, borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 700, color: B.green }}>32s</div>
          <div style={{ fontSize: 10, color: B.muted, fontFamily: "'Inter',sans-serif" }}>Généré en</div>
        </div>
      </div>
      <div style={{ background: B.card, borderRadius: 10, border: `1px solid ${B.border}`, padding: "12px 14px" }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: "#7C3AED", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6, fontFamily: "'Inter',sans-serif" }}>Accroche CV générée</div>
        <div style={{ fontSize: 12, color: B.foreground, lineHeight: "1.6", fontFamily: "'Inter',sans-serif" }}>Product Owner SaaS avec 5 ans d'expérience en B2B, spécialisé en roadmap produit et intégrations paiement. À l'aise avec Jira, Figma et Amplitude…</div>
      </div>
      <div style={{ background: B.card, borderRadius: 10, border: `1px solid ${B.border}`, padding: "12px 14px" }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: "#7C3AED", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6, fontFamily: "'Inter',sans-serif" }}>1er § lettre de motivation</div>
        <div style={{ fontSize: 12, color: B.foreground, lineHeight: "1.6", fontFamily: "'Inter',sans-serif" }}>Madame, Monsieur, La mission de Qonto — simplifier la finance des PME européennes — résonne directement avec mon parcours…</div>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        {["📋 Copier CV", "✉️ Copier LM", "📤 Postuler"].map((label) => (
          <button key={label} style={{ flex: 1, padding: "8px", borderRadius: 8, border: `1px solid ${B.border}`, background: B.card, color: B.foreground, fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter',sans-serif" }}>{label}</button>
        ))}
      </div>
    </div>
  );
}

// ── Écran : Tracker Kanban ────────────────────────────────────────────────────
function ScreenTracker() {
  const columns = [
    { label: "À postuler", color: "#6366F1", items: [{ company: "Doctrine", role: "PO Legal" }, { company: "Spendesk", role: "Senior PM" }] },
    { label: "Postulé",    color: B.orange,  items: [{ company: "Qonto", role: "PO SaaS", relance: true }, { company: "Alan", role: "PM Health" }, { company: "Pennylane", role: "PO Finance" }] },
    { label: "Entretien",  color: B.green,   items: [{ company: "Swile", role: "Lead PO" }] },
    { label: "Offre",      color: B.primary, items: [] },
  ];

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6, height: 220 }}>
        {columns.map(({ label, color, items }) => (
          <div key={label} style={{ background: `${color}08`, borderRadius: 10, padding: 8, borderTop: `2px solid ${color}`, display: "flex", flexDirection: "column", gap: 5 }}>
            <div style={{ fontSize: 9, fontWeight: 700, color, fontFamily: "'Space Grotesk',sans-serif", marginBottom: 2 }}>{label} ({items.length})</div>
            {items.map(({ company, role, relance }) => (
              <div key={company} style={{ background: B.card, borderRadius: 7, padding: "6px 8px", border: `1px solid ${relance ? "#FDE68A" : B.border}`, position: "relative" }}>
                {relance && (
                  <div style={{ position: "absolute", top: -5, right: 4, fontSize: 9, background: B.orange, color: "#fff", borderRadius: 4, padding: "1px 5px", fontWeight: 700, fontFamily: "'Inter',sans-serif" }}>Relancer</div>
                )}
                <div style={{ fontSize: 10, fontWeight: 700, color: B.foreground, fontFamily: "'Space Grotesk',sans-serif" }}>{company}</div>
                <div style={{ fontSize: 9, color: B.muted, fontFamily: "'Inter',sans-serif" }}>{role}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
        {[["6", "Candidatures", B.primary], ["1", "Entretien", B.green], ["33%", "Taux réponse", B.orange]].map(([value, label, color]) => (
          <div key={label} style={{ flex: 1, background: B.card, border: `1px solid ${B.border}`, borderRadius: 8, padding: "8px", textAlign: "center", boxShadow: B.shadowCard }}>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 16, fontWeight: 700, color }}>{value}</div>
            <div style={{ fontSize: 9, color: B.muted, fontFamily: "'Inter',sans-serif" }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Écran : Coach entretien IA ────────────────────────────────────────────────
function ScreenCoach() {
  const [messages, setMessages] = useState([
    { from: "recruiter", text: "Bonjour ! Je suis Léa, Head of Product chez une fintech. Commençons. Comment vous définissez-vous en tant que Product Owner ?" },
  ]);
  const [input,   setInput]   = useState("");
  const [loading, setLoading] = useState(false);
  const [score,   setScore]   = useState(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    const updated = [...messages, { from: "user", text: input }];
    setMessages(updated);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      setMessages([...updated, {
        from: "recruiter",
        text: "Intéressant. Donnez-moi un exemple concret où vous avez dû prioriser des features sous forte pression. Qu'est-ce qui a guidé votre décision ?",
      }]);
      setLoading(false);
      setTimeout(() => setScore(8), 2500);
    }, 1200);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {/* Sélecteur de persona */}
      <div style={{ display: "flex", gap: 6, marginBottom: 4 }}>
        {[
          { name: "👩‍💼 Léa · Fintech", active: true,  color: B.orange },
          { name: "👨‍💼 Thomas · DRH",  active: false, color: B.muted },
          { name: "👨‍💻 Amine · CTO",   active: false, color: B.muted },
        ].map(({ name, active, color }) => (
          <div key={name} style={{ padding: "4px 10px", borderRadius: 20, background: active ? `${B.orange}12` : B.background, border: `1px solid ${active ? B.orange : B.border}`, fontSize: 10, fontWeight: active ? 700 : 500, color, fontFamily: "'Inter',sans-serif", cursor: "pointer" }}>
            {name}
          </div>
        ))}
      </div>

      {/* Zone de chat */}
      <div style={{ background: B.background, borderRadius: 10, padding: 10, border: `1px solid ${B.border}`, minHeight: 140, display: "flex", flexDirection: "column", gap: 8, overflowY: "auto", maxHeight: 160 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: "flex", justifyContent: msg.from === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth: "80%",
              background: msg.from === "user" ? B.primary : B.card,
              color: msg.from === "user" ? "#fff" : B.foreground,
              borderRadius: msg.from === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
              padding: "8px 12px",
              fontSize: 11,
              lineHeight: "1.55",
              fontFamily: "'Inter',sans-serif",
              border: msg.from === "recruiter" ? `1px solid ${B.border}` : "none",
              boxShadow: msg.from === "recruiter" ? B.shadowCard : "none",
            }}>
              {msg.from === "recruiter" && (
                <div style={{ fontSize: 9, fontWeight: 600, color: B.orange, marginBottom: 3, fontFamily: "'Inter',sans-serif" }}>Léa · Head of Product</div>
              )}
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", gap: 4, padding: "6px 0" }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: B.primary, animation: `blink ${0.6 + i * 0.2}s ease infinite` }} />
            ))}
          </div>
        )}
      </div>

      {/* Score ou input */}
      {score ? (
        <div style={{ background: `${B.green}10`, border: `1px solid ${B.green}25`, borderRadius: 10, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: B.green, fontFamily: "'Space Grotesk',sans-serif" }}>Feedback session</div>
            <div style={{ fontSize: 11, color: B.muted, fontFamily: "'Inter',sans-serif" }}>Bonne structure, ajoute des chiffres</div>
          </div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 24, fontWeight: 700, color: B.green }}>{score}/10</div>
        </div>
      ) : (
        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Votre réponse…"
            style={{ flex: 1, padding: "9px 12px", borderRadius: B.radius, border: `1.5px solid ${B.border}`, background: B.card, color: B.foreground, fontSize: 12, fontFamily: "'Inter',sans-serif", outline: "none" }}
            onFocus={(e) => (e.target.style.borderColor = B.primary)}
            onBlur={(e)  => (e.target.style.borderColor = B.border)}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            style={{ padding: "9px 14px", borderRadius: B.radius, border: "none", background: B.primary, color: "#fff", fontSize: 13, cursor: !input.trim() || loading ? "not-allowed" : "pointer", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, opacity: !input.trim() ? 0.5 : 1 }}
          >
            ↑
          </button>
        </div>
      )}
    </div>
  );
}

// Map id → composant écran
const SCREENS = {
  veille:  ScreenVeille,
  cv:      ScreenCV,
  tracker: ScreenTracker,
  coach:   ScreenCoach,
};

// ── DEMO PAGE ─────────────────────────────────────────────────────────────────
export function DemoPage({ onBack, onSignup }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const module = DEMO_MODULES[activeIndex];
  const Screen = SCREENS[module.id];

  return (
    <div style={{ minHeight: "100vh", background: B.background, fontFamily: "'Inter',sans-serif" }}>

      {/* Navbar démo */}
      <div style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(246,248,250,0.96)", borderBottom: `1px solid ${B.border}`, backdropFilter: "blur(10px)", padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 8, border: `1px solid ${B.border}`, background: B.card, color: B.muted, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter',sans-serif" }}>
            ← Retour
          </button>
          <Logo size={26} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 12, color: B.muted, fontFamily: "'Inter',sans-serif" }}>Démo interactive</span>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: B.green, display: "inline-block", animation: "blink 2s infinite" }} />
        </div>
        <button onClick={onSignup} style={{ padding: "7px 18px", borderRadius: B.radius, border: "none", background: B.primary, color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'Space Grotesk',sans-serif", boxShadow: B.shadowCard }}>
          Rejoindre la waitlist →
        </button>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 24px" }}>

        {/* Intro */}
        <div style={{ textAlign: "center", marginBottom: 36, animation: "fadeUp 0.4s ease" }}>
          <SLabel>Démo interactive</SLabel>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(24px,4vw,36px)", fontWeight: 700, color: B.foreground, letterSpacing: "-0.025em", marginBottom: 10 }}>
            Découvrez CandiApply en action
          </h1>
          <p style={{ fontSize: 14, color: B.muted, maxWidth: 480, margin: "0 auto" }}>Naviguez entre les 4 modules clés. Tout ce que vous voyez est interactif.</p>
        </div>

        {/* Tabs modules */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }}>
          {DEMO_MODULES.map((mod, i) => (
            <button
              key={mod.id}
              onClick={() => setActiveIndex(i)}
              style={{
                display: "flex", alignItems: "center", gap: 7,
                padding: "8px 16px", borderRadius: 100,
                border: `1.5px solid ${activeIndex === i ? mod.color + "60" : B.border}`,
                background: activeIndex === i ? `${mod.color}10` : B.card,
                color: activeIndex === i ? mod.color : B.muted,
                fontSize: 13, fontWeight: activeIndex === i ? 700 : 500,
                cursor: "pointer", fontFamily: "'Inter',sans-serif",
                transition: "all 0.18s",
                boxShadow: activeIndex === i ? B.shadowCard : "none",
              }}
            >
              <span>{mod.icon}</span><span>{mod.label}</span>
            </button>
          ))}
        </div>

        {/* Split : description + écran */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start", animation: "fadeUp 0.35s ease" }} key={activeIndex}>

          {/* Gauche : description */}
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${module.color}12`, border: `1px solid ${module.color}28`, borderRadius: 100, padding: "4px 12px", marginBottom: 16 }}>
              <span>{module.icon}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: module.color, fontFamily: "'Inter',sans-serif" }}>{module.label}</span>
            </div>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(20px,3vw,28px)", fontWeight: 700, color: B.foreground, letterSpacing: "-0.02em", marginBottom: 8, lineHeight: 1.2 }}>
              {module.title}
            </h2>
            <p style={{ fontSize: 14, color: B.muted, lineHeight: "1.7", marginBottom: 24 }}>{module.subtitle}</p>

            {/* Bullets */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
              {module.bullets.map((bullet, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: `${module.color}18`, border: `1px solid ${module.color}35`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                    <span style={{ fontSize: 8, color: module.color, fontWeight: 900 }}>✓</span>
                  </div>
                  <span style={{ fontSize: 13, color: B.foreground, lineHeight: "1.5", fontFamily: "'Inter',sans-serif" }}>{bullet}</span>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div style={{ display: "flex", gap: 8 }}>
              {activeIndex > 0 && (
                <button onClick={() => setActiveIndex(activeIndex - 1)} style={{ padding: "9px 18px", borderRadius: B.radius, border: `1px solid ${B.border}`, background: B.card, color: B.muted, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter',sans-serif" }}>
                  ← Précédent
                </button>
              )}
              {activeIndex < DEMO_MODULES.length - 1 ? (
                <button onClick={() => setActiveIndex(activeIndex + 1)} style={{ padding: "9px 20px", borderRadius: B.radius, border: "none", background: module.color, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'Space Grotesk',sans-serif", boxShadow: B.shadowCard }}>
                  Module suivant →
                </button>
              ) : (
                <button onClick={onSignup} style={{ padding: "9px 20px", borderRadius: B.radius, border: "none", background: B.primary, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'Space Grotesk',sans-serif", boxShadow: B.shadowElev }}>
                  🚀 Rejoindre la waitlist →
                </button>
              )}
            </div>
          </div>

          {/* Droite : écran simulé */}
          <div style={{ background: B.card, border: `1px solid ${B.border}`, borderRadius: 16, padding: 20, boxShadow: B.shadowElev, position: "relative", overflow: "hidden" }}>
            {/* Chrome window */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, paddingBottom: 12, borderBottom: `1px solid ${B.border}` }}>
              <div style={{ display: "flex", gap: 5 }}>
                {[B.destructive, B.orange, B.green].map((c) => (
                  <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />
                ))}
              </div>
              <div style={{ flex: 1, background: B.background, borderRadius: 5, padding: "3px 10px", border: `1px solid ${B.border}` }}>
                <span style={{ fontSize: 10, color: B.muted, fontFamily: "'Inter',sans-serif" }}>CandiApply · {module.label}</span>
              </div>
            </div>
            <Screen />
          </div>
        </div>

        {/* Progress dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 32 }}>
          {DEMO_MODULES.map((_, i) => (
            <div
              key={i}
              onClick={() => setActiveIndex(i)}
              style={{ width: i === activeIndex ? 24 : 8, height: 8, borderRadius: 4, background: i === activeIndex ? B.primary : B.border, cursor: "pointer", transition: "all 0.2s" }}
            />
          ))}
        </div>
      </div>

      {/* CTA bas */}
      <div style={{ background: B.accent, borderTop: `1px solid ${B.primary}20`, padding: "32px 24px", textAlign: "center", marginTop: 32 }}>
        <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(18px,3vw,26px)", fontWeight: 700, color: B.foreground, marginBottom: 8, letterSpacing: "-0.02em" }}>
          Convaincu ? Rejoins la liste d'attente.
        </h3>
        <p style={{ fontSize: 13, color: B.muted, marginBottom: 20, fontFamily: "'Inter',sans-serif" }}>
          Les 100 premiers ont accès au plan Pro gratuit pendant 1 an.
        </p>
        <button onClick={onSignup} style={{ padding: "12px 32px", borderRadius: B.radius, border: "none", background: B.primary, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "'Space Grotesk',sans-serif", boxShadow: B.shadowElev }}>
          Rejoindre la waitlist gratuite →
        </button>
        <p style={{ fontSize: 11, color: B.muted, marginTop: 10, fontFamily: "'Inter',sans-serif" }}>Gratuit · Sans engagement · RGPD 🇫🇷</p>
      </div>
    </div>
  );
}
