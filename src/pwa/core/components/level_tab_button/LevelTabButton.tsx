import React, { forwardRef } from "react";
import clsx from "clsx";
import { motion, HTMLMotionProps } from "framer-motion";

interface LevelTabButtonProps extends HTMLMotionProps<"button"> {
  selected: boolean;
}

export const LevelTabButton = forwardRef<
  HTMLButtonElement,
  LevelTabButtonProps
>((props, ref) => {
  const { selected, ...otherProps } = props;

  return (
    <motion.button
      ref={ref}
      {...otherProps}
      animate={{
        backgroundColor: selected ? "#00794D" : "#2C2C2C",
        fontWeight: selected ? 700 : 400,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.3,
      }}
      className={clsx(
        "flex items-center justify-center",
        "w-fit",
        "text-[0.75rem]",
        "px-[0.75rem] py-[0.375rem]",
        "rounded-[0.75rem]",
        selected ? "text-neutral-100" : "text-neutral-300",
        "cursor-pointer whitespace-nowrap outline-none",
        props.className
      )}
      style={{
        boxShadow: "-1px 0px 4px 0px #2E2E2ECC, 3px 3px 6px 0px #0F0F0FCC",
      }}
    >
      {props.children}
    </motion.button>
  );
});

LevelTabButton.displayName = "LevelTabButton";
