# Payload CMS 本地設定

後台網址：`http://localhost:3000/admin`

## 第一次設定

1. 在 PostgreSQL 建好資料庫 `blue_dawn`（擁有者 `raykai47`）。
2. 複製環境變數範本，填入自己的值：
   ```bash
   cp .env.example .env
   ```
   - `DATABASE_URI`：本地資料庫連線字串
   - `PAYLOAD_SECRET`：用 `openssl rand -hex 32` 產生一串亂碼貼上
3. 安裝套件並啟動：
   ```bash
   yarn install
   yarn dev
   ```
4. 打開 `/admin`，第一次會要你建立管理員帳號。
5. 用 TablePlus 重新整理 `blue_dawn`，會看到 Payload 自動建好的資料表。

> 開發模式（`yarn dev`）會自動依照 collection 設定同步資料表。
> 正式環境（`yarn build` / `yarn start`、Netlify）不會自動同步，要用 migration：
> `yarn payload migrate:create` 產生、`yarn payload migrate` 執行。部署前再設定。

## 檔案在哪裡

| 路徑 | 用途 |
| --- | --- |
| `src/payload.config.ts` | Payload 總設定：資料庫、編輯器、後台語言 |
| `src/collections/Posts.ts` | 文章欄位（標題、分類、封面、內文…） |
| `src/collections/Media.ts` | 圖片庫 |
| `src/collections/Users.ts` | 後台帳號 |
| `src/app/(payload)/` | 後台與 API 路由，Payload 自動產生，**不要手動改** |
| `src/app/(frontend)/` | 原本的官網前台（layout、首頁、globals.css） |
| `src/payload-types.ts` | 自動產生的型別，改完 collection 後跑 `yarn generate:types` |

## 常用指令

| 指令 | 說明 |
| --- | --- |
| `yarn generate:types` | 改了 collection 欄位後，重新產生 TypeScript 型別 |
| `yarn generate:importmap` | 加了自訂後台元件後，重新產生 import map |
| `yarn payload migrate:create` | 產生資料庫 migration（上線用） |

## 上傳的圖片

本地上傳的圖片存在專案根目錄的 `media/`（已加入 `.gitignore`，不會進 Git）。
Netlify 不會保存上傳的檔案，上線前要改接雲端儲存（例如 Cloudflare R2 + `@payloadcms/storage-s3`）。
