import { getPostKind, getPostKindUrl } from "@/lib/post-kind";
import { PostTheme } from "@/lib/post-theme";
import type { EnrichedPost } from "@/lib/post-types";
import Link from "next/link";

type PostTypeProps = {
    post: EnrichedPost,
    theme: PostTheme
};

export function PostType({post, theme}: PostTypeProps) {
    return (
        <Link 
            key={`category-${post.id}-${post.slug}`} href={getPostKindUrl(post)}
            className={`text-[0.65em] uppercase tracking-[0.2em] ${theme.category}`}
        >
            {getPostKind(post)}
        </Link>
    )
}