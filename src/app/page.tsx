import { GuildAboutContent } from "#/components/about/guild-about-content";
import { GuildIntro } from "#/components/home/guild-intro";
import { HomeContentShell } from "#/components/home/home-content-shell";
import { HomeHero } from "#/components/home/home-hero";

const HomePage = () => {
  return (
    <div className="w-full flex flex-1 flex-col">
      <HomeHero />
      <HomeContentShell>
        <GuildIntro />
        <GuildAboutContent />
      </HomeContentShell>
    </div>
  );
};

export default HomePage;
