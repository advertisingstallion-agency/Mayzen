"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  colorKeys,
  colorOptions,
  materialKeys,
  sizeKeys,
  type ColorKey,
  type Material,
  type SizeKey,
} from "@/lib/products";
import { PRICE_MAX, PRICE_MIN, type ShopFilters } from "@/lib/shop-params";

type Props = {
  filters: ShopFilters;
  materialCounts?: Record<string, number>;
  onChange: (patch: Partial<ShopFilters>) => void;
  onReset: () => void;
};

const blockTitle = "mb-4 text-xs font-medium uppercase tracking-[0.14em] text-cognac";
const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-wine-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory-50";

function toggle<T extends string>(list: T[], value: T) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

// Local state while dragging, committed to the URL on release. Remounted (key) when the URL changes.
function PriceBlock({ value, onCommit }: { value: [number, number]; onCommit: (v: [number, number]) => void }) {
  const [range, setRange] = useState<[number, number]>(value);
  return (
    <div>
      <Slider
        min={PRICE_MIN}
        max={PRICE_MAX}
        step={10}
        value={range}
        onValueChange={(v) => Array.isArray(v) && setRange([v[0], v[1]])}
        onValueCommitted={(v) => Array.isArray(v) && onCommit([v[0], v[1]])}
        aria-label="Fourchette de prix"
      />
      <div className="mt-4 flex justify-between text-[13px] text-muted-ink">
        {/* TODO: show the real values ({range[0]} / {range[1]}) once prices exist. */}
        <span>[MIN] MAD</span>
        <span>[MAX] MAD</span>
      </div>
    </div>
  );
}

export function Filters({ filters, materialCounts, onChange, onReset }: Props) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between border-b border-wine-700 pb-4">
        <h2 className="text-xl font-medium tracking-normal text-wine-700">Filtres</h2>
        <button
          type="button"
          onClick={onReset}
          className={`rounded-[2px] text-[13px] text-muted-ink underline underline-offset-4 hover:text-wine-700 ${focusRing}`}
        >
          Réinitialiser
        </button>
      </div>

      <section aria-label="Couleur" className="border-b border-wine-700/14 py-6">
        <h3 className={blockTitle}>Couleur</h3>
        <div className="flex flex-wrap gap-3">
          {colorKeys.map((key: ColorKey) => {
            const selected = filters.couleur.includes(key);
            return (
              <button
                key={key}
                type="button"
                aria-pressed={selected}
                aria-label={colorOptions[key].label}
                title={colorOptions[key].label}
                onClick={() => onChange({ couleur: toggle(filters.couleur, key) })}
                className={`size-8 rounded-full ${focusRing} ${
                  selected ? "ring-2 ring-wine-700 ring-offset-2 ring-offset-ivory-50" : ""
                }`}
                style={{ backgroundColor: colorOptions[key].hex, boxShadow: selected ? undefined : "inset 0 0 0 1px rgba(88,28,38,0.2)" }}
              />
            );
          })}
        </div>
      </section>

      <section aria-label="Taille" className="border-b border-wine-700/14 py-6">
        <h3 className={blockTitle}>Taille</h3>
        <div className="flex flex-wrap gap-2">
          {sizeKeys.map((size: SizeKey) => {
            const selected = filters.taille.includes(size);
            return (
              <button
                key={size}
                type="button"
                aria-pressed={selected}
                onClick={() => onChange({ taille: toggle(filters.taille, size) })}
                className={`h-11 min-w-12 rounded-[2px] border px-3 text-sm font-medium ${focusRing} ${
                  selected
                    ? "border-wine-700 bg-wine-700 text-ivory-100"
                    : "border-wine-700/30 text-wine-700 hover:bg-wine-700/10"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </section>

      <section aria-label="Prix" className="border-b border-wine-700/14 py-6">
        <h3 className={blockTitle}>Prix</h3>
        <PriceBlock
          key={filters.prix.join("-")}
          value={filters.prix}
          onCommit={(prix) => onChange({ prix })}
        />
      </section>

      <section aria-label="Matière" className="border-b border-wine-700/14 py-6">
        <h3 className={blockTitle}>Matière</h3>
        <ul className="flex flex-col gap-3">
          {materialKeys.map((material: Material) => (
            <li key={material}>
              <label className="flex cursor-pointer items-center gap-3 text-[15px] text-ink">
                <Checkbox
                  checked={filters.matiere.includes(material)}
                  onCheckedChange={() => onChange({ matiere: toggle(filters.matiere, material) })}
                  className="size-5 rounded-[2px] border-wine-700/40"
                />
                <span className="flex-1">{material}</span>
                {materialCounts && (
                  <span className="text-[13px] text-muted-ink">{materialCounts[material] ?? 0}</span>
                )}
              </label>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Offres" className="py-6">
        <h3 className={blockTitle}>Offres</h3>
        <label className="flex cursor-pointer items-center justify-between gap-3 text-[15px] text-ink">
          En promotion
          <Switch checked={filters.promo} onCheckedChange={(promo) => onChange({ promo })} />
        </label>
      </section>

      <Button type="button" variant="outline-wine" size="brand" onClick={onReset} className="mt-2 min-[1100px]:hidden">
        Réinitialiser les filtres
      </Button>
    </div>
  );
}
