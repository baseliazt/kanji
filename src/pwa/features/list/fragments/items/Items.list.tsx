"use client";

import { useContext } from "react";
import { ListContext } from "../../context";
import clsx from "clsx";
import { KanjiAccordion } from "@/pwa/core/components/kanji_accordion";
import { useTranslation } from "@/pwa/i18n/hooks";

export const ItemsList = () => {
  const { t } = useTranslation();
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
            kun: t("kanji_selection:item_header_kun", {
              kunyomi: item.kunyomi
                .map((kunyomi) => kunyomi["ja-Hira"])
                .join(", "),
            }),
            on: t("kanji_selection:item_header_on", {
              onyomi: item.onyomi.map((onyomi) => onyomi["ja-Kana"]).join(", "),
            }),
          }}
        />
      ))}
    </div>
  );
};
