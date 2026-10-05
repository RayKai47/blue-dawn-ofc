import type { ReactNode } from "react";

import { cn } from "#/lib/utils";

type SiteShellProps = {
  children: ReactNode;
  className?: string;
};

/** 左右側景 + 中欄內容區。用於 banner 以下的 inset 區塊，勿包住全寬 hero。 */
const SiteShell = ({ children, className }: SiteShellProps) => {
  return (
    <div className={cn("site-shell flex w-full flex-1", className)}>
      <aside aria-hidden className="site-side-left hidden min-w-0 flex-1 lg:block" />
      <div className="site-content flex min-w-0 w-full max-w-5xl flex-col">
        {children}
      </div>
      <aside
        aria-hidden
        className="site-side-right hidden min-w-0 flex-1 lg:block"
      />
    </div>
  );
};

export { SiteShell };
