import Link from "next/link";

import { GuildFamilyCarousel } from "#/components/about/guild-family-carousel";
import { Button } from "#/components/ui/button";

const GuildAboutContent = () => {
  return (
    <div className="flex flex-col gap-8">
      <blockquote
        className="pl-4 border-l-2 border-dawn-gold/60 flex flex-col gap-1"
      >
        <p className="text-foreground text-base font-medium leading-relaxed sm:text-lg">
          這裡只有無邊無際的天，沒有烏雲密佈的灰。
        </p>
        <p className="text-foreground text-base font-medium leading-relaxed sm:text-lg">
          想一起飛，這裡有伴；人在遠方，天也還在。
        </p>
      </blockquote>

      <GuildFamilyCarousel />

      <div className="text-muted-foreground text-base leading-relaxed border-b border-gray-700 pb-8">
        <div className="
          pl-4 border-l-2 border-dawn-gold/60 space-y-0.5
          text-gray-500 font-medium tracking-wide
        ">
          <p>回應女神的呼喚、沿著靈魂之流來到愛爾琳（Erinn）之後，米列希安並不孤單。</p>
          <p>
            <span className="text-azure-600 text-lg font-semibold">蔚藍天際</span>
            <span className="mx-1 text-dawn-gold font-semibold">Blue Dawn</span>
            是願意在營火旁把步伐放慢的一群人。
          </p>
          <p>地下城裡或許會偶遇，原野上或許只是擦肩；</p>
          <p>
            生活各自修、職業也能換著玩——可只要你還願意回來，<span className="text-azure-500 font-semibold">這片天都在。</span>
          </p>
        </div>
        <div className="mt-4 space-y-1">
          <p>這裡不趕路，也不把誰留在陰處。</p>
          <p>來去隨風，快慢隨心；停下的人，天際裡都有位置。</p>
          <p>喜的、怒的、累的、說不出口的——這片天空，都接得住。</p>
          <p>
            本站是
            <span className="text-azure-600 font-semibold">蔚藍天際 Blue Dawn</span>
            的介紹，也是屬於全體成員的
            <span className="text-azure-600 font-semibold">部落格</span>
            與
            <span className="text-azure-600 font-semibold">回憶牆。</span>
          </p>
          <p>我們想留下的，不只是通關紀錄</p>
          <p>還有在愛爾琳天空下那些被風吹過、被營火照過的瞬間。</p>
        </div>
      </div>

      <section aria-labelledby="guild-rules-heading">
        <h2
          id="guild-rules-heading"
          className="mb-4 text-dawn-sky text-xl font-semibold tracking-tight"
        >
          公會規章
        </h2>
        <div className="text-muted-foreground text-base leading-relaxed space-y-4">
          <p>
            這片蔚藍天際，只有<span className="text-sakura-600 font-semibold">一個規矩</span>：
          </p>
          <p>
            彼此都是彼此的夥伴，可以相互<span className="text-azure-600 font-semibold">嬉笑打鬧</span>
            、一起
            <span className="text-azure-600 font-semibold">暢談整夜</span>
          </p>
          <p>
            但一定要相互<span className="text-sakura-600 font-bold">尊重、包容、友善、平等</span>相待
          </p>
          <p>這片蔚藍天際，<span className="text-azure-600 font-semibold">無邊無際、無拘無束</span></p>
          <p>想聊天了就上線，累了就休息</p>
          <p>
            這裡只有<span className="text-azure-600 font-semibold">享受自由自在</span>
            ，沒有<span className="text-sakura-600 font-semibold">沈重繁瑣的枷鎖</span>
          </p>
          <p>
            如果你也剛好喜歡這樣的
            <span className="text-azure-600 font-semibold">氛圍</span>
            與
            <span className="text-azure-600 font-semibold">環境</span>
          </p>
          <p>
            歡迎<span className="text-azure-600 font-semibold">加入我們</span>
            ，一起在愛爾琳的天空中
            <span className="text-azure-600 font-semibold">享受自由自在的飛翔</span>
          </p>
          <Button asChild size="lg">
            <Link href="/recruit">加入招募</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export { GuildAboutContent };
