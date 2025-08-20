import * as React from "react";
import clsx from "clsx";
import SVGIcon from "@/pwa/core/icons";
import { ExercisesContext } from "../../context";
import { Progress } from "@/pwa/core/components/progress";
import Link from "next/link";

export const NavbarExercises = () => {
  const { state } = React.useContext(ExercisesContext);
  const progress =
    ((state.items.selected ?? 0) / state.items.data.length) * 100;
  return (
    <nav
      className={clsx(
        "flex items-center justify-between gap-[1rem]",
        "w-full h-[4rem]",
        "fixed top-0",
        "max-w-[1200px]",
        "px-[1.5rem]"
      )}
    >
      <Progress value={progress} />

      <Link href="/">
        <SVGIcon
          name="X"
          className={clsx("w-[1.5rem] h-[1.5rem]", "text-neutral-200")}
        />
      </Link>
    </nav>
  );
};
