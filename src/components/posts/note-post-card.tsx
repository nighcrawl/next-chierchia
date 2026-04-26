import { PostMeta } from "./post-meta";
import type { PostCardSharedProps } from "./post-card";
import { PostType } from "./post-type";

export function NotePostCard({ post, theme }: PostCardSharedProps) {
    return (
        <article className={`rounded-lg px-4 py-4 ${theme.card}`}>
            <PostType post={post} theme={theme} />
            
            <div className="my-4 text-base text-zinc-800" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
            
            <PostMeta post={post} theme={theme} />
        </article>
    );
}