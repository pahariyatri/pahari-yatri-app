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
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-medium font-brandSerif text-foreground mb-6 leading-[1.12] tracking-tight">
          The Himalayas are not asking
          <span className="block text-muted-foreground">to be visited.</span>
        </h2>
        <p className="text-lg sm:text-xl text-muted-foreground font-light mb-12 max-w-xl mx-auto">
          They are asking to be understood. Learn the trails, the temples, and
          the silence — then walk with awareness.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href={applyUrl}>
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-10 py-7 text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.03]"
            >
              Begin as a Yatri
            </Button>
          </Link>
          <Link
            href="/books"
            className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline transition-colors"
          >
            Or open the Library
          </Link>
        </div>
      </div>
    </section>
  );
}