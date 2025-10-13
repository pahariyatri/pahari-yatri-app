import { config, fields, collection, singleton } from "@keystatic/core";
import {
  wrapper,
  block,
  inline,
  mark,
  repeating,
} from "@keystatic/core/content-components";

export const showAdminUI = process.env.NODE_ENV === "development";
export const Highlight = mark({
  label: "Highlight",
  description: "Emphasize text with color or style",
  schema: {
    variant: fields.select({
      label: "Style Variant",
      options: [
        { label: "Fluro (bright)", value: "fluro" },
        { label: "Minimal (subtle)", value: "minimal" },
        { label: "Brutalist (bold)", value: "brutalist" },
      ],
      defaultValue: "fluro",
    }),
  },
});

export default config({
  storage: { kind: "local" },
  ui: {
    brand: { name: "Yatri CMS" },
    navigation: {
      Journeys: ["packages", "blogs"],
      "Landing Page": ["banners", "faqs", "philosophy"],
      "Site Meta data": ["settings", "seo", "contact"],
    },
  },
  collections: {
    blogs: collection({
      label: "Blogs",
      slugField: "title",
      path: "data/blogs/*",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        title: fields.slug({
          name: {
            label: "Title",
            validation: {
              isRequired: true,
              length: { min: 50, max: 60 },
            },
          },
        }),
        excerpt: fields.text({
          label: "Excerpt",
          multiline: true,
          validation: { length: { min: 150, max: 160 } },
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value ?? "Tag",
        }),
        relatedJourneys: fields.array(
          fields.relationship({ label: "Journey", collection: "packages" }),
          { label: "Related Journeys" }
        ),
        image: fields.image({
          label: "Featured Image",
          directory: "public/static/images/blogs",
          publicPath: "/static/images/blogs/",
          validation: { isRequired: true },
        }),
        content: fields.mdx({
          label: "Content",
          extension: "md",
          components: { Highlight },
        }),
      },
    }),

    packages: collection({
      label: "Journeys",
      slugField: "title",
      path: "data/packages/*",
      schema: {
        title: fields.slug({
          name: { label: "Title", validation: { isRequired: true } },
        }),
        invitation: fields.text({
          label: "Sacred Invitation",
          multiline: true,
          description:
            "1–2 lines emotional hook. Example: ‘A walk into silence, where the mountain teaches you who you are.’",
        }),
        excerpt: fields.text({
          label: "Excerpt",
          multiline: true,
          validation: { isRequired: true, length: { min: 50, max: 250 } },
        }),
        isFeatured: fields.checkbox({ label: "Featured Journey" }),
        image: fields.image({
          label: "Featured Image",
          directory: "public/static/images/packages",
          publicPath: "/static/images/packages/",
          validation: { isRequired: true },
        }),
        itinerary: fields.array(
          fields.object({
            day: fields.number({ label: "Day" }),
            title: fields.text({ label: "Title" }),
            description: fields.text({
              label: "Experience",
              multiline: true,
              description:
                "Write like a story, not just logistics. Example: ‘We begin in silence, listening to the forest at dawn.’",
            }),
          }),
          { label: "Itinerary", itemLabel: (props) => props.fields.title.value }
        ),
        offering: fields.text({
          label: "Offering (instead of Price)",
          description: "e.g. ‘Your energy exchange: ₹20,000’",
        }),
        duration: fields.integer({ label: "Duration (days)" }),
        location: fields.text({ label: "Region / Trailhead" }),
        themes: fields.array(fields.text({ label: "Theme" }), {
          label: "Journey Themes",
          itemLabel: (props) => props.value,
        }),
        giftsFromMountains: fields.array(fields.text({ label: "Gift" }), {
          label: "What the Mountains Give",
          itemLabel: (props) => props.value ?? "Gift",
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

    faqs: singleton({
      label: "Faqs",
      path: "data/faqs/",
      schema: {
        faqs: fields.array(
          fields.object({
            question: fields.text({ label: "Question" }),
            answer: fields.text({ label: "Answer", multiline: true }),
          }),
          {
            label: "Faqs List",
            itemLabel: (props) => props.fields.question.value,
          }
        ),
      },
    }),

    philosophy: singleton({
      label: "Philosophy",
      path: "data/philosophy/",
      schema: {
        statement: fields.markdoc({
          label: "Philosophy Statement",
          description:
            "Write your brand’s deeper story: why you exist, what Yatra means, how it’s different from tourism.",
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
