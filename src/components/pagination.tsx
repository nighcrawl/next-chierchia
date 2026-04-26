import Link from "next/link";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	basePath?: string;
}

export function Pagination({ currentPage, totalPages, basePath = "" }: PaginationProps) {
	if (totalPages <= 1) return null;

	// Générer les numéros de page à afficher
	const getVisiblePages = () => {
		const pages: number[] = [];
		const maxVisible = 5;
		
		if (totalPages <= maxVisible) {
			// Afficher toutes les pages si peu de pages
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			// Logique pour afficher intelligemment les pages
			if (currentPage <= 3) {
				// Début : 1,2,3,4,...,totalPages
				for (let i = 1; i <= 4; i++) {
					pages.push(i);
				}
				pages.push(totalPages);
			} else if (currentPage >= totalPages - 2) {
				// Fin : 1,...,totalPages-3,totalPages-2,totalPages-1,totalPages
				pages.push(1);
				for (let i = totalPages - 3; i <= totalPages; i++) {
					pages.push(i);
				}
			} else {
				// Milieu : 1,...,currentPage-1,currentPage,currentPage+1,...,totalPages
				pages.push(1);
				for (let i = currentPage - 1; i <= currentPage + 1; i++) {
					pages.push(i);
				}
				pages.push(totalPages);
			}
		}
		
		return pages;
	};

	const visiblePages = getVisiblePages();

	const getPageHref = (page: number) => {
		if (page === 1) {
			return basePath || "/";
		}
		return `${basePath}/page/${page}`;
	};

	return (
		<nav className="mt-12 flex items-center justify-center space-x-1" aria-label="Pagination">
			{/* Bouton Précédent */}
			{currentPage > 1 && (
				<Link
					href={getPageHref(currentPage - 1)}
					className="rounded-md px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
					aria-label="Page précédente"
				>
					←
				</Link>
			)}

			{/* Numéros de page */}
			{visiblePages.map((page, index) => {
				const prevPage = visiblePages[index - 1];
				const showEllipsis = prevPage && page - prevPage > 1;

				return (
					<div key={page} className="flex items-center">
						{showEllipsis && (
							<span className="px-3 py-2 text-sm text-zinc-500">...</span>
						)}
						{page === currentPage ? (
							<span
								className="rounded-md px-3 py-2 text-sm font-medium bg-zinc-900 text-white"
								aria-current="page"
							>
								{page}
							</span>
						) : (
							<Link
								href={getPageHref(page)}
								className="rounded-md px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
							>
								{page}
							</Link>
						)}
					</div>
				);
			})}

			{/* Bouton Suivant */}
			{currentPage < totalPages && (
				<Link
					href={getPageHref(currentPage + 1)}
					className="rounded-md px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
					aria-label="Page suivante"
				>
					→
				</Link>
			)}
		</nav>
	);
}
