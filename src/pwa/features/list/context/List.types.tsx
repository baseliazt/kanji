import { paths } from "@/api/docs/openapi";

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
  kanji: ListKanji;
}

// State Collection Types consist of:
export interface ListSettings {
  select: boolean;
}

export interface ListKanji {
  data: paths["/api/kanji"]["get"]["responses"]["201"]["content"]["application/json"]["data"];
}

export enum ListActionEnum {
  // Settings
  SetSettingsData = "SetSettingsData",
  // Kanji
  SetKanjiData = "SetKanjiData",
}

// Action Collection Types
export type ListActions = ListSettingsActions | ListKanjiActions;

// Action Collection Types consist of:
// Settings
type ListSettingsPayload = {
  [ListActionEnum.SetSettingsData]: ListSettings;
};

export type ListSettingsActions =
  ActionMap<ListSettingsPayload>[keyof ActionMap<ListSettingsPayload>];

// Kanji
type ListKanjiPayload = {
  [ListActionEnum.SetKanjiData]: ListKanji;
};

export type ListKanjiActions =
  ActionMap<ListKanjiPayload>[keyof ActionMap<ListKanjiPayload>];
