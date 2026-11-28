import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { shopProducts } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteConfig.url, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/boutique`, changeFrequency: "daily", priority: 0.9 },
    ...shopProducts.map((p) => ({
      url: `${siteConfig.url}/produits/${p.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
