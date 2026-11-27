import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Product } from "@/config/products";
import { getErrorMessage } from "@/lib/errors";
import { useCartStore } from "@/stores/cart-store";

type AddToCartInput = {
  product: Product;
  size?: string;
};

export function useAddToCart() {
  return useMutation({
    mutationFn: async ({ product, size }: AddToCartInput) => {
      try {
        // No API yet: the cart lives in the Zustand store.
        useCartStore.getState().addItem({
          id: size ? `${product.id}-${size}` : product.id,
          name: size ? `${product.name} (${size})` : product.name,
          price: product.price,
          quantity: 1,
        });
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },
    onSuccess: () => toast.success("Ajouté au panier"),
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
