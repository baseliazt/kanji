import * as React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

export interface KanjiAccordionBodyProps {
  isOpen?: boolean;
  title?: string;
}

export const KanjiAccordionBody = ({
  isOpen = false,
  title,
}: KanjiAccordionBodyProps) => {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{
        height: isOpen ? "auto" : 0,
        opacity: isOpen ? 1 : 0,
      }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={clsx("text-[#5B5B5B] text-[0.875rem] font-normal")}
    >
      <p className={clsx("text-[0.75rem] text-white font-normal")}>{title}</p>
      {/* list */}
    </motion.div>
  );
};
