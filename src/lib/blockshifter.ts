const CAROUSEL_MARKER = "data-splide";

export function hasBlockshifterCarousel(contentHtml: string): boolean {
  return contentHtml.includes(CAROUSEL_MARKER);
}

export function getBlockshifterCarouselAssets() {
  const apiBase = process.env.WORDPRESS_API_BASE;

  if (!apiBase) {
    throw new Error("WORDPRESS_API_BASE is not defined");
  }

  const siteUrl = new URL(apiBase).origin;
  const pluginUrl = `${siteUrl}/wp-content/plugins/blockshifter/build/frontend`;

  return {
    js: `${pluginUrl}/carousel-init.js`,
    css: `${pluginUrl}/carousel-init.css`,
  };
}
