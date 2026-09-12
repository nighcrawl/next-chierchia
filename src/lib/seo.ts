import type { Metadata } from "next";
import type { YoastHeadJson } from "./wordpress-types";

type FallbackMetadata = {
    title: string;
    description: string;
    canonical: string;
};

export function yoastToMetadata(yoast: YoastHeadJson | undefined, fallback: FallbackMetadata): Metadata {
    if (!yoast) {
        return {
            title: fallback.title,
            description: fallback.description,
            alternates: { canonical: fallback.canonical },
        };
    }

    const ogImage = yoast.og_image?.[0];

    return {
        title: yoast.title ?? fallback.title,
        description: yoast.og_description ?? fallback.description,
        alternates: {
            canonical: fallback.canonical,
        },
        openGraph: {
            title: yoast.og_title ?? yoast.title ?? fallback.title,
            description: yoast.og_description ?? fallback.description,
            url: fallback.canonical,
            siteName: yoast.og_site_name,
            locale: yoast.og_locale,
            type: yoast.og_type === "article" ? "article" : "website",
            images: ogImage
                ? [{ url: ogImage.url, width: ogImage.width, height: ogImage.height }]
                : undefined,
        },
        twitter: {
            card: yoast.twitter_card === "summary_large_image" ? "summary_large_image" : "summary",
            site: yoast.twitter_site,
            creator: yoast.twitter_creator,
        },
        robots: yoast.robots
            ? {
                  index: yoast.robots.index === "index",
                  follow: yoast.robots.follow === "follow",
              }
            : undefined,
    };
}
