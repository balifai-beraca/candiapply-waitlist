import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "CandiApply est-il vraiment gratuit ?",
    answer:
      "Oui, l'accès anticipé est 100 % gratuit. Inscrivez-vous à la liste d'attente et vous serez parmi les premiers à tester la plateforme sans frais.",
  },
  {
    question: "Comment l'IA sélectionne-t-elle les offres ?",
    answer:
      "Notre IA analyse votre profil (compétences, expérience, localisation, prétentions salariales) et le compare à des milliers d'offres chaque jour pour ne retenir que les plus pertinentes.",
  },
  {
    question: "Est-ce que mon CV est modifié automatiquement ?",
    answer:
      "L'IA génère une version optimisée de votre CV adaptée à chaque offre. Vous gardez toujours le contrôle et pouvez valider ou modifier avant envoi.",
  },
  {
    question: "Quand la plateforme sera-t-elle disponible ?",
    answer:
      "Le lancement est prévu courant 2026. En rejoignant la liste d'attente, vous serez notifié dès l'ouverture de la bêta et bénéficierez d'un accès prioritaire.",
  },
];

const FAQSection = () => {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
            FAQ
          </p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Questions fréquentes
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:no-underline hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
