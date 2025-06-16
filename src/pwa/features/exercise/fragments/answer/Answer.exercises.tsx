"use client";
import * as React from "react";
import clsx from "clsx";
import {
  QuestionWithCorrect,
  ExercisesActionEnum,
  ExercisesContext,
} from "../../context";
import { Button } from "@/pwa/core/components/button";
import { components } from "@/api/docs/openapi/generated/openapi";

export const AnswerExercises = () => {
  const { state, dispatch } = React.useContext(ExercisesContext);
  const selectedIndex = state.items.selected;
  if (selectedIndex === null) {
    return null;
  }

  const handleClickAnswerButton = (
    answer: components["schemas"]["Vocabulary"],
    question: QuestionWithCorrect
  ) => {
    dispatch({
      type: ExercisesActionEnum.SetItemsData,
      payload: {
        ...state.items,
        data: state.items.data.map((item) => {
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

    dispatch({
      type: ExercisesActionEnum.SetCorrectBannerData,
      payload: {
        ...state.items,
        is_open: answer.id === question.prompt.id,
      },
    });
  };
  return (
    <div
      className={clsx(
        "grid place-content-start place-items-start gap-[1rem]",
        "w-full",
        state.items.data[selectedIndex].options.length > 1
          ? "grid-cols-2"
          : "grid-cols-1"
      )}
    >
      {state.items.data[selectedIndex].options.map((option, optionIndex) => {
        const optionText = option["kana"];
        const isWrong =
          state.items.data[selectedIndex].answers.includes(option.id) &&
          option.id !== state.items.data[selectedIndex].prompt.id;

        const isCorrect =
          state.items.data[selectedIndex].answers.includes(option.id) &&
          option.id === state.items.data[selectedIndex].prompt.id;

        return (
          <Button
            key={optionIndex}
            className={clsx(
              "w-full",
              isWrong
                ? "bg-red-600"
                : isCorrect
                ? "bg-green-600"
                : "bg-neutral-800",
              isWrong
                ? "hover:bg-red-600"
                : isCorrect
                ? "hover:bg-green-600"
                : "hover:bg-neutral-800",
              isWrong
                ? "border-red-600"
                : isCorrect
                ? "border-green-600"
                : "border-neutral-800"
            )}
            onClick={() => {
              const utterance = new SpeechSynthesisUtterance(optionText);
              utterance.lang = "ja-JP"; // Bisa diganti ke 'en-US', 'ja-JP', dll
              speechSynthesis.speak(utterance);
              handleClickAnswerButton(option, state.items.data[selectedIndex]);
            }}
          >
            {optionText}
          </Button>
        );
      })}
    </div>
  );
};
