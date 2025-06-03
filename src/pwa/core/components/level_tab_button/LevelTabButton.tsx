import React, { forwardRef } from "react";
import clsx from "clsx";

export const LevelTabButton = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    selected?: boolean;
    variant?: "horizontal" | "vertical";
  }
>((props, ref) => {
  const { selected, variant, ...otherProps } = props;

  return (
    <button
      ref={ref}
      {...otherProps}
      className={clsx(
        "flex items-center justify-center",
        "w-fit",
        selected ? "bg-green-600" : "bg-[transparent] hover:bg-green-600",
        selected
          ? "text-white text-[0.75rem] font-bold"
          : "text-white text-[0.75rem] font-normal hover:text-white hover:text-[0.75rem] hover:font-bold",
        "px-[0.75rem] py-[0.25rem]",
        selected ? "rounded-[0.75rem]" : "rounded-[0px]",
        "cursor-pointer",
        "whitespace-nowrap",
        "outline-none",
        props.className
      )}
    >
      {props.children}
    </button>
  );
});

LevelTabButton.displayName = "LevelTabButton";
