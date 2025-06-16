import * as React from "react";
import clsx from "clsx";
import Link from "next/link";
import { ExercisesContext } from "../../context";

export const FinishVocabulary = () => {
  const { state } = React.useContext(ExercisesContext);

  const correctAnswer = state.items.data.filter(
    (item) => item.answers.length === 1
  );
  const totalCorrectAnswerCount = correctAnswer.length;
  const totalQuestionNumber = state.items.data.length;
  const wrongAnswer = state.items.data.filter(
    (item) => item.answers.length > 1
  );
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-center place-items-center gap-[1rem]",
        "w-full"
      )}
    >
      <p>{"you finished"}</p>
      <p>{"Stats"}</p>
      <p>{`${totalCorrectAnswerCount}/${totalQuestionNumber}`}</p>
      <p>{"List that you need to take note"}</p>
      <p>{wrongAnswer.map((item) => item.prompt["id-ID"]).join(", ")}</p>
      <Link href={"/"}>{"back"}</Link>
    </div>
  );
};
