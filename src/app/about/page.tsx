import type { Metadata } from "next";

import { GuildAboutContent } from "#/components/about/guild-about-content";
import { SiteShell } from "#/components/shared/site-shell";

export const metadata: Metadata = {
  title: "公會介紹",
};

const AboutPage = () => {
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
            公會介紹
          </h1>
          <p className="text-sakura-700 text-sm">蔚藍天際 · 迪恩伺服器</p>
        </header>

        <GuildAboutContent />
      </article>
    </SiteShell>
  );
};

export default AboutPage;
