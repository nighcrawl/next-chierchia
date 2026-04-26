import { getPostKind } from "@/lib/post-kind";
import { PostTheme } from "@/lib/post-theme";
import type { EnrichedPost } from "@/lib/post-types";

type PostTypeProps = {
    post: EnrichedPost,
    theme: PostTheme
};

export function PostType({post, theme}: PostTypeProps) {
    return (
        <p className={`text-[0.65em] uppercase tracking-[0.2em] ${theme.category}`}>
            {getPostKind(post)}
        </p>
    )
}