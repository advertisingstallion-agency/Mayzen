import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { CardProduct } from "@/lib/card-product";
import { getErrorMessage } from "@/lib/errors";
import { useCartStore } from "@/stores/cart-store";

type AddToCartInput = {
  product: CardProduct;
  size?: string;
  color?: string;
  quantity?: number;
};

type Options = {
  // When set, the success toast shows a "Voir le panier" button.
  onViewCart?: () => void;
};

export function useAddToCart({ onViewCart }: Options = {}) {
  return useMutation({
    mutationFn: async ({ product, size, color, quantity = 1 }: AddToCartInput) => {
      try {
        // No API yet: the cart lives in the Zustand store.
        const variant = [size, color].filter(Boolean);
        useCartStore.getState().addItem({
          id: variant.length ? `${product.id}-${variant.join("-")}` : product.id,
          name: variant.length ? `${product.name} (${variant.join(", ")})` : product.name,
          price: product.price ?? 0, // TODO: real price
          quantity,
        });
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },
    onSuccess: () =>
      toast.success(
        "Ajouté au panier",
        onViewCart ? { action: { label: "Voir le panier", onClick: onViewCart } } : undefined,
      ),
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
