import type { WordPressPage, WordPressPost, WordPressTerm, PaginatedPostsResponse, WordPressFeaturedMedia } from "./wordpress-types";

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

async function wpFetch<T>(endpoint: string, params?: QueryParams): Promise<{ data: T; headers: Headers }> {
    const url = buildUrl(endpoint, params);

    const response = await fetch(url, {
        next: { revalidate: 300 },
    });

    if (!response.ok) {
        throw new Error(`WordPress API error: ${response.status} on ${url}`);
    }

    const data = await response.json() as T;
    
    return {
        data,
        headers: response.headers,
    };
}

export async function getPosts(page: number = 1, perPage: number = 10): Promise<PaginatedPostsResponse> {
    const { data: posts, headers } = await wpFetch<WordPressPost[]>("posts", {
        page,
        per_page: perPage,
        _embed: true,
    });
    
    // Les headers WordPress sont CRUCIAUX pour la pagination :
    // X-WP-Total: nombre total d'articles dans la base
    // X-WP-TotalPages: nombre total de pages disponibles
    // Sans ces headers, on ne pourrait pas construire une pagination correcte
    const total = parseInt(headers.get('X-WP-Total') || '0');
    const totalPages = parseInt(headers.get('X-WP-TotalPages') || '0');

    return {
        posts,
        total,
        totalPages,
    };
}

export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
    const { data: posts } = await wpFetch<WordPressPost[]>("posts", {
        slug,
        _embed: true,
    });

    return posts[0] ?? null;
}

export async function getPages(): Promise<WordPressPage[]> {
    const { data: pages } = await wpFetch<WordPressPage[]>("pages", {
        per_page: 100,
    });
    return pages;
}

export async function getPageBySlug(slug: string): Promise<WordPressPage | null> {
    const { data: pages } = await wpFetch<WordPressPage[]>("pages", {
        slug,
        _embed: true,
    });

    return pages[0] ?? null;
}

export async function getCategories(): Promise<WordPressTerm[]> {
    const { data: categories } = await wpFetch<WordPressTerm[]>("categories", {
        per_page: 100,
    });
    return categories;
}

export async function getCategoriesByIds(ids: number[]): Promise<WordPressTerm[]> {
    if (ids.length === 0) {
        return [];
    }

    const { data: categories } = await wpFetch<WordPressTerm[]>("categories", {
        include: ids.join(","),
        per_page: ids.length,
    });
    return categories;
}

export async function getCategoryById(id: number): Promise<WordPressTerm | null> {
    const categories = await getCategoriesByIds([id]);
    return categories[0] ?? null;
}

export async function getTags(): Promise<WordPressTerm[]> {
    const { data: tags } = await wpFetch<WordPressTerm[]>("tags", {
        per_page: 100,
    });
    return tags;
}

export async function getTagsByIds(ids: number[]): Promise<WordPressTerm[]> {
    if (ids.length === 0) {
        return [];
    }

    const { data: tags } = await wpFetch<WordPressTerm[]>("tags", {
        include: ids.join(","),
        per_page: ids.length,
    });
    return tags;
}

export async function getTagById(id: number): Promise<WordPressTerm | null> {
    const tags = await getTagsByIds([id]);
    return tags[0] ?? null;
}

export async function getTagBySlug(slug: string): Promise<WordPressTerm | null> {
    const { data: tags } = await wpFetch<WordPressTerm[]>("tags", {
        slug,
    });

    return tags[0] ?? null;
}

export async function getPostsByTag(tagId: number, page: number = 1, perPage: number = 10): Promise<PaginatedPostsResponse> {
    const { data: posts, headers } = await wpFetch<WordPressPost[]>("posts", {
        page,
        per_page: perPage,
        tags: tagId,
        _embed: true,
    });
    
    // Les headers WordPress sont CRUCIAUX pour la pagination
    const total = parseInt(headers.get('X-WP-Total') || '0');
    const totalPages = parseInt(headers.get('X-WP-TotalPages') || '0');

    return {
        posts,
        total,
        totalPages,
    };
}

export async function getCategoryBySlug(slug: string): Promise<WordPressTerm | null> {
    try {
        // Essayer d'abord avec le paramètre slug
        const { data: categories } = await wpFetch<WordPressTerm[]>("categories", {
            slug,
        });
        
        if (categories.length > 0) {
            return categories[0];
        }
    } catch (error) {
        // Si l'API bloque, utiliser le fallback
    }
    
    // Fallback: récupérer toutes les catégories et filtrer localement
    const allCategories = await getCategories();
    
    const foundCategory = allCategories.find(category => category.slug === slug);
    
    return foundCategory ?? null;
}

export async function getPostsByCategory(categoryId: number, page: number = 1, perPage: number = 10): Promise<PaginatedPostsResponse> {
    const { data: posts, headers } = await wpFetch<WordPressPost[]>("posts", {
        page,
        per_page: perPage,
        categories: categoryId,
        _embed: true,
    });
    
    // Les headers WordPress sont CRUCIAUX pour la pagination
    const total = parseInt(headers.get('X-WP-Total') || '0');
    const totalPages = parseInt(headers.get('X-WP-TotalPages') || '0');

    return {
        posts,
        total,
        totalPages,
    };
}

export function extractFeaturedMedia(post: WordPressPost): WordPressFeaturedMedia | undefined {
    // Les médias sont embarqués dans _embedded["wp:featuredmedia"] quand on utilise _embed=true
    const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0];
    return featuredMedia;
}