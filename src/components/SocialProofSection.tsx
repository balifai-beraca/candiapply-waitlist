import { useEffect, useState, useRef } from "react";
import { Users, Briefcase, TrendingUp } from "lucide-react";

const useCountUp = (target: number, duration = 2000) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
};

const stats = [
  { icon: Users, value: 1247, suffix: "+", label: "Inscrits sur la liste d'attente" },
  { icon: Briefcase, value: 15000, suffix: "+", label: "Offres analysées chaque jour" },
  { icon: TrendingUp, value: 94, suffix: "%", label: "Taux de pertinence moyen" },
];

const SocialProofSection = () => {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-8 md:grid-cols-3">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ icon: Icon, value, suffix, label }: { icon: typeof Users; value: number; suffix: string; label: string }) => {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="text-center">
      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-4xl font-bold text-foreground">
        {count.toLocaleString("fr-FR")}
        <span className="text-primary">{suffix}</span>
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
};

export default SocialProofSection;
