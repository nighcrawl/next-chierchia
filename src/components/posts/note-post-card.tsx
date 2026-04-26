import { PostMeta } from "./post-meta";
import type { EnrichedPost } from "@/lib/post-types";
import { PostType } from "./post-type";

type NotePostCardProps = {
    post: EnrichedPost,
};

export function NotePostCard({ post }: NotePostCardProps) {
    return (
        <article className="rounded-lg bg-blue-50 px-4 py-4 ring-1 ring-blue-100 shadow-xl shadow-blue-400/10">
            <PostType post={post} />
            <div className="space-y-4 text-base text-zinc-800" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
            <PostMeta post={post} />
        </article>
    );
}