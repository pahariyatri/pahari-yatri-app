import { Button } from "@/components/ui/button";
import Link from "@/components/common/Link";

export default function ScarcityStrip() {
  return (
    <section className="w-full bg-accent text-accent-foreground py-3 border-b border-border/20 relative overflow-hidden">
      {/* Subtle gradient animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-foreground/5 to-transparent opacity-70 animate-shimmer"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 relative z-10">
        <p className="text-accent-foreground font-medium text-sm md:text-base">
          <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.1s' }}>Spring 2026 Yatra</span> 
          <span className="mx-2 inline-block animate-fade-in-up" style={{ animationDelay: '0.2s' }}>–</span> 
          <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.3s' }}>12 Seats</span> 
          <span className="mx-1 inline-block animate-fade-in-up" style={{ animationDelay: '0.4s' }}>·</span> 
          <span className="font-bold inline-block animate-pulse text-primary">7 Remaining</span>
        </p>
        <Link href="/customize-trip">
          <Button 
            variant="secondary"
            size="sm"
            className="font-medium transition-all duration-300 hover:scale-105 hover:shadow-md group"
          >
            <span className="relative overflow-hidden inline-block">
              <span className="relative z-10">Apply Now</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </span>
          </Button>
        </Link>
      </div>
    </section>
  );
}
