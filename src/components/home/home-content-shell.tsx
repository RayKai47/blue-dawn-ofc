import type { ReactNode } from "react";

import { SiteShell } from "#/components/shared/site-shell";
import { cn } from "#/lib/utils";

type HomeContentShellProps = {
  children: ReactNode;
  className?: string;
};

const HomeContentShell = ({ children, className }: HomeContentShellProps) => {
  return (
    <SiteShell>
      <div
        className={cn(
          "w-full px-4 py-10 sm:px-6 sm:py-14",
          "flex min-w-0 flex-col gap-12",
          className,
        )}
      >
        {children}
      </div>
    </SiteShell>
  );
};

export { HomeContentShell };
