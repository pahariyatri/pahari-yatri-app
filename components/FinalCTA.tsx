import { Button } from "@/components/ui/button";
import Link from "@/components/common/Link";
import Image from "next/image";
import { ArrowRight, BookOpen } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="w-full py-20 sm:py-28 md:py-36 relative overflow-hidden">
      {/* Layered backdrop: photo, dark scrim, brand glow */}
      <div className="absolute inset-0">
        <Image
          src="/static/images/mountains-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-zinc-950/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent" />
      </div>

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10 text-white">
        <span className="inline-block text-[11px] sm:text-xs uppercase tracking-[0.3em] text-white/60 mb-6">
          The way of the Yatri
        </span>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-medium font-brandSerif mb-6 leading-[1.1] tracking-tight">
          The Himalayas are not asking
          <span className="block text-white/60">to be visited.</span>
        </h2>

        <p className="text-base sm:text-xl text-white/75 font-light mb-10 sm:mb-12 max-w-xl mx-auto leading-relaxed">
          They are asking to be understood. Learn the trails, the temples, and
          the silence, then walk with awareness.
        </p>

        {/* Primary + secondary actions — full-width at thumb reach on mobile */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
          <Link href="/apply" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto rounded-full px-10 py-7 text-base sm:text-lg font-medium bg-white text-zinc-900 hover:bg-white/90 shadow-[0_8px_30px_rgba(255,255,255,0.15)] hover:shadow-[0_8px_40px_rgba(255,255,255,0.25)] hover:scale-[1.02] transition-all duration-300"
            >
              Begin as a Yatri
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link href="/library" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto rounded-full px-10 py-7 text-base sm:text-lg font-medium bg-transparent border-white/30 text-white hover:bg-white/10 hover:border-white/60 hover:text-white transition-all duration-300"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Open the Library
            </Button>
          </Link>
        </div>

        <p className="mt-8 text-xs sm:text-sm text-white/40 font-brandSerif italic">
          Walk softly, listen deeply.
        </p>
      </div>
    </section>
  );
}
