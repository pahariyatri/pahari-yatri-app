import { Button } from "@/components/ui/button";
import Link from "@/components/common/Link";

export default function FinalCTA() {
  const applyUrl = "/apply";

  return (
    <section className="w-full py-32 md:py-48 relative overflow-hidden flex items-center justify-center bg-background">
      {/* Subtle Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold font-brandSerif text-foreground mb-8 leading-tight tracking-tight">
          The mountains are calling.
        </h2>
        <p className="text-xl text-muted-foreground font-light mb-12">
          Will you answer?
        </p>

        <Link href={applyUrl}>
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-12 py-8 text-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Begin Your Journey
          </Button>
        </Link>

        <p className="mt-6 text-sm text-muted-foreground/60 font-brandSerif italic">
          Limited spots available for the upcoming season.
        </p>
      </div>
    </section>
  );
}