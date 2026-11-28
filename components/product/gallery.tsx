"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Heart, Maximize, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useHydrated } from "@/hooks/use-hydrated";
import { useToggleWishlist } from "@/hooks/use-toggle-wishlist";
import type { ProductDetail } from "@/lib/product-detail";
import { useWishlistStore } from "@/stores/wishlist-store";

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-wine-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory-50";

type Props = { product: ProductDetail };

export function Gallery({ product }: Props) {
  const { images } = product;
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const touchStart = useRef<number | null>(null);

  const hydrated = useHydrated();
  const inWishlist = useWishlistStore((s) => s.ids.includes(product.id));
  const favorite = hydrated && inWishlist;
  const { mutate: toggleWishlist } = useToggleWishlist();

  const go = (delta: number) => setIndex((i) => (i + delta + images.length) % images.length);

  function onTouchEnd(clientX: number) {
    if (touchStart.current === null) return;
    const dx = clientX - touchStart.current;
    touchStart.current = null;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  }

  return (
    <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-4 min-[700px]:grid-cols-[96px_minmax(0,1fr)]">
      <div className="order-2 flex gap-3 overflow-x-auto min-[700px]:order-1 min-[700px]:flex-col min-[700px]:overflow-visible" role="group" aria-label="Photos du produit">
        {images.map((image, i) => (
          <button
            key={image.src}
            type="button"
            aria-pressed={i === index}
            aria-label={`Photo ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`relative h-[100px] w-20 shrink-0 overflow-hidden rounded-[2px] border-2 bg-blush-300 min-[700px]:h-[120px] min-[700px]:w-24 ${focusRing} ${
              i === index ? "border-wine-700 opacity-100" : "border-transparent opacity-70 hover:opacity-100"
            }`}
          >
            <Image src={image.src} alt="" fill sizes="96px" className="object-cover" />
          </button>
        ))}
      </div>

      <div
        className="relative order-1 aspect-[4/5] overflow-hidden rounded-[2px_2px_2px_150px] bg-blush-300 min-[700px]:order-2"
        onTouchStart={(e) => (touchStart.current = e.touches[0].clientX)}
        onTouchEnd={(e) => onTouchEnd(e.changedTouches[0].clientX)}
      >
        <Image
          key={images[index].src}
          src={images[index].src}
          alt={images[index].alt}
          fill
          priority={index === 0}
          sizes="(min-width: 1100px) 50vw, 100vw"
          className="object-cover object-top"
        />

        {product.badge && (
          <span
            className={`absolute left-4 top-4 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] ${
              product.badge === "Nouveau" ? "bg-wine-700 text-ivory-100" : "bg-blush-300 text-wine-700"
            }`}
          >
            {product.badge}
          </span>
        )}

        <Button
          type="button"
          variant="ghost"
          onClick={() => toggleWishlist(product.id)}
          aria-label={favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          aria-pressed={favorite}
          className={`absolute right-4 top-4 z-10 size-12 rounded-full bg-ivory-50/92! text-wine-700 hover:bg-ivory-50! ${focusRing}`}
        >
          <Heart className={`size-5 stroke-[1.5] ${favorite ? "fill-current" : ""}`} />
        </Button>

        <button
          type="button"
          onClick={() => setLightbox(true)}
          aria-label="Agrandir la photo"
          className={`absolute inset-0 cursor-zoom-in ${focusRing}`}
        >
          <span className="sr-only">Agrandir la photo</span>
        </button>

        <span className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-ivory-50/92 px-4 py-2 text-[13px] font-medium text-wine-700">
          <Maximize aria-hidden="true" className="size-4 stroke-[1.5]" />
          {index + 1} / {images.length}
        </span>
      </div>

      <Dialog open={lightbox} onOpenChange={setLightbox}>
        <DialogContent
          className="top-0 left-0 h-dvh max-h-none w-screen max-w-none translate-x-0 translate-y-0 rounded-none bg-wine-900/95 p-0 ring-0 sm:max-w-none"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") go(1);
            if (e.key === "ArrowLeft") go(-1);
          }}
        >
          <DialogTitle className="sr-only">{product.name}, photo {index + 1} sur {images.length}</DialogTitle>
          <div
            className="relative size-full"
            onTouchStart={(e) => (touchStart.current = e.touches[0].clientX)}
            onTouchEnd={(e) => onTouchEnd(e.changedTouches[0].clientX)}
          >
            <Image src={images[index].src} alt={images[index].alt} fill sizes="100vw" className="object-contain" />
          </div>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Photo précédente"
            className="absolute left-4 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-ivory-50/92 text-wine-700 outline-none focus-visible:ring-2 focus-visible:ring-blush-300"
          >
            <ChevronLeft className="size-5 stroke-[1.5]" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Photo suivante"
            className="absolute right-4 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-ivory-50/92 text-wine-700 outline-none focus-visible:ring-2 focus-visible:ring-blush-300"
          >
            <ChevronRight className="size-5 stroke-[1.5]" />
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
