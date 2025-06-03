"use client";

import { useContext } from "react";
import { ListContext } from "../../context";
import clsx from "clsx";
import { KanjiAccordion } from "@/pwa/core/components/kanji_accordion";

export const ItemsList = () => {
  const { state } = useContext(ListContext);

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
        "w-full"
      )}
    >
      {state.kanji.data?.map((item, index) => (
        <KanjiAccordion
          key={index}
          kanji={{
            kanji: item.kanji,
          }}
        />
      ))}
    </div>
  );
};
