import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "@/lib/axios";
import { getErrorMessage } from "@/lib/errors";
import { productsResponseSchema } from "@/lib/shop-params";

const relatedSchema = productsResponseSchema.pick({ items: true });

export function useRelatedProducts(slug: string) {
  return useQuery({
    queryKey: ["related-products", slug],
    queryFn: async () => {
      try {
        const { data } = await api.get(`/products/${slug}/related`);
        return relatedSchema.parse(data).items;
      } catch (error) {
        toast.error(getErrorMessage(error));
        throw error;
      }
    },
  });
}
