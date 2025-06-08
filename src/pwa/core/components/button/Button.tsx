import React, { forwardRef } from "react";
import clsx from "clsx";

export const Button = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    // variant?: "primary";
    // isLoading?: boolean;
  }
>((props, ref) => {
  const { className, ...restProps } = props;
  return (
    <button
      ref={ref}
      {...restProps}
      className={clsx(
        "grid grid-flow-col place-content-center place-items-center gap-[0.5rem]",
        "w-full",
        "bg-green-600",
        "py-[0.625rem]",
        "rounded-[0.375rem]",
        "text-[1.125rem] text-neutral-200 disabled:text-[#5B5B5B] font-semibold",
        "hover:bg-green-600 disabled:bg-[#F6F6F6] disabled:hover:bg-[#F6F6F6]",
        "border border-green-600 disabled:border disabled:border-[#F6F6F6]",
        "cursor-pointer disabled:cursor-default",
        className
      )}
    />
  );
});

Button.displayName = "Button";
