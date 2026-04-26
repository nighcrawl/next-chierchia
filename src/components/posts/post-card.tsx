import { getPostKind } from "@/lib/post-kind";
import { postThemeMap } from "@/lib/post-theme";
import type { EnrichedPost } from "@/lib/post-types";
import type { PostKind } from "@/lib/post-kind";
import type { PostTheme } from "@/lib/post-theme";

import { ArticlePostCard } from "./article-post-card";
import { BookmarkPostCard } from "./bookmark-post-card";
import { JournalPostCard } from "./journal-post-card";
import { NotePostCard } from "./note-post-card";

export type PostCardSharedProps = {
  post: EnrichedPost;
  kind: PostKind;
  theme: PostTheme;
};

type PostCardProps = {
  post: EnrichedPost;
};

export function PostCard({ post }: PostCardProps) {
  const kind = getPostKind(post);
  const theme = postThemeMap[kind];

  const sharedProps: PostCardSharedProps = {
    post,
    kind,
    theme,
  };

  switch (kind) {
    case "bookmark":
      return <BookmarkPostCard {...sharedProps} />;
    case "note":
      return <NotePostCard {...sharedProps} />;
    case "article":
      return <ArticlePostCard {...sharedProps} />;
    case "journal":
      return <JournalPostCard {...sharedProps} />;
    default:
      return <ArticlePostCard {...sharedProps} />;
  }
}
