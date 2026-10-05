import type { Metadata } from "next";
import Image from "next/image";

import { SiteShell } from "#/components/shared/site-shell";
import { Button } from "#/components/ui/button";

const GUILD_RECRUIT_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSd5mkXmzYqVet-opXPwhWZqIUPziVeL4tp8IimqfT9uyL3KPg/viewform";

export const metadata: Metadata = {
  title: "招募須知",
};

const RecruitPage = () => {
  return (
    <SiteShell>
      <article
        className="mx-auto px-4 py-12 sm:px-6 w-full max-w-5xl flex flex-col gap-8"
      >
        <header className="flex flex-col gap-2">
          <p className="text-dawn-gold text-sm font-medium tracking-[0.2em]">
            BLUE DAWN
          </p>
          <h1 className="text-dawn-sky text-3xl font-semibold tracking-tight sm:text-4xl">
            招募須知
          </h1>
          <p className="text-sakura-700 text-sm">蔚藍天際 · 迪恩伺服器</p>
        </header>

        <Image
          src="/index/banner/banner-2.jpg"
          alt="招募須知"
          width={1254}
          height={1254}
          className="w-full h-auto"
        />

        <section className="text-muted-foreground text-base leading-relaxed space-y-4">
          <p>
            加入我們，可以填寫以下表單，或是在遊戲中申請<span className="text-azure-600 font-semibold">公會</span>。
          </p>
          <p>
            我們會為您安排<span className="text-azure-600 font-semibold">1:1 對話</span>，確認彼此的願景相符，同時也會跟您介紹公會。
          </p>
          <Button asChild size="lg">
            <a
              href={GUILD_RECRUIT_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              填寫表單
            </a>
          </Button>
        </section>
      </article>
    </SiteShell>
  );
};

export default RecruitPage;
