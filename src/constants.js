// ─────────────────────────────────────────────────────────────────────────────
// constants.js — Brand tokens, copy, and static data for CandiApply waitlist
// Charte graphique v1 · 2026
// ─────────────────────────────────────────────────────────────────────────────

// ── BRAND TOKENS ─────────────────────────────────────────────────────────────
export const B = {
  // Couleurs (source: Brand Guidelines HSL)
  primary:     "#1192D0",   // Boutons, CTA, accents
  foreground:  "#17304A",   // Texte principal
  background:  "#F6F8FA",   // Fond principal
  muted:       "#6B7280",   // Texte secondaire
  accent:      "#E6F4FD",   // Badges, surbrillance
  card:        "#FFFFFF",   // Fond des cartes
  border:      "#E2E6EA",   // Bordures, séparateurs
  destructive: "#EF4444",   // Erreurs
  green:       "#10B981",   // Succès
  orange:      "#F59E0B",   // Alertes

  // Tokens d'espacement & ombres (source: Brand Guidelines)
  radius:      "12px",
  shadowCard:  "0 4px 24px -4px rgba(17,146,208,0.08)",   // --shadow-card
  shadowElev:  "0 12px 40px -8px rgba(17,146,208,0.15)",  // --shadow-elevated
};

// ── WAITLIST CONFIG ───────────────────────────────────────────────────────────
export const WAITLIST_CONFIG = {
  baseCount:    100,   // Nombre de départ affiché (social proof)
  maxProSlots:  200,   // Nombre de places Pro gratuites (1 an)
  pollInterval: 15000, // Refresh du compteur en ms
};

// ── MARQUEE ───────────────────────────────────────────────────────────────────
export const MARQUEE_ITEMS = [
  "Veille automatique",
  "Score de matching",
  "CV personnalisé",
  "Lettre de motivation",
  "4 recruteurs IA",
  "Tracker Kanban",
  "Rappels relance J+7",
  "Coaching entretien",
  "Mission Control",
  "1h / jour",
];

// ── PROBLÈMES ─────────────────────────────────────────────────────────────────
export const PROBLEMS = [
  {
    icon:  "😩",
    title: "Des heures perdues",
    desc:  "À trier des offres qui ne correspondent pas vraiment à votre profil.",
  },
  {
    icon:  "📋",
    title: "Un suivi ingérable",
    desc:  "Des candidatures qui se perdent dans un Excel ou dans les emails.",
  },
  {
    icon:  "😰",
    title: "Des entretiens ratés",
    desc:  "Faute de préparation structurée et de feedback concret.",
  },
];

// ── FEATURES ──────────────────────────────────────────────────────────────────
export const FEATURES = [
  {
    icon:  "⚡",
    color: "#1192D0",
    title: "Veille intelligente",
    desc:  "Ton agent trouve et score les meilleures offres chaque jour selon ton profil. Tu ne vois que ce qui te correspond.",
  },
  {
    icon:  "✦",
    color: "#7C3AED",
    title: "CV & Lettre de motivation sur-mesure",
    desc: `Une offre te convient ? L'IA adapte ton CV et rédige une lettre de motivation personnalisée en quelques secondes. Tu as trouvé ailleurs ? Colle l'offre et ton agent fera le même job !`,
  },
  {
    icon:  "◈",
    color: "#10B981",
    title: "Tracker de candidatures",
    desc:  "Un Kanban visuel pour suivre toutes tes candidatures. Rappels de relance J+7 automatiques.",
  },
  {
    icon:  "◎",
    color: "#F97316",
    title: "Coach entretien avec des agents IA",
    desc:  "Entraîne-toi avec 4 personnalités de recruteurs IA. Feedback structuré et score à chaque session.",
    soon:  true,
  },
  {
    icon:  "◉",
    color: "#EC4899",
    title: "Mission Control",
    desc:  "Dashboard central : offres matchées ≥ 70%, pipeline, routine quotidienne et objectifs hebdo réunis.",
  },
  {
    icon:  "🔔",
    color: "#0EA5E9",
    title: "Alertes & relances automatiques",
    desc:  "Reçois une alerte dès qu'une offre parfaite est publiée. Rappels de relance sans rien à configurer.",
    soon:  true,
  },
];

// ── ÉTAPES "TA JOURNÉE" ───────────────────────────────────────────────────────
export const STEPS = [
  {
    icon:  "⚡",
    color: "#1192D0",
    title: "Ton agent scanne le marché",
    desc:  "Il cherche les offres publiées depuis 72h qui correspondent à ton profil et les score automatiquement.",
  },
  {
    icon:  "◉",
    color: "#EC4899",
    title: "Tu vois les offres qui matchent",
    desc:  "Seules les offres à 70%+ de compatibilité s'affichent. Tu ne perds plus de temps à trier.",
  },
  {
    icon:  "✦",
    color: "#7C3AED",
    title: "Tu personnalises tes candidatures et tu les envoies",
    desc:  "Tu as lu l'offre, elle te correspond → l'IA adapte ton CV et rédige une lettre de motivation. Tu relis, tu modifies au besoin et tu envoies.",
  },
  {
    icon:  "◎",
    color: "#F97316",
    title: "Tu t'entraînes à l'entretien",
    desc:  "30 min avec un recruteur IA. Questions difficiles, feedback précis, score /10 à chaque session.",
  },
];

// ── DEMO MODULES ──────────────────────────────────────────────────────────────
// Les écrans (Screen) sont définis dans DemoPage.jsx
export const DEMO_MODULES = [
  {
    id:       "veille",
    icon:     "⚡",
    color:    "#1192D0",
    label:    "Veille intelligente",
    title:    "L'agent scanne le marché pour toi",
    subtitle: "Chaque matin, les meilleures offres scorées selon ton profil",
    bullets:  [
      "Score de compatibilité expliqué",
      "Filtrage automatique ≥ 70%",
      "Sources : LinkedIn, WTTJ, Indeed…",
      "Mis à jour chaque matin",
    ],
  },
  {
    id:       "cv",
    icon:     "✦",
    color:    "#7C3AED",
    label:    "CV & LM sur-mesure",
    title:    "Un CV et une LM en 30 secondes",
    subtitle: "Colle l'offre, l'IA fait le reste",
    bullets:  [
      "CV adapté en 30 secondes",
      "Lettre de motivation personnalisée",
      "Score matching ATS /10",
      "Mots-clés manquants détectés",
    ],
  },
  {
    id:       "tracker",
    icon:     "◈",
    color:    "#10B981",
    label:    "Tracker Kanban",
    title:    "Ta pipeline de candidatures",
    subtitle: "0 candidature oubliée, rappels automatiques",
    bullets:  [
      "Kanban 4 colonnes drag & drop",
      "Rappels relance J+7 automatiques",
      "Stats taux de réponse en direct",
      "Notes et contacts RH intégrés",
    ],
  },
  {
    id:       "coach",
    icon:     "◎",
    color:    "#F97316",
    label:    "Coach entretien IA",
    title:    "Entraîne-toi avec de vrais recruteurs IA",
    subtitle: "4 personas, feedback structuré, score /10",
    bullets:  [
      "4 personas : DRH, Head of Product, CTO, Coach",
      "Questions STAR adaptées à ton profil",
      "Feedback détaillé après chaque session",
      "Score /10 et progression visible",
    ],
  },
];

// ── AVATARS SOCIAL PROOF ──────────────────────────────────────────────────────
export const AVATAR_EMOJIS = ["👩🏾‍💼", "👨🏻‍💻", "👩🏼‍🎨", "👨🏽‍💼", "👩🏻‍💻", "👨🏾‍🎓"];

// ── ROLE OPTIONS (formulaire) ─────────────────────────────────────────────────
export const ROLE_OPTIONS = [
  "Product Owner / Product Manager",
  "UX/UI Designer",
  "Développeur / Développeuse",
  "Data Analyst / Data Scientist",
  "Marketing / Growth",
  "Commercial / Business Dev",
  "RH / Recrutement",
  "Finances & Administration",
  "Logistique",
  "Autres (préciser)",
];
