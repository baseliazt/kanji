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
        backgroundColor: selected ? "#16a34a" : "transparent",
        color: "#ffffff",
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
        "w-fit text-[0.75rem]",
        "px-[0.75rem] py-[0.25rem]",
        "rounded-[0.75rem]",
        "cursor-pointer whitespace-nowrap outline-none",
        props.className
      )}
    >
      {props.children}
    </motion.button>
  );
});

LevelTabButton.displayName = "LevelTabButton";
