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

export type YoastHeadJson = {
    title?: string;
    og_title?: string;
    og_description?: string;
    og_site_name?: string;
    og_locale?: string;
    og_type?: string;
    og_image?: { url: string; width?: number; height?: number; type?: string }[];
    twitter_card?: string;
    twitter_site?: string;
    twitter_creator?: string;
    robots?: { index?: string; follow?: string };
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
    yoast_head_json?: YoastHeadJson;
};

export type WordPressPage = {
    id: number;
    slug: string;
    date: string;
    link: string;
    title: RenderedField;
    excerpt: RenderedField;
    content: RenderedField;
    yoast_head_json?: YoastHeadJson;
};

export type WordPressTerm = {
    id: number;
    name: string;
    slug: string;
    description: string;
    count: number;
    yoast_head_json?: YoastHeadJson;
};

export type WordPressComment = {
    id: number;
    post: number;
    author_name: string;
    author_url: string;
    date: string;
    content: RenderedField;
    author_avatar_urls?: Record<string, string>;
    meta?: { protocol?: string };
};

export type PaginatedPostsResponse = {
    posts: WordPressPost[];
    total: number;
    totalPages: number;
};