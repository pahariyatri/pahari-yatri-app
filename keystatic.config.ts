import { config, fields, collection } from '@keystatic/core';

export const showAdminUI = process.env.NODE_ENV === "development"

export default config({
    storage: {
        kind: 'local',
    },
    collections: {
        blogs: collection({
            label: 'Blogs',
            slugField: 'title',
            path: 'data/blogs/*',
            format: { contentField: 'content' },
            entryLayout: 'content',
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                description: fields.text({ label: 'Short Description', multiline: true }),
                image: fields.image({
                    label: 'Featured Image', directory: 'public/static/images/blogs', publicPath: 'static/images/blogs/'
                }),
                content: fields.markdoc({ label: 'Content' }),
            },
        }),
        packages: collection({
            label: 'Packages',
            slugField: 'title',
            path: 'data/packages/*',
            // format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                content: fields.markdoc({ label: 'Content' }),
            },
        }),
        testimonials: collection({
            label: 'Packages',
            slugField: 'title',
            path: 'data/testimonials/*',
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                description: fields.text({ label: 'Description', multiline: true }),
                author: fields.slug({ name: { label: 'Author' } })
            },
        }),
    },
});