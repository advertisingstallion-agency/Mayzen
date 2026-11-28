"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { faqItems } from "@/config/faq";
import { siteConfig } from "@/config/site";

function Avatar() {
  return (
    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-wine-700">
      <Image src="/brand/leaf-cream.png" alt="" width={242} height={178} className="h-auto w-4" />
    </span>
  );
}

export function FaqChat() {
  const [openIndex, setOpenIndex] = useState(0);

  function toggle(index: number) {
    setOpenIndex((current) => (current === index ? -1 : index));
  }

  return (
    <div className="ml-auto w-full max-w-[760px] overflow-hidden rounded-[2px_2px_2px_110px] border border-wine-700/14 bg-blush-100 shadow-[0_24px_60px_rgba(62,17,22,0.12)]">
      <div className="flex items-center gap-3.5 bg-wine-700 px-7 py-5 text-ivory-100">
        <span className="relative flex size-12 shrink-0 items-center justify-center rounded-full bg-blush-300">
          <Image src="/brand/leaf-wine.png" alt="" width={242} height={178} className="h-auto w-[22px]" />
          <span
            aria-hidden="true"
            className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-wine-700 bg-[#7BD389]"
          />
        </span>
        <div className="flex flex-col">
          <span className="text-[17px] font-medium">Meyla</span>
          <span className="text-[13px] text-ivory-100/80">En ligne · répond en quelques minutes</span>
        </div>
      </div>

      <div className="flex flex-col gap-3.5 px-4 pb-7 pt-6 min-[700px]:px-7 min-[700px]:pb-7 min-[700px]:pt-8">
        <div className="flex max-w-[78%] items-end gap-2.5 self-start">
          <Avatar />
          <p className="rounded-[2px_20px_20px_20px] bg-ivory-50 px-[18px] py-3.5 text-[15px] leading-[1.5] text-ink">
            Bonjour et bienvenue chez Meyla ! Choisissez une question ci-dessous, nous vous répondons
            tout de suite.
          </p>
        </div>

        {faqItems.map((item, index) => {
          const open = openIndex === index;
          const answerId = `faq-answer-${item.id}`;
          return (
            <div key={item.id} className="flex flex-col gap-3.5">
              <h3 className="m-0 self-end text-base font-normal tracking-normal max-w-[82%]">
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={answerId}
                  onClick={() => toggle(index)}
                  className={`flex w-full items-center justify-between gap-4 rounded-[20px_20px_2px_20px] border px-[18px] py-3.5 text-left text-[15.5px] font-medium leading-[1.4] text-wine-700 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wine-500 ${
                    open ? "border-wine-700 bg-blush-300" : "border-wine-700/25 bg-ivory-50"
                  }`}
                >
                  {item.question}
                  {open ? (
                    <ChevronUp className="size-[18px] shrink-0 stroke-[1.5]" />
                  ) : (
                    <ChevronDown className="size-[18px] shrink-0 stroke-[1.5]" />
                  )}
                </button>
              </h3>
              <div
                id={answerId}
                role="region"
                aria-label={item.question}
                hidden={!open}
                className="flex max-w-[86%] items-end gap-2.5 self-start motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2 motion-safe:duration-[250ms]"
              >
                <Avatar />
                <p className="rounded-[2px_20px_20px_20px] bg-wine-700 px-5 py-4 text-[15.5px] leading-[1.65] text-ivory-100">
                  {item.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-4 border-t border-wine-700/12 bg-ivory-50 py-[18px] pb-[22px] pl-6 pr-7 min-[700px]:pl-[72px]">
        <p className="min-w-[200px] flex-1 text-[15px] text-muted-ink">
          Une autre question ? Écrivez-nous sur WhatsApp.
        </p>
        <Button
          size="brand"
          nativeButton={false}
          render={<a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" />}
        >
          <MessageCircle />
          Nous écrire
        </Button>
      </div>
    </div>
  );
}
