import Link from "next/link";

import { MobileNav } from "#/components/shared/mobile-nav";
import { SiteNavLinks } from "#/components/shared/site-nav-links";

const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex min-w-0 flex-col gap-0 leading-tight sm:flex-row sm:items-baseline sm:gap-2"
        >
          <span className="truncate text-base font-semibold tracking-tight text-dawn-sky">
            蔚藍天際
          </span>
          <span className="truncate text-xs font-medium text-muted-foreground sm:text-sm">
            Blue Dawn
          </span>
        </Link>

        <SiteNavLinks className="hidden md:flex" />
        <MobileNav className="md:hidden" />
      </div>
    </header>
  );
};

export { SiteHeader };
