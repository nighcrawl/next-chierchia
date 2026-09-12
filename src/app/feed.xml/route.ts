import { getPosts } from "@/lib/wordpress";
import { getPostUrl } from "@/lib/post-urls";

export const revalidate = 300;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://chierchia.fr";

function escapeXml(value: string) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

export async function GET() {
    const { posts } = await getPosts(1, 20);

    const items = posts
        .map((post) => {
            const url = `${SITE_URL}${getPostUrl(post)}`;
            const title = escapeXml(post.title.rendered);
            const description = escapeXml(post.excerpt.rendered.replace(/<[^>]*>/g, "").trim());

            return `
    <item>
      <title>${title}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${description}</description>
    </item>`;
        })
        .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Ange Chierchia</title>
    <link>${SITE_URL}</link>
    <description>Blog d'Ange Chierchia. Articles, notes et bookmarks sur le développement web et les technologies.</description>${items}
  </channel>
</rss>`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/rss+xml; charset=utf-8",
        },
    });
}
