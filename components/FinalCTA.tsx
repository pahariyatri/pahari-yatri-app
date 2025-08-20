import { Button } from "@/components/ui/button";
import Link from "@/components/common/Link";

export default function FinalCTA() {
  const backgroundImage = "/static/images/final-cta-bg.jpg";
  const silhouetteImage = "/static/images/himalaya-silhouette.svg";

  // Hardcoded values
  const seatsRemaining = 7;
  const applyUrl = "/apply";
  const ctaText = `Walk with us – ${seatsRemaining} Spots Left`;

  return (
    <section className="w-full py-28 md:py-36 relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105 animate-scale-up"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/50" />

      {/* Silhouette */}
      <div className="absolute inset-0 opacity-40">
        <div
          className="absolute bottom-0 w-full h-40 bg-repeat-x bg-bottom animate-glow"
          style={{ backgroundImage: `url(${silhouetteImage})` }}
        />
      </div>

      {/* Radial Gradient / Particles */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent animate-pulse-slow" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Decorative Divider */}
        <div className="w-24 h-1 bg-primary/80 mx-auto mb-12 rounded-full shadow-sm animate-glow"></div>

        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold font-brandSerif text-white mb-12 leading-tight tracking-tight animate-fade-in-up">
          The mountains don&apos;t wait.
          <br />
          Neither should you.
        </h2>

        <Link href={applyUrl}>
          <Button
            variant="default"
            className="font-medium text-lg px-10 py-7 rounded-full relative overflow-hidden group transition-all duration-500 transform hover:scale-105 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(var(--primary),0.3)] border border-primary/20 hover:border-primary"
          >
            <span className="absolute top-0 left-0 w-full h-full bg-primary-foreground/20 scale-0 rounded-full group-hover:scale-150 transition-transform duration-700 ease-out"></span>
            <span className="relative z-10">{ctaText}</span>
          </Button>
        </Link>
      </div>
    </section>
  );
}