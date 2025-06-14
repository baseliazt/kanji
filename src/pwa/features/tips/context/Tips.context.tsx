"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import { TipsActions, TipsInitialStateType } from "./Tips.types";
import { TipsKanjiReducers, TipsSettingsReducers } from "./Tips.reducers";
import { initialState } from "./Tips.data";

const TipsContext = createContext<{
  state: TipsInitialStateType;
  dispatch: Dispatch<TipsActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { settings, kanji }: TipsInitialStateType,
  action: TipsActions
) => ({
  settings: TipsSettingsReducers(settings, action),
  kanji: TipsKanjiReducers(kanji, action),
});

const TipsProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <TipsContext.Provider value={{ state, dispatch }}>
      {props.children}
    </TipsContext.Provider>
  );
};

export { TipsProvider, TipsContext };
