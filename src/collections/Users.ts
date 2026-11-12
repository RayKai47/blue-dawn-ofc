import type { CollectionConfig } from "payload";

/** 後台帳號：可以登入 /admin 的幹部。Email 與密碼欄位由 auth 自動加上。 */
export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "後台帳號", plural: "後台帳號" },
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [
    {
      name: "name",
      label: "暱稱",
      type: "text",
    },
  ],
};
