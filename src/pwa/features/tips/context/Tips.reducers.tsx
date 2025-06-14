import {
  TipsActionEnum,
  TipsActions,
  TipsKanji,
  TipsSettings,
} from "./Tips.types";

// Settings
export const TipsSettingsReducers = (
  state: TipsSettings,
  action: TipsActions
) => {
  switch (action.type) {
    case TipsActionEnum.SetSettingsData:
      return action.payload;

    default:
      return state;
  }
};

// Kanji
export const TipsKanjiReducers = (state: TipsKanji, action: TipsActions) => {
  switch (action.type) {
    case TipsActionEnum.SetKanjiData: {
      console.log(action.payload,'ini payload')
      return action.payload;
    }

    default:
      return state;
  }
};
