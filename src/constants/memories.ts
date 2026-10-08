import { images } from "#/constants/home";

import type { MemoryChapter } from "#/types/memory";

// 回憶區的唯一資料來源（圖片本身仍登記在 constants/home.ts 的 images）：
// - 新增照片：圖放進 public/，在 home.ts 的 images 登記，再到對應章節的 photos 加一筆
// - 新增主題：在 MEMORY_CHAPTERS 加一個章節（photos 是空陣列時，這個主題不會顯示）
export const MEMORY_CHAPTERS: MemoryChapter[] = [
  {
    id: "events",
    title: "特別活動",
    en: "EVENTS",
    intro: [
      "特別的日子，值得好好留下來。",
      "大家擠進同一個畫面的那一刻，就是紀念。",
    ],
    photos: [
      { image: images.night2, caption: "擠一點才熱鬧，寵物也來了" },
      { image: images.night1, caption: "夜市燈籠亮起來，大家排排站" },
      { image: images.fireworks, caption: "煙火升空的那一刻，身邊有你們就夠了" },
    ],
  },
  {
    id: "raids",
    title: "副本通關",
    en: "RAIDS",
    intro: [
      "有人扛、有人補、有人在後面喊加油。",
      "一起走到最後，才叫通關。",
    ],
    photos: [
      { image: images.drink4, caption: "闖關的路途上，一起準備、絕不孤單" },
      { image: images.beCool, caption: "日常一起裝酷，也是必不可少的環節" },
      { image: images.onBoard, caption: "可以哭鬧，也可以嘻笑，不論如何，但我們終聚一起" },
      { image: images.dungeon, caption: "通關的之餘，也是要一起慶祝、分享成就與喜悅" },
    ],
  },
  {
    id: "hangout",
    title: "休閒日常",
    en: "HANGOUT",
    intro: [
      "營火旁、海邊、草地上。",
      "不趕路，慢慢聊，天都還在。",
    ],
    photos: [
      { image: images.musicTime, caption: "只要有人彈起琴，隨時隨地都是音樂會" },
      { image: images.headshots, caption: "四格大頭貼，每個人擺出自己愛好的姿勢" },
      { image: images.funnyMoments, caption: "頭頂鮮魚的當下，聊天框只剩哈哈哈" },
      { image: images.family1, caption: "晴朗的海邊，團聚一起慶祝一杯奶茶" },
      { image: images.family2, caption: "天空很大，位置夠每個人" },
    ],
  },
];

// 「回憶牆」（三欄自動捲動）目前先隱藏；要重新開啟，改成 true 即可
export const SHOW_MEMORY_WALL = false;

// 「回憶牆」分頁的標題與開場文字
export const MEMORY_WALL = {
  id: "all",
  title: "回憶牆",
  en: "WALL",
  intro: ["所有照片一起慢慢流動。", "停在哪一張，都是一段故事。"],
} satisfies Omit<MemoryChapter, "photos">;
