import Image from "next/image";

import { images } from "#/constants/home";

const HomeShip = () => {
  return (
    <section className="pin ship" id="ship">
      <div className="stick">
        <Image
          id="shipImg"
          sizes="300vh"
          src={images.ship.src}
          width={images.ship.width}
          height={images.ship.height}
          alt={images.ship.alt}
        />
        <div className="txt">
          <h2>準備出發</h2>
          <p>來去隨風，快慢隨心；停下的人，天際裡都有位置。</p>
        </div>
      </div>
    </section>
  );
};

export { HomeShip };
