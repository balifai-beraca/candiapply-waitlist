import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { User, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.png";

const WaitlistComplete = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get("email") || "";
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!email) navigate("/");
  }, [email, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    setError("");
    try {
      const { error: dbError } = await supabase
  .from("waitlist")
  .update({ name: name.trim() })
  .eq("email", email);
      if (dbError) {
        setError("Une erreur est survenue. Réessayez.");
      } else {
        setDone(true);
      }
    } catch {
      setError("Une erreur est survenue. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
        <img src={logo} alt="CandiApply" className="mb-8 h-14 object-contain" />
        <div className="mx-auto max-w-md text-center">
          <div className="mb-4 text-5xl">🎉</div>
          <h1 className="mb-3 font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">
            Bienvenue {name} !
          </h1>
          <p className="mb-6 text-muted-foreground">
            Tu es officiellement sur la liste. On te prévient en avant-première dès que c'est prêt !
          </p>
          <button
            onClick={() => navigate("/")}
            className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <img src={logo} alt="CandiApply" className="mb-8 h-14 object-contain" />
      <div className="mx-auto w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-elevated)] sm:p-10">
        <div className="mb-6 flex items-center gap-2 text-primary">
          <Sparkles className="h-5 w-5" />
          <span className="text-sm font-semibold uppercase tracking-wide">Dernière étape</span>
        </div>
        <h1 className="mb-2 font-[family-name:var(--font-display)] text-2xl font-bold text-foreground sm:text-3xl">
          Une dernière petite chose… 👋
        </h1>
        <p className="mb-2 text-muted-foreground">
          Je voudrais faire ta connaissance ! Comment tu t'appelles ?
        </p>
        <p className="mb-6 text-sm text-muted-foreground/70">
          Inscrit avec <span className="font-medium text-foreground">{email}</span>
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ton prénom"
              required
              autoFocus
              disabled={loading}
              className="w-full rounded-lg border border-input bg-background py-3 pl-10 pr-4 text-sm outline-none ring-ring transition-shadow focus:ring-2 focus:ring-offset-2 disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !name.trim()}
            className="gradient-hero flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>C'est parti ! <ArrowRight className="h-4 w-4" /></>
            )}
          </button>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default WaitlistComplete;