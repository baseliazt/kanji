"use client";
import * as React from "react";
import clsx from "clsx";
import { VocabularyContext } from "../../context";
import { useGetQuestionList } from "../../react_query/hooks";
import { TextQuestion } from "../../components/text_question";

export const QuestionVocabulary = () => {
  const { state } = React.useContext(VocabularyContext);
  useGetQuestionList();

  if (state.question.selected === null) {
    return null;
  }
  const questionSettingList = state.question.settings.question.selected.map(
    (item) => item.name
  );

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
        "w-full min-h-[200px]"
      )}
    >
      <div
        className={clsx(
          "grid grid-cols-1 place-content-center place-items-center gap-[1rem]",
          "w-full"
        )}
      >
        <h1
          className={clsx("text-primary text-[1.25rem] font-bold text-center")}
        >
          {state.question.data[state.question.selected].prompt.text}
        </h1>
      </div>

      <div
        className={clsx(
          "grid grid-cols-1 items-start content-start justify-center justify-items-center gap-[1rem]",
          "w-full"
        )}
      >
        {questionSettingList.includes("hiragana_katakana") && (
          <TextQuestion
            text={
              state.question.data[state.question.selected].prompt
                .hiragana_katakana
            }
            className={clsx("!text-[2rem]")}
          />
        )}

        {questionSettingList.includes("ja-JP") && (
          <TextQuestion
            text={state.question.data[state.question.selected].prompt["ja-JP"]}
            className={clsx("!text-[1.5rem]")}
          />
        )}

        {questionSettingList.includes("romanji") && (
          <TextQuestion
            text={state.question.data[state.question.selected].prompt.romanji}
            className={clsx("!text-[1.5rem]")}
          />
        )}

        {questionSettingList.includes("id-ID") && (
          <TextQuestion
            text={state.question.data[state.question.selected].prompt["id-ID"]}
            className={clsx("!text-[1.5rem]")}
          />
        )}
      </div>
    </div>
  );
};
