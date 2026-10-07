"use client";

import { useRef } from "react";

import { gallery } from "#/constants/home";

import { useRevealOnView } from "#/hooks/use-reveal-on-view";

import { HomeGalleryColumn } from "#/components/home/home-gallery-column";

const COLUMNS = [
  { direction: "forward", items: gallery.slice(0, 4) },
  { direction: "backward", items: gallery.slice(4, 8) },
  { direction: "forward", items: gallery.slice(8) },
] as const;

const HomeGallery = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useRevealOnView(sectionRef);

  return (
    <section ref={sectionRef} className="gal" id="memory">
      <h2>被風吹過、被營火照過的瞬間</h2>
      <div className="gal-wall">
        {COLUMNS.map(({ direction, items }) => (
          <div key={direction + items[0].image.src} className="gal-col" data-reveal>
            <HomeGalleryColumn items={[...items]} direction={direction} />
          </div>
        ))}
      </div>
    </section>
  );
};

export { HomeGallery };
