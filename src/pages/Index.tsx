import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

// ─── Design tokens ────────────────────────────────────────────────────────────
const B = {
  // Brand
  primary:    "#1192D0",
  primaryHov: "#0c6fa0",
  // Text hierarchy
  tx1:        "#07111f",
  tx2:        "#2d3a52",
  tx3:        "#64748b",
  tx4:        "#93BBCC",
  // Surfaces
  bg:         "#f6f8fb",
  bgDark:     "#07111f",
  bgDarker:   "#060c19",
  card:       "#ffffff",
  badge:      "#e8f5fd",
  // Misc
  border:     "rgba(0,0,0,0.07)",
  green:      "#10B981",
  orange:     "#F59E0B",
  // Radius
  rSm:        "12px",
  rMd:        "18px",
  rLg:        "24px",
  // Shadows
  shadowCard: "0 4px 20px rgba(0,0,0,0.08)",
  shadowElev: "0 12px 48px rgba(17,146,208,0.14)",
  shadowHov:  "0 16px 56px rgba(17,146,208,0.22)",
  shadowNav:  "0 1px 4px rgba(0,0,0,0.06)",
};

// Custom easing
const ease = "cubic-bezier(0.22,1,0.36,1)";

const BASE = 100;

// ─── Data helpers ─────────────────────────────────────────────────────────────
async function getCount() {
  try {
    const { count } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true });
    return (count || 0) + BASE;
  } catch { return BASE; }
}

// ─── LiveCounter ──────────────────────────────────────────────────────────────
function LiveCounter({ value }: { value: number }) {
  const [d, setD] = useState(value);
  const p = useRef(value);
  useEffect(() => {
    if (value === p.current) return;
    let c = p.current; const dir = value > c ? 1 : -1;
    const t = setInterval(() => { c += dir; setD(c); if (c === value) { clearInterval(t); p.current = value; } }, 22);
    return () => clearInterval(t);
  }, [value]);
  return <>{d.toLocaleString("fr-FR")}</>;
}

// ─── Logo ─────────────────────────────────────────────────────────────────────
function Logo({ size = 32, inverted = false }: { size?: number; inverted?: boolean }) {
  const ring = inverted ? "rgba(255,255,255,0.5)" : B.tx2;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="19" stroke={ring} strokeWidth="2.5" fill="none"/>
        <path d="M30 20a10 10 0 1 1-10-10" stroke={B.primary} strokeWidth="3" strokeLinecap="round" fill="none"/>
        <circle cx="30" cy="20" r="3.5" fill={B.primary}/>
      </svg>
      <span style={{ fontFamily: "'Syne',sans-serif", fontSize: size * 0.56, fontWeight: 700, color: inverted ? "#fff" : B.tx1, letterSpacing: "-0.03em" }}>
        Candi<span style={{ color: B.primary }}>Apply</span>
      </span>
    </div>
  );
}

// ─── Badge / Pill ─────────────────────────────────────────────────────────────
function Pill({ children, dot, dark }: { children: React.ReactNode; dot?: boolean; dark?: boolean }) {
  const bg = dark ? "rgba(17,146,208,0.1)" : B.badge;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: bg, color: B.primary, border: `1px solid rgba(17,146,208,0.18)`, borderRadius: 9999, padding: "6px 16px", fontSize: 13, fontWeight: 600, fontFamily: "'Inter',sans-serif" }}>
      {dot && (
        <span style={{ position: "relative", display: "inline-flex", width: 8, height: 8 }}>
          <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: B.primary, opacity: 0.75, animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite" }} />
          <span style={{ position: "relative", display: "inline-flex", width: 8, height: 8, borderRadius: "50%", background: B.primary }} />
        </span>
      )}
      {children}
    </span>
  );
}

// ─── Section label ────────────────────────────────────────────────────────────
function SLabel({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span style={{ display: "inline-block", background: dark ? "rgba(17,146,208,0.1)" : B.badge, color: B.primary, fontSize: 11, fontWeight: 700, padding: "5px 13px", borderRadius: 9999, letterSpacing: "0.04em", textTransform: "uppercase" as const, fontFamily: "'Inter',sans-serif", marginBottom: 14 }}>
      {children}
    </span>
  );
}

// ─── Avatars row ──────────────────────────────────────────────────────────────
const EMOJIS = ["👩🏾‍💼", "👨🏻‍💻", "👩🏼‍🎨", "👨🏽‍💼", "👩🏻‍💻", "👨🏾‍🎓"];
function Avatars({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ display: "flex" }}>
        {EMOJIS.map((e, i) => (
          <div key={i} style={{ width: 30, height: 30, borderRadius: "50%", background: B.badge, border: `2px solid ${B.card}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, marginLeft: i === 0 ? 0 : -9, zIndex: EMOJIS.length - i }}>
            {e}
          </div>
        ))}
      </div>
      <span style={{ fontSize: 13, color: B.tx3, fontFamily: "'Inter',sans-serif" }}>
        <strong style={{ color: B.tx2, fontWeight: 600 }}><LiveCounter value={count} /></strong> personnes déjà inscrites
      </span>
    </div>
  );
}

// ─── Feature Card ─────────────────────────────────────────────────────────────
function FCard({ icon, color = B.primary, title, desc, soon, delay = 0 }: {
  icon: string; color?: string; title: string; desc: string; soon?: boolean; delay?: number;
}) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: B.card,
        border: `1px solid ${hov ? "rgba(17,146,208,0.25)" : B.border}`,
        borderRadius: B.rLg,
        padding: "24px",
        transition: `all 0.2s ${ease}`,
        animation: `fadeUp 0.5s ${ease} ${delay}s both`,
        position: "relative" as const,
        boxShadow: hov ? `${B.shadowCard}, 0 0 0 2px rgba(17,146,208,0.12)` : B.shadowCard,
      }}
    >
      {soon && (
        <span style={{ position: "absolute" as const, top: 14, right: 14, fontSize: 10, fontWeight: 700, background: "#FEF3C7", color: "#92400E", borderRadius: 9999, padding: "2px 8px", fontFamily: "'Inter',sans-serif", letterSpacing: "0.04em", textTransform: "uppercase" as const }}>
          Bientôt
        </span>
      )}
      <div style={{ width: 48, height: 48, borderRadius: B.rSm, background: `${color}18`, border: `1.5px solid ${color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 16 }}>
        {icon}
      </div>
      <div style={{ fontSize: 17, fontWeight: 700, color: B.tx1, marginBottom: 8, fontFamily: "'Syne',sans-serif", lineHeight: 1.3 }}>
        {title}
      </div>
      <div style={{ fontSize: 14, color: B.tx3, lineHeight: "1.65", fontFamily: "'Inter',sans-serif" }}>
        {desc}
      </div>
    </div>
  );
}

// ─── Step ─────────────────────────────────────────────────────────────────────
function Step({ icon, color, title, desc, isLast, delay = 0 }: {
  icon: string; color: string; title: string; desc: string; isLast: boolean; delay?: number;
}) {
  return (
    <div style={{ display: "flex", gap: 16, animation: `fadeUp 0.5s ${ease} ${delay}s both` }}>
      <div style={{ flexShrink: 0, display: "flex", flexDirection: "column" as const, alignItems: "center" }}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: `${color}12`, border: `2px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
          {icon}
        </div>
        {!isLast && <div style={{ width: 2, flex: 1, minHeight: 20, background: B.border, marginTop: 4, marginBottom: 4 }} />}
      </div>
      <div style={{ flex: 1, paddingBottom: isLast ? 0 : 20 }}>
        <div style={{ background: B.card, border: `1px solid ${B.border}`, borderRadius: B.rSm, padding: "16px 20px", boxShadow: B.shadowCard }}>
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 700, color: B.tx1, marginBottom: 6 }}>
            {title}
          </div>
          <p style={{ fontSize: 14, color: B.tx3, margin: 0, lineHeight: "1.65", fontFamily: "'Inter',sans-serif" }}>
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Waitlist Form ────────────────────────────────────────────────────────────
function Form({ onSuccess }: { onSuccess: (n: number) => void }) {
  const [fn, setFn] = useState(""), [em, setEm] = useState(""), [role, setRole] = useState("");
  const [loading, setLoading] = useState(false), [err, setErr] = useState("");
  const navigate = useNavigate();

  const inputStyle = {
    width: "100%", padding: "11px 14px", borderRadius: B.rSm, fontSize: 14,
    border: `1.5px solid rgba(0,0,0,0.1)`, background: B.card, color: B.tx1,
    fontFamily: "'Inter',sans-serif", outline: "none", transition: `border-color 0.18s ${ease}`,
  };

  const go = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fn.trim()) { setErr("Ton prénom est requis 👋"); return; }
    if (!em.includes("@")) { setErr("Adresse email invalide."); return; }
    setErr(""); setLoading(true);
    try {
      await supabase.from("waitlist").upsert({ email: em, name: fn.trim() }, { onConflict: "email" });
      const { count } = await supabase.from("waitlist").select("*", { count: "exact", head: true });
      onSuccess((count || 1) + BASE);
      navigate(`/waitlist/complete?email=${encodeURIComponent(em)}`);
    } catch {
      setErr("Une erreur est survenue. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={go} style={{ display: "flex", flexDirection: "column" as const, gap: 10 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <input value={fn} onChange={e => setFn(e.target.value)} placeholder="Ton prénom" style={inputStyle}
          onFocus={e => (e.target.style.borderColor = B.primary)} onBlur={e => (e.target.style.borderColor = "rgba(0,0,0,0.1)")} />
        <input value={em} onChange={e => setEm(e.target.value)} placeholder="ton@email.com" type="email" style={inputStyle}
          onFocus={e => (e.target.style.borderColor = B.primary)} onBlur={e => (e.target.style.borderColor = "rgba(0,0,0,0.1)")} />
      </div>
      <select value={role} onChange={e => setRole(e.target.value)}
        style={{ ...inputStyle, color: role ? B.tx1 : B.tx3 }}>
        <option value="">Ton profil (optionnel)</option>
        <option>Product Owner / Product Manager</option>
        <option>UX/UI Designer</option>
        <option>Développeur / Développeuse</option>
        <option>Data Analyst / Data Scientist</option>
        <option>Marketing / Growth</option>
        <option>Commercial / Business Dev</option>
        <option>RH / Recrutement</option>
        <option>Autre profil</option>
      </select>
      {err && (
        <div style={{ fontSize: 12, color: "#991B1B", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "8px 12px", fontFamily: "'Inter',sans-serif" }}>
          ⚠️ {err}
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        style={{
          padding: "13px", borderRadius: B.rMd, border: "none",
          background: loading ? B.tx3 : B.primary, color: "#fff",
          fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
          fontFamily: "'Syne',sans-serif", transition: `all 0.2s ${ease}`, marginTop: 2,
          boxShadow: loading ? "none" : B.shadowElev,
        }}
      >
        {loading
          ? (
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <span style={{ width: 14, height: 14, border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block" }} />
              Inscription…
            </span>
          )
          : "Rejoindre la liste d'attente →"}
      </button>
      <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 2 }}>
        {["✓ Gratuit", "✓ Sans engagement", "✓ RGPD 🇫🇷"].map(t => (
          <span key={t} style={{ fontSize: 11, color: B.tx3, fontWeight: 500, fontFamily: "'Inter',sans-serif" }}>{t}</span>
        ))}
      </div>
    </form>
  );
}

// ─── Content data ─────────────────────────────────────────────────────────────
const FEATURES = [
  { icon: "⚡", color: B.primary,   title: "Veille intelligente",                desc: "Ton agent trouve et score les meilleures offres chaque jour selon ton profil. Tu ne vois que ce qui te correspond." },
  { icon: "✦",  color: "#7C3AED",   title: "CV & Lettre de motivation sur-mesure", desc: "Colle une offre. L'IA adapte ton CV et rédige une lettre de motivation personnalisée en quelques secondes." },
  { icon: "◈",  color: "#10B981",   title: "Tracker de candidatures",             desc: "Un Kanban visuel pour suivre toutes tes candidatures. Rappels de relance J+7 automatiques." },
  { icon: "◎",  color: "#F97316",   title: "Coach entretien IA",                  desc: "Entraîne-toi avec 4 personnalités de recruteurs IA. Feedback structuré et score à chaque session.", soon: true },
  { icon: "◉",  color: "#EC4899",   title: "Mission Control",                     desc: "Dashboard central : offres matchées ≥ 70%, pipeline, routine quotidienne et objectifs hebdo réunis." },
  { icon: "🔔", color: "#0EA5E9",   title: "Alertes & relances automatiques",     desc: "Reçois une alerte dès qu'une offre parfaite est publiée. Rappels de relance sans rien à configurer.", soon: true },
];

const STEPS = [
  { icon: "⚡", color: B.primary, title: "Ton agent scanne le marché",      desc: "Il cherche les offres publiées depuis 72h qui correspondent à ton profil et les score automatiquement." },
  { icon: "◉",  color: "#EC4899", title: "Tu vois les offres qui matchent", desc: "Seules les offres à 70%+ de compatibilité s'affichent. Tu ne perds plus de temps à trier." },
  { icon: "✦",  color: "#7C3AED", title: "Tu personnalises et tu envoies",  desc: "L'IA adapte ton CV et rédige une lettre de motivation. Tu relis, tu modifies si besoin, tu envoies." },
  { icon: "◎",  color: "#F97316", title: "Tu t'entraînes à l'entretien",    desc: "30 min avec un recruteur IA. Questions difficiles, feedback précis, score /10 à chaque session." },
];

const MARQUEE = ["Veille automatique", "Score de matching", "CV personnalisé", "Lettre de motivation", "4 recruteurs IA", "Tracker Kanban", "Rappels relance J+7", "Coaching entretien", "Mission Control", "1h / jour"];

const PROBLEMS = [
  { icon: "😩", title: "Des heures perdues",   desc: "À trier des offres qui ne correspondent pas vraiment à votre profil." },
  { icon: "📋", title: "Un suivi ingérable",  desc: "Des candidatures qui se perdent dans un Excel ou dans les emails." },
  { icon: "😰", title: "Des entretiens ratés", desc: "Faute de préparation structurée et de feedback concret." },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Index() {
  const [count, setCount] = useState(BASE);
  const [scrolled, setScrolled] = useState(false);
  const formRef = useRef<HTMLElement>(null);

  useEffect(() => {
    getCount().then(setCount);
    const poll = setInterval(() => getCount().then(setCount), 15000);
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => { clearInterval(poll); window.removeEventListener("scroll", onScroll); };
  }, []);

  const toForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    <div style={{ background: B.bg, color: B.tx2, fontFamily: "'Inter',sans-serif", overflowX: "hidden", minHeight: "100vh" }}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes ping{75%,100%{transform:scale(2);opacity:0}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        input::placeholder{color:${B.tx4};font-family:'Inter',sans-serif;}
        select option{color:${B.tx1};background:${B.card};}
        button:hover:not(:disabled){filter:brightness(0.93);}
      `}</style>

      {/* ── NAVBAR ──────────────────────────────────────────────────────────── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 64,
        padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(255,255,255,0.9)" : B.bg,
        borderBottom: `1px solid ${scrolled ? "rgba(0,0,0,0.07)" : "transparent"}`,
        backdropFilter: scrolled ? "blur(20px)" : "none",
        boxShadow: scrolled ? B.shadowNav : "none",
        transition: `all 0.25s ${ease}`,
      }}>
        <Logo size={30} />
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 9999, background: B.badge, border: `1px solid rgba(17,146,208,0.2)` }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: B.green, display: "inline-block", animation: "blink 2s infinite" }} />
            <span style={{ fontSize: 11, color: B.primary, fontWeight: 600, fontFamily: "'Inter',sans-serif" }}>
              <LiveCounter value={count} /> inscrits
            </span>
          </div>
          <button
            onClick={toForm}
            style={{ padding: "8px 20px", borderRadius: B.rMd, border: "none", background: B.primary, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter',sans-serif", transition: `all 0.2s ${ease}`, boxShadow: B.shadowCard }}
          >
            S'inscrire
          </button>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section style={{
        paddingTop: 120, paddingBottom: 80, paddingLeft: 24, paddingRight: 24,
        textAlign: "center", position: "relative", overflow: "hidden",
        background: `
          radial-gradient(ellipse 70% 50% at 25% 50%, rgba(17,146,208,0.06) 0%, transparent 70%),
          radial-gradient(ellipse 50% 40% at 75% 60%, rgba(16,185,129,0.04) 0%, transparent 70%),
          ${B.bg}
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
          {/* Badge animé */}
          <div style={{ marginBottom: 24, animation: `fadeUp 0.6s ${ease} 0.05s both` }}>
            <Pill dot>Bêta ouverte · Marché français</Pill>
          </div>

          {/* H1 */}
          <h1 style={{
            fontFamily: "'Syne',sans-serif", fontWeight: 800,
            fontSize: "clamp(42px, 5.5vw, 58px)",
            letterSpacing: "-0.05em", lineHeight: 1.05,
            color: B.tx1, margin: "0 0 22px",
            animation: `fadeUp 0.7s ${ease} 0.1s both`,
          }}>
            Trouvez votre prochain emploi<br />
            <span style={{ color: B.primary }}>sans passer des heures à chercher</span>
          </h1>

          {/* Sous-titre */}
          <p style={{
            fontSize: 17, color: B.tx3, lineHeight: 1.72,
            maxWidth: 520, margin: "0 auto 30px",
            animation: `fadeUp 0.7s ${ease} 0.15s both`,
          }}>
            CandiApply analyse votre profil, score les offres qui vous correspondent, personnalise vos candidatures et vous prépare aux entretiens.{" "}
            <strong style={{ color: B.tx2 }}>Tout en un — chaque matin, en 1h.</strong>
          </p>

          {/* Avatars */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 30, animation: `fadeUp 0.7s ${ease} 0.2s both` }}>
            <Avatars count={count} />
          </div>

          {/* CTA buttons */}
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 14, animation: `fadeUp 0.7s ${ease} 0.25s both` }}>
            <button
              onClick={toForm}
              style={{ padding: "13px 28px", borderRadius: B.rMd, border: "none", background: B.primary, color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter',sans-serif", boxShadow: B.shadowElev, transition: `all 0.2s ${ease}` }}
            >
              Commencer maintenant →
            </button>
            <button
              onClick={toForm}
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "13px 20px", borderRadius: B.rMd, border: "none", background: "transparent", color: B.tx2, fontSize: 15, fontWeight: 500, cursor: "pointer", fontFamily: "'Inter',sans-serif", transition: `color 0.2s ${ease}` }}
            >
              <span style={{ width: 32, height: 32, borderRadius: "50%", background: B.badge, display: "flex", alignItems: "center", justifyContent: "center", color: B.primary, fontSize: 12 }}>▶</span>
              Voir comment ça marche
            </button>
          </div>

          <p style={{ fontSize: 12, color: B.tx3, animation: `fadeUp 0.7s ${ease} 0.3s both`, fontFamily: "'Inter',sans-serif" }}>
            Accès prioritaire · Gratuit · Sans engagement · RGPD 🇫🇷
          </p>
        </div>
      </section>

      {/* ── MARQUEE ─────────────────────────────────────────────────────────── */}
      <div style={{ borderTop: `1px solid ${B.border}`, borderBottom: `1px solid ${B.border}`, padding: "14px 0", overflow: "hidden", background: B.card }}>
        <div style={{ display: "flex", animation: "marquee 30s linear infinite", width: "max-content" }}>
          {[...Array(2)].map((_, ri) => (
            <div key={ri} style={{ display: "flex", gap: 44, paddingRight: 44, alignItems: "center" }}>
              {MARQUEE.map(t => (
                <span key={t} style={{ fontSize: 12, color: B.tx3, fontWeight: 500, whiteSpace: "nowrap", fontFamily: "'Inter',sans-serif" }}>
                  <span style={{ color: B.primary, marginRight: 6 }}>✦</span>{t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── PROBLEM (dark) ──────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 24px", background: B.bgDark }}>
        <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
          <div style={{ marginBottom: 14 }}><SLabel dark>Le problème</SLabel></div>
          <h2 style={{
            fontFamily: "'Syne',sans-serif", fontWeight: 800,
            fontSize: "clamp(32px, 4vw, 44px)", letterSpacing: "-0.04em", lineHeight: 1.1,
            color: "#ffffff", marginBottom: 16,
          }}>
            La recherche d'emploi est<br />un travail à plein temps
          </h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.45)", lineHeight: 1.72, maxWidth: 520, margin: "0 auto 44px" }}>
            Surveiller des dizaines de sites, adapter son CV pour chaque offre, relancer sans oublier personne… tout ça en parallèle d'une vie normale.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14 }}>
            {PROBLEMS.map(({ icon, title, desc }) => (
              <div key={title} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: B.rLg, padding: "24px", textAlign: "left", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{icon}</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 700, color: "#ffffff", marginBottom: 8 }}>{title}</div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: "1.65", fontFamily: "'Inter',sans-serif" }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES (light) ────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 24px", background: B.bg, borderBottom: `1px solid ${B.border}` }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ marginBottom: 14 }}><SLabel>6 modules · 1 pipeline</SLabel></div>
            <h2 style={{
              fontFamily: "'Syne',sans-serif", fontWeight: 800,
              fontSize: "clamp(32px, 4vw, 44px)", letterSpacing: "-0.04em", lineHeight: 1.1,
              color: B.tx1,
            }}>
              Tout ce dont vous avez besoin.<br />
              <span style={{ color: B.tx3 }}>Rien de superflu.</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 16 }}>
            {FEATURES.map((f, i) => <FCard key={f.title} {...f} delay={0.04 + i * 0.06} />)}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS (white) ────────────────────────────────────────────── */}
      <section style={{ padding: "80px 24px", background: B.card, borderBottom: `1px solid ${B.border}` }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ marginBottom: 14 }}><SLabel>Ta journée avec CandiApply</SLabel></div>
            <h2 style={{
              fontFamily: "'Syne',sans-serif", fontWeight: 800,
              fontSize: "clamp(32px, 4vw, 44px)", letterSpacing: "-0.04em", lineHeight: 1.1,
              color: B.tx1,
            }}>
              1h par jour.<br />Pas plus.
            </h2>
          </div>
          {STEPS.map((s, i) => (
            <Step key={i} {...s} isLast={i === STEPS.length - 1} delay={0.05 + i * 0.08} />
          ))}
        </div>
      </section>

      {/* ── WAITLIST FORM (dark + glow) ─────────────────────────────────────── */}
      <section
        ref={formRef}
        style={{
          padding: "80px 24px 100px",
          background: `
            radial-gradient(ellipse 50% 50% at 50% 50%, rgba(17,146,208,0.15) 0%, transparent 70%),
            ${B.bgDark}
          `,
          borderTop: `1px solid rgba(17,146,208,0.12)`,
        }}
      >
        <div style={{ maxWidth: 460, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ marginBottom: 16 }}><Pill dark>🚀 Accès bêta prioritaire — Places limitées</Pill></div>
            <h2 style={{
              fontFamily: "'Syne',sans-serif", fontWeight: 800,
              fontSize: "clamp(28px, 4.5vw, 40px)", letterSpacing: "-0.04em", lineHeight: 1.1,
              color: "#ffffff", marginBottom: 12,
            }}>
              Ton prochain entretien<br />
              <span style={{ color: B.primary }}>commence ici.</span>
            </h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.65, fontFamily: "'Inter',sans-serif" }}>
              Inscris-toi maintenant. Les 100 premiers ont accès au plan Pro{" "}
              <strong style={{ color: "rgba(255,255,255,0.8)" }}>gratuit pendant 1 an.</strong>
            </p>
          </div>

          {/* Form card */}
          <div style={{ background: B.card, border: `1px solid ${B.border}`, borderRadius: B.rLg, padding: 28, boxShadow: B.shadowElev }}>
            <Form onSuccess={n => setCount(n)} />
          </div>

          {/* Counter bar */}
          <div style={{ marginTop: 14, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: B.rSm, padding: "12px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: B.green, display: "inline-block", animation: "blink 1.8s infinite" }} />
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", fontFamily: "'Inter',sans-serif" }}>
                <strong style={{ color: "#fff", fontWeight: 600 }}><LiveCounter value={count} /></strong> personnes inscrites
              </span>
            </div>
            <span style={{ fontSize: 11, color: "#92400E", fontWeight: 700, background: "#FEF3C7", border: "1px solid #FDE68A", borderRadius: 6, padding: "2px 8px", fontFamily: "'Inter',sans-serif" }}>
              {Math.max(0, 100 - count)} places Pro restantes
            </span>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer style={{ background: B.bgDarker, padding: "24px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <Logo size={28} inverted />
        <div style={{ display: "flex", gap: 24 }}>
          {["CGU", "Confidentialité", "Contact"].map(l => (
            <span key={l} style={{ fontSize: 12, color: "rgba(255,255,255,0.28)", cursor: "pointer", fontFamily: "'Inter',sans-serif", transition: `color 0.2s ${ease}` }}
              onMouseEnter={e => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.65)")}
              onMouseLeave={e => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.28)")}
            >
              {l}
            </span>
          ))}
        </div>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.28)", fontFamily: "'Inter',sans-serif" }}>© 2026 CandiApply · Made in 🇫🇷</span>
      </footer>
    </div>
  );
}
