"use client";

import { useState } from "react";

import { Menu } from "lucide-react";

import { cn } from "#/lib/utils";

import { SiteNavLinks } from "#/components/shared/site-nav-links";
import { Button } from "#/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "#/components/ui/sheet";

type MobileNavProps = {
  className?: string;
};

const MobileNav = ({ className }: MobileNavProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn(className)}
          aria-label="開啟選單"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[min(100%,20rem)]">
        <SheetHeader>
          <SheetTitle className="text-dawn-sky">蔚藍天際</SheetTitle>
          <SheetDescription>Blue Dawn · 主要頁面</SheetDescription>
        </SheetHeader>
        <SiteNavLinks
          orientation="vertical"
          className="px-2"
          linkClassName="w-full"
          onNavigate={() => setOpen(false)}
        />
      </SheetContent>
    </Sheet>
  );
};

export { MobileNav };
