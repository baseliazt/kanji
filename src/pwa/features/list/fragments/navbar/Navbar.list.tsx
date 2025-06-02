"use client";
import * as React from "react";
import clsx from "clsx";

export const NavbarList = () => {
  return (
    <div
      className={clsx(
        "flex items-center justify-center",
        "bg-gray-90",
        "w-full h-[4rem]",
        "fixed top-0",
        "max-w-[1200px]",
        "px-[1.5rem]"
      )}
    >
      <h1 className={clsx("text-white font-bold text-[1.25rem]")}>{"漢旅"}</h1>
    </div>
  );
};
