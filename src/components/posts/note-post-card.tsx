import { PostMeta } from "@/components/posts/post-meta";
import type { PostCardSharedProps } from "./post-card";
import { PostType } from "./post-type";

export function NotePostCard({ post, theme }: PostCardSharedProps) {
    return (
        <article className="py-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
            <div className="space-y-3">
                <div className="space-y-2">
                    <PostType post={post} theme={theme} />
                    {/* Notes n'ont pas de titre selon la condition existante */}
                </div>
                <div 
                    className="prose max-w-none text-gray-900 dark:text-gray-100"
                    dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                />
                <PostMeta post={post} theme={theme} />
            </div>
        </article>
    );
}