"use client";
import * as React from "react";
import clsx from "clsx";
import SVGIcon from "@/pwa/core/icons";
import { motion } from "framer-motion";

export interface AccordionProps {
  question?: string;
  answer?: string;
}

export const Accordion = ({ question = "", answer = "" }: AccordionProps) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const handleClickAccordionButton = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start",
        isOpen ? "gap-[0.75rem]" : "gap-[0rem]",
        "w-full",
        "px-[1.5rem] py-[1.5rem]",
        "rounded-[0.625rem]",
        "border border-[#E9E6E6]"
      )}
    >
      <button
        className={clsx(
          "grid grid-flow-col items-center content-center justify-between justify-items-start gap-[0rem]",
          "w-full",
          "cursor-pointer"
        )}
        onClick={handleClickAccordionButton}
      >
        <span className={clsx("text-[#232323] text-[1.125rem] font-bold")}>
          {question}
        </span>
        <SVGIcon
          name={isOpen ? "ChevronUp" : "ChevronDown"}
          className={clsx("w-[1.5rem] h-[1.5rem]", "text-[#232323]")}
        />
      </button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={clsx("text-[#5B5B5B] text-[0.875rem] font-normal")}
      >
        {answer}
      </motion.div>
    </div>
  );
};
