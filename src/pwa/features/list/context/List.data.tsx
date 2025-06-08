import { ListInitialStateType } from "./List.types";

export const initialState: ListInitialStateType = {
  settings: {
    select: false,
  },
  level: {
    data: [],
  },
  kanji: {
    selected: [],
    data: [],
  },
};
