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

    return response.json();
}

export async function getPosts() {
    return wpFetch("posts", {
        per_page: 10,
        _embed: true,
    });
}

export async function getPostBySlug(slug: string) {
    const posts = await wpFetch<any[]>("posts", {
        slug,
        _embed: true,
    });

    return posts[0] ?? null;
}

export async function getPages() {
    return wpFetch("pages", {
        per_page: 100,
    });
}

export async function getCategories() {
    return wpFetch("categories", {
        per_page: 100,
    });
}

export async function getTags() {
    return wpFetch("tags", {
        per_page: 100,
    });
}