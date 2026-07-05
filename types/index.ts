// Core entity interfaces for type safety across the application

export interface Region {
    slug: string;
    title: string;
    description: string;
    heroImage?: string;
}

export interface Destination {
    slug: string;
    title: string;
    parentRegion: string;
    description: string;
    image?: string;
    content?: () => Promise<any>;
}

export interface Place {
    slug: string;
    title: string;
    parentRegion: string;
    description: string;
    image?: string;
    coordinates?: string;
}

export interface Story {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    author?: string;
    tags?: string[];
    image?: string;
    parentRegion?: string;
    content?: () => Promise<any>;
}

export interface BreadcrumbItem {
    label: string;
    href: string;
}

export interface LocationMapping {
    sameAs: string;
    geo: {
        latitude: number;
        longitude: number;
    };
}

export interface SchemaOrgEntity {
    "@context": string;
    "@type": string;
    "@id": string;
    name: string;
    description?: string;
    url?: string;
    image?: string;
    [key: string]: any;
}

export interface SiteMetadata {
    title: string;
    author: string;
    headerTitle: string;
    description: string;
    language: string;
    theme: string;
    siteUrl: string;
    siteLogo: string;
    socialBanner: string;
    email: string;
    github?: string;
    twitter?: string;
    facebook?: string;
    youtube?: string;
    linkedin?: string;
    instagram?: string;
    locale: string;
}
