# CandiApply — Waitlist V5
> Landing page + démo interactive · Déploiement sur candiapply.fr

---

## 📁 Structure du projet

```
src/
├── App.jsx                    ← Point d'entrée (routage landing ↔ démo)
├── constants.js               ← Brand tokens, copy, données statiques
├── lib/
│   └── supabase.js            ← Client Supabase + fonctions waitlist
├── components/
│   ├── UI.jsx                 ← Composants réutilisables (Logo, Pill, Step…)
│   └── WaitlistForm.jsx       ← Formulaire d'inscription
└── pages/
    ├── LandingPage.jsx        ← Page principale (Navbar, Hero, Features…)
    └── DemoPage.jsx           ← Page démo interactive (4 modules)
```

---

## ⚙️ Stack technique

| Outil        | Usage                          |
|--------------|--------------------------------|
| React + Vite | Framework UI                   |
| Supabase     | BDD waitlist + compteur live   |
| Vercel       | Déploiement & domaine          |
| Space Grotesk / Inter | Typographies (Google Fonts) |

---

## 🚀 Setup local (VS Code)

### 1. Créer le projet Vite

```bash
npm create vite@latest candiapply -- --template react
cd candiapply
npm install
npm install @supabase/supabase-js
```

### 2. Copier les fichiers

Remplacez le contenu de `src/` par les fichiers fournis.

### 3. Variables d'environnement

Créez un fichier `.env.local` à la racine :

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> Trouvez ces valeurs dans : Supabase → Project Settings → API

### 4. Lancer en local

```bash
npm run dev
# → http://localhost:5173
```

---

## 🗄️ Setup Supabase

### 1. Créer le projet
- Aller sur [supabase.com](https://supabase.com)
- New project → nommer "candiapply-waitlist"

### 2. Créer la table waitlist

Dans **SQL Editor**, exécuter :

```sql
-- Table
create table waitlist (
  id         uuid primary key default gen_random_uuid(),
  first_name text not null,
  email      text not null unique,
  role       text,
  created_at timestamptz default now()
);

-- Activer RLS
alter table waitlist enable row level security;

-- Permettre les insertions publiques
create policy "public insert" on waitlist
  for insert with check (true);

-- Permettre de compter les inscrits
create policy "public count" on waitlist
  for select using (true);
```

### 3. Récupérer les clés API
- Project Settings → API
- Copier `Project URL` → `VITE_SUPABASE_URL`
- Copier `anon public` → `VITE_SUPABASE_ANON_KEY`

---

## 🌐 Déploiement sur candiapply.fr (Vercel)

### 1. Push sur GitHub

```bash
git init
git add .
git commit -m "feat: waitlist landing v5"
git remote add origin https://github.com/VOTRE_USERNAME/candiapply.git
git push -u origin main
```

### 2. Importer sur Vercel

- Aller sur [vercel.com](https://vercel.com)
- New Project → Import depuis GitHub
- Framework : **Vite**
- Build command : `npm run build`
- Output dir : `dist`

### 3. Variables d'environnement sur Vercel

Settings → Environment Variables :

```
VITE_SUPABASE_URL        = https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY   = eyJ...
```

### 4. Connecter le domaine candiapply.fr

- Vercel → Project → Settings → Domains
- Ajouter `candiapply.fr` et `www.candiapply.fr`
- Chez votre registrar, pointer les DNS :
  ```
  A     @    76.76.21.21
  CNAME www  cname.vercel-dns.com
  ```

---

## ✏️ Modifier le contenu facilement

Tout le contenu modifiable est dans `src/constants.js` :

| Ce que tu veux changer        | Variable dans constants.js   |
|-------------------------------|------------------------------|
| Textes des features           | `FEATURES`                   |
| Étapes "Ta journée"           | `STEPS`                      |
| Pain points                   | `PROBLEMS`                   |
| Texte défilant (marquee)      | `MARQUEE_ITEMS`              |
| Nb de places Pro              | `WAITLIST_CONFIG.maxProSlots`|
| Couleurs & ombres             | `B` (brand tokens)           |
| Options du select "profil"    | `ROLE_OPTIONS`               |

---

## 📊 Voir les inscrits

Dans Supabase → Table Editor → `waitlist`

Ou avec cette requête SQL :
```sql
select first_name, email, role, created_at
from waitlist
order by created_at desc;
```

---

## 🔜 Prochaines étapes

- [ ] Email de confirmation automatique (Supabase Edge Functions + Resend)
- [ ] Tableau de bord admin simple (Supabase Studio)
- [ ] Analytics (Vercel Analytics ou Plausible)
- [ ] A/B test hero copy

---

*CandiApply · Made in 🇫🇷 · 2026*
