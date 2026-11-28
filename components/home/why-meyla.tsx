import Image from "next/image";
import {
  Banknote,
  Feather,
  RotateCcw,
  Scissors,
  Truck,
  type LucideIcon,
} from "lucide-react";

type Benefit = {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

const leftPromises: Benefit[] = [
  {
    number: "01",
    icon: Feather,
    title: "Tissus doux",
    description:
      "Satin, velours, crêpe : des matières choisies pour leur toucher et leur tombé.",
  },
  {
    number: "02",
    icon: Scissors,
    title: "Finitions soignées",
    description: "Coutures nettes, coupes amples et détails pensés pour durer.",
  },
];

const rightPromises: Benefit[] = [
  {
    number: "03",
    icon: Truck,
    title: "Livraison partout au Maroc",
    description: "Recevez votre commande chez vous et payez à la livraison.",
  },
  {
    number: "04",
    icon: RotateCcw,
    title: "Retours faciles",
    description:
      "Un doute sur la taille ? Vous avez 7 jours pour retourner votre article.",
  },
];

function PromiseItem({ number, icon: Icon, title, description }: Benefit) {
  return (
    <article className="flex flex-col gap-5 border-t border-wine-700/20 pt-7">
      <div className="flex items-center justify-between">
        <span className="flex size-[52px] items-center justify-center rounded-full bg-blush-100 text-wine-700">
          <Icon className="size-6 stroke-[1.5]" />
        </span>
        <span
          aria-hidden="true"
          className="text-[56px] font-medium leading-none tracking-[-0.04em] text-blush-300"
        >
          {number}
        </span>
      </div>
      <h3 className="text-2xl font-medium tracking-[-0.02em] text-wine-700">
        {title}
      </h3>
      <p className="text-[15px] leading-[1.6] text-muted-ink">{description}</p>
    </article>
  );
}

export function WhyMeyla() {
  return (
    <section
      id="pourquoi"
      aria-labelledby="why-title"
      className="relative overflow-hidden bg-ivory-50 py-[72px] min-[700px]:py-28"
    >
      <div className="relative mx-auto max-w-[1440px] px-6 min-[900px]:px-12">
        <div className="mb-[72px] flex flex-col items-center gap-[22px] text-center">
          <p className="flex items-center gap-3.5 text-xs font-medium uppercase tracking-[0.14em] text-wine-700">
            <span aria-hidden="true" className="h-px w-10 bg-wine-700" />
            Pourquoi Meyla
            <span aria-hidden="true" className="h-px w-10 bg-wine-700" />
          </p>
          <h2
            id="why-title"
            className="max-w-[820px] text-4xl leading-[1.06] tracking-[-0.035em] text-wine-700 min-[700px]:text-[46px] min-[1100px]:text-[56px]"
          >
            Le confort d&apos;une belle matière,{" "}
            <span className="text-cognac">la sérénité en plus.</span>
          </h2>
          <p className="max-w-[520px] text-[17px] leading-[1.6] text-muted-ink">
            Nous choisissons chaque tissu et chaque coupe avec soin, pour que
            vous commandiez en confiance.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 min-[700px]:grid-cols-2 min-[1100px]:grid-cols-[1fr_400px_1fr] min-[1100px]:items-stretch min-[1100px]:gap-16">
          <div className="relative mx-auto h-[470px] w-[300px] min-[700px]:order-first min-[700px]:col-span-full min-[700px]:h-[620px] min-[700px]:w-[400px] min-[1100px]:order-none min-[1100px]:col-span-1 min-[1100px]:col-start-2 min-[1100px]:row-start-1">
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 size-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blush-300 min-[700px]:size-[560px]"
            />
            <div className="absolute inset-0 overflow-hidden rounded-t-[200px] rounded-b-[2px] bg-blush-300">
              <Image
                src="/images/story-journee.jpg"
                alt="Femme portant une abaya bordeaux de la collection Meyla"
                fill
                sizes="400px"
                className="object-cover object-top"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-wine-900/55 to-transparent to-40%"
              />
            </div>
            <div
              aria-hidden="true"
              className="absolute -right-9 top-24 flex size-24 items-center justify-center rounded-full bg-blush-300"
            >
              <Image
                src="/brand/leaf-wine.png"
                alt=""
                width={242}
                height={178}
                className="h-auto w-[34px]"
              />
            </div>
          </div>

          <div className="flex flex-col justify-between gap-12 min-[1100px]:col-start-1 min-[1100px]:row-start-1 min-[1100px]:pb-16">
            {leftPromises.map((p) => (
              <PromiseItem key={p.number} {...p} />
            ))}
          </div>

          <div className="flex flex-col justify-between gap-12 min-[1100px]:col-start-3 min-[1100px]:row-start-1 min-[1100px]:pt-16">
            {rightPromises.map((p) => (
              <PromiseItem key={p.number} {...p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
