# Claude Code prompt: "Pourquoi Meyla" section

Read `CLAUDE.md` and the existing sections in `components/home/` first (story, categories, new arrivals). Reuse the same brand tokens (`wine-900/700/500`, `blush-300/100`, `ivory-100/50`, `cognac`, `muted-ink`), the same container and the same shadcn `Button`. Stack rules: Next.js App Router, Tailwind 4, lucide-react icons, Inter only. This section is static, so it needs no API calls and no TanStack Query.

Match the design exactly. Do not substitute a card grid or any other layout.

## Goal
Create `components/home/why-meyla.tsx` (server component) and add `<WhyMeyla />` to `app/page.tsx` right after `<Story />`.

## Section
`<section aria-labelledby="why-title">`, background ivory-50 `#FBF7F0`, `relative overflow-hidden`, padding `112px 0`. Inner container `mx-auto max-w-[1440px] px-6 min-[900px]:px-12`, `relative`.

## Header (centred, vertical gap 22px, margin-bottom 72px)
- Tag line: "Pourquoi Meyla" 12px, weight 500, uppercase, letter-spacing 0.14em, wine-700, with a 40px x 1px wine-700 line on **both** sides, gap 14px.
- `h2#why-title`: "Le confort d'une belle matière, la sérénité en plus." max-w 820px, 56px, weight 500, line-height 1.06, letter-spacing -0.035em, wine-700. The part "la sérénité en plus." is cognac `#8A4A2E`.
- Paragraph: "Nous choisissons chaque tissu et chaque coupe avec soin, pour que vous commandiez en confiance." 17px, line-height 1.6, muted-ink, max-w 520px.

## Body: three columns (desktop >= 1100px)
`display: grid; grid-template-columns: 1fr 400px 1fr; gap: 64px; align-items: stretch`.

### Left column and right column
Each is a flex column, `justify-content: space-between`, gap 48px, with two promise items.
Offset them against each other for the zigzag: left column `padding-bottom: 64px`, right column `padding-top: 64px`.

Promise item (4 in total):
- `border-top: 1px solid wine-700/20`, `padding-top: 28px`, flex column, gap 20px.
- Top row (space-between): a 52px circle with blush-100 background and wine-700 lucide icon (24px, stroke 1.5); on the right a big number "01"..."04", 56px, weight 500, line-height 1, letter-spacing -0.04em, colour blush-300, `aria-hidden`.
- `h3` 24px weight 500, letter-spacing -0.02em, wine-700.
- Description 15px, line-height 1.6, muted-ink.

| Side | No. | Icon | Title | Description |
|------|-----|------|-------|-------------|
| Left | 01 | `Feather` | Tissus doux | Satin, velours, crêpe : des matières choisies pour leur toucher et leur tombé. |
| Left | 02 | `Scissors` | Finitions soignées | Coutures nettes, coupes amples et détails pensés pour durer. |
| Right | 03 | `Truck` | Livraison partout au Maroc | Recevez votre commande chez vous et payez à la livraison. |
| Right | 04 | `RotateCcw` | Retours faciles | Un doute sur la taille ? Vous avez 7 jours pour retourner votre article. |

(Use these lucide icons. If one name does not exist in the installed lucide version, pick the closest equivalent.)

### Centre column: arch portrait
Wrapper: `relative`, 400px wide, 620px high, centred in its column.
1. Decorative ring: 560px circle, `border: 1px solid blush-300`, centred behind the portrait (absolutely positioned, `aria-hidden`, it may extend into the neighbouring columns).
2. Portrait: `absolute inset-0 overflow-hidden`, border-radius `200px 200px 2px 2px` (arch), background blush-300. Inside, `next/image` with `fill`, `src="/images/story-journee.jpg"`, `object-cover object-top`, `sizes="400px"`, alt "Femme portant une abaya bordeaux de la collection Meyla". Over it a gradient `from-wine-900/55 to-transparent to-40%` from the bottom (`aria-hidden`).
3. Leaf badge: 96px circle, blush-300 background, `/brand/leaf-wine.png` 34px wide centred, positioned `right: -36px; top: 96px` (`aria-hidden`).
4. Floating info card: `left: -28px; bottom: 44px`, ivory-50 background, 2px radius, padding `14px 20px 14px 14px`, shadow `0 16px 40px rgba(62,17,22,0.18)`, flex row gap 12px. Left: 40px circle with wine-700 background, ivory icon `Banknote` (20px). Right: "Paiement à la livraison" (14px, weight 600, wine-700) over "Vous payez à la réception" (12px, muted-ink).

## Responsive
- Below 1100px: grid becomes two columns (`1fr 1fr`, gap 40px), the portrait goes first and spans both columns (`order: -1; grid-column: 1 / -1`), column paddings are removed, h2 46px.
- Below 700px: single column, portrait 300 x 470px, h2 36px, section padding `72px 0`.

## Quality bar
- Contrast 4.5:1 for all text.
- The four numbers are decorative (`aria-hidden`); the `h3` titles carry the meaning. The section has one `h2`.
- No layout shift: the portrait has fixed dimensions.
- No new dependencies. Run `pnpm lint` and `pnpm build`, fix anything that fails, then give me a short summary of the files you changed.
