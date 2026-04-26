import type { WordPressPost, WordPressTerm } from "@/lib/wordpress-types";

export type EnrichedPost = WordPressPost & {
    tagObjects: WordPressTerm[];
    categoryObjects: WordPressTerm[];
};