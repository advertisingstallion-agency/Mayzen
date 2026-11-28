import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";
import { useWishlistStore } from "@/stores/wishlist-store";

export function useToggleWishlist() {
  return useMutation({
    mutationFn: async (productId: string) => {
      try {
        // No API yet: favourites live in the Zustand store.
        return useWishlistStore.getState().toggle(productId);
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },
    onSuccess: (added) => toast.success(added ? "Ajouté aux favoris" : "Retiré des favoris"),
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
