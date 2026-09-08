import Link from "@/components/common/Link";

export const metadata = {
  title: "Page Not Found",
  robots: "noindex, follow",
};

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-24">
      <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground/60 mb-4">
        404
      </p>
      <h1 className="text-3xl sm:text-4xl font-bold font-brandSerif mb-4">
        This trail doesn&apos;t exist
      </h1>
      <p className="text-muted-foreground max-w-md mb-8">
        The page you&apos;re looking for isn&apos;t in the library — it may have moved,
        or the route was mistyped. Try the library instead.
      </p>
      <Link
        href="/library"
        className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
      >
        Open the Library
      </Link>
    </div>
  );
}
