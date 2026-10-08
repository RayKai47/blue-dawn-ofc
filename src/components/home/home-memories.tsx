"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";

import { cn } from "#/lib/utils";

import { MEMORY_WALL, SHOW_MEMORY_WALL } from "#/constants/memories";

import { HomeGallery } from "#/components/home/home-gallery";
import { MemoryViewer } from "#/components/home/memory-viewer";

import type { MemoryChapter } from "#/types/memory";

import "./home-memories.css";

type HomeMemoriesProps = {
  chapters: MemoryChapter[];
};

const HASH_PREFIX = "#memory-";

const pad = (n: number) => String(n).padStart(2, "0");

const HomeMemories = ({ chapters }: HomeMemoriesProps) => {
  const navRef = useRef<HTMLDivElement>(null);

  // 沒有照片的主題不顯示；「回憶牆」收集所有章節的照片
  const filled = useMemo(
    () => chapters.filter((chapter) => chapter.photos.length > 0),
    [chapters],
  );
  const allPhotos = useMemo(
    () => filled.flatMap((chapter) => chapter.photos),
    [filled],
  );
  const tabs = useMemo(
    () => (SHOW_MEMORY_WALL && allPhotos.length > 1 ? [...filled, { ...MEMORY_WALL, photos: allPhotos }] : filled),
    [filled, allPhotos],
  );
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? "");

  const activeIndex = Math.max(0, tabs.findIndex((tab) => tab.id === activeId));
  const active = tabs[activeIndex];

  function select(id: string) {
    setActiveId(id);
    history.replaceState(null, "", `${HASH_PREFIX}${id}`);
  }

  // 分享連結（例如 #memory-raids）打開時，直接顯示對應的主題
  useEffect(() => {
    function readHash() {
      if (!location.hash.startsWith(HASH_PREFIX)) return;

      const id = location.hash.slice(HASH_PREFIX.length);

      if (tabs.some((tab) => tab.id === id)) setActiveId(id);
    }

    readHash();
    addEventListener("hashchange", readHash);

    return () => removeEventListener("hashchange", readHash);
  }, [tabs]);

  // 窄螢幕時目錄是橫向捲動，選到的項目要自動捲到中間
  useEffect(() => {
    const box = navRef.current;
    const tab = active ? document.getElementById(`memory-${active.id}`) : null;

    if (!box || !tab) return;

    box.scrollTo({ left: tab.offsetLeft - (box.clientWidth - tab.offsetWidth) / 2 });
  }, [active]);

  function handleKey(event: KeyboardEvent<HTMLDivElement>) {
    const last = tabs.length - 1;
    const moves: Record<string, number> = {
      ArrowDown: (activeIndex + 1) % tabs.length,
      ArrowRight: (activeIndex + 1) % tabs.length,
      ArrowUp: (activeIndex - 1 + tabs.length) % tabs.length,
      ArrowLeft: (activeIndex - 1 + tabs.length) % tabs.length,
      Home: 0,
      End: last,
    };
    const next = moves[event.key];

    if (next === undefined) return;

    event.preventDefault();
    select(tabs[next].id);
    document.getElementById(`memory-${tabs[next].id}`)?.focus();
  }

  if (!active) return null;

  return (
    <section className="memories" id="memory" aria-label="回憶">
      <h2 className="mem-heading">被風吹過、被營火照過的瞬間</h2>

      <div
        className="mem-layout"
        style={{ "--i": activeIndex, "--n": tabs.length } as CSSProperties}
      >
        <div className="mem-nav" ref={navRef}>
          <div className="mem-tabs" role="tablist" aria-label="回憶主題" onKeyDown={handleKey}>
            <i className="mem-rail" aria-hidden="true" />
            <i className="mem-ind" aria-hidden="true" />
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                id={`memory-${tab.id}`}
                type="button"
                role="tab"
                className="mem-tab"
                aria-selected={tab.id === active.id}
                aria-controls="memory-panel"
                tabIndex={tab.id === active.id ? 0 : -1}
                onClick={() => select(tab.id)}
              >
                <span className="mem-no">{pad(index + 1)}</span>
                <span className="mem-name">
                  {tab.title}
                  <small>{tab.en}</small>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div
          className="mem-panel"
          id="memory-panel"
          role="tabpanel"
          aria-labelledby={`memory-${active.id}`}
        >
          {/* 所有主題的文字疊在同一格，高度取最高的那一個，切換時下方照片不會跟著位移 */}
          <div className="mem-stories">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={cn("mem-story", tab.id === active.id && "is-active")}
                aria-hidden={tab.id !== active.id}
              >
                <div>
                  <p className="mem-kicker mem-rise" style={{ "--k": 0 } as CSSProperties}>
                    {pad(tabs.indexOf(tab) + 1)} · {tab.en}
                  </p>
                  <h3 className="mem-title" aria-label={tab.title}>
                    {[...tab.title].map((char, index) => (
                      <span
                        key={index}
                        className="mem-ch"
                        aria-hidden="true"
                        style={{ "--k": index } as CSSProperties}
                      >
                        {char}
                      </span>
                    ))}
                  </h3>
                </div>
                <div className="mem-intro">
                  {tab.intro.map((line, index) => (
                    <p key={line} className="mem-rise" style={{ "--k": index + 4 } as CSSProperties}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {active.id === MEMORY_WALL.id ? (
            <HomeGallery key={active.id} photos={active.photos} />
          ) : (
            <MemoryViewer key={active.id} photos={active.photos} />
          )}
        </div>
      </div>
    </section>
  );
};

export { HomeMemories };
