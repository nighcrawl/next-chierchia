import { PostMeta } from "@/components/posts/post-meta";
import type { EnrichedPost } from "@/lib/post-types";
import { PostType } from "./post-type";

type JournalPostCardProps = {
  post: EnrichedPost;
};

export function JournalPostCard({ post }: JournalPostCardProps) {
  return (
    <article className="rounded-lg bg-transparent px-5 py-6 shadow-xl shadow-zinc-100/10">
      <PostType post={post} />
      <h2
        className="text-2xl font-bold text-zinc-950"
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />

      <div
        className="my-4 text-base text-zinc-800"
        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
      />

      <PostMeta post={post} />
    </article>
  );
}
