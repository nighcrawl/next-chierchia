import { getPosts, getPostBySlug, getCommentsByPostId, extractFeaturedMedia } from "@/lib/wordpress";
import { getPostDateParts, getPostUrl } from "@/lib/post-urls";
import { yoastToMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { FeaturedImage } from "@/components/posts/featured-image";
import { PostContent } from "@/components/posts/post-content";
import { Webmentions } from "@/components/posts/webmentions";
import { hasBlockshifterCarousel, getBlockshifterCarouselAssets } from "@/lib/blockshifter";

type PostPageParams = {
  year: string;
  month: string;
  slug: string;
};

export async function generateStaticParams() {
  // Seuls les posts récents sont pré-générés au build ; les plus anciens sont
  // rendus à la demande (ISR) pour ne pas surcharger l'API au build.
  const { posts } = await getPosts(1, 20);

  return posts.map((post) => ({
    ...getPostDateParts(post),
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<PostPageParams> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Article introuvable" };
  }

  return yoastToMetadata(post.yoast_head_json, {
    title: `${post.title.rendered} - Ange Chierchia`,
    description: post.excerpt.rendered.replace(/<[^>]*>/g, "").trim(),
    canonical: getPostUrl(post),
  });
}

export default async function PostPage({ params }: {
  params: Promise<PostPageParams>
}) {
  const { year, month, slug } = await params;
  
  const post = await getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }
  
  // Extraire les médias mis en avant
  const featuredMediaObject = extractFeaturedMedia(post);
  
  // Validation de la date
  const postDate = new Date(post.date);
  const postYear = postDate.getFullYear().toString();
  const postMonth = (postDate.getMonth() + 1).toString().padStart(2, '0');
  
  if (year !== postYear ||
      month !== postMonth) {
    notFound();
  }

  const blockshifterAssets = hasBlockshifterCarousel(post.content.rendered)
    ? getBlockshifterCarouselAssets()
    : null;

  const comments = await getCommentsByPostId(post.id);

  return (
    <>
      <main className="mx-auto min-h-screen max-w-4xl px-6 py-16">
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
          
          <PostContent post={post} blockshifterAssets={blockshifterAssets} />

          <Webmentions comments={comments} />
        </article>
      </main>
    </>
  );
}
