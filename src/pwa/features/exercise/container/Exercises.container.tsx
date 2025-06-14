"use client";
import * as React from "react";
import clsx from "clsx";
import { ProgressExercises } from "../fragments/progress";
import { QuestionVocabulary } from "../fragments/question";
import { AnswerVocabulary } from "../fragments/answer";
import { ExercisesContext } from "../context";
import { FinishVocabulary } from "../fragments/finish";
import { SettingsVocabulary } from "../fragments/settings";

export const ExercisesContainer = () => {
  const { state } = React.useContext(ExercisesContext);
  return (
    <React.Suspense>
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
          "w-full"
        )}
      >
        {state.items.selected !== state.items.data.length ? (
          <>
            <ProgressExercises />
            <QuestionVocabulary />
            <AnswerVocabulary />
          </>
        ) : (
          <FinishVocabulary />
        )}
        <SettingsVocabulary />
      </div>
    </React.Suspense>
  );
};
