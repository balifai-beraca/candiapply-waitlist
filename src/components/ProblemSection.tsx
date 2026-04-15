const problems = [
{
  emoji: "😩",
  text: "Vous passez des heures sur Indeed, LinkedIn et l'APEC pour trouver des offres qui ne correspondent pas vraiment à votre profil."
},
{
  emoji: "📋",
  text: "Vous remplissez les mêmes informations sur des dizaines de formulaires différents."
},
{
  emoji: "🔕",
  text: "Vous candidatez dans le vide et ne savez pas pourquoi vous n'obtenez pas de réponses."
}];


const ProblemSection = () => {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8 bg-primary-foreground">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
            Le problème
          </p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            La recherche d'emploi est un travail à plein temps
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {problems.map((problem, i) =>
          <div
            key={i}
            className="rounded-xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-elevated"
            style={{ animationDelay: `${i * 100}ms` }}>
            
              <span className="mb-4 block text-3xl">{problem.emoji}</span>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {problem.text}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>);

};

export default ProblemSection;