import Link from "next/link";

import { Button } from "#/components/ui/button";

const GuildIntro = () => {
  return (
    <section aria-labelledby="guild-intro-heading" className="flex flex-col gap-5">
      <p className="text-sm font-medium tracking-[0.2em] text-dawn-gold uppercase">
        Blue Dawn
      </p>
      <h1
        id="guild-intro-heading"
        className="text-3xl text-dawn-sky font-semibold tracking-tight sm:text-4xl"
      >
        蔚藍天際
      </h1>
      <p className="max-w-xl text-base text-muted-foreground leading-relaxed sm:text-lg">
        在愛爾琳天空下相遇的《瑪奇 Mobile》公會——一起自由自在、無拘無束地翱翔。
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <Button asChild size="lg">
          <Link href="/about">認識公會</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/recruit">加入招募</Link>
        </Button>
      </div>
    </section>
  );
};

export { GuildIntro };
