import { getPosts, getTagsByIds, getCategoriesByIds } from "@/lib/wordpress";
import { WordPressPost, WordPressTerm } from "@/lib/wordpress-types";
import { PostCard } from "@/components/posts/post-card";
import { EnrichedPost } from "@/lib/post-types";

type PostWithTerms = WordPressPost & {
	tagObjects: WordPressTerm[];
	categoryObjects: WordPressTerm[];
};

export default async function Home() {
	const posts = await getPosts();

	const postsWithTerms: EnrichedPost[] = await Promise.all(
		posts.map(async (post) => {
			const [tagObjects, categoryObjects] = await Promise.all([
				getTagsByIds(post.tags),
				getCategoriesByIds(post.categories),
			]);

			return {
				...post,
				tagObjects,
				categoryObjects,
			};
		}),
	);

	return (
		<main className="mx-auto min-h-screen max-w-4xl px-6 py-16">
			<h1 className="text-4xl font-bold tracking-tight">
				Ange Chierchia
			</h1>
			<p className="mt-4 text-zinc-600">
				Front Next.js connecté à WordPress.
			</p>

			<ul className="mt-10 space-y-6">
				{postsWithTerms.map((post: PostWithTerms) => (
					<li key={post.id}>
						<PostCard post={post} />
					</li>
				))}
			</ul>
		</main>
	);
}
