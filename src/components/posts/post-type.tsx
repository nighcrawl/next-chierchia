import { getPostKind } from "@/lib/post-kind";
import type { EnrichedPost } from "@/lib/post-types";

type PostTypeProps = {
    post: EnrichedPost
};

export function PostType({post}: PostTypeProps) {
    return (
        <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
            {getPostKind(post)}
        </p>
    )
}