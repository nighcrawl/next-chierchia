import { getPosts, getTagsByIds, getCategoriesByIds, extractFeaturedMedia } from "@/lib/wordpress";
import { PostCard } from "@/components/posts/post-card";
import { Pagination } from "@/components/pagination";
import { EnrichedPost } from "@/lib/post-types";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";

interface PageProps {
	params: Promise<{
		page: string;
	}>;
}

export default async function PaginatedPage({ params }: PageProps) {
	const { page: pageParam } = await params;
	const pageNumber = parseInt(pageParam, 10);

	// Valider que le numéro de page est valide
	if (isNaN(pageNumber) || pageNumber < 1) {
		notFound();
	}

	const postsResponse = await getPosts(pageNumber, 10);

	// Si la page demandée n'existe pas
	if (pageNumber > postsResponse.totalPages) {
		notFound();
	}

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
		<>
			<Header />
			<main className="mx-auto min-h-screen max-w-4xl px-6 py-16">

				<ul className="space-y-12">
					{postsWithTerms.map((post: EnrichedPost) => (
						<li key={post.id}>
							<PostCard post={post} />
						</li>
					))}
				</ul>

				<Pagination 
					currentPage={pageNumber} 
					totalPages={postsResponse.totalPages}
					accentColor="purple"
				/>
			</main>
		</>
	);
}

// Métadonnées pour le SEO
export async function generateMetadata({ params }: PageProps) {
	const { page: pageParam } = await params;
	const pageNumber = parseInt(pageParam, 10);
	
	return {
		title: `Page ${pageNumber} - Ange Chierchia`,
		description: `Page ${pageNumber} du blog d'Ange Chierchia. Découvrez mes articles, notes et bookmarks sur le développement web et les technologies.`,
		alternates: {
			canonical: pageNumber === 1 ? "/" : `/page/${pageNumber}`,
		},
	};
}
