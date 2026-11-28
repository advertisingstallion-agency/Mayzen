import { cacheLife } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { BackToTop } from "@/components/layout/back-to-top";
import { contact, helpLinks, legalLinks, navLinks, siteConfig, socialLinks } from "@/config/site";

const linkClass =
  "relative w-fit text-[15px] text-ivory-100/85 outline-none transition-[color,translate] duration-200 hover:text-blush-300 focus-visible:text-blush-300 focus-visible:ring-2 focus-visible:ring-blush-300 rounded-[2px] motion-safe:hover:translate-x-1 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-blush-300 after:transition-transform after:duration-300 hover:after:scale-x-100 focus-visible:after:scale-x-100";

const headingClass =
  "mb-2 text-xs font-medium uppercase tracking-[0.14em] text-blush-300";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const socialIcons = {
  Instagram: <InstagramIcon />,
  Facebook: <FacebookIcon />,
  WhatsApp: <MessageCircle className="size-5 stroke-[1.5]" aria-hidden="true" />,
};

// Cached so the current year is computed once per day, not on every prerender.
async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-wine-900 pt-[72px] text-ivory-100 min-[700px]:pt-24">
      <div className="mx-auto max-w-[1440px] px-6 min-[900px]:px-12">
        <div className="grid grid-cols-1 gap-10 min-[700px]:grid-cols-2 min-[700px]:gap-12 min-[1100px]:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          <div className="flex flex-col gap-6 min-[700px]:col-span-2 min-[1100px]:col-span-1">
            <Link href="/" className="w-[150px] rounded-[2px] outline-none focus-visible:ring-2 focus-visible:ring-blush-300">
              <Image src="/brand/logo-cream.png" alt="Meyla Shop" width={728} height={348} className="h-auto w-[150px]" />
            </Link>
            <p className="max-w-[300px] text-[15px] leading-[1.7] text-ivory-100/75">
              Mode pudique, pyjamas et ensembles pour femmes. Livraison partout au Maroc.
            </p>
            <ul className="flex gap-3">
              {socialLinks.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="flex size-11 items-center justify-center rounded-full border border-ivory-100/30 text-ivory-100 outline-none transition-[color,border-color,background-color,translate] duration-200 hover:border-blush-300 hover:bg-blush-300/10 hover:text-blush-300 motion-safe:hover:-translate-y-0.5 focus-visible:border-blush-300 focus-visible:text-blush-300 focus-visible:ring-2 focus-visible:ring-blush-300"
                  >
                    {socialIcons[s.name]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Boutique" className="flex flex-col gap-4">
            <h3 className={headingClass}>Boutique</h3>
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className={linkClass}>
                {l.label}
              </Link>
            ))}
          </nav>

          <nav aria-label="Aide" className="flex flex-col gap-4">
            <h3 className={headingClass}>Aide</h3>
            {helpLinks.map((l) => (
              <Link key={l.href} href={l.href} className={linkClass}>
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-4">
            <h3 className={headingClass}>Contact</h3>
            <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
              WhatsApp : {contact.whatsapp}
            </a>
            <a href={`mailto:${contact.email}`} className={linkClass}>
              {contact.email}
            </a>
            <p className="text-[15px] text-ivory-100/85">
              {contact.city}, {contact.country}
            </p>
            <span className="mt-2 self-start rounded-[2px] border border-ivory-100/30 px-3.5 py-2 text-xs uppercase tracking-[0.08em] text-blush-300">
              Paiement à la livraison
            </span>
          </div>
        </div>

        <div aria-hidden="true" className="mt-14 flex h-[260px] items-start justify-center overflow-hidden">
          <Image
            src="/brand/logo-cream.png"
            alt=""
            width={728}
            height={348}
            className="mt-3 h-auto w-[min(728px,90%)] opacity-[0.07]"
          />
        </div>
      </div>

      <div className="border-t border-ivory-100/15">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-6 py-5 text-[13px] text-ivory-100/75 max-[699px]:flex-col max-[699px]:text-center min-[900px]:px-12">
          <p>
            © <CurrentYear /> Meyla Shop. Tous droits réservés.
          </p>
          <ul className="flex gap-6">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="relative rounded-[2px] outline-none transition-colors duration-200 hover:text-blush-300 focus-visible:text-blush-300 focus-visible:ring-2 focus-visible:ring-blush-300 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-blush-300 after:transition-transform after:duration-300 hover:after:scale-x-100 focus-visible:after:scale-x-100"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
