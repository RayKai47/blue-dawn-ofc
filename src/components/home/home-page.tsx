"use client";

import { useRef } from "react";

import { Noto_Sans_TC, Noto_Serif_TC } from "next/font/google";

import { videos } from "#/constants/home";
import { JOURNAL_COMICS } from "#/constants/journal-comics";
import { MEMORY_CHAPTERS } from "#/constants/memories";

import { useHomeScroll } from "#/hooks/use-home-scroll";

import { HomeComics } from "#/components/home/home-comics";
import { HomeFooter } from "#/components/home/home-footer";
import { HomeHero } from "#/components/home/home-hero";
import { HomeJoin } from "#/components/home/home-join";
import { HomeManifesto } from "#/components/home/home-manifesto";
import { HomeMemories } from "#/components/home/home-memories";
import { HomeNav } from "#/components/home/home-nav";
import { HomeNight } from "#/components/home/home-night";
import { HomePrinciples } from "#/components/home/home-principles";
import { HomeShip } from "#/components/home/home-ship";
import { HomeVideos } from "#/components/home/home-videos";

import "./home.css";

const serif = Noto_Serif_TC({
  weight: ["500", "900"],
  subsets: ["latin"],
  preload: false,
  display: "swap",
  variable: "--font-bd-serif",
});

const sans = Noto_Sans_TC({
  weight: ["400", "500"],
  subsets: ["latin"],
  preload: false,
  display: "swap",
  variable: "--font-bd-sans",
});

const HomePage = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useHomeScroll(rootRef);

  return (
    <div ref={rootRef} className={`bd ${serif.variable} ${sans.variable}`}>
      <HomeNav />
      <HomeHero />
      <HomeManifesto />
      <HomeShip />
      <HomeMemories chapters={MEMORY_CHAPTERS} />
      <HomeNight />
      <HomeComics comics={JOURNAL_COMICS} />
      <HomeVideos videos={videos} />
      <HomePrinciples />
      <HomeJoin />
      <HomeFooter />
    </div>
  );
};

export { HomePage };
