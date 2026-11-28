import { useInfiniteQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "@/lib/axios";
import { getErrorMessage } from "@/lib/errors";
import { filtersToSearchParams, productsResponseSchema, type ShopFilters } from "@/lib/shop-params";

const PAGE_SIZE = 12;

export function useShopProducts(filters: ShopFilters) {
  return useInfiniteQuery({
    queryKey: ["shop-products", filters],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      try {
        const params = Object.fromEntries(filtersToSearchParams(filters));
        const { data } = await api.get("/products", {
          params: { ...params, page: pageParam, pageSize: PAGE_SIZE },
        });
        return productsResponseSchema.parse(data);
      } catch (error) {
        toast.error(getErrorMessage(error));
        throw error;
      }
    },
    getNextPageParam: (last) => (last.page * last.pageSize < last.total ? last.page + 1 : undefined),
  });
}
