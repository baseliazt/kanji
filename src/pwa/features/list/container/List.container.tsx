import * as React from "react";
import { NavbarList } from "../fragments/navbar";
import { ItemsList } from "../fragments/items";
import clsx from "clsx";
import { HeaderList } from "../fragments/header";
import { LevelList } from "../fragments/level";

export const ListContainer = () => {
  return (
    <>
      <NavbarList />
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
          "w-full",
          "px-[1.5rem] pt-[4rem]"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[0.75rem]",
            "w-full"
          )}
        >
          <HeaderList />
          <div
            className={clsx(
              "grid grid-flow-col items-center content-center justify-between justify-items-start",
              "w-full"
            )}
          >
            <LevelList />
          </div>
        </div>

        <ItemsList />
      </div>
    </>
  );
};
