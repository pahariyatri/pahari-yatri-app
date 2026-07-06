"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Film as FilmType } from "@/components/ReelCard";
import ReelCard from "@/components/ReelCard";
import InstagramReelCard from "@/components/InstagramReelCard";
import { InstagramReel } from "@/lib/instagram";
import { cn } from "@/lib/utils";
import { Grid, ListFilter, Search } from "lucide-react";

interface FilmsListProps {
  initialFilms: FilmType[];
  instagramReels: InstagramReel[] | null;
}

type FilterType = "all" | "reels" | "youtube";

export default function FilmsList({ initialFilms, instagramReels }: FilmsListProps) {
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const hasLiveReels = instagramReels && instagramReels.length > 0;

  // Filter films from Keystatic
  const filteredFilms = initialFilms.filter((film) => {
    const matchesSearch =
      film.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (film.description || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (film.region || "").toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filter === "reels") {
      return film.platform !== "youtube";
    }
    if (filter === "youtube") {
      return film.platform === "youtube";
    }
    return true;
  });

  // Filter live Instagram reels
  const filteredLiveReels = hasLiveReels
    ? instagramReels.filter((reel) => {
        const matchesSearch =
          (reel.caption || "").toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch && (filter === "all" || filter === "reels");
      })
    : [];

  const totalResults = filteredFilms.length + filteredLiveReels.length;

  return (
    <div className="space-y-10">
      {/* Filtering and Search Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/30 pb-6">
        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ListFilter className="h-4 w-4 text-muted-foreground mr-2 shrink-0" />
          <div className="flex items-center gap-1 bg-muted/40 p-1 rounded-full border border-border/40 backdrop-blur-sm">
            {(
              [
                { label: "All Stories & Films", value: "all" },
                { label: "Short Reels", value: "reels" },
                { label: "Documentaries", value: "youtube" },
              ] as const
            ).map((tab) => {
              const active = filter === tab.value;
              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setFilter(tab.value)}
                  className={cn(
                    "relative rounded-full px-5 py-2 text-xs sm:text-sm font-medium transition-colors duration-300 whitespace-nowrap z-10",
                    active
                      ? "text-primary-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="active-film-filter"
                      className="absolute inset-0 rounded-full bg-primary -z-10 shadow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
          <input
            type="text"
            placeholder="Search by region, title, or caption..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-full border border-border/50 bg-background/40 pl-10 pr-4 text-sm transition-all focus:border-primary/80 focus:bg-background/80 focus:outline-none focus:ring-2 focus:ring-primary/20 backdrop-blur-sm"
          />
        </div>
      </div>

      {/* Grid of Results */}
      <AnimatePresence mode="popLayout">
        {totalResults > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start"
          >
            {/* Live Reels */}
            {filteredLiveReels.map((reel) => (
              <motion.div
                layout
                key={`live-${reel.id}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <InstagramReelCard reel={reel} />
              </motion.div>
            ))}

            {/* Local Films */}
            {filteredFilms.map((film) => (
              <motion.div
                layout
                key={`local-${film.slug}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  film.platform === "youtube" && filter === "all"
                    ? "sm:col-span-2 lg:col-span-2 aspect-video"
                    : ""
                )}
              >
                <ReelCard film={film} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 max-w-md mx-auto"
          >
            <Grid className="h-10 w-10 text-muted-foreground/60 mx-auto mb-4" strokeWidth={1.5} />
            <h3 className="text-lg font-brandSerif font-medium mb-2">No films found</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We couldn&apos;t find any films matching &ldquo;{searchQuery}&rdquo;. Try checking the spelling or searching a different term.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
