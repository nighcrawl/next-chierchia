import type { EnrichedPost } from "@/lib/post-types";
import { PostTheme } from "@/lib/post-theme";
import { getPostUrl } from "@/lib/post-urls";
import Link from "next/link";

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
            <Link href={getPostUrl(post)}><time dateTime={post.date} className={theme.label}>{formatDate(post.date)}</time></Link>

            {post.tagObjects.map((tag) => {
                return (
                    <Link 
                        key={`tag-${tag.id}`} 
                        href={`/tag/${tag.slug}`}
                        className={`rounded-full px-2 py-1 ${theme.tag} hover:opacity-80 transition-opacity`}
                    >
                        #{tag.name}
                    </Link>
                );
            })}
        </div>
    )
}