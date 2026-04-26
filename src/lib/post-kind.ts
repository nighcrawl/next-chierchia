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