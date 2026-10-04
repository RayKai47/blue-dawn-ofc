"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "#/lib/utils";

export type CarouselSlide = {
  id: string;
  src: string;
  alt: string;
};

type CarouselProps = {
  slides: CarouselSlide[];
  intervalMs?: number;
  className?: string;
  aspectClassName?: string;
};

const DEFAULT_INTERVAL_MS = 5000;

const Carousel = ({
  slides,
  intervalMs = DEFAULT_INTERVAL_MS,
  className,
  aspectClassName = "aspect-[21/9]",
}: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const slideCount = slides.length;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    function syncReducedMotion() {
      setPrefersReducedMotion(media.matches);
    }

    syncReducedMotion();
    media.addEventListener("change", syncReducedMotion);

    return () => {
      media.removeEventListener("change", syncReducedMotion);
    };
  }, []);

  useEffect(() => {
    if (slideCount <= 1 || prefersReducedMotion || isPaused) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slideCount);
    }, intervalMs);

    return () => {
      window.clearInterval(timer);
    };
  }, [intervalMs, isPaused, prefersReducedMotion, slideCount]);

  if (slideCount === 0) {
    return null;
  }

  function goTo(index: number) {
    setActiveIndex((index + slideCount) % slideCount);
  }

  function goPrev() {
    goTo(activeIndex - 1);
  }

  function goNext() {
    goTo(activeIndex + 1);
  }

  return (
    <div
      className={cn("w-full", className)}
      role="region"
      aria-roledescription="carousel"
      aria-label="首頁橫幅輪播"
      onMouseEnter={() => {
        setIsPaused(true);
      }}
      onMouseLeave={() => {
        setIsPaused(false);
      }}
      onFocusCapture={() => {
        setIsPaused(true);
      }}
      onBlurCapture={() => {
        setIsPaused(false);
      }}
    >
      <div
        className={cn(
          "w-full overflow-hidden bg-night-sky relative",
          aspectClassName,
        )}
      >
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={slide.id}
              className={cn(
                "inset-0 absolute transition-opacity duration-700 ease-out",
                isActive ? "opacity-100" : "opacity-0",
                prefersReducedMotion && "transition-none",
              )}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} / ${slideCount}`}
              aria-hidden={!isActive}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
          );
        })}

        {slideCount > 1 ? (
          <>
            <button
              type="button"
              className={cn(
                "m-0 p-2 size-10 text-background bg-night-sky/45 border-0",
                "flex items-center justify-center",
                "top-1/2 left-3 z-10 absolute -translate-y-1/2",
                "transition-colors hover:bg-night-sky/65 focus-visible:outline-none",
                "focus-visible:ring-2 focus-visible:ring-dawn-gold",
              )}
              aria-label="上一張橫幅"
              onClick={goPrev}
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              className={cn(
                "m-0 p-2 size-10 text-background bg-night-sky/45 border-0",
                "flex items-center justify-center",
                "top-1/2 right-3 z-10 absolute -translate-y-1/2",
                "transition-colors hover:bg-night-sky/65 focus-visible:outline-none",
                "focus-visible:ring-2 focus-visible:ring-dawn-gold",
              )}
              aria-label="下一張橫幅"
              onClick={goNext}
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </>
        ) : null}
      </div>

      {slideCount > 1 ? (
        <div
          className="mt-3 flex items-center justify-center gap-2"
          role="tablist"
          aria-label="橫幅指示點"
        >
          {slides.map((slide, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`前往第 ${index + 1} 張橫幅`}
                className={cn(
                  "m-0 p-0 h-2 w-2 border-0 rounded-sm",
                  "transition-colors",
                  isActive
                    ? "bg-dawn-sky"
                    : "bg-dawn-sky/30 hover:bg-dawn-sky/55",
                )}
                onClick={() => {
                  goTo(index);
                }}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export { Carousel };
