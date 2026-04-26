export type RenderedField = {
    rendered: string;
};

export type WordPressMediaSize = {
    source_url: string;
    width: number;
    height: number;
}

export type WordPressFeaturedMedia = {
    id: number;
    alt_text: string;
    source_url: string;
    media_details?: {
        sizes?: {
            thumbnail?: WordPressMediaSize;
            medium?: WordPressMediaSize;
            large?: WordPressMediaSize;
            full?: WordPressMediaSize;
        };
    };
};

export type WordPressEmbedded = {
    "wp:featuredmedia"?: WordPressFeaturedMedia[];
};

export type WordPressPost = {
    id: number;
    slug: string;
    date: string;
    link: string;
    title: RenderedField;
    excerpt: RenderedField;
    content: RenderedField;
    featured_media: number;
    categories: number[];
    tags: number[];
    _embedded?: WordPressEmbedded;
};

export type WordPressPage = {
    id: number;
    slug: string;
    date: string;
    link: string;
    title: RenderedField;
    excerpt: RenderedField;
    content: RenderedField;
};

export type WordPressTerm = {
    id: number;
    name: string;
    slug: string;
    description: string;
    count: number;
};

export type PaginatedPostsResponse = {
    posts: WordPressPost[];
    total: number;
    totalPages: number;
};