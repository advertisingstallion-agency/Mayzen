"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { Product } from "@/config/products";
import { siteConfig } from "@/config/site";
import { useAddToCart } from "@/hooks/use-add-to-cart";
import { useHydrated } from "@/hooks/use-hydrated";
import { useReveal } from "@/hooks/use-reveal";
import { useWishlistStore } from "@/stores/wishlist-store";

const focusRing =
  "focus-visible:ring-2! focus-visible:ring-wine-500! focus-visible:ring-offset-2 focus-visible:ring-offset-ivory-100 focus-visible:border-transparent!";

type Props = {
  product: Product;
  index: number;
};

export function ProductCard({ product, index }: Props) {
  const { ref, visible } = useReveal<HTMLElement>();
  const hydrated = useHydrated();
  const inWishlist = useWishlistStore((s) => s.ids.includes(product.id));
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const favorite = hydrated && inWishlist;

  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<string | undefined>();
  const { mutate, isPending } = useAddToCart();

  function handleToggleWishlist() {
    const added = toggleWishlist(product.id);
    toast.success(added ? "Ajouté aux favoris" : "Retiré des favoris");
  }

  function handleConfirm() {
    mutate(
      { product, size },
      {
        onSuccess: () => {
          setOpen(false);
          setSize(undefined);
        },
      },
    );
  }

  const quickAddClass = `h-12! w-full gap-2.5 px-0! max-[560px]:gap-1.5 max-[560px]:text-[11px] max-[560px]:tracking-[0.06em] ${focusRing}`;
  const quickAddWrapper =
    "absolute inset-x-3 bottom-3 z-10 translate-y-2 opacity-0 transition-[opacity,translate] duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 has-[[data-popup-open]]:translate-y-0 has-[[data-popup-open]]:opacity-100 max-[560px]:translate-y-0 max-[560px]:opacity-100 pointer-coarse:translate-y-0 pointer-coarse:opacity-100";

  return (
    <article
      ref={ref}
      style={{ transitionDelay: visible ? `${(index % 4) * 60}ms` : "0ms" }}
      className={`group relative flex flex-col gap-4 motion-safe:transition-[opacity,translate] motion-safe:duration-[400ms] motion-safe:ease-out ${
        visible ? "translate-y-0 opacity-100" : "motion-safe:translate-y-4 motion-safe:opacity-0"
      }`}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-[2px] bg-blush-300">
        <Image
          src={product.image}
          alt={product.alt}
          fill
          sizes="(min-width: 1100px) 25vw, 50vw"
          className="object-cover motion-safe:transition-transform motion-safe:duration-[600ms] motion-safe:ease-out motion-safe:group-hover:scale-[1.04]"
        />

        {product.badge && (
          <span
            className={`absolute left-4 top-4 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] max-[560px]:left-3 max-[560px]:top-3 ${
              product.badge === "Nouveau" ? "bg-wine-700 text-ivory-100" : "bg-blush-300 text-wine-700"
            }`}
          >
            {product.badge}
          </span>
        )}

        <Button
          type="button"
          variant="ghost"
          onClick={handleToggleWishlist}
          aria-label={favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          aria-pressed={favorite}
          className={`absolute right-2 top-2 z-10 size-11 rounded-full bg-ivory-50/92! text-wine-700 hover:bg-ivory-50! ${focusRing}`}
        >
          <Heart className={`size-[18px] stroke-[1.5] ${favorite ? "fill-current" : ""}`} />
        </Button>

        <div className={quickAddWrapper}>
          {product.sizes ? (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger
                render={<Button type="button" size="brand" className={quickAddClass} />}
              >
                <ShoppingBag />
                Ajout rapide
              </PopoverTrigger>
              <PopoverContent side="top" align="center" className="w-64 gap-4 rounded-[2px] p-4">
                <p className="text-sm font-medium text-wine-700">Choisissez votre taille</p>
                <div className="flex gap-2" role="group" aria-label="Taille">
                  {product.sizes.map((s) => (
                    <Button
                      key={s}
                      type="button"
                      variant={size === s ? "default" : "outline"}
                      aria-pressed={size === s}
                      onClick={() => setSize(s)}
                      className="size-11 rounded-[2px] text-sm"
                    >
                      {s}
                    </Button>
                  ))}
                </div>
                <Button
                  type="button"
                  size="brand"
                  disabled={!size || isPending}
                  onClick={handleConfirm}
                  className="h-12! w-full px-0!"
                >
                  Ajouter au panier
                </Button>
              </PopoverContent>
            </Popover>
          ) : (
            <Button
              type="button"
              size="brand"
              disabled={isPending}
              onClick={() => mutate({ product })}
              className={quickAddClass}
            >
              <ShoppingBag />
              Ajout rapide
            </Button>
          )}
        </div>
      </div>

      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-2">
          <h3 className="text-[17px] font-medium leading-[1.3] tracking-normal text-ink">
            <Link
              href={`/produits/${product.slug}`}
              className="rounded-[2px] outline-none after:absolute after:inset-0 focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-wine-500"
            >
              {product.name}
            </Link>
          </h3>
          <div className="flex gap-1.5" aria-hidden="true">
            {product.colors.map((color) => (
              <span
                key={color}
                className="size-3.5 rounded-full"
                style={{ backgroundColor: color, boxShadow: "inset 0 0 0 1px rgba(88,28,38,0.2)" }}
              />
            ))}
          </div>
          <span className="sr-only">{product.colors.length} coloris disponibles</span>
        </div>
        <p className="flex shrink-0 flex-col items-end whitespace-nowrap text-[15px] font-medium text-wine-700">
          {product.oldPrice !== undefined && (
            <span className="text-[13px] font-normal text-muted-ink line-through">
              {product.oldPrice} {siteConfig.currency}
            </span>
          )}
          <span>
            {product.price} {siteConfig.currency}
          </span>
        </p>
      </div>
    </article>
  );
}
