import { PostMeta } from "@/components/posts/post-meta";
import { FeaturedImage } from "@/components/posts/featured-image";
import type { PostCardSharedProps } from "./post-card";
import { PostType } from "./post-type";
import { getPostUrl } from "@/lib/post-urls";
import Link from "next/link";

export function JournalPostCard({ post, theme }: PostCardSharedProps) {
  return (
    <article className={`rounded-lg overflow-hidden ${theme.card}`}>
      <Link href={getPostUrl(post)}>
        <FeaturedImage 
          featuredMedia={post.featuredMediaObject}
          size="large"
          className="w-full h-full hover:opacity-90 transition-opacity"
        />
      </Link>
      <div className="p-4">
        <PostType post={post} theme={theme} />
        <Link href={getPostUrl(post)}>
          <h2
            className={`my-4 text-2xl font-bold tracking ${theme.label} hover:underline cursor-pointer`}
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
        </Link>

        <div
          className="mt-3 space-y-4 text-base text-zinc-800"
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        />

        <PostMeta post={post} theme={theme} />
      </div>
    </article>
  );
}
