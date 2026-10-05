import Image from "next/image";

import { JOURNAL_COMICS } from "#/constants/journal-comics";
import { SiteShell } from "#/components/shared/site-shell";

const JournalPage = () => {
  return (
    <SiteShell>
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 py-12 sm:px-6">
        <h1 className="text-foreground text-3xl font-semibold tracking-tight">
          冒險日誌
        </h1>
        <section aria-labelledby="life-snippets-heading" className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2
              id="life-snippets-heading"
              className="text-dawn-sky text-2xl font-semibold tracking-tight"
            >
              生活點滴
            </h2>
            <p className="max-w-xl text-sm text-muted-foreground leading-relaxed">
              公會裡的四格日常，一格一格把天際的小事留下來。
            </p>
          </div>
          <ul className="
            mx-auto w-full max-w-xl
            flex flex-col gap-10
            [&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-border
          ">
            {JOURNAL_COMICS.map((comic) => (
              <li key={comic.id} className="flex flex-col gap-3">
                <p className="text-sakura-700 text-base font-medium tracking-tight">{comic.title}</p>
                <Image
                  src={comic.src}
                  alt={comic.alt}
                  width={comic.width}
                  height={comic.height}
                  sizes="(min-width: 36rem) 36rem, 100vw"
                  className="h-auto w-full"
                />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </SiteShell>
  );
};

export default JournalPage;
