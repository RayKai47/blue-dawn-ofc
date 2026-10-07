import { useEffect, type RefObject } from "react";

const STAGGER_MS = 120;
const ENTER_RATIO = 0.2;

function useRevealOnView(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;

    if (!root) return;

    const items = [...root.querySelectorAll<HTMLElement>("[data-reveal]")];
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      items.forEach((item) => item.classList.add("is-in"));

      return;
    }

    root.classList.add("reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];

        if (entry.intersectionRatio >= ENTER_RATIO) {
          items.forEach((item, index) => {
            item.style.setProperty("--reveal-delay", `${index * STAGGER_MS}ms`);
            item.classList.add("is-in");
          });

          return;
        }

        if (entry.intersectionRatio === 0) {
          items.forEach((item) => {
            item.style.removeProperty("--reveal-delay");
            item.classList.remove("is-in");
          });
        }
      },
      { threshold: [0, ENTER_RATIO] },
    );

    observer.observe(root);

    return () => observer.disconnect();
  }, [rootRef]);
}

export { useRevealOnView };
