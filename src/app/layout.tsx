import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SiteFooter } from "#/components/shared/site-footer";
import { SiteHeader } from "#/components/shared/site-header";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "蔚藍天際 Blue Dawn",
    template: "%s · 蔚藍天際 Blue Dawn",
  },
  description:
    "《瑪奇 Mobile》公會網站：公會介紹、招募、冒險日誌與在愛爾琳天空下的回憶。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-Hant"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex min-w-0 flex-1 flex-col">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
