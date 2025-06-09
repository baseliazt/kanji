"use client";
import React, {
  createContext,
  useReducer,
  Dispatch,
  useEffect,
  useRef,
} from "react";
import isEqual from "lodash.isequal";
import {
  ListActionEnum,
  ListActions,
  ListInitialStateType,
} from "./List.types";
import {
  ListKanjiReducers,
  ListLevelReducers,
  ListSettingsReducers,
} from "./List.reducers";
import { initialState } from "./List.data";

const ListContext = createContext<{
  state: ListInitialStateType;
  dispatch: Dispatch<ListActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { settings, level, kanji }: ListInitialStateType,
  action: ListActions
) => ({
  settings: ListSettingsReducers(settings, action),
  level: ListLevelReducers(level, action),
  kanji: ListKanjiReducers(kanji, action),
});

const ListProvider = (props: {
  children: React.ReactNode;
  initialState: ListInitialStateType;
}) => {
  const [state, dispatch] = useReducer(mainReducer, props.initialState);
  const prevStateRef = useRef(initialState);
  console.log(initialState.kanji, prevStateRef.current.kanji, "ini context");
  useEffect(() => {
    if (!isEqual(prevStateRef.current.kanji, initialState.kanji)) {
      dispatch({
        type: ListActionEnum.SetKanjiData,
        payload: initialState.kanji,
      });
    }
  }, [initialState.kanji]);

  return (
    <ListContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ListContext.Provider>
  );
};

export { ListProvider, ListContext };
