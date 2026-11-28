"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, MessageCircle, Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { useAddToCart } from "@/hooks/use-add-to-cart";
import type { ProductDetail } from "@/lib/product-detail";

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-wine-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory-50";

type Props = {
  product: ProductDetail;
  colorName: string;
  size: string | undefined;
  onSizeError: () => void;
};

export function PurchasePanel({ product, colorName, size, onSizeError }: Props) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const { mutate, isPending } = useAddToCart({ onViewCart: () => router.push("/panier") });
  const hasSizes = product.sizes.length > 0;
  const rowRef = useRef<HTMLDivElement>(null);
  const [rowVisible, setRowVisible] = useState(true);

  // Show the mobile sticky bar once the main purchase row has scrolled out of view.
  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setRowVisible(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function addToCart() {
    if (hasSizes && !size) {
      toast.error("Choisissez une taille");
      onSizeError();
      return;
    }
    mutate({
      product: {
        id: product.id,
        slug: product.slug,
        name: product.name,
        image: product.images[0].src,
        alt: product.images[0].alt,
        price: product.price,
        colors: [],
      },
      size,
      color: colorName,
      quantity,
    });
  }

  const productUrl = typeof window === "undefined" ? "" : window.location.href;
  const message = [
    `Bonjour, je souhaite commander : ${product.name}`,
    `Couleur : ${colorName}`,
    hasSizes ? `Taille : ${size ?? "à préciser"}` : null,
    productUrl,
  ]
    .filter(Boolean)
    .join("\n");
  const whatsappHref = `${siteConfig.whatsappUrl}?text=${encodeURIComponent(message)}`;

  return (
    <div className="flex flex-col gap-3">
      <div ref={rowRef} className="flex gap-3">
        <div className="flex h-14 items-center rounded-[2px] border border-wine-700/30">
          <button
            type="button"
            aria-label="Diminuer la quantité"
            disabled={quantity <= 1}
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className={`flex size-12 items-center justify-center text-wine-700 disabled:opacity-40 ${focusRing}`}
          >
            <Minus className="size-[18px] stroke-[1.5]" />
          </button>
          <span aria-live="polite" aria-label="Quantité" className="w-8 text-center text-base font-medium text-wine-700">
            {quantity}
          </span>
          <button
            type="button"
            aria-label="Augmenter la quantité"
            disabled={quantity >= 9}
            onClick={() => setQuantity((q) => Math.min(9, q + 1))}
            className={`flex size-12 items-center justify-center text-wine-700 disabled:opacity-40 ${focusRing}`}
          >
            <Plus className="size-[18px] stroke-[1.5]" />
          </button>
        </div>
        <Button
          type="button"
          size="brand"
          disabled={isPending}
          onClick={addToCart}
          className="h-14! min-w-0 flex-1 px-3! max-[420px]:text-xs max-[420px]:tracking-[0.04em]"
        >
          {isPending ? <Loader2 className="animate-spin" /> : <ShoppingBag className="max-[420px]:hidden" />}
          Ajouter au panier
        </Button>
      </div>

      <Button
        variant="outline-wine"
        size="brand"
        nativeButton={false}
        className="h-14! w-full"
        render={<a href={whatsappHref} target="_blank" rel="noopener noreferrer" />}
      >
        <MessageCircle />
        Commander sur WhatsApp
      </Button>

      <div
        className={`fixed inset-x-0 bottom-0 z-30 flex items-center gap-4 border-t border-wine-700/14 bg-ivory-50 px-6 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] transition-transform duration-300 min-[900px]:hidden ${
          rowVisible ? "translate-y-full" : "translate-y-0"
        }`}
        aria-hidden={rowVisible}
      >
        <p className="shrink-0 text-lg font-medium text-wine-700">
          {product.price === null ? "[PRIX]" : product.price} {siteConfig.currency}
        </p>
        <Button
          type="button"
          size="brand"
          tabIndex={rowVisible ? -1 : 0}
          disabled={isPending}
          onClick={addToCart}
          className="h-12! flex-1 px-4!"
        >
          {isPending ? <Loader2 className="animate-spin" /> : <ShoppingBag />}
          Ajouter au panier
        </Button>
      </div>
    </div>
  );
}
