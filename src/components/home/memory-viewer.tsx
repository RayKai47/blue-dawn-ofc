"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";

import Image from "next/image";

import { ChevronLeft, ChevronRight } from "lucide-react";

import type { MemoryPhoto } from "#/types/memory";

type Direction = 1 | -1;

type View = {
  index: number;
  // 切換期間，上一張會留在下面，等新的一張擦開完才移除
  leaving: number | null;
  dir: Direction;
};

type MemoryViewerProps = {
  photos: MemoryPhoto[];
};

const SWIPE_PX = 48;

const pad = (n: number) => String(n).padStart(2, "0");

const MemoryViewer = ({ photos }: MemoryViewerProps) => {
  const [view, setView] = useState<View>({ index: 0, leaving: null, dir: 1 });
  const swipeStart = useRef<number | null>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const total = photos.length;

  function go(to: number, dir: Direction) {
    setView((current) => {
      const index = (to + total) % total;

      if (index === current.index) return current;

      return { index, leaving: current.index, dir };
    });
  }

  function step(dir: Direction) {
    go(view.index + dir, dir);
  }

  function handleKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") step(1);
    else if (event.key === "ArrowLeft") step(-1);
    else return;

    event.preventDefault();
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    if (swipeStart.current === null) return;

    const delta = event.clientX - swipeStart.current;

    swipeStart.current = null;

    if (Math.abs(delta) > SWIPE_PX) step(delta < 0 ? 1 : -1);
  }

  // 讓目前這張的縮圖保持在縮圖列中央
  useEffect(() => {
    const box = thumbsRef.current;
    const thumb = box?.children[view.index];

    if (!box || !(thumb instanceof HTMLElement)) return;

    box.scrollTo({
      left: thumb.offsetLeft - (box.clientWidth - thumb.offsetWidth) / 2,
    });
  }, [view.index]);

  const current = photos[view.index];
  const leaving = view.leaving === null ? null : photos[view.leaving];

  if (!current) return null;

  return (
    <div className="mem-viewer">
      <div
        className="mem-stage"
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label="照片檢視"
        onKeyDown={handleKey}
        onPointerDown={(event) => {
          swipeStart.current = event.clientX;
        }}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          swipeStart.current = null;
        }}
      >
        {leaving && (
          <figure key={leaving.image.src} className="mem-slide is-old" aria-hidden="true">
            <Image
              fill
              sizes="(min-width: 900px) 62vw, 100vw"
              src={leaving.image.src}
              alt=""
              className="mem-img"
              draggable={false}
            />
            <figcaption>{leaving.caption}</figcaption>
          </figure>
        )}

        <figure
          key={current.image.src}
          className="mem-slide is-new"
          data-dir={view.dir}
          onAnimationEnd={(event) => {
            if (event.target !== event.currentTarget) return;

            setView((v) => (v.leaving === null ? v : { ...v, leaving: null }));
          }}
        >
          <Image
            fill
            sizes="(min-width: 900px) 62vw, 100vw"
            src={current.image.src}
            alt={current.image.alt}
            className="mem-img"
            draggable={false}
            priority={view.index === 0}
          />
          <figcaption>{current.caption}</figcaption>
        </figure>

        {total > 1 && (
          <>
            <div className="mem-count" aria-live="polite">
              <b>{pad(view.index + 1)}</b> / {pad(total)}
            </div>
            <button
              type="button"
              className="mem-arrow is-prev"
              aria-label="上一張"
              onClick={() => step(-1)}
            >
              <ChevronLeft aria-hidden="true" />
            </button>
            <button
              type="button"
              className="mem-arrow is-next"
              aria-label="下一張"
              onClick={() => step(1)}
            >
              <ChevronRight aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      {total > 1 && (
        <div className="mem-thumbs" ref={thumbsRef}>
          {photos.map((photo, index) => (
            <button
              key={photo.image.src}
              type="button"
              className="mem-thumb"
              aria-label={`第 ${index + 1} 張：${photo.caption}`}
              aria-current={index === view.index}
              onClick={() => go(index, index > view.index ? 1 : -1)}
            >
              <Image fill sizes="116px" src={photo.image.src} alt="" draggable={false} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export { MemoryViewer };
