import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const WaitlistForm = ({ className = "" }: { className?: string }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");
    try {
      const { error: dbError } = await supabase
        .from("waitlist")
        .insert({ email });
      if (dbError) {
        if (dbError.code === "23505") {
          setError("Cet email est déjà inscrit !");
        } else {
          setError("Une erreur est survenue. Réessayez.");
        }
      } else {
        navigate(`/waitlist/complete?email=${encodeURIComponent(email)}`);
      }
    } catch {
      setError("Une erreur est survenue. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col gap-3 ${className}`}>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com"
            required
            disabled={loading}
            className="w-full rounded-lg border border-input bg-card py-3 pl-10 pr-4 text-sm outline-none ring-ring transition-shadow focus:ring-2 focus:ring-offset-2 disabled:opacity-50"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="gradient-hero flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 hover:shadow-elevated active:scale-[0.98] disabled:opacity-70"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Rejoindre la liste d'attente <ArrowRight className="h-4 w-4" /></>}
        </button>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </form>
  );
};

export default WaitlistForm;
