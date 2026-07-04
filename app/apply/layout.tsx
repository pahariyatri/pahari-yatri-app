import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply to Walk — Join a Pahari Yatri Himalayan Trek",
  description:
    "Apply to join a small-group Himalayan trek with Pahari Yatri. Tell us your intention and we'll match you to a journey that fits your spirit and fitness. We review every application and reply within 24 hours.",
  alternates: { canonical: "/apply" },
};

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen py-12 md:py-20">
      {children}
    </div>
  );
}