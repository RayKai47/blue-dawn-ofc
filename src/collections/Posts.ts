import type { CollectionConfig } from "payload";

/** 文章：冒險日誌、愛爾琳筆記、公會公告。 */
export const Posts: CollectionConfig = {
  slug: "posts",
  labels: { singular: "文章", plural: "文章" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "publishedAt", "_status"],
  },
  // 開啟草稿：在後台按「發佈」之前，前台看不到
  versions: {
    drafts: true,
  },
  access: {
    // 沒登入的訪客只能讀到已發佈的文章
    read: ({ req }) => (req.user ? true : { _status: { equals: "published" } }),
  },
  fields: [
    {
      name: "title",
      label: "標題",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      label: "網址代稱",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
        description: "只用英文小寫、數字與連字號，例如 first-raid。文章網址會是 /blog/first-raid",
      },
    },
    {
      name: "category",
      label: "分類",
      type: "select",
      required: true,
      defaultValue: "journal",
      options: [
        { label: "冒險日誌", value: "journal" },
        { label: "愛爾琳筆記", value: "notes" },
        { label: "公會公告", value: "news" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "publishedAt",
      label: "發佈日期",
      type: "date",
      admin: { position: "sidebar" },
    },
    {
      name: "author",
      label: "作者",
      type: "text",
      admin: { position: "sidebar" },
    },
    {
      name: "coverImage",
      label: "封面圖",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "excerpt",
      label: "摘要",
      type: "textarea",
      admin: { description: "列表頁顯示的一兩句簡介" },
    },
    {
      name: "content",
      label: "內文",
      type: "richText",
      required: true,
    },
  ],
};
