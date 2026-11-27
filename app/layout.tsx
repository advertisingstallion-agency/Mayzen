import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { siteConfig } from "@/config/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Meyla Shop | Mode pudique pour femmes",
    template: "%s | Meyla Shop",
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "fr_MA",
    siteName: siteConfig.name,
    title: "Meyla Shop | Mode pudique pour femmes",
    description: siteConfig.description,
    images: [{ url: "/brand/logo-wine.png", width: 728, height: 348, alt: "Meyla Shop" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Meyla Shop | Mode pudique pour femmes",
    description: siteConfig.description,
    images: ["/brand/logo-wine.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
