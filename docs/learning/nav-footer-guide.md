# 全站導覽與頁尾：給初學者的 TSX 指南

這份文件說明 **蔚藍天際 Blue Dawn** 網站如何組出 Header、Footer，以及你在改導覽列時會碰到哪些概念。

---

## TSX 是什麼？

**TSX** = TypeScript + JSX。你可以在 `.tsx` 檔裡同時寫：

- **型別**（例如 `NavItem`、`Props`）
- **長得像 HTML 的 UI**（`<header>`、`<Link>`）

瀏覽器看不懂 TSX，Next.js 會在建置或開發時把它編譯成 JavaScript。

---

## Server Component vs Client Component

| | Server Component（預設） | Client Component（`"use client"`） |
| --- | --- | --- |
| 執行位置 | 伺服器 | 瀏覽器 + 伺服器 |
| 適合 | 靜態結構、SEO、讀資料 | 按鈕 state、選單開關、`usePathname` |
| 本專案範例 | `site-header.tsx`、`site-footer.tsx` | `mobile-nav.tsx`、`site-nav-links.tsx` |

**原則**：能放 Server 就不要整頁變 Client。我們只在需要 **目前網址**（active 高亮）與 **手機選單開關** 時才用 Client。

---

## Props 與型別

Props 是父組件傳給子組件的參數。用 TypeScript 描述形狀，編輯器會幫你補全與檢查：

```tsx
type SiteNavLinksProps = {
  className?: string;
  onNavigate?: () => void;
};

const SiteNavLinks = ({ className, onNavigate }: SiteNavLinksProps) => {
  // ...
};
```

`?` 代表可選。導覽連結的 **資料** 不在 Props，而是集中在常數檔（見下）。

---

## 導覽資料：`NAV_ITEMS`

檔案：`src/constants/site-nav.ts`

```ts
export type NavItem = {
  label: string;
  href: string;
  description?: string;
};
```

**新增一個選單項目**（三步）：

1. 在 `NAV_ITEMS` 加一筆 `{ label, href, description? }`
2. 在 `src/app/` 底下新增對應路由資料夾，例如 `src/app/events/page.tsx`
3. 存檔後重新整理；桌面與手機選單會一起更新（共用同一份常數）

---

## `next/link` 與一般 `<a>`

站內連結請用 **`Link`**（來自 `next/link`）：

- 不會整頁重新載入，切換較快
- 符合 App Router 的 prefetch 行為

站外連結（GitHub、官方文件）仍用 `<a target="_blank" rel="noopener noreferrer">`。

---

## Active 路由高亮

「目前在哪一頁」只有瀏覽器知道，所以 `site-nav-links.tsx` 是 Client，使用：

```tsx
import { usePathname } from "next/navigation";
```

首頁 `/` 只在路徑 **完全等於** `/` 時高亮；其他頁面則比對前綴（例如 `/journal/某篇` 仍算在日誌底下）。

---

## 品牌色（Tailwind）

定義在 `src/app/globals.css`，可直接寫：

- `text-dawn-sky`、`bg-dawn-sky/15` — 天空藍
- `text-dawn-gold` — 黎明金（例如頁尾 hover）
- `bg-night-sky/5` — 夜空色淡底

一般文字與背景仍優先用語意 token：`text-foreground`、`text-muted-foreground`、`bg-background`。

Tailwind 類別順序請遵守 [tailwind.md](../conventions/tailwind.md)。

---

## shadcn 手機選單

`mobile-nav.tsx` 使用 **Sheet**（側邊滑出面板）與 **Button**（漢堡圖示）。組件來源：

- `src/components/ui/button.tsx`
- `src/components/ui/sheet.tsx`

若要再加 UI 組件：

```bash
yarn dlx shadcn@latest add <組件名> -y
```

---

## 檔案對照表

| 檔案 | 角色 |
| --- | --- |
| `src/constants/site-nav.ts` | 導覽項目清單（單一真相來源） |
| `src/components/shared/site-header.tsx` | 頂部 sticky Header + Logo |
| `src/components/shared/site-nav-links.tsx` | 連結列 + active 樣式（Client） |
| `src/components/shared/mobile-nav.tsx` | 小螢幕漢堡選單（Client） |
| `src/components/shared/site-footer.tsx` | 頁尾標語、連結、版權 |
| `src/app/layout.tsx` | 全站包住 Header / `<main>` / Footer |
| `src/app/about/page.tsx` | 公會介紹（占位） |
| `src/app/recruit/page.tsx` | 招募（占位） |
| `src/app/journal/page.tsx` | 日誌（占位） |

首頁 `src/app/page.tsx` 仍是 Next 預設歡迎畫面，**刻意未改**，方便對照學習前後差異。

---

## 自己動手試試

1. 改 `site-nav.ts` 某個 `label`，看 Header 是否更新。
2. 把 `about/page.tsx` 的 `<h1>` 改成副標，理解「路由資料夾名 = URL 路徑」。
3. 用開發者工具切換手機寬度，測 Sheet 選單與桌面橫向 nav。

有問題可對照 [coding-standards.md](../conventions/coding-standards.md) 與 [imports-and-hooks.md](../conventions/imports-and-hooks.md)。
