import { Carousel } from "#/components/shared/carousel";
import { HOME_BANNERS } from "#/constants/home-banners";

const HomeHero = () => {
  return (
    <section aria-label="首頁橫幅" className="w-full">
      <Carousel
        slides={HOME_BANNERS}
        intervalMs={5000}
        aspectClassName="aspect-[16/10] sm:aspect-[21/9]"
      />
    </section>
  );
};

export { HomeHero };
