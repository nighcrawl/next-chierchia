import { PostMeta } from "./post-meta";
import { FeaturedImage } from "@/components/posts/featured-image";
import type { PostCardSharedProps } from "./post-card";
import { PostType } from "./post-type";

export function NotePostCard({ post, theme }: PostCardSharedProps) {
    return (
        <article className={`rounded-lg overflow-hidden post-type post-type-note ${theme.card}`}>
            {post.featuredMediaObject && (
                <FeaturedImage 
                    featuredMedia={post.featuredMediaObject}
                    size="full"
                    className="w-full h-full"
                />
            )}
            <div className="p-6">
                <PostType post={post} theme={theme} />
                
                <div className="my-4 text-base" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                
                <PostMeta post={post} theme={theme} />
            </div>
        </article>
    );
}