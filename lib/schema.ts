const LOCATION_MAPPING: Record<string, { sameAs: string; geo: { latitude: number; longitude: number } }> = {
    "Himachal Pradesh": {
        sameAs: "https://www.wikidata.org/wiki/Q1177",
        geo: { latitude: 31.1048, longitude: 77.1734 }
    },
    /* Bilaspur District */
    "Bilaspur": { sameAs: "https://www.wikidata.org/wiki/Q860538", geo: { latitude: 31.3267, longitude: 76.7567 } },
    "Naina Devi": { sameAs: "https://www.wikidata.org/wiki/Q2551469", geo: { latitude: 31.3031, longitude: 76.5414 } },
    /* Chamba District */
    "Chamba": { sameAs: "https://www.wikidata.org/wiki/Q861214", geo: { latitude: 32.5534, longitude: 76.1258 } },
    "Dalhousie": { sameAs: "https://www.wikidata.org/wiki/Q1158045", geo: { latitude: 32.5387, longitude: 75.9793 } },
    "Khajjiar": { sameAs: "https://www.wikidata.org/wiki/Q2117521", geo: { latitude: 32.5416, longitude: 76.0594 } },
    /* Kangra District */
    "Dharamshala": { sameAs: "https://www.wikidata.org/wiki/Q242487", geo: { latitude: 32.2190, longitude: 76.3234 } },
    "McLeod Ganj": { sameAs: "https://www.wikidata.org/wiki/Q1645607", geo: { latitude: 32.2426, longitude: 76.3213 } },
    "Kangra": { sameAs: "https://www.wikidata.org/wiki/Q1025557", geo: { latitude: 32.0998, longitude: 76.2691 } },
    "Bir Billing": { sameAs: "https://www.wikidata.org/wiki/Q4915494", geo: { latitude: 32.0435, longitude: 76.7233 } },
    /* Mandi District */
    "Mandi": { sameAs: "https://www.wikidata.org/wiki/Q1024479", geo: { latitude: 31.7082, longitude: 76.9320 } },
    "Rewalsar": { sameAs: "https://www.wikidata.org/wiki/Q2146964", geo: { latitude: 31.6334, longitude: 76.8333 } },
    /* Shimla District */
    "Shimla": { sameAs: "https://www.wikidata.org/wiki/Q83786", geo: { latitude: 31.1048, longitude: 77.1734 } },
    "Kufri": { sameAs: "https://www.wikidata.org/wiki/Q2425028", geo: { latitude: 31.0980, longitude: 77.2660 } },
    /* Solan District */
    "Solan": { sameAs: "https://www.wikidata.org/wiki/Q2249764", geo: { latitude: 30.9080, longitude: 77.0980 } },
    "Kasauli": { sameAs: "https://www.wikidata.org/wiki/Q2117188", geo: { latitude: 30.9013, longitude: 76.9649 } },
    /* Una District */
    "Una": { sameAs: "https://www.wikidata.org/wiki/Q2241513", geo: { latitude: 31.4685, longitude: 76.2708 } },
    /* Sirmour District */
    "Nahan": { sameAs: "https://www.wikidata.org/wiki/Q1936302", geo: { latitude: 30.5599, longitude: 77.2952 } },
    "Paonta Sahib": { sameAs: "https://www.wikidata.org/wiki/Q2551478", geo: { latitude: 30.4398, longitude: 77.6201 } },
    /* Kinnaur & Spiti */
    "Keylong": { sameAs: "https://www.wikidata.org/wiki/Q1024345", geo: { latitude: 32.5719, longitude: 77.0315 } },
    "Kaza": { sameAs: "https://www.wikidata.org/wiki/Q1425121", geo: { latitude: 32.2195, longitude: 78.0706 } },
    /* Spiritual & Trekking Hubs */
    "Chintpurni": { sameAs: "https://www.wikidata.org/wiki/Q2551475", geo: { latitude: 31.8105, longitude: 76.1518 } },
    "Manikaran": { sameAs: "https://www.wikidata.org/wiki/Q2117180", geo: { latitude: 32.0286, longitude: 77.3486 } },
    "Triund": { sameAs: "https://www.wikidata.org/wiki/Q16254044", geo: { latitude: 32.2472, longitude: 76.3533 } },
    "Narkanda": { sameAs: "https://www.wikidata.org/wiki/Q2403673", geo: { latitude: 31.2599, longitude: 77.4599 } },
    "Barog": { sameAs: "https://www.wikidata.org/wiki/Q4862086", geo: { latitude: 30.8931, longitude: 77.0811 } },
};

export function getOrganizationSchema(siteUrl: string) {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": "Pahari Yatri",
        "url": siteUrl,
        "logo": {
            "@type": "ImageObject",
            "url": `${siteUrl}/static/images/pahari-yatri-logo.png`
        },
        "description": "Premium, experience-first travel collective focused on local knowledge and sustainable exploration of the Himalayas.",
        "brand": {
            "@type": "Brand",
            "name": "Pahari Yatri",
            "slogan": "The Honest Reality of Himalayan Travel"
        },
        "knowsAbout": [
            "Himachal Pradesh",
            "Uttarakhand",
            "Kinnaur",
            "Spiti Valley",
            "Lahaul",
            "Tirthan Valley"
        ],
        "memberOf": {
            "@id": `${siteUrl}/#brand`
        }
    };
}

export function getTouristTripSchema(chapter: any, siteUrl: string) {
    const locInfo = LOCATION_MAPPING[chapter.location] || LOCATION_MAPPING[chapter.title];

    return {
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        "@id": `${siteUrl}/chapters/${chapter.slug}#trip`,
        "name": chapter.title,
        "description": chapter.excerpt,
        "itinerary": {
            "@type": "ItemList",
            "numberOfItems": chapter.relatedStories?.length || 0,
            "itemListElement": (chapter.relatedStories || []).map((story: any, index: number) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                    "@type": "CreativeWork",
                    "name": typeof story === 'string' ? story : story.title,
                    "url": `${siteUrl}/stories/${typeof story === 'string' ? story : story.slug}`
                }
            }))
        },
        "touristType": ["Seekers", "Trekkers", "Yatris"],
        "location": {
            "@type": "Place",
            "name": chapter.location,
            "sameAs": locInfo?.sameAs,
            "geo": locInfo ? {
                "@type": "GeoCoordinates",
                "latitude": locInfo.geo.latitude,
                "longitude": locInfo.geo.longitude
            } : undefined,
            "address": {
                "@type": "PostalAddress",
                "addressRegion": "Uttarakhand",
                "addressCountry": "IN"
            }
        },
        "offers": {
            "@type": "Offer",
            "priceSpecification": {
                "@type": "PriceSpecification",
                "name": "Offering",
                "description": chapter.offering
            }
        },
        "image": chapter.image,
        "url": `${siteUrl}/chapters/${chapter.slug}`,
        "provider": {
            "@type": "Organization",
            "@id": `${siteUrl}/#organization`
        }
    };
}

export function getBlogPostingSchema(story: any, chapter: any, siteUrl: string) {
    return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${siteUrl}/stories/${story.slug}#article`,
        "headline": story.title,
        "description": story.excerpt,
        "image": [story.image],
        "datePublished": new Date().toISOString(),
        "author": {
            "@type": "Organization",
            "@id": `${siteUrl}/#organization`
        },
        "publisher": {
            "@type": "Organization",
            "@id": `${siteUrl}/#organization`
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${siteUrl}/stories/${story.slug}`
        },
        "about": chapter ? {
            "@type": "Place",
            "name": chapter.location,
            "@id": `${siteUrl}/chapters/${chapter.slug}#trip`
        } : undefined
    };
}

export function getDestinationSchema(destination: any, region: any, siteUrl: string) {
    const locInfo = LOCATION_MAPPING[destination.title] || LOCATION_MAPPING[region.title];
    return {
        "@context": "https://schema.org",
        "@type": "TouristDestination",
        "@id": `${siteUrl}/${region.slug}/travel-guide/${destination.slug}#guide`,
        "name": destination.title,
        "description": destination.description,
        "containedInPlace": {
            "@type": "Place",
            "name": region.title,
            "@id": `${siteUrl}/${region.slug}#region`
        },
        "image": destination.image,
        "url": `${siteUrl}/${region.slug}/travel-guide/${destination.slug}`,
        "sameAs": locInfo?.sameAs,
        "brand": {
            "@id": `${siteUrl}/#organization`
        }
    };
}

export function getPlaceSchema(place: any, region: any, siteUrl: string) {
    const locInfo = LOCATION_MAPPING[place.title] || LOCATION_MAPPING[place.location];
    return {
        "@context": "https://schema.org",
        "@type": "Place",
        "@id": `${siteUrl}/${region.slug}/places/${place.slug}#place`,
        "name": place.title,
        "description": place.description,
        "containedInPlace": {
            "@type": "Place",
            "name": region.title,
            "@id": `${siteUrl}/${region.slug}#region`
        },
        "geo": (locInfo?.geo || place.coordinates) ? {
            "@type": "GeoCoordinates",
            "latitude": locInfo?.geo.latitude || parseFloat(place.coordinates?.split(',')[0]),
            "longitude": locInfo?.geo.longitude || parseFloat(place.coordinates?.split(',')[1])
        } : undefined,
        "image": place.image,
        "url": `${siteUrl}/${region.slug}/places/${place.slug}`,
        "sameAs": locInfo?.sameAs,
        "brand": {
            "@id": `${siteUrl}/#organization`
        }
    };
}

export function getRegionSchema(region: any, siteUrl: string) {
    const locInfo = LOCATION_MAPPING[region.title];
    return {
        "@context": "https://schema.org",
        "@type": "Place",
        "@id": `${siteUrl}/${region.slug}#region`,
        "name": region.title,
        "description": region.description,
        "image": region.heroImage,
        "url": `${siteUrl}/${region.slug}`,
        "sameAs": locInfo?.sameAs || `https://www.wikidata.org/wiki/Search?search=${encodeURIComponent(region.title)}`,
        "brand": {
            "@id": `${siteUrl}/#organization`
        }
    };
}

export function getVideoObjectSchema(banner: any, siteUrl: string) {
    return {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": banner.title,
        "description": banner.description,
        "thumbnailUrl": [
            `${siteUrl}/static/images/pahari-yatri-banner.png`
        ],
        "uploadDate": new Date().toISOString(),
        "contentUrl": `${siteUrl}${banner.media}`,
        "embedUrl": `${siteUrl}/social-share`,
        "publisher": {
            "@type": "Organization",
            "@id": `${siteUrl}/#organization`
        }
    };
}
