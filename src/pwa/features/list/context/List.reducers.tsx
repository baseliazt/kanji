import {
  ListActionEnum,
  ListActions,
  ListKanji,
  ListSettings,
} from "./List.types";

// Settings
export const ListSettingsReducers = (
  state: ListSettings,
  action: ListActions
) => {
  switch (action.type) {
    case ListActionEnum.SetSettingsData:
      return action.payload;

    default:
      return state;
  }
};

// Kanji
export const ListKanjiReducers = (state: ListKanji, action: ListActions) => {
  switch (action.type) {
    case ListActionEnum.SetKanjiData:
      return action.payload;

    default:
      return state;
  }
};
