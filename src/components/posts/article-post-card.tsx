import { PostMeta } from "@/components/posts/post-meta";
import type { EnrichedPost } from "@/lib/post-types";
import { PostType } from "./post-type";

type ArticlePostCardProps = {
  post: EnrichedPost;
};

export function ArticlePostCard({ post }: ArticlePostCardProps) {
  return (
    <article className="rounded-xl bg-zinc-100 px-4 py-4rounded-lg bg-zinc-50 px-5 py-6 ring-1 ring-zinc-100 shadow-xl shadow-zinc-400/10">
      <PostType post={post} />
      <h2
        className="text-2xl font-bold tracking text-zinc-950"
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />
      <div
        className="mt-3 text-sm leading-7 text-zinc-600"
        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
      />
      <PostMeta post={post} />
    </article>
  );
}
