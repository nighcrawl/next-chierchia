import Link from 'next/link';

export function Header() {
	return (
		<header className="mb-10">
			<h1 className="text-4xl font-bold tracking-tight">
				<Link href="/">
					Ange Chierchia
				</Link>
			</h1>
			<p className="mt-4 text-zinc-600">
				Front Next.js connecté à WordPress.
			</p>
			<nav className="mt-6">
				<ul className="flex gap-6 text-sm">
					<li>
						<Link href="/" className="text-zinc-600 hover:text-zinc-900 transition-colors">
							Homepage
						</Link>
					</li>
					<li>
						<Link href="/category/notes" className="text-zinc-600 hover:text-zinc-900 transition-colors">
							Notes
						</Link>
					</li>
					<li>
						<Link href="/category/articles" className="text-zinc-600 hover:text-zinc-900 transition-colors">
							Articles
						</Link>
					</li>
					<li>
						<Link href="/category/journal" className="text-zinc-600 hover:text-zinc-900 transition-colors">
							Journal
						</Link>
					</li>
					<li>
						<Link href="/a-propos" className="text-zinc-600 hover:text-zinc-900 transition-colors">
							À propos
						</Link>
					</li>
					<li>
						<Link href="/contact" className="text-zinc-600 hover:text-zinc-900 transition-colors">
							Contact
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}
