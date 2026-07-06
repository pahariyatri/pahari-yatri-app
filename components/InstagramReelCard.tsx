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
      <div className="relative w-full aspect-[9/16] overflow-hidden rounded-2xl border border-border/60 bg-muted/30">
        {playing ? (
          <video
            src={reel.mediaUrl}
            poster={reel.thumbnailUrl || undefined}
            controls
            autoPlay
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play reel: ${reel.caption || "Instagram reel"}`}
            className="absolute inset-0 w-full"
          >
            {reel.thumbnailUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={reel.thumbnailUrl}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <span className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-background" />
            )}
            <span className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/35" />
            <span className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-zinc-900 shadow-xl transition-transform duration-300 group-hover:scale-110">
                <Play className="h-7 w-7 translate-x-0.5" fill="currentColor" />
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-white drop-shadow">
                <Instagram className="h-3.5 w-3.5" />
                Play here
              </span>
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
