'use client';

import Link from 'next/link';
import { useState } from 'react';

export function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<header className="sticky top-0 left-0 right-0 z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
			<nav className="flex items-center justify-between w-full bg-white dark:bg-black py-6 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
				{/* Logo/Brand */}
				<Link href="/" className="flex items-center space-x-4" aria-label="Ange Chierchia - Accueil">
					<div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
						<img
							src="https://chierchia.fr/wp-content/uploads/cropped-16350293-SSDKVqo3-150x150.jpg"
							alt="Ange Chierchia"
							className="w-full h-full object-cover"
						/>
					</div>
					<div className="hidden sm:block">
						<div className="text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100">
							Ange Chierchia
						</div>
						<div className="text-sm text-gray-500 dark:text-gray-400">
							Développeur Web full-stack
						</div>
					</div>
				</Link>

				{/* Desktop Navigation */}
				<div className="hidden lg:flex items-center space-x-6">
					<Link
						href="/category/notes"
						className="text-base font-medium text-gray-900 dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
					>
						Notes
					</Link>
					<Link
						href="/category/articles"
						className="text-base font-medium text-gray-900 dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
					>
						Articles
					</Link>
					<Link
						href="/category/journal"
						className="text-base font-medium text-gray-900 dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
					>
						Journal
					</Link>
					<Link
						href="/a-propos"
						className="text-base font-medium text-gray-900 dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
					>
						À propos
					</Link>
					<Link
						href="/contact"
						className="text-base font-medium text-gray-900 dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
					>
						Contact
					</Link>
				</div>

				{/* Mobile menu button */}
				<div className="lg:hidden flex items-center space-x-2">
					<button
						onClick={toggleMenu}
						className="flex items-center p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
						aria-label="Ouvrir le menu"
					>
						<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							{isMenuOpen ? (
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							) : (
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
							)}
						</svg>
					</button>
				</div>
			</nav>

			{/* Mobile Navigation */}
			{isMenuOpen && (
				<div className="lg:hidden border-t border-gray-200 dark:border-gray-700">
					<div className="px-4 py-6 space-y-4">
						<Link
							href="/category/notes"
							className="block text-base font-medium text-gray-900 dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-400"
							onClick={() => setIsMenuOpen(false)}
						>
							Notes
						</Link>
						<Link
							href="/category/articles"
							className="block text-base font-medium text-gray-900 dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-400"
							onClick={() => setIsMenuOpen(false)}
						>
							Articles
						</Link>
						<Link
							href="/category/journal"
							className="block text-base font-medium text-gray-900 dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-400"
							onClick={() => setIsMenuOpen(false)}
						>
							Journal
						</Link>
						<Link
							href="/a-propos"
							className="block text-base font-medium text-gray-900 dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-400"
							onClick={() => setIsMenuOpen(false)}
						>
							À propos
						</Link>
						<Link
							href="/contact"
							className="block text-base font-medium text-gray-900 dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-400"
							onClick={() => setIsMenuOpen(false)}
						>
							Contact
						</Link>
					</div>
				</div>
			)}
		</header>
	);
}
