"use client";

import { useState } from "react";
import Link from "@/components/common/Link";
import { Play, Instagram, ExternalLink } from "lucide-react";
import type { InstagramReel } from "@/lib/instagram";

/** A reel pulled straight from the Instagram API — plays the raw video
 *  in-page (no Instagram embed iframe), with a link out to the post. */
export default function InstagramReelCard({ reel }: { reel: InstagramReel }) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure className="group flex flex-col">
      <div className="relative w-full aspect-[9/16] overflow-hidden rounded-2xl border border-border/40 bg-muted/20 shadow-md group-hover:shadow-lg group-hover:shadow-primary/5 transition-all duration-500">
        {playing ? (
          <video
            src={reel.mediaUrl}
            poster={reel.thumbnailUrl || undefined}
            controls
            autoPlay
            playsInline
            className="absolute inset-0 h-full w-full object-cover animate-fade-in"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play reel: ${reel.caption || "Instagram reel"}`}
            className="absolute inset-0 w-full flex flex-col items-center justify-center text-center p-6"
          >
            {reel.thumbnailUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={reel.thumbnailUrl}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            ) : (
              <span className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-background" />
            )}
            <span className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
            
            {/* Glassmorphic category badge */}
            <span className="absolute top-3 left-3 z-10 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-white uppercase backdrop-blur-md">
              Instagram Reel
            </span>
            
            {/* Glassmorphic platform icon badge */}
            <span className="absolute top-3 right-3 z-10 rounded-full border border-white/10 bg-black/40 p-1.5 backdrop-blur-md text-white">
              <Instagram className="h-3.5 w-3.5" />
            </span>

            <span className="relative z-10 mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white text-zinc-950 shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
              <Play className="h-6 w-6 translate-x-0.5" fill="currentColor" />
            </span>
            <span className="relative z-10 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-white drop-shadow-sm group-hover:text-primary-foreground/90 transition-colors">
              Play here
            </span>
          </button>
        )}
      </div>

      <figcaption className="pt-4">
        {reel.caption && (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {reel.caption}
          </p>
        )}
        <Link
          href={reel.permalink}
          className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          <Instagram className="h-3.5 w-3.5" />
          Open on Instagram
          <ExternalLink className="h-3 w-3" />
        </Link>
      </figcaption>
    </figure>
  );
}
