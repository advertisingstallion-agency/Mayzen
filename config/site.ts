export const siteConfig = {
  name: "Meyla Shop",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "Meyla Shop : boutique en ligne pour femmes. Hijabs, abayas, pyjamas et ensembles, livrés partout au Maroc.",
  currency: "MAD",
};

export const announcements = [
  "Livraison partout au Maroc",
  "Paiement à la livraison",
  "Retours sous 7 jours",
];

export const navLinks = [
  { label: "Nouveautés", href: "/nouveautes" },
  { label: "Hijabs", href: "/collections/hijabs" },
  { label: "Abayas & robes", href: "/collections/abayas" },
  { label: "Pyjamas", href: "/collections/pyjamas" },
  { label: "Ensembles", href: "/collections/ensembles" },
];

export const categories = [
  { label: "Abayas & robes", href: "/collections/abayas", image: "/images/category-abayas.jpg" },
  { label: "Pyjamas", href: "/collections/pyjamas", image: "/images/category-pyjamas.jpg" },
  { label: "Ensembles", href: "/collections/ensembles", image: "/images/category-ensembles.jpg" },
];

// Placeholder product and price, to be replaced by real data.
export const featuredProduct = {
  name: "Pyjama velours",
  price: 249,
  href: "/collections/pyjamas",
  image: "/images/product-pyjama-velours.jpg",
};
