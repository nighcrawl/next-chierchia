import { getPostBySlug, extractFeaturedMedia } from "@/lib/wordpress";
import { notFound } from "next/navigation";
import { FeaturedImage } from "@/components/posts/featured-image";
import { Header } from "@/components/header";

type PostPageParams = {
  year: string;
  month: string;
  day: string;
  slug: string;
};

export const dynamic = 'force-dynamic';

export default async function PostPage({ params }: { 
  params: Promise<PostPageParams> 
}) {
  const { year, month, day, slug } = await params;
  
  const post = await getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }
  
  // Extraire les médias mis en avant
  const featuredMediaObject = extractFeaturedMedia(post);
  
  // Validation de la date directement ici pour éviter le problème avec getPostDateParts
  const postDate = new Date(post.date);
  const postYear = postDate.getFullYear().toString();
  const postMonth = (postDate.getMonth() + 1).toString().padStart(2, '0');
  const postDay = postDate.getDate().toString().padStart(2, '0');
  
  if (year !== postYear || 
      month !== postMonth || 
      day !== postDay) {
    notFound();
  }
  
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-16">
      <Header />
      <article className="mt-10 space-y-6">
        {/* Image mise en avant */}
        {featuredMediaObject && (
          <div className="mb-8">
            <FeaturedImage 
              featuredMedia={featuredMediaObject}
              size="large"
              className="w-full h-64 md:h-96 rounded-lg shadow-lg"
              priority={true}
            />
          </div>
        )}
        
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">
            {post.title.rendered}
          </h1>
          <div className="mt-4 text-zinc-600">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
        </header>
        
        <div 
          className="prose prose-zinc max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </article>
    </main>
  );
}
