import { PostMeta } from "@/components/posts/post-meta";
import type { PostCardSharedProps } from "./post-card";
import { PostType } from "./post-type";
import { getPostUrl } from "@/lib/post-urls";
import Link from "next/link";

export function ArticlePostCard({ post, theme }: PostCardSharedProps) {
  return (
    <article className={`rounded-lg px-4 py-4 ${theme.card}`}>
      <PostType post={post} theme={theme} />
      <Link href={getPostUrl(post)}>
        <h2
          className={`my-4 text-2xl font-bold tracking ${theme.label} hover:underline cursor-pointer`}
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
      </Link>
      <div
        className="mt-3 space-y-4 text-base text-zinc-600"
        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
      />
      <PostMeta post={post} theme={theme} />
    </article>
  );
}
