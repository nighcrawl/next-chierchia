"use client";

import Script from "next/script";
import type { WordPressPost } from "@/lib/wordpress-types";

type BlockshifterAssets = {
  js: string;
  css: string;
};

export function PostContent({
  post,
  blockshifterAssets,
}: {
  post: WordPressPost;
  blockshifterAssets: BlockshifterAssets | null;
}) {
  return (
    <>
      {blockshifterAssets && (
        <link rel="stylesheet" href={blockshifterAssets.css} />
      )}
      <div
        className="prose prose-zinc max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
      {blockshifterAssets && (
        <Script
          src={blockshifterAssets.js}
          strategy="afterInteractive"
          onReady={() => {
            // carousel-init.js n'attend qu'un DOMContentLoaded natif pour
            // scanner .splide — cet événement s'est déjà produit avant que
            // Next n'injecte le script, donc on le rejoue nous-mêmes.
            document.dispatchEvent(new Event("DOMContentLoaded"));
          }}
        />
      )}
    </>
  );
}
