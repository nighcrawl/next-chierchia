import type { MetadataRoute } from "next";
import { getAllPosts, getPageBySlug, getCategories, getTags } from "@/lib/wordpress";
import { getPostUrl } from "@/lib/post-urls";

export const revalidate = 300;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://chierchia.fr";

// Pages statiques WordPress réellement routées dans le front Next.
const STATIC_PAGE_SLUGS = ["a-propos", "contact"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [posts, pages, categories, tags] = await Promise.all([
        getAllPosts(),
        Promise.all(STATIC_PAGE_SLUGS.map((slug) => getPageBySlug(slug))),
        getCategories(),
        getTags(),
    ]);

    const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
        url: `${SITE_URL}${getPostUrl(post)}`,
        lastModified: post.date,
    }));

    const pageEntries: MetadataRoute.Sitemap = pages
        .filter((page) => page !== null)
        .map((page) => ({
            url: `${SITE_URL}/${page.slug}`,
            lastModified: page.date,
        }));

    const categoryEntries: MetadataRoute.Sitemap = categories.map((category) => ({
        url: `${SITE_URL}/category/${category.slug}`,
    }));

    const tagEntries: MetadataRoute.Sitemap = tags.map((tag) => ({
        url: `${SITE_URL}/tag/${tag.slug}`,
    }));

    return [
        { url: SITE_URL },
        ...postEntries,
        ...pageEntries,
        ...categoryEntries,
        ...tagEntries,
    ];
}
