import Link from "next/link";

import { NAV_ITEMS } from "#/constants/site-nav";

const FOOTER_TAGLINE =
  "這裡只有無邊無際的天，沒有烏雲密佈的灰。想一起飛，這裡有伴；人在遠方，天也還在。";

const SiteFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-night-sky/5">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10 sm:px-6">
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {FOOTER_TAGLINE}
        </p>
        <nav
          className="flex flex-wrap gap-x-4 gap-y-2"
          aria-label="頁尾導覽"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-dawn-gold"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <p className="text-xs text-muted-foreground">
          © {year} 蔚藍天際 Blue Dawn · 《瑪奇 Mobile》公會網站
        </p>
      </div>
    </footer>
  );
};

export { SiteFooter };
