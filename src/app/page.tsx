import { GuildIntro } from "#/components/home/guild-intro";
import { HomeContentShell } from "#/components/home/home-content-shell";
import { HomeHero } from "#/components/home/home-hero";
import { JournalPreview } from "#/components/home/journal-preview";

const HomePage = () => {
  return (
    <div className="w-full flex flex-1 flex-col">
      <HomeHero />
      <HomeContentShell>
        <GuildIntro />
        <JournalPreview />
      </HomeContentShell>
    </div>
  );
};

export default HomePage;
