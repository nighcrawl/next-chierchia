import type { EnrichedPost } from "@/lib/post-types";

type PostMetaProps = {
    post: EnrichedPost
};

function formatDate(dateString: string) {
    return new Intl.DateTimeFormat("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(new Date(dateString));
}

export function PostMeta({post}: PostMetaProps) {
    return (
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
            <time dateTime={post.date}>{formatDate(post.date)}</time>

            {post.tagObjects.map((tag) => (
                <span key={`tag-${tag.id}`} className="rounded-full bg-zinc-100 px-2 py-1 text-zinc-600">#{tag.name}</span>
            ))}
        </div>
    )
}