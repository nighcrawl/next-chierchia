'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Tag {
  name: string;
  count: number;
}

export function Footer() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Récupérer tous les tags depuis WordPress
    const fetchTags = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wp/v2/tags?per_page=100`);
        if (response.ok) {
          const tagsData = await response.json();
          // Filtrer les tags utilisés et trier par count
          const usedTags = tagsData
            .filter((tag: any) => tag.count > 0)
            .map((tag: any) => ({
              name: tag.name,
              count: tag.count
            }))
            .sort((a: Tag, b: Tag) => b.count - a.count)
            .slice(0, 20); // Limiter à 20 tags les plus populaires
          
          setTags(usedTags);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des tags:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* À propos */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Ange Chierchia
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Développeur Web full-stack passionné par les technologies modernes 
              et les architectures headless. Ce blog partage mes réflexions, 
              découvertes et expériences techniques.
            </p>
          </div>

          {/* Navigation rapide */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/category/notes" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Notes
                </Link>
              </li>
              <li>
                <Link href="/category/articles" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/category/journal" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Journal
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Tags populaires */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Tags populaires
            </h3>
            {loading ? (
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                Chargement des tags...
              </div>
            ) : tags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Link
                    key={tag.name}
                    href={`/tag/${tag.name.toLowerCase()}`}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    {tag.name}
                    <span className="ml-1 text-gray-500 dark:text-gray-400">
                      ({tag.count})
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                Aucun tag disponible
              </div>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
            <p>
              © {new Date().getFullYear()} Ange Chierchia. 
              Construit avec{' '}
              <Link 
                href="https://nextjs.org" 
                className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Next.js
              </Link>
              {' '}et{' '}
              <Link 
                href="https://wordpress.org" 
                className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                WordPress
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
