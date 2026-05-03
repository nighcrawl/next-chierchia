import type { WordPressPost } from "./wordpress-types";

export function getPostUrl(post: WordPressPost): string {
  const date = new Date(post.date);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  
  return `/${year}/${month}/${post.slug}`;
}

export function getPostDateParts(post: WordPressPost): {
  year: string;
  month: string;
} {
  const date = new Date(post.date);
  return {
    year: date.getFullYear().toString(),
    month: (date.getMonth() + 1).toString().padStart(2, '0'),
  };
}
