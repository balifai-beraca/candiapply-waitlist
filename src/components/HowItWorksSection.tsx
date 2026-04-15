import { UserCircle, Search, Mail } from "lucide-react";

const steps = [
  {
    icon: UserCircle,
    number: "01",
    title: "Remplissez votre profil",
    description:
      "Décrivez votre parcours professionnel en détail — une seule fois suffit.",
  },
  {
    icon: Search,
    number: "02",
    title: "L'IA analyse les offres",
    description:
      "Notre IA passe au crible chaque jour des milliers d'offres sur tous les job boards français.",
  },
  {
    icon: Mail,
    number: "03",
    title: "Recevez vos opportunités",
    description:
      "Chaque matin, recevez vos 10 meilleures opportunités avec un score expliqué et un CV optimisé prêt à envoyer.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="gradient-subtle px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
            Comment ça marche
          </p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Simple comme 1, 2, 3
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={i} className="relative text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl gradient-hero text-primary-foreground shadow-elevated">
                <step.icon className="h-6 w-6" />
              </div>
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-primary">
                Étape {step.number}
              </p>
              <h3 className="mb-2 text-lg font-bold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
