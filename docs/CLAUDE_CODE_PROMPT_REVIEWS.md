# Claude Code prompt: Reviews section (endless marquee)

Read `CLAUDE.md` and the existing sections in `components/home/` first. Reuse the brand tokens and container. Stack rules: Next.js App Router, Tailwind 4, lucide-react icons, Inter only. Reviews are static example data for now: put them in `config/reviews.ts` as a typed array so they can later be replaced by real reviews (and later fetched with TanStack Query if an API is added).

Match this design exactly: two rows of review cards that scroll endlessly in opposite directions.

## Goal
Create `components/home/reviews.tsx` and add `<Reviews />` to `app/page.tsx` after `<WhyMeyla />`. The animation is pure CSS, so the component can stay a server component.

## Section
`<section aria-labelledby="rev-title">`, background blush-100 `#F7E4E0`, `overflow-hidden`, padding `112px 0`.

### Header (centred, vertical gap 20px, margin-bottom 64px)
- Tag line "Avis clientes": 12px, weight 500, uppercase, letter-spacing 0.14em, wine-700, with a 40px x 1px wine-700 line on both sides (gap 14px).
- `h2#rev-title`: "Elles portent Meyla, elles en parlent." max-w 760px, 56px (38px on mobile), weight 500, line-height 1.06, letter-spacing -0.035em, wine-700. "elles en parlent." is cognac `#8A4A2E`.
- Rating row (15px, muted-ink): five filled cognac stars, then the placeholder text "[4,9] / 5 · [NN] avis". Keep the brackets, they will be replaced with real numbers.

### Two marquee rows (vertical gap 20px)
Each row is `overflow-hidden` with a fade at both edges:
`mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)`.

Inside a row: a `track` (`display:flex; width:max-content`) containing **two identical groups** (`display:flex; gap:20px; padding-right:20px`). The second group is `aria-hidden="true"`. The track animates `translateX(0)` to `translateX(-50%)`, linear, infinite, so the loop is seamless.
- Row 1: 70s, moving left, reviews 1 to 6.
- Row 2: 85s, same keyframes with `animation-direction: reverse`, reviews 7, 5, 8, 1, 6, 3.
- Pause both rows on hover (`animation-play-state: paused` on `.row:hover .track`) and when a card has focus within.
- `@media (prefers-reduced-motion: reduce)`: no animation. The rows become horizontally scrollable (`overflow-x: auto`) instead.
- Define the keyframes in `app/globals.css` as `--animate-reviews` (like `--animate-spin-slow`), no JS.

### Review card
- Width 400px (300px below 700px), min-height 300px, padding 28px, flex column, gap 22px.
- Background `linear-gradient(180deg, ivory-50, ivory-100)`, `border: 1px solid wine-700/12`, **`border-top: 2px solid cognac`**, radius 2px, shadow `0 12px 32px rgba(62,17,22,0.08)`.
- Top row (space-between): five cognac stars (15px lucide `Star`, filled, wrapped with `role="img" aria-label="5 étoiles sur 5"`), and a big quote mark in blush-300 on the right (40 x 32px SVG).
- Quote: `blockquote`, 19px, weight 500, line-height 1.45, letter-spacing -0.015em, wine-700, wrapped in “ ”.
- Footer pinned to the bottom (`margin-top: auto`): `border-top: 1px solid wine-700/14`, padding-top 20px, flex row gap 14px. Left: 44px circle with a 1px wine-700/30 border containing `/brand/leaf-wine.png` at 20px. Right: a label (11px, weight 600, uppercase, letter-spacing 0.1em, wine-700) over "Prénom N. · Ville" (13px, muted-ink).

### Example reviews (`config/reviews.ts`)
Shape: `{ id, label, quote, name, city }`.
1. Un toucher incroyable: Le tissu est incroyablement doux et la coupe tombe parfaitement. Je me sens élégante et à l'aise. (Casablanca)
2. Livraison rapide: Le set pyjama en satin est un vrai plaisir à porter. Livraison rapide et paiement à la livraison : rassurant. (Rabat)
3. Un coloris sublime: La couleur du hijab est magnifique et le tombé est parfait. Je l'ai déjà commandé dans un deuxième coloris. (Marrakech)
4. Confort au quotidien: Je porte mon ensemble du matin au soir : il reste élégant et ne se froisse pas. (Tanger)
5. Finitions soignées: Tout est soigné, des coutures jusqu'aux boutons. On sent que chaque pièce est pensée avec soin. (Fès)
6. Retour sans stress: Une taille à échanger, et tout s'est réglé en deux messages. Un service très agréable. (Agadir)
7. Pudique et élégante: Enfin une abaya ample, fluide et jamais transparente. Je la recommande à toutes mes amies. (Meknès)
8. Un cadeau parfait: Offert à ma sœur, le pyjama en velours l'a ravie. Le colis était très soigné. (Oujda)

Under the rows, a small centred note (12px, muted-ink): "Exemples d'avis, à remplacer par de vrais avis clients avant la mise en ligne." Name every placeholder author "Prénom N.".

## Quality bar
- Contrast 4.5:1 for all text. The duplicated group is hidden from assistive tech, so each review is read once.
- No layout shift. Cards have fixed widths.
- Smooth on mobile: animate only `transform`, add `will-change: transform` on the track.
- No new dependencies. Run `pnpm lint` and `pnpm build`, fix anything that fails, then give me a short summary of the files you changed.
