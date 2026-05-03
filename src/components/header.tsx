'use client';

import Link from 'next/link';
import { useState } from 'react';

export function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<header className='sticky top-0 left-0 right-0 z-50'>
			<nav className="flex items-center justify-between flex-wrap bg-white dark:bg-black text-base py-4 px-4 shadow shadow-sm">
				<div className="flex justify-between lg:w-auto w-full">
					<div className="flex items-center flex-shrink-0 text-base mr-auto">
						<Link href="/" className="text-xl flex flex-col">
							<span className="text-xl font-bold tracking-wider uppercase">Ange Chierchia</span> 
							<span className="text-xs tracking-tight uppercase">Développeur Web full-stack</span>
						</Link>
					</div>
					<div className="block lg:hidden">
						<button
							onClick={toggleMenu}
							id="nav"
							className="flex items-center px-3 py-2 border-2 rounded text-blue-700 border-blue-700 hover:text-blue-700 hover:border-blue-700"
						>
							<svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
								<title>Menu</title>
								<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
							</svg>
						</button>
					</div>
				</div>

				<div className={`${isMenuOpen ? 'block' : 'hidden'} menu  lg:flex lg:items-center`}>
					<div className="text-md font-bold text-purple-700 lg:flex-grow">
						<Link href="/category/notes" className="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-purple-700 mr-2">
							Notes
						</Link>
						<Link href="/category/articles" className="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-purple-700 mr-2">
							Articles
						</Link>
						<Link href="/category/journal" className="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-purple-700 mr-2">
							Journal
						</Link>
						<Link href="/a-propos" className="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-purple-700 mr-2">
							À propos
						</Link>
						<Link href="/contact" className="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-purple-700 mr-2">
							Contact
						</Link>
					</div>
				</div>
			</nav>
		</header>
	);
}
