import { config, fields, collection, singleton } from "@keystatic/core";

export const showAdminUI = process.env.NODE_ENV === "development";

export default config({
  storage: { kind: "local" },
  ui: {
    brand: { name: "Yatri CMS" },
    navigation: {
      Journeys: ["books", "chapters", "stories"],
      "Landing Page": ["banners"],
      "Site Meta data": ["settings", "seo", "contact"],
    },
  },
  collections: {
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
        excerpt: fields.text({
          label: "Short Introduction",
          multiline: true,
          validation: { length: { min: 80, max: 180 } },
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

    contact: singleton({
      label: "Contact",
      path: "data/contact/",
      schema: {
        email: fields.text({ label: "Email" }),
        mobile: fields.text({ label: "Mobile" }),
        whatsApp: fields.text({ label: "Whats App" }),
        instagram: fields.text({ label: "Instagram" }),
        threads: fields.text({ label: "Threads" }),
        facebook: fields.text({ label: "Facebook" }),
        youtube: fields.text({ label: "Youtube" }),
        linkedin: fields.text({ label: "Linkedin" }),
      },
    }),
  },
});
