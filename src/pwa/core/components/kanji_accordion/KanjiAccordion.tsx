"use client";
import { useState } from "react";
import clsx from "clsx";
import {
  KanjiAccordionHeader,
  KanjiAccordionHeaderProps,
} from "../kanji_accordion_header";
import {
  KanjiAccordionBody,
  KanjiAccordionBodyProps,
} from "../kanji_accordion_body";

export interface KanjiAccordionProps {
  words?: Omit<KanjiAccordionBodyProps, "isOpen" | "onClick">;
  kanji?: KanjiAccordionHeaderProps;
}

export const KanjiAccordion = ({ kanji, words }: KanjiAccordionProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleClickAccordionButton = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start",
        isOpen ? "gap-[0.75rem]" : "gap-[0rem]",
        "w-full",
        "px-[0.75rem] py-[0.5rem]",
        "rounded-[0.625rem]",
        "bg-[#202020]"
      )}
      style={{
        boxShadow: "0px 2px 4px 0px #00000080, 0px 1px 1px 0px #00000040",
      }}
    >
      <KanjiAccordionHeader
        {...kanji}
        isOpen={isOpen}
        onClick={handleClickAccordionButton}
      />
      {isOpen && <KanjiAccordionBody {...words} isOpen={isOpen} />}
    </div>
  );
};
