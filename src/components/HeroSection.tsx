import WaitlistForm from "./WaitlistForm";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 lg:px-8 bg-primary-foreground">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-4 py-1.5 text-xs font-medium text-accent-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          Bientôt disponible — Inscriptions ouvertes
        </div>

        <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Trouvez votre prochain emploi{" "}
           <span className="text-primary">
            sans passer des heures
           </span>{" "}
          à chercher
        </h1>

        <p className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground">
          Candiapply analyse votre profil et vous envoie chaque matin les offres
          qui vous correspondent vraiment — avec un score de compatibilité
          expliqué.
        </p>

        <WaitlistForm className="mx-auto max-w-lg" />

        <p className="mt-4 text-muted-foreground my-[17px] text-base">Gratuit · Sans engagement








        </p>
      </div>
    </section>);};export default HeroSection;