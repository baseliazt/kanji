"use client";
import { useContext } from "react";
import clsx from "clsx";
import { LevelTabButton } from "@/pwa/core/components/level_tab_button";
import { ListActionEnum, ListContext } from "../../context";
import { components } from "@/api/docs/openapi";

export const LevelList = () => {
  const { state, dispatch } = useContext(ListContext);

  return (
    <div
      className={clsx(
        "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem]",
        "w-full"
      )}
    >
      {state.level.data?.map((level) => (
        <LevelTabButton key={level.id} selected={level.id === state.level.selected?.id}>
          {level.name}
        </LevelTabButton>
      ))}
    </div>
  );
};
