import type { Metadata } from "next";

import { HomePage } from "#/components/home/home-page";

export const metadata: Metadata = {
  title: {
    absolute: "蔚藍天際 Blue Dawn｜《瑪奇 Mobile》公會",
  },
  description:
    "這裡只有無邊無際的天，沒有烏雲密佈的灰。"
    + "想一起飛，這裡有伴；人在遠方，天也還在。",
};

const Page = () => <HomePage />;

export default Page;
