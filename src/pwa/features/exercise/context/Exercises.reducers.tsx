import {
  ExercisesActionEnum,
  ExercisesActions,
  ExercisesCorrectBanner,
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

// CorrectBanner
export const ExercisesCorrectBannerReducers = (
  state: ExercisesCorrectBanner,
  action: ExercisesActions
) => {
  switch (action.type) {
    case ExercisesActionEnum.SetCorrectBannerData:
      return action.payload;

    default:
      return state;
  }
};
