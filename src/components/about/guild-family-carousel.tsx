"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "#/components/ui/carousel";

import {
  GUILD_FAMILY_PHOTO_AUTOPLAY_MS,
  guildFamilySlideWidth,
  guildFamilySlides,
} from "#/constants/guild-about";

function isGuildFamilyVideo(src: string) {
  return src.endsWith(".mp4");
}

const familyVideoSound = { blocked: false };

function playFamilyVideo(video: HTMLVideoElement) {
  video.currentTime = 0;
  video.muted = false;

  const pending = video.play();

  if (!pending) return;

  void pending.catch(() => {
    familyVideoSound.blocked = true;
    video.muted = true;
    void video.play().catch(() => undefined);
  });
}

function unlockFamilyVideoSound() {
  if (!familyVideoSound.blocked) return;

  document.querySelectorAll("[data-slot=carousel] video").forEach((node) => {
    if (!(node instanceof HTMLVideoElement)) return;

    node.muted = false;
  });
  familyVideoSound.blocked = false;
}

function scheduleFamilyPhotoAutoplay(
  api: CarouselApi,
  timer: { id: number },
) {
  window.clearTimeout(timer.id);

  if (!api) return;

  const slide = api.slideNodes()[api.selectedScrollSnap()];

  if (!slide || slide.querySelector("video")) return;

  timer.id = window.setTimeout(() => {
    api.scrollNext();
  }, GUILD_FAMILY_PHOTO_AUTOPLAY_MS);
}

function syncFamilyVideos(api: CarouselApi) {
  if (!api) return;

  const selected = api.selectedScrollSnap();

  api.slideNodes().forEach((node, index) => {
    const video = node.querySelector("video");

    if (!(video instanceof HTMLVideoElement)) return;

    if (index !== selected) {
      video.pause();
      return;
    }

    if (!video.paused && !video.ended) return;

    playFamilyVideo(video);
  });
}

const GuildFamilyCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;

    const photoAutoplay = { id: 0 };

    function handleSelect() {
      syncFamilyVideos(api);
      scheduleFamilyPhotoAutoplay(api, photoAutoplay);
    }

    function handleEnded(event: Event) {
      const video = event.currentTarget;

      if (!(video instanceof HTMLVideoElement)) return;

      const selectedNode = api.slideNodes()[api.selectedScrollSnap()];

      if (!selectedNode?.contains(video)) return;

      api.scrollNext();
    }

    const videos = api.slideNodes().flatMap((node) => {
      const video = node.querySelector("video");

      return video instanceof HTMLVideoElement ? [video] : [];
    });

    handleSelect();
    api.on("select", handleSelect);
    videos.forEach((video) => {
      video.addEventListener("ended", handleEnded);
    });
    document.addEventListener("pointerdown", unlockFamilyVideoSound);

    return () => {
      window.clearTimeout(photoAutoplay.id);
      api.off("select", handleSelect);
      videos.forEach((video) => {
        video.removeEventListener("ended", handleEnded);
      });
      document.removeEventListener("pointerdown", unlockFamilyVideoSound);
    };
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      opts={{ align: "center", loop: true, containScroll: false }}
      aria-label="公會合照"
      className="w-full"
    >
      <CarouselContent>
        {guildFamilySlides().map((photo) => (
          <CarouselItem
            key={photo.key}
            className="basis-auto"
            style={{ flex: `0 0 ${guildFamilySlideWidth(photo)}%` }}
          >
            {isGuildFamilyVideo(photo.src) ? (
              <video
                controls
                playsInline
                preload="auto"
                aria-label={photo.alt}
                width={photo.width}
                height={photo.height}
                className="h-auto w-full"
                style={{ width: "100%", height: "auto" }}
              >
                <source src={photo.src} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="80vw"
                className="h-auto w-full"
                style={{ width: "100%", height: "auto" }}
              />
            )}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" aria-label="上一張合照" />
      <CarouselNext className="right-2" aria-label="下一張合照" />
    </Carousel>
  );
};

export { GuildFamilyCarousel };
