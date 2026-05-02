import { getPostsByTag, getTagBySlug, getTagsByIds, getCategoriesByIds, extractFeaturedMedia } from "@/lib/wordpress";
import { WordPressPost, WordPressTerm } from "@/lib/wordpress-types";
import { PostCard } from "@/components/posts/post-card";
import { Pagination } from "@/components/pagination";
import { EnrichedPost } from "@/lib/post-types";
import Link from "next/link";
import { notFound } from "next/navigation";

interface TagPageProps {
    params: Promise<{
        slug: string;
        page: string;
    }>;
}

export default async function TagPage({ params }: TagPageProps) {
    const resolvedParams = await params;
    const { slug, page } = resolvedParams;
    const currentPage = parseInt(page, 10);

    // Récupérer les informations du tag
    const tag = await getTagBySlug(slug);
    if (!tag) {
        notFound();
    }

    // Récupérer les posts pour ce tag
    const postsResponse = await getPostsByTag(tag.id, currentPage);

    // Enrichir les posts avec les taxonomies et médias
    const postsWithTerms: EnrichedPost[] = await Promise.all(
        postsResponse.posts.map(async (post) => {
            const [tagObjects, categoryObjects] = await Promise.all([
                getTagsByIds(post.tags),
                getCategoriesByIds(post.categories),
            ]);

            const featuredMediaObject = extractFeaturedMedia(post);

            return {
                ...post,
                tagObjects,
                categoryObjects,
                featuredMediaObject,
            };
        }),
    );

    return (
        <main className="mx-auto min-h-screen max-w-4xl px-6 py-16">
            <header className="mb-10">
                <Link href="/" className="text-sm text-zinc-600 hover:text-zinc-900">
                    ← Retour à l'accueil
                </Link>
                <h1 className="mt-4 text-4xl font-bold tracking-tight">
                    Tag: #{tag.name}
                </h1>
                {tag.description && (
                    <p className="mt-4 text-zinc-600">{tag.description}</p>
                )}
                <p className="mt-2 text-sm text-zinc-500">
                    {postsResponse.total} post{postsResponse.total > 1 ? "s" : ""}
                </p>
            </header>

            <ul className="space-y-12">
                {postsWithTerms.map((post: EnrichedPost) => (
                    <li key={post.id}>
                        <PostCard post={post} />
                    </li>
                ))}
            </ul>

            {postsResponse.totalPages > 1 && (
                <Pagination 
                    currentPage={currentPage} 
                    totalPages={postsResponse.totalPages}
                    basePath={`/tag/${slug}`}
                    accentColor="purple"
                />
            )}
        </main>
    );
}

// Métadonnées pour le SEO
export async function generateMetadata({ params }: TagPageProps) {
    const resolvedParams = await params;
    const tag = await getTagBySlug(resolvedParams.slug);
    
    if (!tag) {
        return {
            title: "Tag introuvable",
        };
    }

    return {
        title: `Tag: #${tag.name} - Ange Chierchia`,
        description: tag.description || `Découvrez tous les posts avec le tag ${tag.name}`,
        alternates: {
            canonical: `/tag/${resolvedParams.slug}`,
        },
    };
}
