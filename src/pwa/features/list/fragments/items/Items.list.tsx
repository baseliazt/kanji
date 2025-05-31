"use client";

import { useContext } from "react";
import { ListContext } from "../../context";
import clsx from "clsx";

export const ItemsList = () => {
  const { state } = useContext(ListContext);

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
        "w-full"
      )}
    >
      {state.kanji.data?.map((item) => (
        <div
          key={item.id}
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
            "w-full"
          )}
        >
          <p className={clsx("text-white text-[2rem]")}>{item.kanji}</p>
        </div>
      ))}
    </div>
  );
};
