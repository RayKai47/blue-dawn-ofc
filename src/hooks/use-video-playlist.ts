import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

import { bgm } from "#/lib/bgm";

import type { CarouselApi } from "#/components/ui/carousel";

// 捲到影片區（中間那一段畫面）時，從目前這支開始自動播，接力播到最後一支，
// 播完就停，不會回到第一支重播。離開畫面會暫停，回來時從原本的位置接著播。
// 有聲播放的期間，背景音樂會淡出；影片停下來後再淡入。
const RESTORE_DELAY_MS = 900;
const OWNER = "videos";

function getClips(api: NonNullable<CarouselApi>) {
  return api.slideNodes().flatMap((node) => {
    const video = node.querySelector("video");

    return video instanceof HTMLVideoElement ? [video] : [];
  });
}

const useVideoPlaylist = (
  sectionRef: RefObject<HTMLElement | null>,
  api: CarouselApi,
  reduceMotion: boolean,
) => {
  const [soundBlocked, setSoundBlocked] = useState(false);
  const inViewRef = useRef(false);
  const finishedRef = useRef(false);
  const mutedRef = useRef<boolean | null>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!api || !section) return;

    const carousel = api;
    const clips = getClips(carousel);
    let restoreTimer: number | undefined;

    function current() {
      return clips[carousel.selectedScrollSnap()];
    }

    // 影片有聲音在播時音樂淡出；中間換片的空檔不讓音樂跳回來，所以延後一下才淡入
    function refresh() {
      const audible = clips.some((v) => !v.paused && !v.ended && !v.muted && v.volume > 0);

      setSoundBlocked(clips.some((v) => !v.paused && !v.ended && v.muted));
      window.clearTimeout(restoreTimer);

      if (audible) bgm.duck(OWNER, true);
      else restoreTimer = window.setTimeout(() => bgm.duck(OWNER, false), RESTORE_DELAY_MS);
    }

    function playSelected() {
      const video = current();

      if (!video || reduceMotion || !inViewRef.current) return;

      // 訪客互動過才嘗試有聲播放；沒有的話一開始就靜音，並提示可以開聲音
      if (mutedRef.current === null) mutedRef.current = !navigator.userActivation?.hasBeenActive;

      if (video.ended) video.currentTime = 0;

      video.muted = mutedRef.current;
      video.play().catch(() => {
        video.muted = true;
        mutedRef.current = true;

        return video.play().catch(() => undefined);
      });
    }

    function handleSelect() {
      clips.forEach((video, index) => {
        if (index !== carousel.selectedScrollSnap()) video.pause();
      });
      playSelected();
    }

    function handleEnded(event: Event) {
      if (event.currentTarget !== current()) return;

      if (carousel.canScrollNext()) carousel.scrollNext();
      else finishedRef.current = true;
    }

    // 訪客自己在播放器上調整靜音，後面接力的影片就沿用這個選擇
    function handleVolume(event: Event) {
      if (event.currentTarget === current()) mutedRef.current = clips[carousel.selectedScrollSnap()].muted;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries[entries.length - 1].isIntersecting;

        if (visible === inViewRef.current) return;

        inViewRef.current = visible;

        if (!visible) current()?.pause();
        else if (!finishedRef.current) playSelected();
      },
      { rootMargin: "-25% 0px -25% 0px" },
    );

    observer.observe(section);
    carousel.on("select", handleSelect);
    carousel.on("reInit", handleSelect);
    clips.forEach((video) => {
      video.addEventListener("ended", handleEnded);
      video.addEventListener("volumechange", handleVolume);
      ["play", "playing", "pause", "ended", "volumechange"].forEach((name) => {
        video.addEventListener(name, refresh);
      });
    });

    return () => {
      observer.disconnect();
      carousel.off("select", handleSelect);
      carousel.off("reInit", handleSelect);
      window.clearTimeout(restoreTimer);
      bgm.duck(OWNER, false);
      clips.forEach((video) => {
        video.pause();
        video.removeEventListener("ended", handleEnded);
        video.removeEventListener("volumechange", handleVolume);
        ["play", "playing", "pause", "ended", "volumechange"].forEach((name) => {
          video.removeEventListener(name, refresh);
        });
      });
      inViewRef.current = false;
    };
  }, [api, reduceMotion, sectionRef]);

  const enableSound = useCallback(() => {
    if (!api) return;

    const video = getClips(api)[api.selectedScrollSnap()];

    if (!video) return;

    mutedRef.current = false;
    video.muted = false;
    void video.play().catch(() => undefined);
  }, [api]);

  return { soundBlocked, enableSound };
};

export { useVideoPlaylist };
