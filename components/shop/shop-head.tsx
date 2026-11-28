import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const tiles = [
  { label: "Abayas & robes", href: "/boutique?categorie=abayas", image: "/images/category-abayas.jpg", offset: "" },
  { label: "Pyjamas", href: "/boutique?categorie=pyjamas", image: "/images/category-pyjamas.jpg", offset: "mt-9" },
  { label: "Ensembles", href: "/boutique?categorie=ensembles", image: "/images/category-ensembles.jpg", offset: "mt-[72px]" },
];

export function ShopHead() {
  return (
    <section className="relative overflow-hidden bg-ivory-100 pb-[72px] pt-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[180px] -top-[260px] size-[700px] rounded-full bg-blush-100"
      />
      <div className="relative mx-auto flex max-w-[1440px] items-start justify-between gap-12 px-6 min-[900px]:px-12">
        <div className="flex flex-col gap-6">
          <nav aria-label="Fil d'Ariane">
            <ol className="flex items-center gap-1.5 text-[13px] text-muted-ink">
              <li>
                <Link href="/" className="rounded-[2px] outline-none hover:text-wine-700 focus-visible:ring-2 focus-visible:ring-wine-500">
                  Accueil
                </Link>
              </li>
              <ChevronRight aria-hidden="true" className="size-3.5 stroke-[1.5]" />
              <li aria-current="page" className="font-medium text-wine-700">
                Boutique
              </li>
            </ol>
          </nav>
          <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.14em] text-cognac">
            <span aria-hidden="true" className="h-px w-10 bg-cognac" />
            Collection Hiver 2026
          </p>
          <h1 className="text-[44px] leading-none tracking-[-0.04em] text-wine-700 min-[700px]:text-[64px] min-[1100px]:text-[80px]">
            Toute la <span className="text-cognac">collection.</span>
          </h1>
          <p className="max-w-[480px] text-lg leading-[1.6] text-muted-ink">
            Hijabs, abayas, pyjamas et ensembles : des pièces pensées pour la pudeur, la douceur et
            l&apos;élégance au quotidien.
          </p>
        </div>

        <ul className="hidden gap-5 min-[1100px]:flex">
          {tiles.map((tile) => (
            <li key={tile.href} className={tile.offset}>
              <Link href={tile.href} className="group flex flex-col gap-3 rounded-[2px] outline-none focus-visible:ring-2 focus-visible:ring-wine-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory-100">
                <span className="relative block h-[176px] w-[132px] overflow-hidden rounded-t-[66px] rounded-b-[2px] bg-blush-300">
                  <Image
                    src={tile.image}
                    alt=""
                    fill
                    sizes="132px"
                    className="object-cover object-top motion-safe:transition-transform motion-safe:duration-[600ms] motion-safe:group-hover:scale-[1.04]"
                  />
                </span>
                <span className="text-xs font-medium uppercase tracking-[0.1em] text-wine-700">{tile.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
