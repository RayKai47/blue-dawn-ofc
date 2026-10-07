import Image from "next/image";

import { images } from "#/constants/home";

const HomeNav = () => {
  const logo = images.logo;

  return (
    <nav>
      <a href="#top" aria-label="蔚藍天際 Blue Dawn">
        <Image
          className="lg"
          src={logo.src}
          width={logo.width}
          height={logo.height}
          alt={logo.alt}
        />
      </a>
      <div>
        <a href="#about">公會</a>
        <a href="#memory">回憶</a>
        <a href="#join">加入</a>
      </div>
      <i id="bar" />
    </nav>
  );
};

export { HomeNav };
