import { config, fields, collection, singleton } from '@keystatic/core';
import { heroBanner } from './data/data';

export const showAdminUI = process.env.NODE_ENV === "development"

export default config({
    storage: {
        kind: 'local',
    },
    ui: {
        brand: { name: 'Yatri CMS' },
        navigation: {
            'Content': ['packages', 'blogs', 'accommodations', 'tags', 'categories'],
            'Landing Page': ['banners','services', 'faqs', 'testimonials'],
            'Site Meta data': ['settings', 'seo', 'contact'],
        },
    },
    collections: {
        blogs: collection({
            label: 'Blogs',
            slugField: 'title',
            path: 'data/blogs/*',
            format: { contentField: 'content' },
            entryLayout: 'content',
            schema: {
                title: fields.slug({
                    name: {
                        label: 'Title', validation: {
                            isRequired: true,
                            length: {
                                min: 50,
                                max: 60
                            }
                        }
                    }
                }),
                excerpt: fields.text({
                    label: 'Excerpt', multiline: true, validation: {
                        length: {
                            min: 150,
                            max: 160
                        }
                    }
                }),
                tags: fields.array(
                    fields.relationship({
                        label: 'Tags',
                        collection: 'tags',
                        validation: {
                            isRequired: true,
                        },
                    }),
                    {
                        label: 'Tags',
                        itemLabel: (props) => props.value ?? 'Select a tags',
                    }),
                image: fields.image({
                    label: 'Featured Image', directory: 'public/static/images/blogs', publicPath: '/static/images/blogs/', validation: {
                        isRequired: true,
                    }
                }),
                content: fields.markdoc({ label: 'Content' }),
            },
        }),
        packages: collection({
            label: 'Packages',
            slugField: 'title',
            path: 'data/packages/*',
            schema: {
                title: fields.slug({
                    name: {
                        label: 'Title', validation: {
                            isRequired: true,
                        }
                    }
                }),
                excerpt: fields.text({
                    label: 'Excerpt', multiline: true, validation: {
                        isRequired: true,
                        length: {
                            min: 50,
                            max: 250
                        }
                    }
                }),
                isFeatured: fields.checkbox({ label: 'is Featured' }),
                image: fields.image({
                    label: 'Featured Image', directory: 'public/static/images/packages', publicPath: '/static/images/packages/', validation: {
                        isRequired: true,
                    }
                }),
                itinerary: fields.array(
                    fields.object({
                        day: fields.number({ label: "Day" }),
                        title: fields.text({ label: 'Title' }),
                        description: fields.text({ label: 'Description', multiline: true }),
                    }),
                    {
                        label: 'Itinerary',
                        itemLabel: (props) => props.fields.title.value,
                    }
                ),
                price: fields.number({ label: 'Price' }),
                duration: fields.integer({ label: 'Duration' }),
                location: fields.text({ label: 'Location' }),
                // difficulty: fields.select({
                //     label: 'Difficulty',
                //     description: "The person's difficulty at the company",
                //     options: [
                //         { label: 'Easy', value: 'easy' },
                //         { label: 'Modrate', value: 'developer' },
                //         { label: 'Product manager', value: 'product-manager' },
                //     ],
                //     defaultValue: 'easy'
                // }),
                // inclusions: fields.array(
                //     fields.text({ label: 'Inclusions' }),
                //     {
                //         label: 'Inclusions',
                //         itemLabel: props => props.value
                //     }
                // ),
                // exclusions: fields.array(
                //     fields.text({ label: 'Exclusions' }),
                //     {
                //         label: 'Exclusions',
                //         itemLabel: props => props.value
                //     }
                // ),
            },
        }),
        accommodations: collection({
            label: 'Accommodations',
            slugField: 'name',
            path: 'data/accommodations/*',
            format: { data: 'json' },
            schema: {
                name: fields.slug({
                    name: {
                        label: 'Title', validation: {
                            isRequired: true,
                        }
                    }
                }),
                description: fields.text({ label: 'Description', multiline: true }),
                location: fields.text({ label: 'Location' }),
                image: fields.image({
                    label: 'Featured Image', directory: 'public/static/images/accommodations', publicPath: '/static/images/accommodations/', validation: {
                        isRequired: true,
                    }
                }),
                url: fields.url({
                    label: 'URL',
                    description: 'The website URL'
                })
            },
        }),
        categories: collection({
            label: 'Categories',
            slugField: 'title',
            path: 'data/categories/*',
            format: { data: 'json' },
            schema: {
                title: fields.slug({
                    name: {
                        label: 'Title', validation: {
                            isRequired: true,
                        }
                    }
                }),
                description: fields.text({ label: 'Description', multiline: true }),
                image: fields.image({
                    label: 'Featured Image', directory: 'public/static/images/categories', publicPath: '/static/images/categories/', validation: {
                        isRequired: true,
                    }
                }),
            },
        }),
        tags: collection({
            label: 'Tags',
            slugField: 'title',
            path: 'data/tags/*',
            format: { data: 'json' },
            schema: {
                title: fields.text({ label: 'Title' }),
            },
        }),
    },
    singletons: {
        banners: singleton({
            label: 'Hero Banner',
            path: 'data/banners/',
            schema: {
                data: fields.array(
                    fields.object({
                        title: fields.text({ label: 'Title' }),
                        description: fields.text({ label: 'Description', multiline: true }),
                        buttonText: fields.text({ label: 'Button Text' }),
                        buttonLink: fields.text({ label: 'Button Link' }),
                        image: fields.image({
                            label: 'Featured Image', directory: 'public/static/images/banners', publicPath: '/static/images/banners/', validation: {
                                isRequired: true,
                            }
                        }),
                    }),
                    {
                        label: 'Hero Banners List',
                        itemLabel: (props) => props.fields.title.value,
                    }
                ),
            },
        }),
        testimonials: singleton({
            label: 'Testimonials',
            path: 'data/testimonials/',
            schema: {
                data: fields.array(
                    fields.object({
                        title: fields.text({ label: 'Title' }),
                        description: fields.text({ label: 'Description', multiline: true }),
                        author: fields.text({ label: 'Author' })
                    }),
                    {
                        label: 'Testimonials List',
                        itemLabel: (props) => props.fields.title.value,
                    }
                ),
            },
        }),
        services: singleton({
            label: 'Services',
            path: 'data/services/',
            schema: {
                data: fields.array(
                    fields.object({
                        title: fields.text({ label: 'Title' }),
                        description: fields.text({ label: 'Description', multiline: true }),
                        icon: fields.text({ label: 'Icon Url' })
                    }),
                    {
                        label: 'Services List',
                        itemLabel: (props) => props.fields.title.value,
                    }
                ),
            },
        }),
        faqs: singleton({
            label: 'Faqs',
            path: 'data/faqs/',
            schema: {
                faqs: fields.array(
                    fields.object({
                        question: fields.text({ label: 'Question' }),
                        answer: fields.text({ label: 'Answer', multiline: true }),
                    }),
                    {
                        label: 'Faqs List',
                        itemLabel: (props) => props.fields.question.value,
                    }
                ),
            },
        }),
        seo: singleton({
            label: 'SEO',
            path: 'data/seo/',
            schema: {
                title: fields.text({ label: 'Title' }),
                author: fields.text({ label: 'Author' }),
                description: fields.text({ label: 'Description' }),
                keywords: fields.text({ label: 'Keywords', multiline: true }),
            }
        }),
        settings: singleton({
            label: 'Settings',
            path: 'data/settings/',
            schema: {
                headerTitle: fields.text({ label: 'Header Title' }),
                logo: fields.image({
                    label: 'Logo', directory: 'public/static/images', publicPath: '/static/images/', validation: {
                        isRequired: true,
                    }
                }),
                language: fields.text({ label: 'Language' }),
                theme: fields.text({ label: 'Theme' }),
                locale: fields.text({ label: 'Local' }),
                domain: fields.url({ label: 'Domain' }),
            }
        }),
        contact: singleton({
            label: 'Contact',
            path: 'data/contact/',
            schema: {
                email: fields.text({ label: 'Email' }),
                mobile: fields.text({ label: 'Mobile' }),
                whatsApp: fields.text({ label: 'Whats App' }),
                instagram: fields.text({ label: 'Instagram' }),
                threads: fields.text({ label: 'Threads' }),
                facebook: fields.text({ label: 'Facebook' }),
                youtube: fields.text({ label: 'Youtube' }),
                linkedin: fields.text({ label: 'Linkedin' }),
            }
        }),
    }
});