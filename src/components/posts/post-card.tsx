import { getPostKind } from "@/lib/post-kind";
import type { EnrichedPost } from "@/lib/post-types";
import { ArticlePostCard } from "./article-post-card";
import { BookmarkPostCard } from "./bookmark-post-card";
import { JournalPostCard } from "./journal-post-card";
import { NotePostCard } from "./note-post-card";

type PostCardProps = {
  post: EnrichedPost;
};

export function PostCard({ post }: PostCardProps) {
  const kind = getPostKind(post);

  switch (kind) {
    case "bookmark":
      return <BookmarkPostCard post={post} />;
    case "note":
      return <NotePostCard post={post} />;
    case "article":
      return <ArticlePostCard post={post} />;
    case "journal":
      return <JournalPostCard post={post} />;
    default:
      return <ArticlePostCard post={post} />;
  }
}
