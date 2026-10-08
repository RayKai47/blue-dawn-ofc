import type { HomeImage } from "#/constants/home";

export type MemoryPhoto = {
  image: HomeImage;
  caption: string;
};

export type MemoryChapter = {
  id: string;
  title: string;
  en: string;
  // 每個字串是一行，進場時會一行一行浮出
  intro: string[];
  photos: MemoryPhoto[];
};
