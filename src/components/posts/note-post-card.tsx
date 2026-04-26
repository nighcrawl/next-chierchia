import { PostMeta } from "./post-meta";
import { FeaturedImage } from "@/components/posts/featured-image";
import type { PostCardSharedProps } from "./post-card";
import { PostType } from "./post-type";

export function NotePostCard({ post, theme }: PostCardSharedProps) {
    return (
        <article className={`rounded-lg overflow-hidden ${theme.card}`}>
            {post.featuredMediaObject && (
                <FeaturedImage 
                    featuredMedia={post.featuredMediaObject}
                    size="full"
                    className="w-full h-full"
                />
            )}
            <div className="p-4">
                <PostType post={post} theme={theme} />
                
                <div className="my-4 text-base text-zinc-800" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                
                <PostMeta post={post} theme={theme} />
            </div>
        </article>
    );
}