"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) videoRef.current?.pause();
  }, []);

  async function toggle() {
    const video = videoRef.current;
    if (!video) return;
    try {
      if (video.paused) await video.play();
      else video.pause();
    } catch {
      toast.error("La vidéo ne peut pas être lue pour le moment.");
    }
  }

  return (
    <>
      {failed ? (
        <div className="absolute inset-0 bg-wine-500">
          <div className="absolute inset-3 rounded-tl-[328px] border border-dashed border-ivory-100/35 max-[899px]:rounded-t-[188px]" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 pb-24 text-center text-ivory-100">
            <span className="flex size-[72px] items-center justify-center rounded-full border border-ivory-100/60">
              <Play className="size-7 stroke-[1.5]" />
            </span>
            <p className="text-base font-medium">Votre vidéo ici</p>
            <p className="max-w-xs text-xs leading-relaxed text-ivory-100/70">
              Format carré 1:1 · 1440 × 1440
              <br />
              MP4, sans son, 8 à 15 s
            </p>
          </div>
        </div>
      ) : (
        <video
          ref={videoRef}
          className="absolute inset-0 size-full object-cover"
          src="/videos/video.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Présentation de la nouvelle collection Meyla Shop"
          onError={() => setFailed(true)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
      )}
    </>
  );
}
