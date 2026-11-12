import type { CollectionConfig } from "payload";

/**
 * 圖片庫：文章封面與內文圖片。
 * 本地開發時檔案存在 /media 資料夾；上線前要改接雲端儲存（例如 Cloudflare R2）。
 */
export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "圖片", plural: "圖片庫" },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      label: "圖片說明（alt）",
      type: "text",
      required: true,
    },
  ],
  upload: {
    staticDir: "media",
    mimeTypes: ["image/*"],
  },
};
