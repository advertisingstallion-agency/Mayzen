import Image from "next/image";
import { FaqChat } from "@/components/home/faq-chat";
import { faqItems } from "@/config/faq";

const topics = ["Livraison", "Tailles", "Retours", "Entretien"];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden bg-ivory-50 py-[72px] min-[700px]:py-28"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      
      <div className="relative mx-auto grid max-w-[1440px] items-start gap-12 px-6 min-[900px]:px-12 min-[1100px]:grid-cols-[5fr_7fr] min-[1100px]:gap-20">
        <div className="flex flex-col gap-6 min-[1100px]:sticky min-[1100px]:top-12">
          <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.14em] text-cognac">
            <span aria-hidden="true" className="h-px w-10 bg-cognac" />
            Aide
          </p>
          <h2
            id="faq-title"
            className="text-4xl leading-[1.04] tracking-[-0.035em] text-wine-700 min-[700px]:text-[56px]"
          >
            Une question ? <span className="text-cognac">On vous répond.</span>
          </h2>
          <p className="max-w-[400px] text-[17px] leading-[1.6] text-muted-ink">
            Touchez une question pour lire la réponse, comme dans une vraie
            conversation. Et si vous ne trouvez pas la vôtre, écrivez-nous.
          </p>
          <ul className="flex flex-wrap gap-2.5" aria-hidden="true">
            {topics.map((topic) => (
              <li
                key={topic}
                className="rounded-full border border-wine-700/25 px-4 py-2 text-sm font-medium text-wine-700"
              >
                {topic}
              </li>
            ))}
          </ul>
        </div>

        <FaqChat />
      </div>
    </section>
  );
}
