export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "首頁", href: "/", description: "回到網站首頁" },
  {
    label: "公會介紹",
    href: "/about",
    description: "認識蔚藍天際的規矩與氛圍",
  },
  {
    label: "招募",
    href: "/recruit",
    description: "加入公會、查看缺額與申請方式",
  },
  {
    label: "日誌",
    href: "/journal",
    description: "冒險日誌、相簿與愛爾琳筆記",
  },
];
