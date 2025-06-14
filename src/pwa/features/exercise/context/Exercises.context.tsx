"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import { ExercisesActions, ExercisesInitialStateType } from "./Exercises.types";
import {
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
};

const ExercisesContext = createContext<{
  state: ExercisesInitialStateType;
  dispatch: Dispatch<ExercisesActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { selections, items }: ExercisesInitialStateType,
  action: ExercisesActions
) => ({
  selections: ExercisesSelectionsReducers(selections, action),
  items: ExercisesItemsReducers(items, action),
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
