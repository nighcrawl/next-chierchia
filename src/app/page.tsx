import { getPosts, getTagsByIds, getCategoriesByIds, extractFeaturedMedia } from "@/lib/wordpress";
import { WordPressPost, WordPressTerm } from "@/lib/wordpress-types";
import { PostCard } from "@/components/posts/post-card";
import { Pagination } from "@/components/pagination";
import { EnrichedPost } from "@/lib/post-types";

type PostWithTerms = WordPressPost & {
	tagObjects: WordPressTerm[];
	categoryObjects: WordPressTerm[];
};

export default async function Home() {
	const postsResponse = await getPosts();

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
				<h1 className="text-4xl font-bold tracking-tight">
					Ange Chierchia
				</h1>
				<p className="mt-4 text-zinc-600">
					Front Next.js connecté à WordPress.
				</p>
				{postsResponse.totalPages > 1 && (
					<div className="mt-2 text-sm text-zinc-500">
						Page 1 sur {postsResponse.totalPages} • {postsResponse.total} articles au total
					</div>
				)}
			</header>

			<ul className="space-y-12">
				{postsWithTerms.map((post: EnrichedPost) => (
					<li key={post.id}>
						<PostCard post={post} />
					</li>
				))}
			</ul>

			<Pagination 
				currentPage={1} 
				totalPages={postsResponse.totalPages} 
			/>
		</main>
	);
}

// Métadonnées pour le SEO
export async function generateMetadata() {
	return {
		title: "Ange Chierchia",
		description: "Blog d'Ange Chierchia. Découvrez mes articles, notes et bookmarks sur le développement web et les technologies.",
		alternates: {
			canonical: "/",
		},
	};
}
