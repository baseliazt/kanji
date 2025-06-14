"use client";
import * as React from "react";
import clsx from "clsx";

import { ExercisesActionEnum, ExercisesContext } from "../../context";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import SVGIcon from "@/pwa/core/icons";

export const ProgressExercises = () => {
  const { state, dispatch } = React.useContext(ExercisesContext);
  const searchParams = useSearchParams();
  const level = searchParams.get("level");

  const params = new URLSearchParams({
    level: level?.toString() ?? "",
  });

  const handleClickSetting = () => {
    dispatch({
      type: ExercisesActionEnum.SetQuestionData,
      payload: {
        ...state.question,
        settings: {
          ...state.question.settings,
          is_open: true,
        },
      },
    });
  };
  const progress =
    ((state.question.selected ?? 0) / state.question.data.length) * 100;

  return (
    <div
      className={clsx(
        "grid grid-cols-[auto_1fr_auto] items-center content-center justify-start justify-items-start gap-[0.5rem]",
        "w-full"
      )}
    >
      <Link href={"/"}>
        <SVGIcon
          name="X"
          className={clsx("w-[1.5rem] h-[1.5rem]", "text-primary")}
        />
      </Link>

      <Progress value={progress} />

      <button onClick={handleClickSetting}>
        <SVGIcon
          name="Settings2"
          className={clsx("w-[1.5rem] h-[1.5rem]", "text-primary")}
        />
      </button>
    </div>
  );
};
