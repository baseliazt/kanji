import * as React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { KanjiItem, KanjiItemProps } from "../kanji_item";

export interface KanjiAccordionBodyProps {
  id?: string;
  isOpen?: boolean;
  words?: KanjiItemProps[];
}

export const KanjiAccordionBody = ({
  isOpen = false,
  words,
}: KanjiAccordionBodyProps) => {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{
        height: isOpen ? "auto" : 0,
        opacity: isOpen ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
        "w-full",
        "text-[#5B5B5B] text-[0.875rem] font-normal"
      )}
    >
      {/* list */}
      {words?.map((word, wordIndex) => (
        <KanjiItem key={wordIndex} {...word} />
      ))}
    </motion.div>
  );
};
