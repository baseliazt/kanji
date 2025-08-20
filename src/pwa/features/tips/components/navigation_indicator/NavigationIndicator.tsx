import * as React from "react";
import clsx from "clsx";

export interface NavigationIndicatorProps {
  currentIndex: number;
  totalItems: number;
  className?: string;
}

export const NavigationIndicator = ({
  currentIndex,
  totalItems,
  className,
}: NavigationIndicatorProps) => {
  if (totalItems <= 1) return null;

  return (
    <div className={clsx("flex items-center justify-center gap-2", className)}>
      {Array.from({ length: totalItems }).map((_, index) => (
        <div
          key={index}
          className={clsx(
            "h-2 rounded-full transition-all duration-300",
            index === currentIndex
              ? "w-8 bg-blue-400"
              : "w-2 bg-slate-600 hover:bg-slate-500"
          )}
        />
      ))}
      
      {/* Progress text */}
      <span className={clsx("ml-3 text-slate-400 text-sm font-medium")}>
        {currentIndex + 1} / {totalItems}
      </span>
    </div>
  );
};
