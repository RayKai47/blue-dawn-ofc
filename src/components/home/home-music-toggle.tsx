"use client";

import { useEffect } from "react";

import { Music } from "lucide-react";

import { useBgm } from "#/hooks/use-bgm";

import { bgm } from "#/lib/bgm";

const HomeMusicToggle = () => {
  const on = useBgm();

  useEffect(() => bgm.armAutoStart(), []);

  return (
    <button
      type="button"
      className="bgm"
      data-bgm-toggle
      aria-pressed={on}
      aria-label={on ? "關閉背景音樂" : "開啟背景音樂"}
      onClick={bgm.toggle}
    >
      <span className="bgm-badge" aria-hidden="true">
        <Music className="bgm-note" />
        <span className="bgm-bars">
          <i />
          <i />
          <i />
        </span>
      </span>
      <span className="bgm-label">{on ? "播放中" : "點擊開啟音樂"}</span>
    </button>
  );
};

export { HomeMusicToggle };
