import type { WordPressPage, WordPressPost, WordPressTerm } from "./wordpress-types";

const API_BASE = process.env.WORDPRESS_API_BASE;

if (!API_BASE) {
    throw new Error("WORDPRESS_API_BASE is not defined");
}

type QueryParams = Record<string, string | number | boolean | undefined>;

function buildUrl(endpoint: string, params?: QueryParams) {
    const url = new URL(`${API_BASE}/${endpoint}`);

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined) {
                url.searchParams.set(key, String(value));
            }
        });
    }

    return url.toString();
}

async function wpFetch<T>(endpoint: string, params?: QueryParams): Promise<T> {
    const url = buildUrl(endpoint, params);

    const response = await fetch(url, {
        next: { revalidate: 300 },
    });

    if (!response.ok) {
        throw new Error(`WordPress API error: ${response.status} on ${url}`);
    }

    return response.json() as Promise<T>;
}

export async function getPosts(): Promise<WordPressPost[]> {
    return wpFetch<WordPressPost[]>("posts", {
        per_page: 10,
        _embed: true,
    });
}

export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
    const posts = await wpFetch<WordPressPost[]>("posts", {
        slug,
        _embed: true,
    });

    return posts[0] ?? null;
}

export async function getPages(): Promise<WordPressPage[]> {
    return wpFetch<WordPressPage[]>("pages", {
        per_page: 100,
    });
}

export async function getPageBySlug(slug: string): Promise<WordPressPage | null> {
    const pages = await wpFetch<WordPressPage[]>("pages", {
        slug,
        _embed: true,
    });

    return pages[0] ?? null;
}

export async function getCategories(): Promise<WordPressTerm[]> {
    return wpFetch<WordPressTerm[]>("categories", {
        per_page: 100,
    });
}

export async function getCategoriesByIds(ids: number[]): Promise<WordPressTerm[]> {
    if (ids.length === 0) {
        return [];
    }

    return wpFetch<WordPressTerm[]>("categories", {
        include: ids.join(","),
        per_page: ids.length,
    });
}

export async function getCategoryById(id: number): Promise<WordPressTerm | null> {
    const categories = await getCategoriesByIds([id]);
    return categories[0] ?? null;
}

export async function getTags(): Promise<WordPressTerm[]> {
    return wpFetch<WordPressTerm[]>("tags", {
        per_page: 100,
    });
}

export async function getTagsByIds(ids: number[]): Promise<WordPressTerm[]> {
    if (ids.length === 0) {
        return [];
    }

    return wpFetch<WordPressTerm[]>("tags", {
        include: ids.join(","),
        per_page: ids.length,
    });
}

export async function getTagById(id: number): Promise<WordPressTerm | null> {
    const tags = await getTagsByIds([id]);
    return tags[0] ?? null;
}