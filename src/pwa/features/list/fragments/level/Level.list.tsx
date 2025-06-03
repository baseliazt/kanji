"use client";
import { useContext } from "react";
import clsx from "clsx";
import { LevelTabButton } from "@/pwa/core/components/level_tab_button";
import { ListActionEnum, ListContext } from "../../context";
import LevelTabContainer from "@/pwa/core/components/level_tab_container/LevelTabContainer";
import { components } from "@/api/docs/openapi";

export const LevelList = () => {
  const { state, dispatch } = useContext(ListContext);

  const handleSelectLevel = (data: components["schemas"]["Level"]) => {
    dispatch({
      type: ListActionEnum.SetLevelData,
      payload: {
        ...state.level,
        selected: data.id === 0 ? undefined : data,
      },
    });
  };
  return (
    <div className={clsx("flex items-center justify-center", "w-full")}>
      <LevelTabContainer>
        {state.level.data?.map((level, index) => (
          <LevelTabButton
            key={index}
            selected={
              !state.level.selected
                ? index === 0
                : state.level.selected.id === level.id
            }
            onClick={() => handleSelectLevel(level)}
          >
            {level.name}
          </LevelTabButton>
        ))}
      </LevelTabContainer>
    </div>
  );
};
