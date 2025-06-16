import { ExercisesActionEnum, ExercisesContext } from "../../context";
import clsx from "clsx";
import { Button } from "@/pwa/core/components/button";
import { BottomSheet } from "@/pwa/core/components/bottom_sheet";
import { useContext } from "react";

export const CorrectBannerExercises = () => {
  const { state, dispatch } = useContext(ExercisesContext);

  const isOpen = state.correct_banner.is_open;

  const handleClickContinue = () => {
    dispatch({
      type: ExercisesActionEnum.SetItemsData,
      payload: {
        ...state.items,
        selected: (state.items.selected ?? 0) + 1,
      },
    });
    dispatch({
      type: ExercisesActionEnum.SetCorrectBannerData,
      payload: {
        ...state.items,
        is_open: false,
      },
    });
  };
  return (
    <BottomSheet isOpen={isOpen}>
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
          "w-full",
          "bg-neutral-800",
          "rounded-tr-[1.5rem] rounded-tl-[1.5rem]",
          "px-[1rem] py-[1rem]",
          "relative"
        )}
      >
        <p className={clsx("text-[1rem] text-white font-bold")}>
          {"You are correct"}
        </p>
        <Button
          className={clsx("w-full", "!rounded-[999px]")}
          onClick={handleClickContinue}
        >
          {"Continue"}
        </Button>
      </div>
    </BottomSheet>
  );
};
