"use client";

import { useContext } from "react";
import { ListActionEnum, ListContext } from "../../context";
import clsx from "clsx";
import { KanjiAccordion } from "@/pwa/core/components/kanji_accordion";
import { useTranslation } from "@/pwa/i18n/hooks";
import { quoteCase, titleCase } from "@/pwa/core/lib/formatters/string";
import { components } from "@/api/docs/openapi";

export const ItemsList = () => {
  const { t } = useTranslation();
  const { state, dispatch } = useContext(ListContext);

  const handleSelectKanji = (
    data: components["schemas"]["Kanji"] & {
      kunyomi: components["schemas"]["Kunyomi"][];
      onyomi: components["schemas"]["Onyomi"][];
      vocabulary: components["schemas"]["Vocabulary"][];
    }
  ) => {
    const isKanjiExist = state.kanji.selected
      .map((kanji) => kanji.id)
      .includes(data.id);
    dispatch({
      type: ListActionEnum.SetKanjiData,
      payload: {
        ...state.kanji,
        selected: isKanjiExist
          ? state.kanji.selected.map((selectedKanji) => {
              if (selectedKanji.id === data.id) {
                const isAllVocabularySelected =
                  selectedKanji.vocabulary.length === data.vocabulary.length;
                return {
                  ...selectedKanji,
                  vocabulary: isAllVocabularySelected
                    ? []
                    : data.vocabulary.map((vocabulary) => {
                        return {
                          id: vocabulary.id,
                        };
                      }),
                };
              }
              return {
                ...selectedKanji,
              };
            })
          : [
              ...state.kanji.selected,
              {
                id: data.id,
                vocabulary: data.vocabulary.map((vocabulary) => {
                  return {
                    id: vocabulary.id,
                  };
                }),
              },
            ],
      },
    });
  };

  const handleSelectVocabulary = (
    data: components["schemas"]["Kanji"] & {
      kunyomi: components["schemas"]["Kunyomi"][];
      onyomi: components["schemas"]["Onyomi"][];
      vocabulary: components["schemas"]["Vocabulary"];
    }
  ) => {
    const isKanjiExist = state.kanji.selected
      .map((kanji) => kanji.id)
      .includes(data.id);
    dispatch({
      type: ListActionEnum.SetKanjiData,
      payload: {
        ...state.kanji,
        selected: isKanjiExist
          ? state.kanji.selected
              .map((selectedKanji) => {
                if (selectedKanji.id === data.id) {
                  const isVocabularyExist = selectedKanji.vocabulary
                    .map((vocabulary) => vocabulary.id)
                    .includes(data.vocabulary.id);

                  const payload = isVocabularyExist
                    ? selectedKanji.vocabulary.filter(
                        (selectedVocabulary) =>
                          selectedVocabulary.id !== data.vocabulary.id
                      )
                    : [...selectedKanji.vocabulary, { id: data.vocabulary.id }];
                  return {
                    ...selectedKanji,
                    vocabulary: payload,
                  };
                }
                return {
                  ...selectedKanji,
                };
              })
              .filter((kanji) => !!kanji.vocabulary.length)
          : [
              ...state.kanji.selected,
              {
                id: data.id,
                vocabulary: [
                  {
                    id: data.vocabulary.id,
                  },
                ],
              },
            ],
      },
    });
  };
  return (
    <div
      className={clsx(
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-content-start place-items-start gap-[0.5rem]",
        "w-full"
      )}
    >
      {state.kanji.data?.map((kanji, index) => (
        <KanjiAccordion
          key={index}
          kanji={{
            kanji: kanji.kanji,
            kun: !kanji.kunyomi.length
              ? undefined
              : t("kanji_selection:item_header_kun", {
                  kunyomi: kanji.kunyomi
                    .map((kunyomi) => kunyomi["ja-Hira"])
                    .join(", "),
                }),
            on: !kanji.onyomi.length
              ? undefined
              : t("kanji_selection:item_header_on", {
                  onyomi: kanji.onyomi
                    .map((onyomi) => onyomi["ja-Kana"])
                    .join(", "),
                }),
            selected:
              state.kanji.selected.find(
                (selectedKanji) => selectedKanji.id === kanji.id
              )?.vocabulary.length === kanji.vocabulary.length,
            onSelect: () => handleSelectKanji(kanji),
          }}
          words={{
            words: kanji.vocabulary.map((vocabulary) => {
              return {
                selected: (
                  state.kanji.selected
                    .find((selectedKanji) => selectedKanji.id === kanji.id)
                    ?.vocabulary.map(
                      (selectedVocabulary) => selectedVocabulary.id
                    ) ?? []
                ).includes(vocabulary.id),
                kanji: vocabulary.kanji,
                romaji: titleCase(vocabulary.romaji),
                translation: quoteCase(vocabulary["en-US"]),
                level: {
                  label: state.level.selected?.name,
                },
                speed: {
                  label: "avg: 2.3 sec",
                },
                attempt: {
                  label: "1/3 times",
                },
                onSelect: () =>
                  handleSelectVocabulary({
                    ...kanji,
                    vocabulary: vocabulary,
                  }),
              };
            }),
          }}
        />
      ))}
    </div>
  );
};
