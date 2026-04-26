import type { WordPressPost, WordPressTerm, WordPressFeaturedMedia } from "@/lib/wordpress-types";

export type EnrichedPost = WordPressPost & {
    tagObjects: WordPressTerm[];
    categoryObjects: WordPressTerm[];
    featuredMediaObject?: WordPressFeaturedMedia;
};