export type HomeBanner = {
  id: string;
  src: string;
  alt: string;
};

/** Banner files under `public/index/banner` — public URL: `/index/banner/<filename>`. */
export const HOME_BANNERS: HomeBanner[] = [
  {
    id: "banner-1",
    src: "/index/banner/banner-1.png",
    alt: "蔚藍天際 Blue Dawn — 蔚藍天際",
  },
  {
    id: "banner-2",
    src: "/index/banner/banner-2.jpg",
    alt: "蔚藍天際 Blue Dawn — 招生海報",
  },
  {
    id: "banner-3",
    src: "/index/banner/banner-3.png",
    alt: "蔚藍天際 Blue Dawn — 全員出發",
  },
];
