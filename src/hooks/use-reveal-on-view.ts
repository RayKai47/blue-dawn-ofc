import { useEffect, type RefObject } from "react";

const STAGGER_MS = 120;
const ENTER_RATIO = 0.2;

function useRevealOnView(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;

    if (!root) return;

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    // 每次都重新查詢，才抓得到之後才長出來的元素（例如圖片牆欄數改變、新增內容）
    const list = () => [...root.querySelectorAll<HTMLElement>("[data-reveal]")];
    let visible = reduce;

    function show() {
      list().forEach((item, index) => {
        if (item.classList.contains("is-in")) return;

        if (!reduce) {
          item.style.setProperty("--reveal-delay", `${index * STAGGER_MS}ms`);
        }

        item.classList.add("is-in");
      });
    }

    function hide() {
      list().forEach((item) => {
        item.style.removeProperty("--reveal-delay");
        item.classList.remove("is-in");
      });
    }

    // 區塊已經在畫面上時，新長出來的元素直接浮出，不會停在隱藏狀態
    const mutation = new MutationObserver(() => {
      if (visible) show();
    });

    mutation.observe(root, { childList: true, subtree: true });

    if (reduce) {
      show();

      return () => mutation.disconnect();
    }

    root.classList.add("reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];

        if (entry.intersectionRatio >= ENTER_RATIO) {
          visible = true;
          show();

          return;
        }

        if (entry.intersectionRatio === 0) {
          visible = false;
          hide();
        }
      },
      { threshold: [0, ENTER_RATIO] },
    );

    observer.observe(root);

    return () => {
      observer.disconnect();
      mutation.disconnect();
    };
  }, [rootRef]);
}

export { useRevealOnView };
