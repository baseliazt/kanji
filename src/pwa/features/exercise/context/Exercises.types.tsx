import { components } from "@/api/docs/openapi/generated/openapi";
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
export interface ExercisesInitialStateType {
  selections: ExercisesSelections;
  items: ExercisesItems;
}

// State Collection Types consist of:
export interface ExercisesSelections {
  items: KanjiSelectionStorageInterface;
}

export interface ExercisesItems {
  selected: null | number;
  data: QuestionWithCorrect[];
}

export type QuestionWithCorrect = {
  id: string;
  prompt: components["schemas"]["Vocabulary"];
  options: components["schemas"]["Vocabulary"][];
  answer: components["schemas"]["Vocabulary"];
} & {
  answers: string[];
  correct: boolean;
};

export enum ExercisesActionEnum {
  // Selections
  SetSelectionsData = "SetSelectionsData",
  // Items
  SetItemsData = "SetItemsData",
}

// Action Collection Types
export type ExercisesActions =
  | ExercisesSelectionsActions
  | ExercisesItemsActions;

// Action Collection Types consist of:
// Selections
type ExercisesSelectionsPayload = {
  [ExercisesActionEnum.SetSelectionsData]: ExercisesSelections;
};

export type ExercisesSelectionsActions =
  ActionMap<ExercisesSelectionsPayload>[keyof ActionMap<ExercisesSelectionsPayload>];

// Items
type ExercisesItemsPayload = {
  [ExercisesActionEnum.SetItemsData]: ExercisesItems;
};

export type ExercisesItemsActions =
  ActionMap<ExercisesItemsPayload>[keyof ActionMap<ExercisesItemsPayload>];
