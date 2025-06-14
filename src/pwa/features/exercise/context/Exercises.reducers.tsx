import {
  ExercisesActionEnum,
  ExercisesActions,
  ExercisesItems,
  ExercisesSelections,
} from "./Exercises.types";

// Selections
export const ExercisesSelectionsReducers = (
  state: ExercisesSelections,
  action: ExercisesActions
) => {
  switch (action.type) {
    case ExercisesActionEnum.SetSelectionsData:
      return action.payload;

    default:
      return state;
  }
};

// Items
export const ExercisesItemsReducers = (
  state: ExercisesItems,
  action: ExercisesActions
) => {
  switch (action.type) {
    case ExercisesActionEnum.SetItemsData:
      return action.payload;

    default:
      return state;
  }
};
