import * as React from "react";
import clsx from "clsx";

export interface DividerProps {
  type?: "horizontal" | "vertical";
  className?: string;
}

export const Divider = ({ type = "horizontal", className }: DividerProps) => {
  if (type === "vertical") {
    return (
      <div className={clsx("w-[1px] h-full", "bg-gray-800", className)} />
    );
  }
  return <div className={clsx("w-full h-[1px]", "bg-gray-800", className)} />;
};
