import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confidentialité",
  robots: { index: false },
};

export default function Page() {
  return (
    <main className="flex-1 bg-ivory-50">
      <div className="mx-auto flex max-w-[760px] flex-col gap-6 px-6 py-16 min-[900px]:px-12 min-[900px]:py-24">
        <h1 className="text-[38px] leading-[1.05] tracking-[-0.035em] text-wine-700 min-[700px]:text-[52px]">
          Politique de confidentialité
        </h1>
        {/* TODO: replace this placeholder with the real legal text. */}
        <p className="text-base leading-[1.7] text-muted-ink">
          [TEXTE JURIDIQUE À COMPLÉTER] Cette page contiendra le texte officiel de Meyla Shop.
        </p>
      </div>
    </main>
  );
}
