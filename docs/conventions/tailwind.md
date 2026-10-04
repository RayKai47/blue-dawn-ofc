# Tailwind CSS 類別順序

`className` 依下列順序排列，同一組內由小到大、由一般到狀態：

1. 間距：`m-`、`p-`
2. 尺寸：`w-`、`h-`、`size-`、`max-`、`min-`
3. 顏色：`text-`、`bg-`（語意色）
4. 文字：`text-base`、`font-`、`leading-`、`tracking-`
5. 背景細節：`bg-cover`、`bg-center`
6. 框線：`border-`、`ring-`
7. 佈局：`flex`、`grid`、`justify-`、`items-`、`gap-`
8. 定位：`relative`、`absolute`、`fixed`、`top-`、`z-`
9. 其他與互動：`overflow-`、`hover:`、`first:`、`last:`

## 補充

- 條件類別用 `cn()`，不要手寫長 ternary 字串。
- 等寬等高用 `size-*`，不要同時寫 `w-10 h-10`。
- 間距用 `flex` + `gap-*`，不要用 `space-x-*` / `space-y-*`。
- 顏色優先用語意 token：`bg-background`、`text-foreground`、`bg-primary`、`text-muted-foreground`。
- 品牌色用 `bg-dawn-sky`、`text-dawn-gold`、`bg-night-sky`（定義在 `src/app/globals.css`）。
- 不要為了蓋過 shadcn 組件而疊一堆 raw color。
