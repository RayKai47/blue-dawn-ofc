import type { ReactNode } from "react";

import { cn } from "#/lib/utils";

type HomeContentShellProps = {
  children: ReactNode;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  className?: string;
};

const SideDecoration = ({ side }: { side: "left" | "right" }) => {
  return (
    <div
      aria-hidden
      className={cn(
        "h-full min-h-48 w-full rounded-sm",
        "bg-linear-to-b from-dawn-sky/20 via-dawn-gold/10 to-transparent",
        "border border-dawn-sky/15",
        side === "left" ? "origin-top-left" : "origin-top-right",
      )}
    />
  );
};

const HomeContentShell = ({
  children,
  leftSlot,
  rightSlot,
  className,
}: HomeContentShellProps) => {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14",
        "grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,9rem)_minmax(0,1fr)_minmax(0,9rem)] lg:gap-10",
        className,
      )}
    >
      <aside className="hidden lg:block" aria-hidden={!leftSlot}>
        {leftSlot ?? <SideDecoration side="left" />}
      </aside>

      <div className="min-w-0 flex flex-col gap-12">{children}</div>

      <aside className="hidden lg:block" aria-hidden={!rightSlot}>
        {rightSlot ?? <SideDecoration side="right" />}
      </aside>
    </div>
  );
};

export { HomeContentShell };
