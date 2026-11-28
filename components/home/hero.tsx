import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroVideo } from "@/components/home/hero-video";
import { categories } from "@/config/site";

const padX = "pl-6 pr-6 min-[1100px]:pl-12";
// Align the text with the navbar content when the screen is wider than 1440px.
const textPad = "min-[900px]:pl-[max(48px,calc((100vw-1440px)/2+48px))]";

export function Hero() {
  return (
    <section className="bg-wine-700 text-ivory-100">
      <div className="relative flex flex-col min-[900px]:h-[800px] min-[900px]:flex-row">
        <div
          className={`flex flex-col justify-center py-14 min-[900px]:w-[46%] min-[900px]:py-0 min-[900px]:pr-8 ${padX} ${textPad}`}
        >
          <p className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.14em] text-blush-300">
            <span className="h-px w-10 shrink-0 bg-blush-300" />
            Nouvelle collection · Hiver 2026
          </p>
          <h1 className="mt-6 text-[56px] leading-none tracking-[-0.03em] text-ivory-100 min-[900px]:text-[72px] min-[1100px]:text-[100px]">
            Pudique,
            <br />
            Toujours
            <br />
            <span className="text-blush-300">Élégante.</span>
          </h1>
          <p className="mt-8 max-w-[540px] text-xl leading-[1.6] text-ivory-100/85">
            Hijabs, abayas, pyjamas et ensembles pensés pour vous : matières
            douces, coupes fluides, finitions soignées.
          </p>
          <div className="mt-9 flex flex-col gap-3 min-[900px]:items-start min-[1100px]:flex-row">
            <Button
              variant="light"
              size="brand"
              nativeButton={false}
              render={<Link href="/boutique" />}
            >
              Découvrir la collection
              <ArrowRight />
            </Button>
            <Button
              variant="outline-light"
              size="brand"
              nativeButton={false}
              render={<Link href="/boutique?categorie=pyjamas" />}
            >
              Pyjamas &amp; ensembles
            </Button>
          </div>
        </div>

        <div className="relative h-[450px] overflow-hidden rounded-t-[200px] bg-wine-500 min-[600px]:h-[560px] min-[900px]:absolute min-[900px]:inset-y-0 min-[900px]:right-0 min-[900px]:h-auto min-[900px]:w-[54%] min-[900px]:rounded-none min-[900px]:rounded-tl-[340px]">
          <HeroVideo />
        </div>
      </div>
    </section>
  );
}
