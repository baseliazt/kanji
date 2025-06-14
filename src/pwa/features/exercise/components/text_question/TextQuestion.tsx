import * as React from "react";
import clsx from "clsx";

export interface TextQuestionProps {
  text?: string;
  className?: string;
}

export const TextQuestion = ({ text = "", className }: TextQuestionProps) => {
  return (
    <div
      className={clsx(
        "grid grid-flow-col place-content-center place-items-center gap-[1rem]",
        "w-full",
        "text-[2rem] text-primary font-semibold",
        className
      )}
    >
      {text}
    </div>
  );
};
