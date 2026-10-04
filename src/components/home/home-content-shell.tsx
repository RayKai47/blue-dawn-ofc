import type { ReactNode } from "react";

import { cn } from "#/lib/utils";

type HomeContentShellProps = {
  children: ReactNode;
  className?: string;
};

const HomeContentShell = ({ children, className }: HomeContentShellProps) => {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14",
        "flex min-w-0 flex-col gap-12",
        className,
      )}
    >
      {children}
    </div>
  );
};

export { HomeContentShell };
