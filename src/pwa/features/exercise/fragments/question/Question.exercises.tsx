"use client";
import * as React from "react";
import clsx from "clsx";
import { ExercisesContext } from "../../context";
import { TextQuestion } from "../../components/text_question";

export const QuestionExercises = () => {
  const { state } = React.useContext(ExercisesContext);

  if (state.items.selected === null) {
    return null;
  }

  const selectedHintIds = state.hint.selected.map(
    (selectedHint) => selectedHint.id
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
          "grid grid-cols-1 items-start content-start justify-center justify-items-center gap-[0.25rem]",
          "w-full"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 items-start content-start justify-center justify-items-center gap-[0.25rem]",
            "w-full"
          )}
        >
          <TextQuestion
            text={state.items.data[state.items.selected].prompt.romaji}
            className={clsx(
              "!text-[1.5rem] !text-neutral-200 !font-bold",
              selectedHintIds.includes("romaji")
                ? "opacity-100"
                : "opacity-0"
            )}
          />
          <TextQuestion
            text={state.items.data[state.items.selected].prompt.kanji}
            className={clsx("!text-[4rem] !text-neutral-200 !font-bold")}
          />
        </div>

        <TextQuestion
          text={`“${state.items.data[state.items.selected].prompt["id-ID"]}”`}
          className={clsx(
            "!text-[1rem] !text-neutral-200 font-medium !italic",
            selectedHintIds.includes("translation")
              ? "opacity-100"
              : "opacity-0"
          )}
        />
      </div>
    </div>
  );
};
