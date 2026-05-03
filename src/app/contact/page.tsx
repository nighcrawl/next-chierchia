import { Header } from "@/components/header";
import { getPageBySlug } from "@/lib/wordpress";
import { notFound } from "next/navigation";

export default async function ContactPage() {
	const page = await getPageBySlug("contact");
	
	if (!page) {
		notFound();
	}

	return (
		<>
			<Header />
			<main className="mx-auto min-h-screen max-w-4xl px-6 py-16">
				
				<article className="prose prose-zinc max-w-none">
					<h1>{page.title.rendered}</h1>
					<div 
						dangerouslySetInnerHTML={{ __html: page.content.rendered }}
					/>
				</article>
			</main>
		</>
	);
}

// Métadonnées pour le SEO
export async function generateMetadata() {
	const page = await getPageBySlug("contact");
	
	if (!page) {
		return {
			title: "Page introuvable",
		};
	}

	return {
		title: `${page.title.rendered} - Ange Chierchia`,
		description: page.excerpt.rendered.replace(/<[^>]*>/g, '').trim() || "Contactez Ange Chierchia",
		alternates: {
			canonical: "/contact",
		},
	};
}
