import { PostMeta } from "@/components/posts/post-meta";
import type { PostCardSharedProps } from "./post-card";
import { PostType } from "./post-type";
import { getPostUrl } from "@/lib/post-urls";
import Link from "next/link";

export function JournalPostCard({ post, theme }: PostCardSharedProps) {
  return (
    <article className="py-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <div className="space-y-3">
        <div className="space-y-2">
          <PostType post={post} theme={theme} />
          <h2 className="text-2xl leading-8 font-bold tracking-tight">
            <Link 
              href={getPostUrl(post)}
              className="text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-500 transition-colors"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
          </h2>
        </div>
        <div 
          className="prose max-w-none text-gray-500 dark:text-gray-400"
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        />
        <PostMeta post={post} theme={theme} />
      </div>
    </article>
  );
}
