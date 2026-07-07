import { config, fields, collection, singleton } from "@keystatic/core";

export const showAdminUI = process.env.NODE_ENV === "development";

export default config({
  storage: { kind: "local" },
  ui: {
    brand: { name: "Yatri CMS" },
    navigation: {
      "Region Hubs": ["regions", "destinations", "places", "stories"],
      "Journeys (Legacy)": ["books", "chapters"],
      "Landing Page": ["banners"],
      "Site Meta data": ["settings", "seo"],
    },
  },
  collections: {
    regions: collection({
      label: "Regions",
      slugField: "title",
      path: "data/regions/*",
      schema: {
        title: fields.slug({
          name: { label: "Region Name", validation: { isRequired: true } },
        }),
        description: fields.text({ label: "Description", multiline: true }),
        heroImage: fields.image({
          label: "Hero Image",
          directory: "public/static/images/regions",
          publicPath: "/static/images/regions/",
        }),
      },
    }),

    destinations: collection({
      label: "Destinations (Travel Guides)",
      slugField: "title",
      path: "data/destinations/*",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        title: fields.slug({
          name: { label: "Destination Name", validation: { isRequired: true } },
        }),
        parentRegion: fields.relationship({
          label: "Parent Region",
          collection: "regions",
          validation: { isRequired: true },
        }),
        description: fields.text({ label: "Short Description", multiline: true }),
        content: fields.mdx({
          label: "Guide Content",
          extension: "mdx",
        }),
        image: fields.image({
          label: "Featured Image",
          directory: "public/static/images/destinations",
          publicPath: "/static/images/destinations/",
        }),
      },
    }),

    places: collection({
      label: "Places (Sightseeing)",
      slugField: "title",
      path: "data/places/*",
      schema: {
        title: fields.slug({
          name: { label: "Place Name", validation: { isRequired: true } },
        }),
        parentRegion: fields.relationship({
          label: "Parent Region",
          collection: "regions",
          validation: { isRequired: true },
        }),
        description: fields.text({ label: "Description", multiline: true }),
        image: fields.image({
          label: "Featured Image",
          directory: "public/static/images/places",
          publicPath: "/static/images/places/",
        }),
        coordinates: fields.text({ label: "Coordinates (Lat, Long)" }),
      },
    }),

    books: collection({
      label: "Books (Editions)",
      slugField: "title",
      path: "data/books/*",
      schema: {
        title: fields.slug({
          name: { label: "Edition Title", validation: { isRequired: true } },
        }),
        year: fields.integer({ label: "Edition Year" }),
        invitation: fields.text({
          label: "Sacred Invitation",
          multiline: true,
          description:
            "1–2 poetic lines that introduce the energy of this season.",
        }),
        excerpt: fields.text({
          label: "Edition Summary",
          multiline: true,
          validation: { length: { min: 50, max: 300 } },
        }),
        coverImage: fields.image({
          label: "Cover Image",
          directory: "public/static/images/books",
          publicPath: "/static/images/books/",
          validation: { isRequired: true },
        }),
        relatedChapters: fields.array(
          fields.relationship({
            label: "Chapters in this Edition",
            collection: "chapters",
          }),
          {
            label: "Chapters",
            itemLabel: (props) => {
              const v = props.value;
              if (v && typeof v === "object") return (v as any).title ?? "Select or create a Chapter";
              if (typeof v === "string") return v;
              return "Select or create a Chapter";
            },
          }
        ),
      },
    }),

    chapters: collection({
      label: "Chapters (Journeys)",
      slugField: "title",
      path: "data/chapters/*",
      schema: {
        title: fields.slug({
          name: { label: "Chapter Title", validation: { isRequired: true } },
        }),
        invitation: fields.text({
          label: "Chapter Invitation",
          multiline: true,
          description:
            "Emotional hook. Example: ‘A walk into silence, where the mountain teaches you who you are.’",
        }),
        excerpt: fields.text({
          label: "Chapter Summary",
          multiline: true,
          validation: { length: { min: 50, max: 250 } },
        }),
        location: fields.text({ label: "Region / Trailhead" }),

        // ── The Journey (first-person narrative) ──────────────────────────
        narrative: fields.text({
          label: "The Journey — first-person narrative",
          multiline: true,
          description:
            "The lived story of this chapter, written as a Yatri walking it. Separate paragraphs with a blank line.",
        }),
        closingQuote: fields.text({
          label: "Closing Quote",
          description: "One memorable line to end the chapter.",
        }),

        // ── Practical Trek Guide (for SEO + first-time visitors) ──────────
        overview: fields.text({
          label: "Trek Overview (SEO intro)",
          multiline: true,
          description:
            "2–4 plain-language paragraphs for search engines and first-time visitors. Mention the trek name, region, distance, and what makes it special.",
        }),
        duration: fields.text({
          label: "Duration",
          description: "e.g. ‘2 Days / 1 Night’",
        }),
        distance: fields.text({
          label: "Trek Distance",
          description: "e.g. ‘~12 km round trip’",
        }),
        maxAltitude: fields.text({
          label: "Maximum Altitude",
          description: "e.g. ‘2,730 m / 8,960 ft’",
        }),
        difficulty: fields.text({
          label: "Difficulty",
          description: "Easy · Moderate · Difficult · Challenging",
        }),
        bestTime: fields.text({
          label: "Best Time to Visit",
          description: "e.g. ‘March–June, September–November’",
        }),
        gettingThere: fields.text({
          label: "How to Reach",
          multiline: true,
          description:
            "Nearest airport, railhead, road route, and trailhead access.",
        }),
        itinerary: fields.array(
          fields.object({
            day: fields.text({
              label: "Day / Label",
              description: "e.g. ‘Day 1’",
            }),
            title: fields.text({ label: "Title" }),
            detail: fields.text({ label: "Details", multiline: true }),
          }),
          {
            label: "Day-by-Day Itinerary",
            itemLabel: (props) =>
              props.fields.title.value ||
              props.fields.day.value ||
              "Day",
          }
        ),
        included: fields.array(fields.text({ label: "Item" }), {
          label: "What's Included",
          itemLabel: (props) => props.value ?? "Item",
        }),
        excluded: fields.array(fields.text({ label: "Item" }), {
          label: "What's Not Included",
          itemLabel: (props) => props.value ?? "Item",
        }),
        packing: fields.array(fields.text({ label: "Item" }), {
          label: "Packing Essentials",
          itemLabel: (props) => props.value ?? "Item",
        }),
        faqs: fields.array(
          fields.object({
            question: fields.text({ label: "Question" }),
            answer: fields.text({ label: "Answer", multiline: true }),
          }),
          {
            label: "Frequently Asked Questions",
            itemLabel: (props) => props.fields.question.value || "FAQ",
          }
        ),

        image: fields.image({
          label: "Featured Image",
          directory: "public/static/images/chapters",
          publicPath: "/static/images/chapters/",
          validation: { isRequired: true },
        }),
        relatedStories: fields.array(
          fields.relationship({
            label: "Stories in this Chapter",
            collection: "stories",
          }),
          {
            label: "Stories",
            itemLabel: (props) =>
              typeof props.value === "string" ? props.value : "Story",
          }
        ),
        giftsFromMountains: fields.array(fields.text({ label: "Gift" }), {
          label: "What the Mountains Give",
          itemLabel: (props) => props.value ?? "Gift",
        }),
        offering: fields.text({
          label: "Offering (instead of Price)",
          description: "e.g. ‘Your energy exchange: ₹20,000’",
        }),
        themes: fields.array(fields.text({ label: "Theme" }), {
          label: "Journey Themes",
          itemLabel: (props) => props.value,
        }),
      },
    }),

    stories: collection({
      label: "Stories (Experiences)",
      slugField: "title",
      path: "data/stories/*",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        title: fields.slug({
          name: { label: "Story Title", validation: { isRequired: true } },
        }),
        parentRegion: fields.relationship({
          label: "Parent Region (New)",
          collection: "regions",
        }),
        excerpt: fields.text({
          label: "Short Introduction",
          multiline: true,
          validation: { length: { min: 80, max: 180 } },
        }),
        voice: fields.text({
          label: "Told by (voice)",
          description:
            "The narrator of this story, e.g. 'a product manager from Gurgaon, 34, first time past Chandigarh'. No real names needed — the archive speaks in voices.",
        }),
        relatedChapter: fields.relationship({
          label: "Belongs to Chapter",
          collection: "chapters",
        }),
        image: fields.image({
          label: "Story Image",
          directory: "public/static/images/stories",
          publicPath: "/static/images/stories/",
        }),
        content: fields.mdx({
          label: "Story Content",
          extension: "mdx",
          description: "Write your story or reflection here in markdown/MDX.",
        }),
        quote: fields.text({
          label: "Featured Quote",
          multiline: true,
          description: "One reflective quote or dialogue from this story.",
        }),
      },
    }),

    films: collection({
      label: "Films & Reels",
      slugField: "title",
      path: "data/films/*",
      schema: {
        title: fields.slug({
          name: { label: "Title", validation: { isRequired: true } },
        }),
        platform: fields.select({
          label: "Platform",
          options: [
            { label: "Instagram", value: "instagram" },
            { label: "YouTube", value: "youtube" },
            { label: "Direct Video", value: "direct" },
          ],
          defaultValue: "instagram",
        }),
        url: fields.url({
          label: "Reel / Video URL (Instagram or YouTube)",
          description:
            "Paste the full link, e.g. https://www.instagram.com/reel/XXXX/ or https://youtu.be/XXXX",
        }),
        directUrl: fields.text({
          label: "Or Direct Video URL (optional)",
          description: "Paste a direct .mp4 video link.",
        }),
        directVideo: fields.file({
          label: "Or Direct Video File (optional)",
          description: "Upload a short .mp4 file to play natively on the page.",
          directory: "public/static/videos/films",
          publicPath: "/static/videos/films/",
        }),
        description: fields.text({
          label: "Caption",
          multiline: true,
          description: "One or two lines describing the film.",
        }),
        thumbnail: fields.image({
          label: "Thumbnail (optional)",
          description:
            "Poster shown before the film plays. YouTube films get one automatically; Instagram reels look best with one uploaded here.",
          directory: "public/static/images/films",
          publicPath: "/static/images/films/",
        }),
        region: fields.text({ label: "Region / Place (optional)" }),
        relatedChapter: fields.relationship({
          label: "Related Chapter (optional)",
          description:
            "Link the film to a chapter so viewers arriving from Instagram can read the full context here.",
          collection: "chapters",
        }),
        relatedStory: fields.relationship({
          label: "Related Story (optional)",
          collection: "stories",
        }),
        order: fields.integer({
          label: "Order",
          description: "Lower numbers appear first.",
          defaultValue: 0,
        }),
      },
    }),
  },
  singletons: {
    banners: singleton({
      label: "Hero Banner",
      path: "data/banners/",
      schema: {
        title: fields.text({
          label: "Title",
          validation: { isRequired: true },
        }),
        description: fields.text({ label: "Description", multiline: true }),
        buttonText: fields.text({ label: "Button Text" }),
        buttonLink: fields.text({ label: "Button Link" }),
        media: fields.file({
          label: "MP4 Video File",
          directory: "public/static/videos/banners",
          publicPath: "/static/videos/banners/",
          validation: { isRequired: true },
        }),
      },
    }),

    seo: singleton({
      label: "SEO",
      path: "data/seo/",
      schema: {
        title: fields.text({ label: "Title" }),
        author: fields.text({ label: "Author" }),
        description: fields.text({ label: "Description" }),
        keywords: fields.text({ label: "Keywords", multiline: true }),
        ogImage: fields.image({
          label: "Social Share Image",
          directory: "public/static/images",
          publicPath: "/static/images/",
        }),
      },
    }),

    settings: singleton({
      label: "Settings",
      path: "data/settings/",
      schema: {
        headerTitle: fields.text({ label: "Header Title" }),
        logo: fields.image({
          label: "Logo",
          directory: "public/static/images",
          publicPath: "/static/images/",
          validation: { isRequired: true },
        }),
        language: fields.text({ label: "Language" }),
        theme: fields.text({ label: "Theme" }),
        locale: fields.text({ label: "Locale" }),
        domain: fields.url({ label: "Domain" }),
      },
    }),
  },
});
