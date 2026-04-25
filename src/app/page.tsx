import { getPosts } from "@/lib/wordpress";
import Image from "next/image";

export default async function Home() {

  const posts = await getPosts();

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py16">
      <h1 className="text-4xl font-bold tracking-tight">Ange Chierchia</h1>
      <p className="mt-4 text-zinc-600">
        Front Next.js connecté à WordPress.
      </p>

      <ul className="mt-10 space-y-6">
        {posts.map((post: any) => (
          <li key={post.id} className="border-b border-zinc-200 pb-6">
            <h2
              className="text-2xl font-semibold"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
            <div
              className="mt-2 text-sm text-zinc-600"
              dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
