import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PromoBanner() {
  return (
    <section
      aria-labelledby="promo-title"
      className="relative my-14 grid min-h-[300px] overflow-hidden rounded-[2px_2px_2px_140px] bg-wine-700 text-ivory-100 min-[900px]:grid-cols-[1.2fr_1fr]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[120px] -top-[160px] size-[420px] rounded-full border border-ivory-100/15"
      />
      <div className="relative flex flex-col items-start justify-center gap-5 p-8 min-[900px]:p-12">
        <span className="bg-blush-300 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-wine-700">
          Offre de saison
        </span>
        <h2
          id="promo-title"
          className="text-[32px] leading-[1.1] tracking-[-0.03em] min-[900px]:text-[40px]"
        >
          Jusqu&apos;à <span className="text-blush-300">−20 %</span> sur les pyjamas en velours.
        </h2>
        <Button
          variant="light"
          size="brand"
          nativeButton={false}
          render={<Link href="/boutique?categorie=pyjamas&promo=1" />}
        >
          Voir l&apos;offre
          <ArrowRight />
        </Button>
      </div>
      <div className="relative min-h-[240px]">
        <Image
          src="/images/product-pyjama-velours.jpg"
          alt="Pyjama en velours bordeaux"
          fill
          sizes="(min-width: 900px) 40vw, 100vw"
          className="object-cover object-[center_30%]"
        />
      </div>
    </section>
  );
}
