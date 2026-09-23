# 學習路徑

給之後要動這個倉庫的人：先把環境跑起來，再碰畫面與內容。文件以繁體中文為準。

## 1. 工具鏈

1. Node.js 20.9+（建議 22，與 Netlify `NODE_VERSION` 對齊）。
2. Corepack 啟用 Yarn 4.12.0：`corepack enable && corepack prepare yarn@4.12.0 --activate`。
3. 根目錄 `.yarnrc.yml` 必須是 `nodeLinker: node-modules`。Yarn 2+ 在 Netlify 上不支援 PnP。
4. `yarn install` 後才會有 `node_modules`。不要 commit `.pnp.cjs` 或 `.yarn/cache`。

## 2. 每天怎麼開專案

```bash
yarn install
yarn dev
```

瀏覽器打開 `http://localhost:3000`。目前首頁仍是 create-next-app 預設頁，這是刻意的。

其他指令：

- `yarn build`：正式建置（同樣走預設 Turbopack）。
- `yarn start`：跑 production server（需先 build）。
- `yarn lint`：ESLint。

不要用 `npx next` / `npx shadcn`。加 shadcn 組件用：

```bash
yarn dlx shadcn@latest add button
```

## 3. Next.js 16 該讀哪裡

先讀本機文件，不要靠網路上舊的 Pages Router 範例：

- `node_modules/next/dist/docs/01-app/01-getting-started/`
- 安裝與路徑別名：`01-installation.md`
- 目錄結構：`02-project-structure.md`
- CSS / Tailwind 4：`11-css.md`
- 環境變數：`../02-guides/environment-variables.md`
- CLI（`next dev` 預設 Turbopack）：`../03-api-reference/06-cli/next.md`

重點：App Router、Server Components 預設、`src/app` 管路由。`proxy.ts` 若之後要加，放在 `src/`。

## 4. UI

- Tailwind CSS v4：設定在 `src/app/globals.css` 與 `postcss.config.mjs`。
- shadcn/ui：`components.json` 的 alias 是 `#/components` 等。
- 組件會進 `src/components/ui/`。先 `yarn dlx shadcn@latest add`，不要手抄舊版。
- 設計 token（天空藍、黎明金、夜空）已寫在 `globals.css`。改品牌色改 CSS 變數，不要在頁面上散落 hex。

## 5. 部署

- 目標平台是 **Netlify**，不是 Vercel。
- `netlify.toml` 只宣告 `yarn build` 與 `publish = ".next"`。
- **不要** 安裝或釘死 `@netlify/plugin-nextjs`。Netlify 會自動套最新 adapter。

## 6. 這一階段不要做的事

- 不要重寫首頁 JSX、不要加導覽列。
- 不要上 redux / redux-saga / axios / Firebase。資料流之後另開。
- 不要把 Yarn 改回 PnP，也不要改成 npm / pnpm。
- 不要在 `dev` / `build` script 加 `--webpack`。

## 7. 建議練習順序

1. 確認 `yarn dev` 看得到預設頁。
2. 讀完 `docs/conventions/` 三份約定。
3. 用 `yarn dlx shadcn@latest add` 加一顆 Button，在暫時頁驗證（不要改現有 `page.tsx` 除非任務明確要求）。
4. 再規劃公會門面、日誌與招募路由。
