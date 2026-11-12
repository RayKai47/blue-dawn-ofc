import type { NextConfig } from "next";

import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  images: {
    // 允許 public/ 底下的圖，以及 Payload 圖片庫（/api/media/file/...，網址可能帶查詢參數）
    localPatterns: [{ pathname: "/**" }],
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
