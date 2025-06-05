"use client";

import { useContext } from "react";
import { ListContext } from "../../context";
import clsx from "clsx";
import { KanjiAccordion } from "@/pwa/core/components/kanji_accordion";
import { useTranslation } from "@/pwa/i18n/hooks";
import { quoteCase, titleCase } from "@/pwa/core/lib/formatters/string";

export const ItemsList = () => {
  const { t } = useTranslation();
  const { state } = useContext(ListContext);

  return (
    <div
      className={clsx(
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-content-start place-items-start gap-[0.5rem]",
        "w-full"
      )}
    >
      {state.kanji.data?.map((item, index) => (
        <KanjiAccordion
          key={index}
          kanji={{
            kanji: item.kanji,
            kun: !item.kunyomi.length
              ? undefined
              : t("kanji_selection:item_header_kun", {
                  kunyomi: item.kunyomi
                    .map((kunyomi) => kunyomi["ja-Hira"])
                    .join(", "),
                }),
            on: !item.onyomi.length
              ? undefined
              : t("kanji_selection:item_header_on", {
                  onyomi: item.onyomi
                    .map((onyomi) => onyomi["ja-Kana"])
                    .join(", "),
                }),
          }}
          words={{
            words: item.vocabulary.map((vocabulary, vocabularyIndex) => {
              return {
                selected: vocabularyIndex === 0 ? true : false,
                kanji: vocabulary.kanji,
                romaji: titleCase(vocabulary.romaji),
                translation: quoteCase(vocabulary["en-US"]),
                level: {
                  label: "N5",
                },
                speed: {
                  label: "avg: 2.3 sec",
                },
                attempt: {
                  label: "1/3 times",
                },
              };
            }),
          }}
        />
      ))}
    </div>
  );
};
