"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";

import { useRevealOnView } from "#/hooks/use-reveal-on-view";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "#/components/ui/carousel";

import type { JournalComic } from "#/constants/journal-comics";

type HomeComicsProps = {
  comics: JournalComic[];
};

const HomeComics = ({ comics }: HomeComicsProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useRevealOnView(sectionRef);

  useEffect(() => {
    if (!activeId) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveId(null);
    }

    addEventListener("keydown", onKey);

    return () => removeEventListener("keydown", onKey);
  }, [activeId]);

  if (comics.length === 0) return null;

  const active = comics.find((comic) => comic.id === activeId);

  return (
    <>
      <section ref={sectionRef} className="sec vids" id="comics">
        <h2>成員的四格日常</h2>
        <Carousel
          opts={{ align: "center", loop: true }}
          className="w-full"
        >
          <CarouselContent className="vrow crow embla-row ml-0">
            {comics.map((comic) => (
              <CarouselItem key={comic.id} className="comic-slide">
                <figure data-reveal>
                  <button
                    type="button"
                    onClick={() => setActiveId(comic.id)}
                    aria-label={`放大：${comic.title}`}
                  >
                    <Image
                      sizes="(min-width: 900px) 76vh, 86vw"
                      src={comic.src}
                      width={comic.width}
                      height={comic.height}
                      alt={comic.alt}
                    />
                  </button>
                  <figcaption>{comic.title}</figcaption>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" aria-label="上一張四格" />
          <CarouselNext className="right-2" aria-label="下一張四格" />
        </Carousel>
      </section>

      {active && (
        <div
          className="lb"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={() => setActiveId(null)}
        >
          <Image
            sizes="94vw"
            src={active.src}
            width={active.width}
            height={active.height}
            alt={active.alt}
          />
          <p>{active.title}</p>
        </div>
      )}
    </>
  );
};

export { HomeComics };
