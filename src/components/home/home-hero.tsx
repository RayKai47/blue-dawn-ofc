import Image from "next/image";

import { images } from "#/constants/home";

const HomeHero = () => {
  return (
    <header className="hero" id="top">
      <div className="hero-in">
        <Image
          id="heroImg"
          priority
          sizes="100vw"
          src={images.hero.src}
          width={images.hero.width}
          height={images.hero.height}
          alt={images.hero.alt}
        />
        <div className="hero-t" id="heroT">
          <p className="sub">
            這裡只有無邊無際的天，
            <br />
            沒有烏雲密佈的灰。
          </p>
        </div>
        <div className="hint">向下滑動</div>
      </div>
    </header>
  );
};

export { HomeHero };
