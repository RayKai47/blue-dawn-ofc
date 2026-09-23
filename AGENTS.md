<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Blue Dawn 補充

- 路徑別名：`#/*` → `./src/*`（見 `tsconfig.json`、`package.json#imports`）。
- 套件管理：Yarn 4，`nodeLinker: node-modules`。啟動 Next 只用 `yarn dev` / `yarn build`，不要 `npx next`。
- shadcn：`yarn dlx shadcn@latest`，不要 `npx`。
- 編碼約定：`docs/conventions/`
- 學習路徑：`docs/learning-path.md`
- 部署：Netlify。不要釘死 `@netlify/plugin-nextjs`。
- 這一階段不要改 `src/app/page.tsx`，也不要安裝 redux、redux-saga、axios、Firebase。
