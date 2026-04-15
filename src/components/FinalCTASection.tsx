import WaitlistForm from "./WaitlistForm";

const FinalCTASection = () => {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl rounded-2xl gradient-hero p-10 text-center shadow-elevated sm:p-14">
        <h2 className="mb-4 text-3xl font-bold text-primary-foreground sm:text-4xl">
          Prêt à simplifier votre recherche d'emploi ?
        </h2>
        <p className="mb-8 text-primary-foreground/80">
          Inscrivez-vous gratuitement et soyez parmi les premiers à tester Candiapply.
        </p>
        <WaitlistForm />
        <p className="mt-4 text-xs text-primary-foreground/60">
          Gratuit · Sans engagement · Désinscription en un clic
        </p>
      </div>
    </section>
  );
};

export default FinalCTASection;
