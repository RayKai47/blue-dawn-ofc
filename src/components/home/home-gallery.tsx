"use client";

import { useRef, type CSSProperties } from "react";

import { HomeGalleryColumn } from "#/components/home/home-gallery-column";
import { useColumnCount } from "#/hooks/use-column-count";
import { useRevealOnView } from "#/hooks/use-reveal-on-view";

import type { MemoryPhoto } from "#/types/memory";

type HomeGalleryProps = {
  photos: MemoryPhoto[];
};

// 三欄自動捲動的照片牆。只負責牆本身（不含區塊標題），可以放在任何地方重複使用。
const HomeGallery = ({ photos }: HomeGalleryProps) => {
  const wallRef = useRef<HTMLDivElement>(null);
  const count = useColumnCount();

  useRevealOnView(wallRef);

  // 依欄數輪流分配，每欄張數接近，而且每張照片都會出現
  const columns = Array.from({ length: count }, (_, col) =>
    photos.filter((_photo, index) => index % count === col),
  ).filter((column) => column.length > 0);

  return (
    <div
      ref={wallRef}
      className="gal-wall"
      style={{ "--cols": columns.length } as CSSProperties}
    >
      {columns.map((column, col) => (
        <div key={`${count}-${col}`} className="gal-col" data-reveal>
          <HomeGalleryColumn
            photos={column}
            direction={col % 2 === 0 ? "forward" : "backward"}
          />
        </div>
      ))}
    </div>
  );
};

export { HomeGallery };
