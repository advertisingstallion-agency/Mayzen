import Image from "next/image";
import { Star } from "lucide-react";
import { reviews, type Review } from "@/config/reviews";

const byId = (ids: number[]) =>
  ids.map((id) => reviews.find((r) => r.id === id)!);

const rowOne = byId([1, 2, 3, 4, 5, 6]);
const rowTwo = byId([7, 5, 8, 1, 6, 3]);

function Stars({ className }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="5 étoiles sur 5"
      className={`flex gap-0.5 ${className ?? ""}`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className="size-[15px] fill-cognac stroke-cognac"
        />
      ))}
    </span>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="m-0 flex min-h-[300px] w-[300px] shrink-0 flex-col gap-[22px] rounded-[2px] border border-t-2 border-wine-700/12 border-t-cognac bg-gradient-to-b from-white to-ivory-50 p-7 shadow-[0_12px_32px_rgba(62,17,22,0.08)] min-[700px]:w-[400px]">
      <div className="flex items-start justify-between">
        <Stars />
        <svg
          aria-hidden="true"
          width="40"
          height="32"
          viewBox="0 0 40 32"
          className="fill-blush-300"
        >
          <path d="M0 32V19.2C0 8.6 5.6 2 16 0l1.6 4.8C12 6.6 9.6 10 9.2 14.4H17V32H0Zm23 0V19.2C23 8.6 28.6 2 39 0l1 4.8c-5.6 1.8-8 5.2-8.4 9.6H40V32H23Z" />
        </svg>
      </div>
      <blockquote className="m-0 text-[19px] font-medium leading-[1.45] tracking-[-0.015em] text-wine-700">
        “{review.quote}”
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-3.5 border-t border-wine-700/14 pt-5">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-wine-700/30">
          <Image
            src="/brand/leaf-wine.png"
            alt=""
            width={242}
            height={178}
            className="h-auto w-5"
          />
        </span>
        <span className="flex flex-col gap-0.5">
          <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-wine-700">
            {review.label}
          </span>
          <span className="text-[13px] text-muted-ink">
            {review.name} · {review.city}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

function MarqueeRow({
  items,
  animation,
}: {
  items: Review[];
  animation: string;
}) {
  const group = "flex gap-5 pr-5";
  return (
    <div className="group/row overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] motion-reduce:overflow-x-auto motion-reduce:[mask-image:none]">
      <div
        className={`flex w-max will-change-transform ${animation} group-hover/row:[animation-play-state:paused] group-focus-within/row:[animation-play-state:paused] motion-reduce:animate-none`}
      >
        <div className={group}>
          {items.map((r, i) => (
            <ReviewCard key={i} review={r} />
          ))}
        </div>
        <div className={`${group} motion-reduce:hidden`} aria-hidden="true">
          {items.map((r, i) => (
            <ReviewCard key={i} review={r} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Reviews() {
  return (
    <section
      aria-labelledby="rev-title"
      className="overflow-hidden bg-blush-100 py-[72px] min-[700px]:py-28"
    >
      <div className="mx-auto mb-16 flex max-w-[1440px] flex-col items-center gap-5 px-6 text-center min-[900px]:px-12">
        <p className="flex items-center gap-3.5 text-xs font-medium uppercase tracking-[0.14em] text-wine-700">
          <span aria-hidden="true" className="h-px w-10 bg-wine-700" />
          Avis clientes
          <span aria-hidden="true" className="h-px w-10 bg-wine-700" />
        </p>
        <h2
          id="rev-title"
          className="max-w-[760px] text-4xl leading-[1.06] tracking-[-0.035em] text-wine-700 min-[700px]:text-[56px]"
        >
          Elles portent Meyla,{" "}
          <span className="text-cognac">elles en parlent.</span>
        </h2>
        <div className="flex items-center gap-3 text-[15px] text-muted-ink">
          <Stars />
          <span>[4,9] / 5 · [790] avis</span>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <MarqueeRow items={rowOne} animation="animate-reviews" />
        <MarqueeRow items={rowTwo} animation="animate-reviews-reverse" />
      </div>
    </section>
  );
}
