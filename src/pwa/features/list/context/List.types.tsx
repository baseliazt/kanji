import { components, paths } from "@/api/docs/openapi/generated/openapi";

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
export interface ListInitialStateType {
  settings: ListSettings;
  level: ListLevel;
  kanji: ListKanji;
}

// State Collection Types consist of:
export interface ListSettings {
  select: boolean;
}

export interface ListLevel {
  data: paths["/api/level"]["get"]["responses"]["200"]["content"]["application/json"]["data"];
}

export interface ListKanji {
  selected: {
    id: string;
    vocabulary: {
      id: string;
    }[];
  }[];
  data: paths["/api/kanji"]["get"]["responses"]["200"]["content"]["application/json"]["data"];
}

export enum ListActionEnum {
  // Settings
  SetSettingsData = "SetSettingsData",
  // Level
  SetLevelData = "SetLevelData",
  // Kanji
  SetKanjiData = "SetKanjiData",
}

// Action Collection Types
export type ListActions =
  | ListSettingsActions
  | ListLevelActions
  | ListKanjiActions;

// Action Collection Types consist of:
// Settings
type ListSettingsPayload = {
  [ListActionEnum.SetSettingsData]: ListSettings;
};

export type ListSettingsActions =
  ActionMap<ListSettingsPayload>[keyof ActionMap<ListSettingsPayload>];

// Level
type ListLevelPayload = {
  [ListActionEnum.SetLevelData]: ListLevel;
};

export type ListLevelActions =
  ActionMap<ListLevelPayload>[keyof ActionMap<ListLevelPayload>];

// Kanji
type ListKanjiPayload = {
  [ListActionEnum.SetKanjiData]: ListKanji;
};

export type ListKanjiActions =
  ActionMap<ListKanjiPayload>[keyof ActionMap<ListKanjiPayload>];
