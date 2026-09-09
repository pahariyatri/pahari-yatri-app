import type { Metadata } from "next";

// The form this page renders (components/application/ApplicationForm +
// conversation.ts) asks what brings you to Pahari Yatri — stories and
// culture, mindful travel, or contributing — and how to stay connected.
// It is the Yatri Circle join flow, not a trek application. The previous
// title/description described a trip nobody applies for on this page.
export const metadata: Metadata = {
  title: "Join the Yatri Circle — Pahari Yatri",
  description:
    "The Yatri Circle is Pahari Yatri's community for people drawn to Himalayan stories, mindful travel, or contributing what they know. Tell us what brings you, and how to stay connected.",
  alternates: { canonical: "/apply" },
};

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen pt-28 md:pt-36 pb-12 md:pb-20">
      {children}
    </div>
  );
}