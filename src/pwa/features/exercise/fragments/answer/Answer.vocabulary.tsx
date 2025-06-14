"use client";
import * as React from "react";
import clsx from "clsx";
import {
  QuestionWithCorrect,
  VocabularyActionEnum,
  VocabularyContext,
} from "../../context";
import { VocabularyWordsEntities } from "@/api/vocabulary/entities";
import { Button } from "@/components/ui/button";

export const AnswerVocabulary = () => {
  const { state, dispatch } = React.useContext(VocabularyContext);
  const selectedIndex = state.question.selected;
  if (selectedIndex === null) {
    return null;
  }

  const handleClickAnswerButton = (
    answer: VocabularyWordsEntities,
    question: QuestionWithCorrect
  ) => {
    dispatch({
      type: VocabularyActionEnum.SetQuestionData,
      payload: {
        ...state.question,
        selected:
          answer.id === question.prompt.id
            ? (state.question.selected ?? 0) + 1
            : state.question.selected,
        data: state.question.data.map((item) => {
          return {
            ...item,
            answers:
              question.id === item.id
                ? [...item.answers, answer.id]
                : item.answers,
            correct:
              question.id === item.id && answer.id === question.prompt.id,
          };
        }),
      },
    });
  };
  return (
    <div
      className={clsx(
        "grid place-content-start place-items-start gap-[1rem]",
        "w-full",
        state.question.data[selectedIndex].options.length > 1
          ? "grid-cols-2"
          : "grid-cols-1"
      )}
    >
      {state.question.data[selectedIndex].options.map((option, optionIndex) => {
        const optionText =
          state.question.settings.answer.selected?.name === "ja-JP"
            ? option["ja-JP"]
            : state.question.settings.answer.selected?.name === "romanji"
            ? option["romanji"]
            : state.question.settings.answer.selected?.name ===
              "hiragana_katakana"
            ? option["hiragana_katakana"]
            : option["id-ID"];
        return (
          <Button
            key={optionIndex}
            className={clsx("w-full")}
            variant={
              state.question.data[selectedIndex].answers.includes(option.id) &&
              option.id !== state.question.data[selectedIndex].prompt.id
                ? "destructive"
                : "outline"
            }
            onClick={() => {
              const utterance = new SpeechSynthesisUtterance(optionText);
              utterance.lang = "ja-JP"; // Bisa diganti ke 'en-US', 'ja-JP', dll
              speechSynthesis.speak(utterance);
              handleClickAnswerButton(
                option,
                state.question.data[selectedIndex]
              );
            }}
          >
            {optionText}
          </Button>
        );
      })}
    </div>
  );
};
