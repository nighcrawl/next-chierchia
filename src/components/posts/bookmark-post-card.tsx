import { PostMeta } from "@/components/posts/post-meta";
import { FeaturedImage } from "@/components/posts/featured-image";
import type { PostCardSharedProps } from "./post-card";
import { PostType } from "./post-type";
import { getPostUrl } from "@/lib/post-urls";
import Link from "next/link";

export function BookmarkPostCard({ post, theme }: PostCardSharedProps) {
  return (
    <article className={`rounded-lg overflow-hidden post-type post-type-bookmark ${theme.card}`}>
      <div className="p-6">
        <PostType post={post} theme={theme} />
        <Link href={getPostUrl(post)}>
          <h2
            className={`my-4 text-xl font-semibold tracking ${theme.label} hover:underline cursor-pointer`}
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
        </Link>
        <div
          className="mt-3 space-y-4 text-base"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
        <PostMeta post={post} theme={theme} />
      </div>
    </article>
  );
}