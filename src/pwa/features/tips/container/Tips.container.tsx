"use client";
import { CTATips } from "../fragments/cta";
import { KanjiTips } from "../fragments/kanji";
import { useGetKanjiSelection } from "../react-query/hooks";
import clsx from "clsx";
import { SwipeableViews } from "@/pwa/core/components/swipeable_views";

export const TipsContainer = () => {
  useGetKanjiSelection();
  return (
    <>
      <SwipeableViews>
        <KanjiTips />
        <KanjiTips />
        <KanjiTips />
      </SwipeableViews>
      <CTATips />
    </>
  );
};
