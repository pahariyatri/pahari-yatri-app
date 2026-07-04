import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Pahari Yatri — Conscious, Invitation-Only Himalayan Treks",
  description:
    "Pahari Yatri is not a tour operator — it's a movement of seekers. Discover why we walk small-group, intentional Himalayan treks in Himachal Pradesh, and what makes the Yatri way different.",
  alternates: { canonical: "/why-pahari-yatri" },
};

export default function WhyPahariYatriLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
