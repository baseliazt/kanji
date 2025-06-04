import * as React from "react";
import clsx from "clsx";
import Image from "next/image";
import SVGIcon from "@/pwa/core/icons";

export const NavbarList = () => {
  return (
    <nav
      className={clsx(
        "flex items-center justify-between",
        "w-full h-[4rem]",
        "fixed top-0",
        "max-w-[1200px]",
        "px-[1.5rem]"
      )}
    >
      <Image
        src={"/logo/small.svg"}
        alt={"small_logo"}
        width={32}
        height={32}
      />

      <SVGIcon
        name="Sun"
        className={clsx("w-[1.5rem] h-[1.5rem]", "text-neutral-200")}
      />
    </nav>
  );
};
