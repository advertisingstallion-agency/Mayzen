import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { productDetailSchema, type ProductDetail } from "@/lib/product-detail";

export function productQueryKey(slug: string) {
  return ["product", slug] as const;
}

export async function fetchProduct(slug: string) {
  const { data } = await api.get(`/products/${slug}`);
  return productDetailSchema.parse(data);
}

// The server page passes the product as initialData, so the first render already has it.
export function useProduct(slug: string, initialData?: ProductDetail) {
  return useQuery({
    queryKey: productQueryKey(slug),
    queryFn: () => fetchProduct(slug),
    initialData,
  });
}
