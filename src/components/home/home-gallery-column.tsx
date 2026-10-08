"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";

import AutoScroll from "embla-carousel-auto-scroll";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "#/components/ui/carousel";

import type { MemoryPhoto } from "#/types/memory";

type HomeGalleryColumnProps = {
  photos: MemoryPhoto[];
  direction: "forward" | "backward";
};

const MIN_SLIDES = 8;
const SPEED = 0.7;

function prefersReducedMotion() {
  return typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const HomeGalleryColumn = ({ photos, direction }: HomeGalleryColumnProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [plugins] = useState(() => [
    AutoScroll({
      speed: SPEED,
      direction,
      startDelay: 0,
      playOnInit: !prefersReducedMotion(),
      stopOnMouseEnter: true,
      stopOnInteraction: false,
    }),
  ]);
  const rootRef = useRef<HTMLDivElement>(null);
  // 張數少的欄多複製幾份，確保 loop 捲動時不會出現空白
  const copies = Math.max(2, Math.ceil(MIN_SLIDES / Math.max(photos.length, 1)));

  useEffect(() => {
    const root = rootRef.current;

    if (!api || !root) return;

    const reduce = prefersReducedMotion();
    const observer = new IntersectionObserver((entries) => {
      const autoScroll = api.plugins().autoScroll;

      // 列被隱藏或尚未量測時，外掛 init 會提前結束；此時呼叫 play/stop 會讓 scrollBody 變成 undefined
      if (!autoScroll || api.scrollSnapList().length <= 1) return;

      if (entries[entries.length - 1].isIntersecting && !reduce) autoScroll.play();
      else autoScroll.stop();
    });

    observer.observe(root);

    return () => observer.disconnect();
  }, [api]);

  if (photos.length === 0) return null;

  return (
    <div ref={rootRef} className="gal-col-wrap">
      <Carousel
        orientation="vertical"
        opts={{ loop: true, dragFree: true }}
        plugins={plugins}
        setApi={setApi}
        className="gal-embla"
      >
        <CarouselContent>
          {Array.from({ length: copies }, (_, copy) => copy).flatMap((copy) =>
            photos.map((photo) => (
              <CarouselItem className="gal-slide" key={`${copy}-${photo.image.src}`} aria-hidden={copy > 0}>
                <figure className="gal-item">
                  <Image
                    sizes="(min-width: 1100px) 22vw, 45vw"
                    src={photo.image.src}
                    width={photo.image.width}
                    height={photo.image.height}
                    alt={copy > 0 ? "" : photo.image.alt}
                    draggable={false}
                    loading={copy > 0 ? "lazy" : "eager"}
                  />
                  <figcaption>{photo.caption}</figcaption>
                </figure>
              </CarouselItem>
            )),
          )}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export { HomeGalleryColumn };
