# ☁️ 蔚藍天際 Blue Dawn

《瑪奇 Mobile》公會網站 · 米列希安的日誌與回憶

> **這裡只有無邊無際的天，沒有烏雲密佈的灰。**  
> **想一起飛，這裡有伴；人在遠方，天也還在。**

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwind-css)
![Yarn](https://img.shields.io/badge/Yarn-4-2c8ebb?style=flat-square&logo=yarn)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

回應女神的呼喚、沿著靈魂之流來到 **愛爾琳（Erinn）** 之後，米列希安並不孤單。  
**蔚藍天際 Blue Dawn** 是願意在營火旁把步伐放慢的一群人。地下城裡或許會偶遇，原野上或許只是擦肩；生活各自修、職業也能換著玩——可只要你還願意回來，這片天都在。

這裡不趕路，也不把誰留在陰處。來去隨風，快慢隨心；停下的人，天際裡都有位置。喜的、怒的、累的、說不出口的——這片天空，都接得住。

本站是公會的對外門面，也是屬於全體成員的 **部落格與回憶牆**。  
我們想留下的，不只是通關紀錄，還有在愛爾琳天空下那些被風吹過、被營火照過的瞬間。

---

## ✨ 核心功能

### 🤝 招募與門面

- **🏰 公會介紹與規章**：這片蔚藍天際，只有一個規矩：彼此尊重、把對方當夥伴。其他都好商量。玩法自由、上線隨緣，但還是希望常來晃晃——想一起飛，這裡有伴；人在遠方，天也還在。
- **📝 入會申請**：新來的米列希安可填寫角色名稱、聯絡方式，方便幹部審核。
- **📊 招募現況**：公開目前缺額與需求（目前偏好活躍、常上線聊天打屁、休閒向或挑戰向夥伴）。

### 📖 日誌與回憶

- **📸 冒險日誌**：記錄公會聚會、地下城與偶遇、拍照合影，以及成員寫下的旅途心得。
- **🖼️ 風景相簿**：收藏遊戲截圖、營火邊的合照，以及成員們的活動紀錄與彼此之間的互動點滴。
- **📚 愛爾琳筆記**：職業心得、副本路線、生活技能與採集製作等實用筆記。
- **🎖️ 蔚藍名冊**：留下公會大事、歷任幹部，以及曾為這片天際出力的米列希安。

---

## 🛠️ 技術棧

- **Framework**：[Next.js](https://nextjs.org/) 16（App Router，預設 Turbopack）
- **Language**：[TypeScript](https://www.typescriptlang.org/)
- **Styling**：[Tailwind CSS](https://tailwindcss.com/) 4 + [shadcn/ui](https://ui.shadcn.com/)
- **Package manager**：Yarn 4（`nodeLinker: node-modules`）
- **Content**：之後用 Markdown / MDX 或 CMS 管理日誌
- **Deployment**：[Netlify](https://www.netlify.com/)（自動套用最新 Next.js adapter，不釘死 plugin）

---

## 🚀 快速開始

需要 Node.js 20.9+（建議 22）與 Yarn 4.12.0。

```bash
corepack enable
corepack prepare yarn@4.12.0 --activate
git clone https://github.com/RayKai47/blue-dawn-ofc.git
cd blue-dawn-ofc
yarn install
yarn dev
```

瀏覽器打開 [http://localhost:3000](http://localhost:3000)。目前仍是 Next.js 預設首頁。

| 指令 | 說明 |
| --- | --- |
| `yarn dev` | 開發伺服器（Turbopack） |
| `yarn build` | 正式建置 |
| `yarn start` | 跑 production server |
| `yarn lint` | ESLint |

一律用 `yarn` script，不要 `npx next`。加 shadcn 組件：

```bash
yarn dlx shadcn@latest add button
```

### 環境變數

```bash
cp .env.example .env.local
```

瀏覽器可見的變數必須以 `NEXT_PUBLIC_` 開頭。不要提交 `.env.local`。

---

## 📁 專案結構

```text
src/
  app/              # App Router（page / layout / globals.css）
  components/ui/    # shadcn 組件
  hooks/
  lib/              # cn() 等共用函式
  types/
  constants/
  content/          # 之後放日誌 Markdown
docs/
  conventions/      # 編碼、import、Tailwind 約定
  learning-path.md  # 學習路徑
```

路徑別名：`#/*` → `./src/*`。

---

## 📘 開發文件

- [編碼約定](docs/conventions/coding-standards.md)
- [Import 與 Hooks](docs/conventions/imports-and-hooks.md)
- [Tailwind 類別順序](docs/conventions/tailwind.md)
- [學習路徑](docs/learning-path.md)
- Agent 指引：`AGENTS.md`（Next.js 16 文件在 `node_modules/next/dist/docs/`）

---

## ☁️ 部署（Netlify）

1. 用這個 GitHub 倉庫建立 Netlify site。
2. Build command：`yarn build`（已寫在 `netlify.toml`）。
3. Publish directory：`.next`。
4. Node：22（`netlify.toml` 的 `NODE_VERSION`）。

不要把 `@netlify/plugin-nextjs` 加進 `package.json` 或 `[[plugins]]`。Netlify 會自動套最新 adapter。Yarn 4 必須維持 `nodeLinker: node-modules`。
