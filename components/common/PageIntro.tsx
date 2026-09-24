interface PageIntroProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}

/**
 * Editorial, image-free page header for library/hub pages. Replaces the old
 * full-bleed PageHero photo on pages where the background image was purely
 * decorative — the title and intro copy carry the page instead, so there is
 * no LCP image to load and no empty hero shell to pad out. Shares the same
 * horizontal container width as SectionContainer so it lines up with the
 * cards/content that follow it.
 */
export default function PageIntro({
  kicker,
  title,
  subtitle,
  align = "left",
}: PageIntroProps) {
  const alignCls = align === "center" ? "text-center" : "text-left";
  const maxW = align === "center" ? "max-w-2xl mx-auto" : "max-w-2xl";
  return (
    <header className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0 pt-14 sm:pt-20 pb-8 sm:pb-10">
      <div className={`${maxW} ${alignCls}`}>
        {kicker && (
          <span className="block text-primary text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mb-4">
            {kicker}
          </span>
        )}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-brandSerif font-medium leading-[1.1] text-foreground">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed font-light">
            {subtitle}
          </p>
        )}
      </div>
    </header>
  );
}
