import Link from "next/link";
import Image from "next/image";

import { MobileNav } from "#/components/shared/mobile-nav";
import { SiteNavLinks } from "#/components/shared/site-nav-links";

const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/">
          <Image src="/word-logo.png" alt="蔚藍天際" width={100} height={100} />
        </Link>

        <SiteNavLinks className="hidden md:flex" />
        <MobileNav className="md:hidden" />
      </div>
    </header>
  );
};

export { SiteHeader };
