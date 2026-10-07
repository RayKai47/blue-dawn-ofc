"use client";

import { useEffect, useRef, useState } from "react";

import { useRevealOnView } from "#/hooks/use-reveal-on-view";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "#/components/ui/carousel";

import type { HomeVideo } from "#/constants/home";

type HomeVideosProps = {
  videos: HomeVideo[];
};

function syncHomeVideos(api: CarouselApi, reduceMotion: boolean) {
  if (!api) return;

  const selected = api.selectedScrollSnap();

  api.slideNodes().forEach((node, index) => {
    const video = node.querySelector("video");

    if (!(video instanceof HTMLVideoElement)) return;

    if (index !== selected || reduceMotion) {
      video.pause();
      return;
    }

    if (video.ended) video.currentTime = 0;

    video.muted = true;
    void video.play().catch(() => undefined);
  });
}

const HomeVideos = ({ videos }: HomeVideosProps) => {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const sectionRef = useRef<HTMLElement>(null);

  useRevealOnView(sectionRef);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    function syncReducedMotion() {
      setReduceMotion(media.matches);
    }

    syncReducedMotion();
    media.addEventListener("change", syncReducedMotion);

    return () => {
      media.removeEventListener("change", syncReducedMotion);
    };
  }, []);

  useEffect(() => {
    if (!api) return;

    const carouselApi = api;

    function handleSelect() {
      syncHomeVideos(carouselApi, reduceMotion);
    }

    function handleEnded(event: Event) {
      const video = event.currentTarget;

      if (!(video instanceof HTMLVideoElement)) return;

      const selectedNode =
        carouselApi.slideNodes()[carouselApi.selectedScrollSnap()];

      if (!selectedNode?.contains(video)) return;
      if (!carouselApi.canScrollNext()) return;

      carouselApi.scrollNext();
    }

    const clips = carouselApi.slideNodes().flatMap((node) => {
      const video = node.querySelector("video");

      return video instanceof HTMLVideoElement ? [video] : [];
    });

    handleSelect();
    carouselApi.on("select", handleSelect);
    carouselApi.on("reInit", handleSelect);
    clips.forEach((video) => {
      video.addEventListener("ended", handleEnded);
    });

    return () => {
      carouselApi.off("select", handleSelect);
      carouselApi.off("reInit", handleSelect);
      clips.forEach((video) => {
        video.removeEventListener("ended", handleEnded);
      });
    };
  }, [api, reduceMotion]);

  return (
    <section ref={sectionRef} className="sec vids" id="vids">
      <h2>動起來的回憶</h2>
      <Carousel
        setApi={setApi}
        opts={{ align: "center" }}
        className="w-full"
      >
        <CarouselContent className="vrow embla-row ml-0">
          {videos.map((clip) => (
            <CarouselItem key={clip.src} className="video-slide">
              <figure data-reveal>
                <video
                  controls
                  muted
                  playsInline
                  preload="metadata"
                  src={clip.src}
                />
                <figcaption>{clip.caption}</figcaption>
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export { HomeVideos };
