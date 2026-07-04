import ResponsiveImage from "./ResponsiveImage";

interface PageHeroProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  image: string;
  align?: "center" | "left";
}

/**
 * Shared editorial hero for ecosystem pages. Static (no scroll effects), with a
 * heavy bottom gradient so the title is always readable over any photo.
 */
export default function PageHero({
  kicker,
  title,
  subtitle,
  image,
  align = "center",
}: PageHeroProps) {
  const alignCls = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <header className="relative w-full h-[62svh] min-h-[420px] overflow-hidden flex items-end">
      <div className="absolute inset-0">
        <ResponsiveImage
          src={image}
          alt={title}
          fill
          sizes="100vw"
          priority
          className="object-cover"
          fallbackSrc="/static/images/himalaya-fallback.jpg"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/55 to-black/20" />
      </div>

      <div className={`relative z-10 w-full max-w-4xl mx-auto px-6 pb-12 sm:pb-16 flex flex-col ${alignCls}`}>
        {kicker && (
          <span className="text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-white/85 mb-4">
            {kicker}
          </span>
        )}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-brandSerif font-medium text-white leading-[1.06] drop-shadow-lg max-w-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-base sm:text-lg text-white/90 font-light max-w-2xl leading-relaxed drop-shadow">
            {subtitle}
          </p>
        )}
      </div>
    </header>
  );
}
