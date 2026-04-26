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
        card: 'border border-1 border-teal-100 bg-teal-50 shadow-xl shadow-teal-400/10',
        category: 'text-teal-700 font-semibold',
        tag: 'bg-teal-100 text-teal-700',
        label: 'text-teal-800'
    },
    note: {
        card: 'border border-1 border-blue-100 bg-blue-50 shadow-xl shadow-blue-400/10',
        category: 'text-blue-700 font-semibold',
        tag: 'bg-blue-100 text-blue-700',
        label: 'text-blue-700'
    },
    article: {
        card: 'border border-1 border-purple-100 bg-purple-50 shadow-xl shadow-purple-400/10',
        category: 'text-purple-700 font-semibold',
        tag: 'bg-purple-600 text-purple-100',
        label: 'text-purple-800'
    },
    journal: {
        card: 'border border-zinc-100 shadow-xl shadow-zinc-400/10',
        category: 'text-zinc-700 font-semibold',
        tag: 'bg-zinc-600 text-zinc-100',
        label: 'text-zinc-950'
    },
    default: {
        card: '',
        category: 'text-zinc-700 font-semibold',
        tag: 'bg-zinc-100 text-zinc-700',
        label: 'text-zinc-950'
    },
};