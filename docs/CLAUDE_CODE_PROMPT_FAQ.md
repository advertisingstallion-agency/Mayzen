# Claude Code prompt: FAQ section (chat conversation)

Read `CLAUDE.md` and the existing sections in `components/home/` first. Reuse the brand tokens and container. Stack rules: Next.js App Router, Tailwind 4, shadcn, lucide-react icons, Inter only. The FAQ content is static for now: put it in `config/faq.ts` as a typed array.

Match this design exactly. It is a chat conversation, not a classic accordion. Do not build an accordion list.

## Goal
Create `components/home/faq.tsx` and add `<Faq />` to `app/page.tsx` after `<Reviews />`. The server component renders the layout; the interactive chat window is a small client component `components/home/faq-chat.tsx` (state: index of the open question, default 0, `-1` for none; clicking the open question closes it).

## Section
`<section aria-labelledby="faq-title">`, background ivory-50 `#FBF7F0`, `relative overflow-hidden`, padding `112px 0`. A decorative `/brand/leaf-wine.png` (520px wide, opacity 0.07, rotated 18deg) sits at `left: -80px; bottom: -60px` (`aria-hidden`, `alt=""`). Container `max-w-[1440px] px-6 min-[900px]:px-12`, grid `5fr 7fr`, gap 80px, `items-start`.

## Left column (sticky at `top: 48px`, vertical gap 24px)
- Tag "Aide": 12px, weight 500, uppercase, letter-spacing 0.14em, cognac `#8A4A2E`, preceded by a 40px x 1px cognac line.
- `h2#faq-title`: "Une question ? On vous répond." 56px (36px on mobile), weight 500, line-height 1.04, letter-spacing -0.035em, wine-700. "On vous répond." is cognac.
- Paragraph (17px, line-height 1.6, muted-ink, max-w 400px): "Touchez une question pour lire la réponse, comme dans une vraie conversation. Et si vous ne trouvez pas la vôtre, écrivez-nous."
- Four chips (rounded-full, 1px border wine-700/25, 14px, weight 500, wine-700, padding 8px 16px): Livraison, Tailles, Retours, Entretien. They are decorative, not links.

## Right column: the chat window (client component)
Container: max-w 760px, aligned to the right of the column, background blush-100 `#F7E4E0`, `border: 1px solid wine-700/14`, `overflow-hidden`, border-radius `2px 2px 2px 110px` (one big curved bottom-left corner), shadow `0 24px 60px rgba(62,17,22,0.12)`.

1. **Header bar:** wine-700 background, ivory text, padding `20px 28px`, flex gap 14px. A 48px blush-300 circle with `/brand/leaf-wine.png` (22px) and a 12px green dot (`#7BD389`, 2px wine-700 border) at its bottom-right. Next to it: "Meyla" (17px, weight 500) over "En ligne · répond en quelques minutes" (13px, ivory/80).
2. **Messages area:** flex column, gap 14px, padding `32px 28px 28px` (`24px 16px` on mobile).
   - Greeting bubble from Meyla, left-aligned, max-w 78%: 32px wine-700 avatar circle with `/brand/leaf-cream.png` (16px) + a bubble (ivory-50 background, radius `2px 20px 20px 20px`, padding `14px 18px`, 15px, ink `#2A1215`): "Bonjour et bienvenue chez Meyla ! Choisissez une question ci-dessous, nous vous répondons tout de suite."
   - For each FAQ item: the **question** is the customer's bubble, right-aligned (`align-self: flex-end`, max-w 82%), rendered as a `<button type="button">` inside an `<h3>` with `aria-expanded` and `aria-controls`. Style: flex, space-between, gap 16px, text-left, padding `14px 18px`, radius `20px 20px 2px 20px`, 15.5px, weight 500, line-height 1.4, wine-700 text. Closed: ivory-50 background with 1px wine-700/25 border. Open: blush-300 background with 1px wine-700 border. At the end of the bubble show a lucide `ChevronDown` (18px, stroke 1.5), or `ChevronUp` when open.
   - When open, directly under it the **answer** appears as Meyla's bubble, left-aligned, max-w 86%: avatar circle (32px, wine-700, leaf-cream 16px) + bubble (wine-700 background, ivory-100 text, radius `2px 20px 20px 20px`, padding `16px 20px`, 15.5px, line-height 1.65). Give it `id` and `role="region"` linked from `aria-controls`. Animate the appearance (opacity + `translateY(8px)` to 0, 250ms) only with `motion-safe`.
3. **Footer bar:** ivory-50 background, `border-top: 1px solid wine-700/12`, padding `18px 28px 22px 72px` (the extra left padding follows the curved corner), flex row, gap 16px, items centred. Left: "Une autre question ? Écrivez-nous sur WhatsApp." (15px, muted-ink, `flex-1`). Right: a shadcn `Button` `size="brand"` wine-700 background with ivory text, label "Nous écrire" and a lucide `MessageCircle` icon, linking to the WhatsApp URL from `config/site.ts` (`https://wa.me/[NUMÉRO]`, keep the placeholder).

## FAQ content (`config/faq.ts`, shape `{ id, question, answer }`)
1. Comment choisir ma taille ? Nos coupes sont amples. Consultez le guide des tailles sur chaque fiche produit, et écrivez-nous sur WhatsApp si vous hésitez entre deux tailles.
2. Quels sont les délais de livraison ? Nous livrons partout au Maroc. Les délais sont de [24 à 72 h] selon votre ville. Vous recevez un message dès l'expédition de votre commande.
3. Puis-je payer à la livraison ? Oui. Le paiement à la livraison est disponible sur toutes les commandes : vous payez en main propre au livreur, après avoir reçu votre colis.
4. Comment retourner un article ? Vous avez 7 jours après la réception pour demander un retour ou un échange. L'article doit être non porté, avec son étiquette. Contactez-nous et nous vous guidons.
5. Comment entretenir le satin et le velours ? Lavage délicat à froid, à l'envers, sans sèche-linge. Repassez à basse température et rangez les pièces à plat ou sur cintre.

Keep the `[24 à 72 h]` placeholder with its brackets so it is easy to find and replace.

## SEO
In the server component, add a `FAQPage` JSON-LD `<script type="application/ld+json">` built from the same `config/faq.ts` data (questions and answers as plain text).

## Responsive
- Below 1100px: one column, text block first (no longer sticky), chat window full width.
- Below 700px: h2 36px, section padding `72px 0`, the footer bar wraps with `padding-left: 24px`.

## Quality bar
- Contrast 4.5:1 for all text, visible focus ring on the question buttons (wine-500 outline, 2px offset).
- Keyboard: Tab to each question, Enter/Space toggles. Only one answer open at a time.
- Respect `prefers-reduced-motion`.
- No new dependencies. Run `pnpm lint` and `pnpm build`, fix anything that fails, then give me a short summary of the files you changed.
