"use client";
import * as React from "react";
import clsx from "clsx";
import { QuestionExercises } from "../fragments/question";
import { AnswerExercises } from "../fragments/answer";
import { ExercisesContext } from "../context";
import { FinishVocabulary } from "../fragments/finish";
import {
  useGetKanjiSelection,
  useGetVocabularyExercises,
} from "../react_query/hooks";
import { NavbarExercises } from "../fragments/navbar";
import { ToolkitExercises } from "../fragments/toolkits";
import { CorrectBannerExercises } from "../fragments/success_cta";

export const ExercisesContainer = () => {
  const { state } = React.useContext(ExercisesContext);
  useGetKanjiSelection();
  useGetVocabularyExercises();
  return (
    <>
      <NavbarExercises />

      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
          "w-full",
          "px-[1.5rem] pt-[4rem]"
        )}
      >
        {state.items.selected !== state.items.data.length ? (
          <>
            <h1
              className={clsx(
                "text-primary text-[1.25rem] font-bold text-center"
              )}
            >
              {"Please select the correct answer"}
            </h1>
            <ToolkitExercises />
            <QuestionExercises />
            <AnswerExercises />
          </>
        ) : (
          <FinishVocabulary />
        )}
      </div>
      <CorrectBannerExercises />
    </>
  );
};
