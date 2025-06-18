"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import { ExercisesActions, ExercisesInitialStateType } from "./Exercises.types";
import {
  ExercisesCorrectBannerReducers,
  ExercisesHintReducers,
  ExercisesItemsReducers,
  ExercisesSelectionsReducers,
} from "./Exercises.reducers";

const initialState: ExercisesInitialStateType = {
  selections: {
    items: [],
  },
  items: {
    selected: null,
    data: [],
  },
  correct_banner: {
    is_open: false,
  },
  hint: {
    selected: [],
  },
};

const ExercisesContext = createContext<{
  state: ExercisesInitialStateType;
  dispatch: Dispatch<ExercisesActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { selections, items, correct_banner, hint }: ExercisesInitialStateType,
  action: ExercisesActions
) => ({
  selections: ExercisesSelectionsReducers(selections, action),
  items: ExercisesItemsReducers(items, action),
  correct_banner: ExercisesCorrectBannerReducers(correct_banner, action),
  hint: ExercisesHintReducers(hint, action),
});

const ExercisesProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <ExercisesContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ExercisesContext.Provider>
  );
};

export { ExercisesProvider, ExercisesContext };
