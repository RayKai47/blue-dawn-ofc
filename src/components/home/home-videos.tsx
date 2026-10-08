"use client";

import { useEffect, useRef, useState } from "react";

import { Volume2 } from "lucide-react";

import { useRevealOnView } from "#/hooks/use-reveal-on-view";
import { useVideoPlaylist } from "#/hooks/use-video-playlist";

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

const HomeVideos = ({ videos }: HomeVideosProps) => {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const sectionRef = useRef<HTMLElement>(null);
  const { soundBlocked, enableSound } = useVideoPlaylist(sectionRef, api, reduceMotion);

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

  return (
    <section ref={sectionRef} className="sec vids" id="vids">
      <h2>動起來的回憶</h2>
      {soundBlocked && (
        <button type="button" className="vids-sound" onClick={enableSound}>
          <Volume2 aria-hidden="true" />
          點一下，開啟影片聲音
        </button>
      )}
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
                  onLoadedMetadata={(event) => {
                    event.currentTarget.volume = clip.volume ?? 1;
                  }}
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
