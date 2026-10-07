import Image from "next/image";

import { images } from "#/constants/home";

const HomeNight = () => {
  return (
    <section className="pin night" id="night">
      <div className="stick" id="nightS">
        <Image
          id="nImg"
          sizes="100vw"
          src={images.night3.src}
          width={images.night3.width}
          height={images.night3.height}
          alt={images.night3.alt}
        />
        <div className="dim" />
        <div className="txt">
          <h2>天黑了，燈還亮著</h2>
          <p>
            移動游標，用燈籠的光找找看大家在哪。
            喜的、怒的、累的、說不出口的，這片天空都接得住。
          </p>
        </div>
      </div>
    </section>
  );
};

export { HomeNight };
