import { getPosts, getTagsByIds, getCategoriesByIds } from "@/lib/wordpress";
import { WordPressPost, WordPressTerm } from "@/lib/wordpress-types";

type PostWithTerms = WordPressPost & {
  tagObjects: WordPressTerm[];
  categoryObjects: WordPressTerm[]
};


export default async function Home() {

  const posts = await getPosts();

  const postsWithTerms: PostWithTerms[] = await Promise.all(
    posts.map(async (post) => {
      const [tagObjects, categoryObjects] = await Promise.all([
        getTagsByIds(post.tags),
        getCategoriesByIds(post.categories),
      ]);

      return {
        ...post,
        tagObjects,
        categoryObjects
      };
    })
  );

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight">Ange Chierchia</h1>
      <p className="mt-4 text-zinc-600">
        Front Next.js connecté à WordPress.
      </p>

      <ul className="mt-10 space-y-6">
        {postsWithTerms.map((post: PostWithTerms) => (

          <li key={post.id} className="border-b border-zinc-200 pb-6">
            <div className="mb-2 flex flex-wrap gap-2">
              {post.categoryObjects.map((category) => (
                <span key={category.id} className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700">{category.name}</span>
              ))}
            </div>
            <h2
              className="text-2xl font-semibold"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
            <div
              className="mt-2 text-sm text-zinc-600"
              dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {post.tagObjects.map((tag) => (
                <span key={tag.id} className="rounded-full bg-zinc-100 px-2 py-1 text-xs text-zinc-600">#{tag.name}</span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
