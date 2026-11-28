# Claude Code prompt: Footer

Read `CLAUDE.md`, `config/site.ts` and the existing layout (`app/layout.tsx`, navbar) first. Reuse the brand tokens. Stack rules: Next.js App Router, Tailwind 4, shadcn, lucide-react icons, Inter only. Footer links and contact details come from `config/site.ts` (extend it with the nav and contact data below), not hard-coded in the component.

Match this design exactly.

## Goal
Create `components/layout/footer.tsx` (server component, except the small back-to-top button which is a client component `components/layout/back-to-top.tsx`) and render `<Footer />` in `app/layout.tsx` after `{children}` so it appears on every page.

## Footer shell
`<footer>`: background wine-900 `#3E1116`, text ivory-100, `relative overflow-hidden`, `padding-top: 96px`. Container `mx-auto max-w-[1440px] px-6 min-[900px]:px-12`.

## 1. Four columns
Grid `1.6fr 1fr 1fr 1.2fr`, gap 48px.

**Column 1, brand (flex column, gap 24px):**
- `/brand/logo-cream.png` at 150px wide, alt "Meyla Shop", linked to `/`.
- Text (15px, line-height 1.7, ivory/75, max-w 300px): "Mode pudique, pyjamas et ensembles pour femmes. Livraison partout au Maroc."
- Three round social links (44px circles, 1px border ivory/30, icon 20px stroke 1.5) with `aria-label`s: Instagram, Facebook, WhatsApp. Hover: icon and border turn blush-300. Use lucide `Instagram`, `Facebook`, `MessageCircle`. If this lucide version no longer ships the brand icons, use small inline SVGs instead.

**Column 2, nav "Boutique":** heading then links (gap 16px): Nouveautés, Hijabs, Abayas & robes, Pyjamas, Ensembles. Links go to the matching collection pages (`/collections/...`).

**Column 3, nav "Aide":** Livraison, Retours & échanges, Guide des tailles, Questions fréquentes (this one links to `/#faq`; add `id="faq"` to the FAQ section).

**Column 4, "Contact":** WhatsApp : [NUMÉRO] (link `https://wa.me/...`), [EMAIL] (`mailto:`), [VILLE], Maroc (plain text), then a small tag "Paiement à la livraison": `align-self: flex-start`, margin-top 8px, 1px border ivory/30, radius 2px, padding `8px 14px`, 12px uppercase, letter-spacing 0.08em, blush-300. Keep the bracketed placeholders as they are, they will be replaced with real details.

Column headings: `<h3>` 12px, weight 500, uppercase, letter-spacing 0.14em, blush-300, margin-bottom 8px. The two nav columns are `<nav>` elements with `aria-label` "Boutique" and "Aide". Links: 15px, ivory/85, hover blush-300 (transition 200ms), visible focus ring in blush-300.

## 2. Watermark logo
Below the columns, `margin-top: 56px`, a decorative band: `height: 260px`, `overflow: hidden`, flex centred, `aria-hidden`. Inside, `/brand/logo-cream.png` with `width: min(900px, 90%)`, `opacity: 0.07`, `margin-top: 12px`, so only the top part of the huge faded logo shows. Use `next/image` with `alt=""`.

## 3. Bottom bar
`border-top: 1px solid ivory/15`. Inside the container, flex row, space-between, centred, gap 16px, wrap, padding `20px 0`, 13px, ivory/75:
- "© {year} Meyla Shop. Tous droits réservés." Compute the year in a way that works for a server component without hydration mismatch (use `new Date().getFullYear()` on the server).
- Links "Conditions générales" (`/conditions-generales`) and "Confidentialité" (`/confidentialite`), gap 24px, hover blush-300.
- Back-to-top button: 44px circle, blush-300 background, wine-700 icon (lucide `ArrowUp`, 18px, stroke 1.5), `aria-label="Retour en haut"`. On click: `window.scrollTo({ top: 0, behavior: "smooth" })`. If Lenis is set up in the project, use `lenis.scrollTo(0)` instead so smooth scrolling stays consistent. Respect `prefers-reduced-motion` (instant scroll).

## Responsive
- Below 1100px: the four columns become two columns (`1fr 1fr`), the brand column spans both.
- Below 700px: a single column, gap 40px; the bottom bar stacks and centres, `padding-top: 72px` on the footer.

## Quality bar
- Contrast 4.5:1 for all text on wine-900.
- Semantic landmarks: `footer`, two labelled `nav`s, one `h3` per column.
- Don't create the legal or collection pages here; links can point to routes that will exist later.
- No new dependencies. Run `pnpm lint` and `pnpm build`, fix anything that fails, then give me a short summary of the files you changed.
