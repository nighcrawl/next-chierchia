import { PostMeta } from "@/components/posts/post-meta";
import type { EnrichedPost } from "@/lib/post-types";
import { PostType } from "./post-type";

type BookmarkPostCardProps = {
  post: EnrichedPost;
};

export function BookmarkPostCard({ post }: BookmarkPostCardProps) {
  return (
    <article className="rounded-lg bg-teal-50 px-5 py-6 ring-1 ring-teal-100 shadow-xl shadow-teal-200/10">
      <PostType post={post} />
      <h2
        className="text-xl font-semibold text-teal-950"
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />

      <div
        className="mt-3 space-y-4 text-base text-zinc-800"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />

      <PostMeta post={post} />
    </article>
  );
}