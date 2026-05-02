import { EnrichedPost } from "./post-types";

export type PostKind = "bookmark" | "note" | "article" | "journal" | "default";

function hasCategory(post: EnrichedPost, slug: string) {
    return post.categoryObjects.some((category) => category.slug === slug);
}

export function getPostKind(post: EnrichedPost): PostKind {
    if (hasCategory(post, "bookmarks")) return "bookmark";
    if (hasCategory(post, "notes")) return "note";
    if (hasCategory(post, "articles")) return "article";
    if (hasCategory(post, "journal")) return "journal";

    return "default";
}
export function getPostKindUrl(post: EnrichedPost): string {
    const kind = getPostKind(post);
    switch (kind) {
        case "bookmark":
            return "/category/bookmarks";
        case "note":
            return "/category/notes";
        case "article":
            return "/category/articles";
        case "journal":
            return "/category/journal";
        default:
            return "/";
    }
}