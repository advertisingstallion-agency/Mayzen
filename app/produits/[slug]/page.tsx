import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductView } from "@/components/product/product-view";
import { RelatedProducts } from "@/components/product/related-products";
import { siteConfig } from "@/config/site";
import { getProductDetail } from "@/lib/product-detail";
import { shopProducts } from "@/lib/products";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return shopProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductDetail(slug);
  if (!product) return {};
  const image = product.images[0];
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/produits/${slug}` },
    openGraph: {
      title: product.name,
      description: product.description,
      type: "website",
      images: [{ url: image.src, alt: image.alt }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductDetail(slug);
  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images.map((i) => `${siteConfig.url}${i.src}`),
    description: product.description,
    // Offers and rating are only added once real prices and reviews exist.
    ...(product.price !== null && {
      offers: {
        "@type": "Offer",
        price: product.price,
        priceCurrency: "MAD",
        availability: "https://schema.org/InStock",
        url: `${siteConfig.url}/produits/${slug}`,
      },
    }),
    ...(product.rating !== null &&
      product.reviewCount !== null && {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          reviewCount: product.reviewCount,
        },
      }),
  };

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <ProductView slug={slug} initialProduct={product} />
      <RelatedProducts slug={slug} />
    </main>
  );
}
