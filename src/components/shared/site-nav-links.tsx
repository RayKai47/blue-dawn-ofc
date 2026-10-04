"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "#/lib/utils";

import { NAV_ITEMS } from "#/constants/site-nav";

type SiteNavLinksProps = {
  className?: string;
  linkClassName?: string;
  orientation?: "horizontal" | "vertical";
  onNavigate?: () => void;
};

function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

const SiteNavLinks = ({
  className,
  linkClassName,
  orientation = "horizontal",
  onNavigate,
}: SiteNavLinksProps) => {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        orientation === "horizontal"
          ? "flex items-center gap-1"
          : "flex flex-col gap-1",
        className,
      )}
      aria-label="主要導覽"
    >
      {NAV_ITEMS.map((item) => {
        const active = isNavActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "rounded-md px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-dawn-sky/15 text-dawn-sky"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
              linkClassName,
            )}
            aria-current={active ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};

export { SiteNavLinks };
