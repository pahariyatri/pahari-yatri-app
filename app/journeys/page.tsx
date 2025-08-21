import keystaticConfig from "@/keystatic.config";
import { createReader } from "@keystatic/core/reader";
import JourneyClientPage from "./client-page";

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Journeys() {
  const journeyData = await reader.collections.packages.all();

  const journeys = journeyData.map((j) => ({
    title: j.entry.title || "Untitled Journey",
    description: j.entry.excerpt || "A path into the Himalayas.",
    imageSrc: j.entry.image || "/static/images/journey-banner.jpg",
    href: `/journey/${j.slug}`,
  }));

  return (
    <JourneyClientPage journeys={journeys} />
  );
}
