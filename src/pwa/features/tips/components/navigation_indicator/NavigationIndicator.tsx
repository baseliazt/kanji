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
            "h-2 rounded-full transition-all duration-300 shadow-sm",
            index === currentIndex
              ? "w-8 bg-gradient-to-r from-green-400 to-emerald-400 shadow-lg shadow-green-400/50"
              : "w-2 bg-gray-600 hover:bg-gray-500 hover:shadow-md"
          )}
        />
      ))}
      
      {/* Progress text */}
      <span className={clsx("ml-3 text-green-300 text-sm font-medium drop-shadow-sm")}>
        {currentIndex + 1} / {totalItems}
      </span>
    </div>
  );
};
