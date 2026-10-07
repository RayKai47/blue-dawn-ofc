export const RECRUIT_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSd5mkXmzYqVet-opXPwhWZqIUPziVeL4tp8IimqfT9uyL3KPg/viewform";

export const CONTACT_NOTE = "不論哪一種方式，我們都會在方便的時間，盡快與您聯繫。";

export const MANIFESTO = "想一起飛，這裡有伴；人在遠方，天也還在。";

export type HomeImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export const images: Record<string, HomeImage> = {
  hero: {
    src: "/index/banner/banner-1.png",
    width: 2048,
    height: 768,
    alt: "蔚藍天際：雲海上的天空與飛行船",
  },
  ship: {
    src: "/index/banner/banner-3.png",
    width: 2048,
    height: 768,
    alt: "成員們在飛行船上眺望雲海與浮空島",
  },
  poster: {
    src: "/index/banner/banner-2.jpg",
    width: 1983,
    height: 793,
    alt: "蔚藍天際公會招生海報",
  },
  family1: {
    src: "/parnets/family-1.png",
    width: 2560,
    height: 1440,
    alt: "海邊合照，大家捧著珍珠奶茶",
  },
  family2: {
    src: "/parnets/family-2.png",
    width: 2560,
    height: 1351,
    alt: "海邊合照，大家拿著珍珠奶茶",
  },
  night1: {
    src: "/parnets/night market.png",
    width: 2560,
    height: 1440,
    alt: "夜市燈籠下的公會成員",
  },
  night2: {
    src: "/parnets/night market-2.png",
    width: 2560,
    height: 1440,
    alt: "夜市攤位前擠滿成員與寵物",
  },
  night3: {
    src: "/parnets/night market-3.jpg",
    width: 2193,
    height: 1351,
    alt: "每位成員彼此傳遞的溫暖，連成一片蔚藍天際",
  },
  drink4: {
    src: "/parnets/4 drinks.png",
    width: 2560,
    height: 1440,
    alt: "四杯飲料，一起度過通關的路途",
  },
  dungeon: {
    src: "/parnets/dungeon.png",
    width: 2560,
    height: 1440,
    alt: "通關的之餘，也是要一起慶祝、分享成就與喜悅",
  },
  beCool: {
    src: "/parnets/be cool.png",
    width: 2560,
    height: 1440,
    alt: "四人眼鏡戴起來，一起裝酷",
  },
  onBoard: {
    src: "/parnets/on board.png",
    width: 2560,
    height: 1440,
    alt: "四個人在船上的打鬧嘻笑",
  },
  headshots: {
    src: "/parnets/4 headshots.png",
    width: 1068,
    height: 1440,
    alt: "四格大頭貼，成員們在拍貼機裡擺出各種姿勢",
  },
  fireworks: {
    src: "/parnets/fireworks.png",
    width: 2560,
    height: 1341,
    alt: "成員們坐在海邊，一起仰望夜空中綻放的煙火",
  },
  funnyMoments: {
    src: "/parnets/funny moments.png",
    width: 1856,
    height: 1057,
    alt: "副本裡成員頭頂鮮魚趴在地上，旁邊聊天框寫著哈哈哈超好笑",
  },
  musicTime: {
    src: "/parnets/music time.png",
    width: 2560,
    height: 1369,
    alt: "草地上成員彈奏樂器，夥伴們在一旁靜靜聆聽",
  },
  logo: {
    src: "/word-logo.png",
    width: 1024,
    height: 512,
    alt: "蔚藍天際 Blue Dawn",
  },
};

export const gallery = [
  { image: images.night1, caption: "夜市燈籠亮起來，大家排排站" },
  { image: images.night2, caption: "擠一點才熱鬧，寵物也來了" },
  { image: images.drink4, caption: "闖關的路途上，一起準備、絕不孤單" },
  { image: images.dungeon, caption: "通關的之餘，也是要一起慶祝、分享成就與喜悅" },
  { image: images.beCool, caption: "日常一起裝酷，也是必不可少的環節" },
  { image: images.onBoard, caption: "可以哭鬧，也可以嘻笑，不論如何，但我們終聚一起" },
  { image: images.musicTime, caption: "只要有人彈起琴，隨時隨地都是音樂會" },
  { image: images.funnyMoments, caption: "頭頂鮮魚的當下，聊天框只剩哈哈哈" },
  { image: images.headshots, caption: "四格大頭貼，每個人擺出自己愛好的姿勢" },
  { image: images.fireworks, caption: "煙火升空的那一刻，身邊有你們就夠了" },
  { image: images.family1, caption: "晴朗的海邊，團聚一起慶祝一杯奶茶" },
  { image: images.family2, caption: "天空很大，位置夠每個人" },
];

export type HomeVideo = {
  src: string;
  caption: string;
};

export const videos: HomeVideo[] = [
  { src: "/parnets/birthday-party.mp4", caption: "成員的邪教式生日派對" },
  { src: "/parnets/mov-1.mp4", caption: "與成員的團聚時刻" },
  { src: "/parnets/comedy.mp4", caption: "無釐頭搞笑時刻" },
];
