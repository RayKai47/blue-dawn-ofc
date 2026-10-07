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

import type { gallery } from "#/constants/home";

type GalleryItem = (typeof gallery)[number];

type HomeGalleryColumnProps = {
  items: GalleryItem[];
  direction: "forward" | "backward";
};

const COPIES = 2;
const SPEED = 0.7;

function prefersReducedMotion() {
  return typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const HomeGalleryColumn = ({ items, direction }: HomeGalleryColumnProps) => {
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
          {Array.from({ length: COPIES }, (_, copy) => copy).flatMap((copy) =>
            items.map(({ image, caption }) => (
              <CarouselItem className="gal-slide" key={`${copy}-${image.src}`} aria-hidden={copy > 0}>
                <figure className="gal-item">
                  <Image
                    sizes="(min-width: 900px) 30vw, 50vw"
                    src={image.src}
                    width={image.width}
                    height={image.height}
                    alt={copy > 0 ? "" : image.alt}
                    draggable={false}
                    loading="eager"
                  />
                  <figcaption>{caption}</figcaption>
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
