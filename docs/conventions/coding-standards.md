# 編碼約定

本專案是 TypeScript + Next.js 16 App Router。約定以可讀、可預測為先，不為了風格而改行為。

## 路徑別名

- `#/*` 對應 `./src/*`（`tsconfig.json` 的 `paths` 與 `package.json` 的 `imports`）。
- 例：`import { cn } from "#/lib/utils"`。
- 不要用相對路徑往上爬（`../../../`），也不要另外發明 `@/`。

## 函式宣告

- React 組件：箭頭函式 `const ComponentName = (...) => { ... }`。
- 模組頂層 helper、具名事件處理：`function functionName() { ... }`。
- `useCallback` / `useMemo` / `useEffect` 與 JSX 內聯回呼用箭頭函式。

## 型別

- 用 TypeScript 標 Props 與回傳值，不要用 `prop-types`。
- 前端變數、State、Props 用 `camelCase`。
- 之後若接後端 API，請求／回應 body 用 `snake_case`；進前端前轉 camelCase。

## 行寬與檔案

- 每行不超過 120 字元。
- 這一階段不安裝 redux、redux-saga、axios、Firebase。
- 不要改 `src/app/page.tsx` 的預設首頁 JSX，也不要先加全站導覽。

## Next.js

- 預設 Server Component。需要瀏覽器 API 或 state 時，檔案最上方加 `"use client"`。
- 設定與文件以本機 `node_modules/next/dist/docs/` 為準，不要靠過時訓練資料。
- 啟動與建置一律走 Yarn script：`yarn dev`、`yarn build`、`yarn start`、`yarn lint`。不要直接 `npx next`。
- 開發伺服器使用 Next.js 16 預設 Turbopack。不要在 script 加 `--webpack`。
