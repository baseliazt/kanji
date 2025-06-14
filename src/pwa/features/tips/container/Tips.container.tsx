"use client";
import { CTATips } from "../fragments/cta";
import { useGetKanjiSelection } from "../react-query/hooks";

export const TipsContainer = () => {
  useGetKanjiSelection();
  return (
    <>
      <div />
      <CTATips />
    </>
  );
};
