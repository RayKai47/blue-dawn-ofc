import Link from "next/link";

import { cn } from "#/lib/utils";

type JournalPreviewItem = {
  id: string;
  title: string;
  excerpt: string;
  href: string;
};

const JOURNAL_PREVIEW_ITEMS: JournalPreviewItem[] = [
  {
    id: "sky-gathering",
    title: "天際集會",
    excerpt: "成員在廣場集合，分享本週的冒險路線與回憶。",
    href: "/journal",
  },
  {
    id: "dawn-flight",
    title: "黎明飛行",
    excerpt: "清晨出發，沿著雲層練習編隊與默契。",
    href: "/journal",
  },
  {
    id: "erinn-notes",
    title: "愛爾琳札記",
    excerpt: "把路上遇見的風景與夥伴故事寫進冒險日誌。",
    href: "/journal",
  },
];

const JournalPreview = () => {
  return (
    <section aria-labelledby="journal-preview-heading" className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <h2
          id="journal-preview-heading"
          className="text-2xl text-foreground font-semibold tracking-tight"
        >
          冒險日誌
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          先來一點最近的天空記事——完整內容請到日誌頁閱讀。
        </p>
      </div>

      <ul className="flex flex-col gap-4">
        {JOURNAL_PREVIEW_ITEMS.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              className={cn(
                "py-3 border-b border-border/80 block",
                "transition-colors hover:border-dawn-sky/40",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dawn-sky/40",
              )}
            >
              <h3 className="text-base text-dawn-sky font-medium">{item.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                {item.excerpt}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export { JournalPreview };
