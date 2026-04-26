import { PostMeta } from "@/components/posts/post-meta";
import type { PostCardSharedProps } from "./post-card";
import { PostType } from "./post-type";

export function JournalPostCard({ post, theme }: PostCardSharedProps) {
  return (
    <article className={`rounded-lg px-4 py-4 ${theme.card}`}>
      <PostType post={post} theme={theme} />
      <h2
        className={`my-4 text-2xl font-bold tracking ${theme.label}`}
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />

      <div
        className="mt-3 space-y-4 text-base text-zinc-800"
        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
      />

      <PostMeta post={post} theme={theme} />
    </article>
  );
}
