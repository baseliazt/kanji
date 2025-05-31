import * as React from "react";
import { NavbarList } from "../fragments/navbar";
import { ItemsList } from "../fragments/items";
import clsx from "clsx";

export const ListContainer = () => {
  return (
    <>
      <NavbarList />
      <div className={clsx("w-full", "px-[0.5rem] py-[44px]")}>
        <ItemsList />
      </div>
    </>
  );
};
