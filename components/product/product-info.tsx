"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Banknote, RotateCcw, Ruler, Star, Truck } from "lucide-react";
import { PurchasePanel } from "@/components/product/purchase-panel";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { siteConfig } from "@/config/site";
import type { ProductDetail } from "@/lib/product-detail";

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-wine-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory-50";

const reassurance = [
  { icon: Truck, title: "Livraison [24 à 72 h]", text: "Partout au Maroc" },
  { icon: Banknote, title: "Paiement à la livraison", text: "Vous payez à la réception" },
  { icon: RotateCcw, title: "Retours sous 7 jours", text: "Échange facile" },
];

type Props = { product: ProductDetail };

export function ProductInfo({ product }: Props) {
  const [colorIndex, setColorIndex] = useState(0);
  const [size, setSize] = useState<string | undefined>();
  const [shake, setShake] = useState(false);
  const sizesRef = useRef<HTMLDivElement>(null);
  const colorName = product.colors[colorIndex]?.name ?? "";

  function handleSizeError() {
    setShake(true);
    sizesRef.current?.querySelector<HTMLButtonElement>("button:not(:disabled)")?.focus();
    window.setTimeout(() => setShake(false), 600);
  }

  const priceLabel = product.price === null ? "[PRIX]" : product.price;

  return (
    <div className="flex flex-col gap-7 min-[1100px]:sticky min-[1100px]:top-24">
      <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.14em] text-cognac">
        <span aria-hidden="true" className="h-px w-10 bg-cognac" />
        {product.categoryLabel}
      </p>
      <h1 className="text-[38px] leading-[1.04] tracking-[-0.035em] text-wine-700 min-[700px]:text-[52px]">
        {product.name}
      </h1>

      <div className="flex items-center gap-3 text-sm text-muted-ink">
        <span role="img" aria-label="5 étoiles sur 5" className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} aria-hidden="true" className="size-4 fill-cognac stroke-cognac" />
          ))}
        </span>
        <Link href="/#avis" className="underline underline-offset-4 hover:text-wine-700">
          {product.rating ?? "[4,9]"} / 5 · {product.reviewCount ?? "[NN]"} avis
        </Link>
      </div>

      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <p className="text-[32px] font-medium text-wine-700">
          {product.compareAtPrice != null && (
            <span className="mr-3 text-lg font-normal text-muted-ink line-through">
              {product.compareAtPrice} {siteConfig.currency}
            </span>
          )}
          {priceLabel} {siteConfig.currency}
        </p>
        <p className="text-sm text-muted-ink">Taxes incluses · paiement à la livraison</p>
      </div>

      <p className="text-base leading-[1.7] text-muted-ink">{product.description}</p>

      <div>
        <p className="mb-3 text-sm text-ink">
          Couleur : <strong className="font-semibold text-wine-700">{colorName}</strong>
        </p>
        <div className="flex flex-wrap gap-3.5" role="group" aria-label="Couleur">
          {product.colors.map((color, i) => {
            const selected = i === colorIndex;
            return (
              <button
                key={color.name}
                type="button"
                aria-pressed={selected}
                aria-label={color.name}
                title={color.name}
                onClick={() => setColorIndex(i)}
                className={`size-10 rounded-full ${focusRing} ${
                  selected ? "ring-1 ring-wine-700 ring-offset-2 ring-offset-ivory-50" : ""
                }`}
                style={{ backgroundColor: color.hex, boxShadow: selected ? undefined : "inset 0 0 0 1px rgba(88,28,38,0.2)" }}
              />
            );
          })}
        </div>
      </div>

      {product.sizes.length > 0 && (
        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm text-ink">
              Taille : <strong className="font-semibold text-wine-700">{size ?? "—"}</strong>
            </p>
            <Dialog>
              <DialogTrigger
                className={`flex items-center gap-1.5 rounded-[2px] text-[13px] text-muted-ink underline underline-offset-4 hover:text-wine-700 ${focusRing}`}
              >
                <Ruler className="size-4 stroke-[1.5]" />
                Guide des tailles
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-lg font-medium text-wine-700">Guide des tailles</DialogTitle>
                  <DialogDescription>Mesures en cm. [À compléter avec les vraies mesures.]</DialogDescription>
                </DialogHeader>
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-wine-700/14 text-muted-ink">
                      <th className="py-2 font-medium">Taille</th>
                      <th className="py-2 font-medium">Poitrine</th>
                      <th className="py-2 font-medium">Longueur</th>
                    </tr>
                  </thead>
                  <tbody>
                    {["XS", "S", "M", "L", "XL"].map((s) => (
                      <tr key={s} className="border-b border-wine-700/14">
                        <th scope="row" className="py-2 font-medium text-wine-700">{s}</th>
                        <td className="py-2 text-muted-ink">[XX]</td>
                        <td className="py-2 text-muted-ink">[XX]</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </DialogContent>
            </Dialog>
          </div>
          <div
            ref={sizesRef}
            role="group"
            aria-label="Taille"
            className={`flex flex-wrap gap-2 rounded-[2px] ${shake ? "motion-safe:animate-shake ring-2 ring-wine-500 ring-offset-4 ring-offset-ivory-50" : ""}`}
          >
            {product.sizes.map((s) => {
              const selected = s.label === size;
              return (
                <button
                  key={s.label}
                  type="button"
                  disabled={!s.inStock}
                  aria-pressed={selected}
                  aria-label={s.inStock ? s.label : `${s.label}, épuisé`}
                  onClick={() => setSize(s.label)}
                  className={`h-12 min-w-14 rounded-[2px] border px-4 text-sm font-medium ${focusRing} ${
                    !s.inStock
                      ? "cursor-not-allowed border-wine-700/30 text-wine-700 line-through opacity-40"
                      : selected
                        ? "border-wine-700 bg-wine-700 text-ivory-100"
                        : "border-wine-700/30 text-wine-700 hover:bg-wine-700/10"
                  }`}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <PurchasePanel
        product={product}
        colorName={colorName}
        size={size}
        onSizeError={handleSizeError}
      />

      <ul className="grid gap-5 rounded-[2px] bg-blush-100 p-6 min-[700px]:grid-cols-3">
        {reassurance.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex flex-col gap-2">
            <Icon aria-hidden="true" className="size-6 stroke-[1.5] text-wine-700" />
            <p className="text-sm font-semibold text-wine-700">{title}</p>
            <p className="text-[13px] text-muted-ink">{text}</p>
          </li>
        ))}
      </ul>

      <Accordion defaultValue={["description"]} className="border-t border-wine-700/14">
        {[
          { value: "description", title: "Description", body: product.details.description },
          { value: "care", title: "Composition & entretien", body: product.details.care },
          { value: "delivery", title: "Livraison & retours", body: product.details.delivery },
        ].map((item) => (
          <AccordionItem key={item.value} value={item.value} className="border-b border-wine-700/14">
            <AccordionTrigger className="rounded-[2px] py-5 text-[17px] font-medium text-wine-700 hover:no-underline focus-visible:ring-wine-500 [&_[data-slot=accordion-trigger-icon]]:size-5 [&_[data-slot=accordion-trigger-icon]]:text-wine-700">
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="max-w-[520px] pb-6 text-[15px] leading-[1.7] text-muted-ink">
              {item.body}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
