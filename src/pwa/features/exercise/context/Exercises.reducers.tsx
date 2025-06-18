import {
  ExercisesActionEnum,
  ExercisesActions,
  ExercisesCorrectBanner,
  ExercisesHint,
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

// Hint
export const ExercisesHintReducers = (
  state: ExercisesHint,
  action: ExercisesActions
) => {
  switch (action.type) {
    case ExercisesActionEnum.SetHintData:
      return action.payload;

    default:
      return state;
  }
};
