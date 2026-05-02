import type { PostKind } from "./post-kind";
export type PostTheme = 
{
    card: string;
    category: string;
    tag: string;
    label: string;
};

export const postThemeMap: Record<PostKind, PostTheme> = {
    bookmark: {
        card: 'bg-teal-50 dark:bg-teal-950 text-base shadow-sm',
        category: 'text-teal-700 font-semibold',
        tag: 'bg-teal-600 text-teal-100',
        label: 'text-teal-800 dark:text-teal-500'
    },
    note: {
        card: 'bg-blue-50 dark:bg-blue-950 text-base shadow-sm',
        category: 'text-blue-700 font-semibold',
        tag: 'bg-blue-600 text-blue-100',
        label: 'text-blue-800 dark:text-blue-500'
    },
    article: {
        card: 'text-base',
        category: 'text-purple-700 font-semibold',
        tag: 'bg-purple-600 text-purple-100',
        label: 'text-purple-800'
    },
    journal: {
        card: 'bg-amber-50 dark:bg-amber-950 text-base shadow-sm',
        category: 'text-amber-700 font-semibold',
        tag: 'bg-amber-600 text-amber-100',
        label: 'text-amber-800 dark:text-amber-500'
    },
    default: {
        card: 'text-base',
        category: 'text-purple-700 font-semibold',
        tag: 'bg-purple-600 text-purple-100',
        label: 'text-purple-800'
    },
};