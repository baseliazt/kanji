import { KanjiSelectionStorageInterface } from "@/pwa/core/storage/indexDB/kanji_selection";

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

// State Collection Types
export interface TipsInitialStateType {
  settings: TipsSettings;

  kanji: TipsKanji;
}

// State Collection Types consist of:
export interface TipsSettings {
  select: boolean;
}

export interface TipsKanji {
  data: KanjiSelectionStorageInterface;
}

export enum TipsActionEnum {
  // Settings
  SetSettingsData = "SetSettingsData",

  // Kanji
  SetKanjiData = "SetKanjiData",
}

// Action Collection Types
export type TipsActions = TipsSettingsActions | TipsKanjiActions;

// Action Collection Types consist of:
// Settings
type TipsSettingsPayload = {
  [TipsActionEnum.SetSettingsData]: TipsSettings;
};

export type TipsSettingsActions =
  ActionMap<TipsSettingsPayload>[keyof ActionMap<TipsSettingsPayload>];

// Kanji
type TipsKanjiPayload = {
  [TipsActionEnum.SetKanjiData]: TipsKanji;
};

export type TipsKanjiActions =
  ActionMap<TipsKanjiPayload>[keyof ActionMap<TipsKanjiPayload>];
