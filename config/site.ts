export const siteConfig = {
  name: "Meyla Shop",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "Meyla Shop : boutique en ligne pour femmes. Hijabs, abayas, pyjamas et ensembles, livrés partout au Maroc.",
  currency: "MAD",
  // TODO: replace [NUMÉRO] with the real WhatsApp number (international format, no +).
  whatsappUrl: "https://wa.me/[NUMÉRO]",
};

export const announcements = [
  "Livraison partout au Maroc",
  "Paiement à la livraison",
  "Retours sous 7 jours",
];

export const navLinks = [
  { label: "Nouveautés", href: "/boutique" },
  { label: "Hijabs", href: "/boutique?categorie=hijabs" },
  { label: "Abayas & robes", href: "/boutique?categorie=abayas" },
  { label: "Pyjamas", href: "/boutique?categorie=pyjamas" },
  { label: "Ensembles", href: "/boutique?categorie=ensembles" },
];

export const categories = [
  { label: "Abayas & robes", href: "/boutique?categorie=abayas", image: "/images/category-abayas.jpg" },
  { label: "Pyjamas", href: "/boutique?categorie=pyjamas", image: "/images/category-pyjamas.jpg" },
  { label: "Ensembles", href: "/boutique?categorie=ensembles", image: "/images/category-ensembles.jpg" },
];

// Placeholder product and price, to be replaced by real data.
export const featuredProduct = {
  name: "Pyjama velours",
  price: 249,
  href: "/boutique?categorie=pyjamas",
  image: "/images/product-pyjama-velours.jpg",
};

export const helpLinks = [
  { label: "Livraison", href: "/#pourquoi" },
  { label: "Retours & échanges", href: "/#pourquoi" },
  { label: "Guide des tailles", href: "/#faq" },
  { label: "Questions fréquentes", href: "/#faq" },
];

// TODO: replace the bracketed placeholders with the real contact details.
export const contact = {
  whatsapp: "[NUMÉRO]",
  email: "[EMAIL]",
  city: "[VILLE]",
  country: "Maroc",
};

export const socialLinks = [
  { name: "Instagram", href: "https://instagram.com/[COMPTE]" },
  { name: "Facebook", href: "https://facebook.com/[PAGE]" },
  { name: "WhatsApp", href: siteConfig.whatsappUrl },
] as const;

export const legalLinks = [
  { label: "Conditions générales", href: "/conditions-generales" },
  { label: "Confidentialité", href: "/confidentialite" },
];
