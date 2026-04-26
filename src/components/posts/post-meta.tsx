import type { EnrichedPost } from "@/lib/post-types";
import { PostTheme } from "@/lib/post-theme";

type PostMetaProps = {
    post: EnrichedPost,
    theme: PostTheme
};

function formatDate(dateString: string) {
    return new Intl.DateTimeFormat("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
    }).format(new Date(dateString));
}

export function PostMeta({post, theme}: PostMetaProps) {
    return (
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <time dateTime={post.date} className={theme.label}>{formatDate(post.date)}</time>

            {post.tagObjects.map((tag) => (
                <span key={`tag-${tag.id}`} className={`rounded-full px-2 py-1 ${theme.tag}`}>#{tag.name}</span>
            ))}
        </div>
    )
}