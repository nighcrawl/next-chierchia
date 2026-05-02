import { getPostsByCategory, getCategoryBySlug, getTagsByIds, getCategoriesByIds, extractFeaturedMedia } from "@/lib/wordpress";
import { WordPressPost, WordPressTerm } from "@/lib/wordpress-types";
import { PostCard } from "@/components/posts/post-card";
import { Pagination } from "@/components/pagination";
import { EnrichedPost } from "@/lib/post-types";
import Link from "next/link";
import { notFound } from "next/navigation";

interface CategoryPageProps {
    params: Promise<{
        slug: string;
        page: string;
    }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const resolvedParams = await params;
    const { slug, page } = resolvedParams;
    const currentPage = parseInt(page, 10);

    // Récupérer les informations de la catégorie
    const category = await getCategoryBySlug(slug);
    
    if (!category) {
        notFound();
    }

    // Récupérer les posts pour cette catégorie
    const postsResponse = await getPostsByCategory(category.id, currentPage);

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
                    Catégorie: {category.name}
                </h1>
                {category.description && (
                    <p className="mt-4 text-zinc-600">{category.description}</p>
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
                    basePath={`/category/${slug}`}
                    accentColor="purple"
                />
            )}
        </main>
    );
}

// Métadonnées pour le SEO
export async function generateMetadata({ params }: CategoryPageProps) {
    const resolvedParams = await params;
    const category = await getCategoryBySlug(resolvedParams.slug);
    
    if (!category) {
        return {
            title: "Catégorie introuvable",
        };
    }

    return {
        title: `Catégorie: ${category.name} - Ange Chierchia`,
        description: category.description || `Découvrez tous les posts dans la catégorie ${category.name}`,
        alternates: {
            canonical: `/category/${resolvedParams.slug}`,
        },
    };
}
