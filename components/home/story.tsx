import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Moon, Sun, Sunrise, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type DayCard = {
  href: string;
  image: string;
  position: string;
  icon: LucideIcon;
  time: string;
  title: string;
  description: string;
  radius: string;
  offset: string;
  pill: string;
};

const cards: DayCard[] = [
  {
    href: "/boutique?categorie=ensembles",
    image: "/images/product-ensemble.jpg",
    position: "object-[center_20%]",
    icon: Sunrise,
    time: "07:00 · Matin",
    title: "Ensembles",
    description: "Des ensembles doux pour bien commencer la journée.",
    radius: "rounded-[2px]",
    offset: "",
    pill: "left-4 top-4",
  },
  {
    href: "/boutique?categorie=abayas",
    image: "/images/story-journee.jpg",
    position: "object-top",
    icon: Sun,
    time: "13:00 · Journée",
    title: "Abayas & robes",
    description: "Fluides et élégantes, du travail aux sorties.",
    radius: "rounded-t-[160px] rounded-b-[2px]",
    offset: "min-[1024px]:mt-[56px]",
    // The arch cuts the corners, so the pill sits lower and centred.
    pill: "left-1/2 top-14 -translate-x-1/2",
  },
  {
    href: "/boutique?categorie=pyjamas",
    // Temporary photo: replace with the evening photo when it exists.
    image: "/images/story-matin.jpg",
    position: "object-center",
    icon: Moon,
    time: "21:00 · Soir",
    title: "Pyjamas",
    description: "Un satin doux pour finir la journée en beauté.",
    radius: "rounded-tl-[200px] rounded-tr-[2px] rounded-b-[2px]",
    offset: "min-[1024px]:mt-[112px]",
    // The big curved corner is top-left, so the pill goes top-right.
    pill: "right-4 top-4",
  },
];

const values = ["Douceur", "Élégance", "Confiance"];
const badgeText = "PUDIQUE • ÉLÉGANTE • AU QUOTIDIEN •";

export function Story() {
  return (
    <section
      id="histoire"
      aria-labelledby="story-title"
      className="relative overflow-hidden bg-wine-700 py-[56px] text-ivory-100 min-[700px]:py-[80px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-60 -top-60 size-[800px] rounded-full border border-ivory-100/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[300px] bottom-[60px] size-[640px] rounded-full border border-ivory-100/[0.07]"
      />
      <div className="relative mx-auto grid max-w-[1440px] items-start gap-12 px-6 min-[900px]:px-12 min-[1024px]:grid-cols-[0.85fr_1.35fr] min-[1024px]:gap-16">
        <div className="flex flex-col items-start gap-7">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-ivory-100/30 py-2 pl-2.5 pr-4 text-xs font-medium uppercase tracking-[0.14em] text-blush-300">
            <Image
              src="/brand/leaf-cream.png"
              alt=""
              width={242}
              height={178}
              className="h-auto w-5"
            />
            Notre histoire
          </p>
          <h2
            id="story-title"
            className="m-0 text-[38px] font-medium leading-[1.06] tracking-[-0.035em] min-[700px]:text-[52px] min-[1100px]:text-[60px]"
          >
            De l&apos;aube jusqu&apos;au soir,{" "}
            <span className="text-blush-300">Meyla vous accompagne.</span>
          </h2>
          <p className="m-0 max-w-[440px] text-[18px] leading-[1.7] text-ivory-100/85">
            Chez Meyla, chaque pièce est pensée pour le confort, la douceur
            d&apos;une belle matière et une allure qui vous ressemble : du
            premier café au dernier moment de calme.
          </p>
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
            {values.map((value) => (
              <li
                key={value}
                className="rounded-full border border-ivory-100/30 px-4 py-2 text-sm font-medium"
              >
                {value}
              </li>
            ))}
          </ul>
          <div className="mt-2 flex flex-wrap items-center gap-6">
            <Button
              variant="light"
              size="brand"
              nativeButton={false}
              render={<Link href="/#pourquoi" />}
            >
              Découvrir Meyla
              <ArrowRight aria-hidden="true" />
            </Button>
          </div>
        </div>

        <div className="-mx-6 flex snap-x snap-mandatory scroll-pl-6 gap-5 overflow-x-auto px-6 pb-2 min-[700px]:mx-0 min-[700px]:overflow-visible min-[700px]:px-0 min-[700px]:pb-0 min-[1024px]:items-start">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className={`group relative block h-[440px] flex-[0_0_260px] snap-start overflow-hidden outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wine-500 min-[700px]:flex-[1_1_0] ${card.radius} ${card.offset}`}
            >
              <Image
                src={card.image}
                alt=""
                fill
                sizes="(min-width:1024px) 22vw, 260px"
                className={`object-cover ${card.position} motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.04]`}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-wine-900/85 to-transparent to-55%"
              />

              {/* <div className="absolute inset-x-5 bottom-[22px] flex flex-col gap-2 text-ivory-100">
                <h3 className="m-0 text-[26px] font-medium tracking-[-0.02em]">
                  {card.title}
                </h3>
                <p className="m-0 text-sm leading-[1.5] text-ivory-100/85">
                  {card.description}
                </p>
              </div> */}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
