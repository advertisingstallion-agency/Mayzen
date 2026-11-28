"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { useHydrated } from "@/hooks/use-hydrated";
import { useCartStore } from "@/stores/cart-store";

export function CartView() {
  const hydrated = useHydrated();
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const clear = useCartStore((s) => s.clear);
  const list = hydrated ? items : [];

  const message = [
    "Bonjour, je souhaite commander :",
    ...list.map((i) => `- ${i.quantity} x ${i.name}`),
  ].join("\n");
  const whatsappHref = `${siteConfig.whatsappUrl}?text=${encodeURIComponent(message)}`;

  return (
    <div className="mx-auto flex max-w-[960px] flex-col gap-10 px-6 py-16 min-[900px]:px-12 min-[900px]:py-24">
      <h1 className="text-[44px] leading-none tracking-[-0.04em] text-wine-700 min-[700px]:text-[64px]">
        Mon <span className="text-cognac">panier.</span>
      </h1>

      {hydrated && list.length === 0 ? (
        <div className="flex flex-col items-start gap-6">
          <p className="max-w-md text-lg text-muted-ink">Votre panier est vide.</p>
          <Button size="brand" nativeButton={false} render={<Link href="/boutique" />}>
            Continuer vos achats
            <ArrowRight />
          </Button>
        </div>
      ) : (
        <>
          <ul className="flex flex-col border-t border-wine-700/14">
            {list.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-4 border-b border-wine-700/14 py-5"
              >
                <div className="flex flex-col gap-1">
                  <p className="text-[17px] font-medium text-wine-700">{item.name}</p>
                  <p className="text-sm text-muted-ink">Quantité : {item.quantity}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="whitespace-nowrap text-[15px] font-medium text-wine-700">
                    {item.price > 0 ? item.price * item.quantity : "[PRIX]"} {siteConfig.currency}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Retirer ${item.name}`}
                    className="flex size-11 items-center justify-center rounded-full text-wine-700 outline-none hover:bg-wine-700/10 focus-visible:ring-2 focus-visible:ring-wine-500"
                  >
                    <Trash2 className="size-5 stroke-[1.5]" />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              size="brand"
              nativeButton={false}
              render={<a href={whatsappHref} target="_blank" rel="noopener noreferrer" />}
            >
              <MessageCircle />
              Commander sur WhatsApp
            </Button>
            <Button variant="outline-wine" size="brand" nativeButton={false} render={<Link href="/boutique" />}>
              Continuer vos achats
            </Button>
            <button
              type="button"
              onClick={clear}
              className="rounded-[2px] px-2 py-3 text-[13px] text-muted-ink underline underline-offset-4 outline-none hover:text-wine-700 focus-visible:ring-2 focus-visible:ring-wine-500"
            >
              Vider le panier
            </button>
          </div>
          <p className="text-sm text-muted-ink">Paiement à la livraison partout au Maroc.</p>
        </>
      )}
    </div>
  );
}
