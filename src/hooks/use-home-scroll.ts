import { useEffect, type RefObject } from "react";

function clamp(value: number) {
  return Math.max(0, Math.min(1, value));
}

function useHomeScroll(rootRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = rootRef.current;

    if (!root) return;

    const query = <T extends HTMLElement>(selector: string) => {
      return root.querySelector<T>(selector)!;
    };
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hero = query("#heroImg");
    const heroT = query("#heroT");
    const nightImg = query("#nImg");
    const shipImg = query("#shipImg");
    const bar = query("#bar");
    const nightStage = query("#nightS");
    const chars = [...root.querySelectorAll<HTMLElement>("#mani span")];
    const progress = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();

      return clamp(-rect.top / (rect.height - innerHeight));
    };
    let lastCount = -1;
    let queued = false;

    function tick() {
      const y = scrollY;
      const vh = innerHeight;
      const max = document.documentElement.scrollHeight - vh;
      const heroScale = 1 + Math.min(y / vh, 1) * 0.12;
      const shipShift = Math.max(0, shipImg.offsetWidth - innerWidth);

      bar.style.transform = `scaleX(${clamp(y / max)})`;

      if (reduce) return;

      hero.style.transform = `translateY(${y * 0.18}px) scale(${heroScale})`;
      heroT.style.transform = `translateY(${-y * 0.25}px)`;
      heroT.style.opacity = String(1 - clamp(y / (vh * 0.8)));

      const count = Math.floor(chars.length * clamp(progress(query("#about")) * 1.5));

      if (count !== lastCount) {
        chars.forEach((char, index) => char.classList.toggle("on", index < count));
        lastCount = count;
      }

      shipImg.style.transform = `translateX(${-progress(query("#ship")) * shipShift}px)`;
      nightImg.style.transform = `scale(${1.12 - progress(query("#night")) * 0.12})`;
    }

    function onScroll() {
      if (queued) return;

      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        tick();
      });
    }

    function onMove(event: PointerEvent) {
      const rect = nightStage.getBoundingClientRect();

      nightStage.style.setProperty("--x", `${event.clientX - rect.left}px`);
      nightStage.style.setProperty("--y", `${event.clientY - rect.top}px`);
    }

    function onPlay(event: Event) {
      root.querySelectorAll("video").forEach((video) => {
        if (video !== event.target) video.pause();
      });
    }

    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", tick);
    nightStage.addEventListener("pointermove", onMove);
    root.addEventListener("play", onPlay, true);
    tick();

    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", tick);
      nightStage.removeEventListener("pointermove", onMove);
      root.removeEventListener("play", onPlay, true);
    };
  }, [rootRef]);
}

export { useHomeScroll };
