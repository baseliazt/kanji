"use client";
import { useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import {
  KanjiAccordionHeader,
  KanjiAccordionHeaderProps,
} from "../kanji_accordion_header";
import {
  KanjiAccordionBody,
  KanjiAccordionBodyProps,
} from "../kanji_accordion_body";

export interface KanjiAccordionProps {
  words?: KanjiAccordionBodyProps;
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
        "bg-neutral-800"
      )}
    >
      <KanjiAccordionHeader
        {...kanji}
        isOpen={isOpen}
        onClick={handleClickAccordionButton}
      />
      <KanjiAccordionBody {...words} isOpen={isOpen} />
    </div>
  );
};
