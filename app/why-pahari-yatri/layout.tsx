import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Pahari Yatri — Yatri, Not Tourist",
  description:
    "Pahari Yatri is not a tour operator — it's a Himalayan storytelling and responsible-travel community. Understand why we exist, and what makes travelling as a Yatri different from a package tour.",
  alternates: { canonical: "/why-pahari-yatri" },
};

export default function WhyPahariYatriLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
