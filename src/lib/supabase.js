// ─────────────────────────────────────────────────────────────────────────────
// lib/supabase.js — Client Supabase + fonctions waitlist
// ─────────────────────────────────────────────────────────────────────────────
//
// SETUP (à faire une fois) :
//   1. Créer un projet sur supabase.com
//   2. Copier SUPABASE_URL et SUPABASE_ANON_KEY dans votre .env.local
//   3. Exécuter le SQL ci-dessous dans l'éditeur Supabase SQL
//
// SQL À EXÉCUTER DANS SUPABASE :
// ─────────────────────────────
//   create table waitlist (
//     id         uuid primary key default gen_random_uuid(),
//     first_name text not null,
//     email      text not null unique,
//     role       text,
//     created_at timestamptz default now()
//   );
//
//   -- Activer RLS
//   alter table waitlist enable row level security;
//
//   -- Permettre les insertions publiques (sans auth)
//   create policy "public insert" on waitlist
//     for insert with check (true);
//
//   -- Permettre de compter les inscrits (sans exposer les emails)
//   create policy "public count" on waitlist
//     for select using (true);
//
// ─────────────────────────────────────────────────────────────────────────────

import { createClient } from "@supabase/supabase-js";

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey  = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// ── Récupérer le nombre total d'inscrits ─────────────────────────────────────
export async function getWaitlistCount() {
  const { count, error } = await supabase
    .from("waitlist")
    .select("*", { count: "exact", head: true });

  if (error) {
    console.error("getWaitlistCount:", error.message);
    return 0;
  }
  return count ?? 0;
}

// ── Ajouter un inscrit + retourner sa position ────────────────────────────────
export async function addToWaitlist({ firstName, email, role }) {
  // Vérifier si l'email existe déjà
  const { data: existing } = await supabase
    .from("waitlist")
    .select("id")
    .eq("email", email)
    .single();

  if (existing) {
    throw new Error("Cet email est déjà inscrit.");
  }

  // Insérer
  const { error } = await supabase
    .from("waitlist")
    .insert([{ first_name: firstName, email, role: role || null }]);

  if (error) throw new Error(error.message);

  // Retourner la position
  const count = await getWaitlistCount();
  return count;
}
