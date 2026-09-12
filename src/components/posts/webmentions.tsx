import type { WordPressComment } from "@/lib/wordpress-types";

function formatDate(dateString: string) {
    return new Intl.DateTimeFormat("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(dateString));
}

export function Webmentions({ comments }: { comments: WordPressComment[] }) {
    if (comments.length === 0) {
        return null;
    }

    return (
        <section className="mt-16 border-t border-zinc-200 pt-8 dark:border-zinc-800">
            <h2 className="text-lg font-semibold">Réactions ({comments.length})</h2>
            <ul className="mt-6 space-y-6">
                {comments.map((comment) => {
                    const avatar = comment.author_avatar_urls?.["48"];

                    return (
                        <li key={comment.id} className="flex gap-3">
                            {avatar && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={avatar}
                                    alt=""
                                    width={40}
                                    height={40}
                                    className="rounded-full"
                                />
                            )}
                            <div>
                                <a href={comment.author_url} className="font-medium hover:underline" rel="nofollow ugc">
                                    {comment.author_name}
                                </a>
                                <time dateTime={comment.date} className="ml-2 text-xs text-zinc-500">
                                    {formatDate(comment.date)}
                                </time>
                                <div
                                    className="prose prose-sm prose-zinc mt-1 max-w-none"
                                    dangerouslySetInnerHTML={{ __html: comment.content.rendered }}
                                />
                            </div>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
