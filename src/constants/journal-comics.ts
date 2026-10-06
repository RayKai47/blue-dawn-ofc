export type JournalComic = {
  id: string;
  src: string;
  alt: string;
  title: string;
  width: number;
  height: number;
};

/** 四格與公會圖，檔案在 `public/index/blog`。 */
export const JOURNAL_COMICS: JournalComic[] = [
  {
    id: "ordinary-morning",
    src: "/index/blog/comic-moonShower.jpg",
    title: "一個看似平凡的早晨，其實是每天跟卡鐘爭鋒相對的阿母(消跡的夜沐)",
    alt: "四格漫畫：一個看似平凡的早晨，塞車後仍在打卡前抵達",
    width: 1254,
    height: 1254,
  },
  {
    id: "six-characters",
    src: "/index/blog/comic-fish.jpg",
    title: "關於練了六隻角色的副會長 吱魚",
    alt: "四格漫畫：關於練了六隻角色的副會長，魚魚還要打很多場深淵",
    width: 1254,
    height: 1254,
  },
  {
    id: "muscle-kawaii",
    src: "/index/blog/comic-kawaii.png",
    title: "狂風的副會長 肌肉卡哇伊",
    alt: "四格漫畫：狂風的大劍戰士肌肉卡哇伊，可愛也是一種力量",
    width: 1230,
    height: 1278,
  },
  {
    id: "bubble-girl",
    src: "/index/blog/comic-catcat.png",
    title: "呆萌可愛的公會吉祥物 美少女副會長 貓餅多多",
    alt: "呆萌的粉紅頭髮，可愛又呆萌的貓餅多多",
    width: 775,
    height: 1680,
  },
  {
    id: "frozen-witch",
    src: "/index/blog/comic-frozenMoon.png",
    title: "鬥氣值爆滿的凍月，準備前往討伐！",
    alt: "戰意滿滿的凍月，結果撲了一個空！",
    width: 775,
    height: 1680,
  },
];
