# Import 與 Hooks 順序

## Import 分組（組之間空一行）

1. React 核心：`react`、Hooks。
2. Next.js：`next/image`、`next/link`、`next/navigation`、`next/font`。
3. 外部套件／UI（例如 `lucide-react`）。
4. 共用工具：`#/lib/utils` 等。
5. 自定義 Hooks → 頁面組件 → 共用組件。

```tsx
import { useMemo, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { Moon } from "lucide-react";

import { cn } from "#/lib/utils";

import { useMediaQuery } from "#/hooks/use-media-query";
import { SiteFooter } from "#/components/site-footer";
```

## 組件內 Hooks 順序

`useState` → `useEffect` → `useRef` → `useContext` → `useMemo` → `useCallback`

需要瀏覽器 API 的檔案才加 `"use client"`。能放 Server Component 的邏輯不要硬拉到 client。
