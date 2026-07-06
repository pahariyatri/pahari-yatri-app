"use client";

import { useState } from "react";
import Link from "@/components/common/Link";
import siteMetadata from "@/data/siteMetadata";
import { Play, Instagram, Youtube, ExternalLink } from "lucide-react";

export interface FilmContextLink {
  href: string;
  label: string;
  kind: "chapter" | "story";
}

export interface Film {
  slug: string;
  title: string;
  platform: string;
  url: string;
  description?: string;
  region?: string;
  thumbnail?: string | null;
  related?: FilmContextLink[];
}

type Parsed = {
  type: "instagram" | "youtube";
  valid: boolean;
  embedUrl: string | null;
  posterUrl: string | null;
  watchUrl: string;
  ratio: string;
};

function parse(url: string, platform: string): Parsed {
  const isYouTube = platform === "youtube" || /youtu\.?be/.test(url);
  if (isYouTube) {
    const m = url.match(/(?:v=|youtu\.be\/|\/embed\/|\/shorts\/)([A-Za-z0-9_-]{6,})/);
    const id = m?.[1];
    const valid = !!id && !/^EXAMPLE/i.test(id);
    return {
      type: "youtube",
      valid,
      embedUrl: valid ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : null,
      posterUrl: valid ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null,
      watchUrl: valid ? url : siteMetadata.youtube,
      ratio: "aspect-video",
    };
  }
  const m = url.match(/instagram\.com\/(?:reel|reels|p|tv)\/([A-Za-z0-9_-]+)/);
  const code = m?.[1];
  const valid = !!code && !/^EXAMPLE/i.test(code);
  return {
    type: "instagram",
    valid,
    embedUrl: valid ? `https://www.instagram.com/reel/${code}/embed` : null,
    posterUrl: null,
    watchUrl: valid ? url : siteMetadata.instagram,
    ratio: "aspect-[9/16]",
  };
}

export default function ReelCard({ film }: { film: Film }) {
  const p = parse(film.url || "", film.platform);
  // Prefer an editor-uploaded thumbnail; fall back to the platform's own
  // poster (YouTube only — Instagram doesn't expose one without the API).
  const poster = film.thumbnail || p.posterUrl;
  const PlatformIcon = p.type === "youtube" ? Youtube : Instagram;
  const platformName = p.type === "youtube" ? "YouTube" : "Instagram";
  // The heavy third-party player only loads after the reader presses play,
  // so listing pages stay fast even with many films.
  const [playing, setPlaying] = useState(false);

  return (
    <figure className="group flex flex-col">
      <div
        className={`relative w-full ${p.ratio} overflow-hidden rounded-2xl border border-border/60 bg-muted/30`}
      >
        {p.valid && p.embedUrl && playing ? (
          <iframe
            src={p.embedUrl}
            title={film.title}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            scrolling="no"
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : p.valid && p.embedUrl ? (
          /* Poster facade — tap to play right here on the page */
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${film.title}`}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 w-full"
          >
            {poster ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={poster}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <span className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-background" />
            )}
            <span className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/35" />
            <span className="relative z-10 mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-zinc-900 shadow-xl transition-transform duration-300 group-hover:scale-110">
              <Play className="h-7 w-7 translate-x-0.5" fill="currentColor" />
            </span>
            <span className="relative z-10 inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-white drop-shadow">
              <PlatformIcon className="h-3.5 w-3.5" />
              Play here
            </span>
          </button>
        ) : (
          /* No playable URL yet — send the viewer straight to the channel */
          <Link
            href={p.watchUrl}
            className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-background to-background text-center p-6"
          >
            <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-primary transition-transform duration-300 group-hover:scale-110">
              <Play className="h-7 w-7 translate-x-0.5" fill="currentColor" />
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted-foreground">
              <PlatformIcon className="h-3.5 w-3.5" />
              Watch on {platformName}
            </span>
          </Link>
        )}
      </div>

      <figcaption className="pt-4">
        {film.region && (
          <span className="block text-[11px] uppercase tracking-widest text-primary/70 mb-1">
            {film.region}
          </span>
        )}
        <h3 className="font-brandSerif text-lg font-medium leading-tight mb-1">
          {film.title}
        </h3>
        {film.description && (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {film.description}
          </p>
        )}
        <Link
          href={p.watchUrl}
          className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          <PlatformIcon className="h-3.5 w-3.5" />
          Open on {platformName}
          <ExternalLink className="h-3 w-3" />
        </Link>

        {/* The context bridge: someone arrives from a shared reel, and the
            library gives them the full story behind those 30 seconds. */}
        {film.related && film.related.length > 0 && (
          <div className="mt-3 rounded-xl border border-border/50 bg-muted/30 p-3 space-y-1.5">
            <span className="block text-[10px] uppercase tracking-widest text-muted-foreground/70">
              The story behind this film
            </span>
            {film.related.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="flex items-center justify-between gap-2 text-sm font-medium text-foreground/90 hover:text-primary transition-colors"
              >
                <span className="truncate">
                  {r.kind === "chapter" ? "Read the chapter: " : "Read the story: "}
                  {r.label}
                </span>
                <span aria-hidden className="shrink-0 text-primary">→</span>
              </Link>
            ))}
          </div>
        )}
      </figcaption>
    </figure>
  );
}
