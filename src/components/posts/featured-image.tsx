import Image from "next/image";
import type { WordPressFeaturedMedia } from "@/lib/wordpress-types";

type FeaturedImageSize = 'thumbnail' | 'medium' | 'large' | 'full';

interface FeaturedImageProps {
  featuredMedia?: WordPressFeaturedMedia;
  size?: FeaturedImageSize;
  className?: string;
  priority?: boolean;
}

function getImageUrl(featuredMedia: WordPressFeaturedMedia, size: FeaturedImageSize): string {
  // Priorité: taille demandée -> medium -> large -> full -> source_url par défaut
  const sizeMap = {
    thumbnail: featuredMedia.media_details?.sizes?.thumbnail,
    medium: featuredMedia.media_details?.sizes?.medium,
    large: featuredMedia.media_details?.sizes?.large,
    full: featuredMedia.media_details?.sizes?.full,
  };

  const selectedSize = sizeMap[size];
  
  if (selectedSize?.source_url) {
    return selectedSize.source_url;
  }
  
  // Fallback vers medium si disponible
  if (featuredMedia.media_details?.sizes?.medium?.source_url) {
    return featuredMedia.media_details.sizes.medium.source_url;
  }
  
  // Fallback vers la source_url par défaut
  return featuredMedia.source_url;
}

function getImageDimensions(featuredMedia: WordPressFeaturedMedia, size: FeaturedImageSize): { width: number; height: number } {
  const sizeMap = {
    thumbnail: featuredMedia.media_details?.sizes?.thumbnail,
    medium: featuredMedia.media_details?.sizes?.medium,
    large: featuredMedia.media_details?.sizes?.large,
    full: featuredMedia.media_details?.sizes?.full,
  };

  const selectedSize = sizeMap[size];
  
  if (selectedSize?.width && selectedSize?.height) {
    return { width: selectedSize.width, height: selectedSize.height };
  }
  
  // Fallback vers les dimensions du medium ou full
  const fallbackSize = featuredMedia.media_details?.sizes?.medium || featuredMedia.media_details?.sizes?.full;
  if (fallbackSize?.width && fallbackSize?.height) {
    return { width: fallbackSize.width, height: fallbackSize.height };
  }
  
  // Dimensions par défaut si aucune information disponible
  return { width: 800, height: 600 };
}

export function FeaturedImage({ 
  featuredMedia, 
  size = 'medium', 
  className = '', 
  priority = false 
}: FeaturedImageProps) {
  if (!featuredMedia) {
    // Placeholder pour les posts sans image
    return null;
  }

  const imageUrl = getImageUrl(featuredMedia, size);
  const { width, height } = getImageDimensions(featuredMedia, size);
  const altText = featuredMedia.alt_text || '';

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={imageUrl}
        alt={altText}
        width={width}
        height={height}
        priority={priority}
        className="object-cover w-full h-full"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}
