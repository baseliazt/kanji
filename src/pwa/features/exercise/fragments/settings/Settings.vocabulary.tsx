import { BottomSheet } from "@/core/components/bottom_sheet";
import * as React from "react";
import { VocabularyActionEnum, VocabularyContext } from "../../context";
import clsx from "clsx";
import { getDictionaries } from "../../i18n";
import SVGIcon from "@/core/icons";

export const SettingsVocabulary = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(VocabularyContext);
  React.useEffect(() => {
    const questionPayload = dictionaries.settings.list
      .filter((item) => item.type === "question" && item.name === "romanji")
      .map((item) => {
        return {
          id: item.id,
          name: item.name,
        };
      });
    const answerInitialSelected = dictionaries.settings.list.find(
      (item) => item.type === "answer" && item.name === "id-ID"
    );
    const answerPayload = !answerInitialSelected
      ? null
      : {
          id: answerInitialSelected.id,
          name: answerInitialSelected.name,
        };

    dispatch({
      type: VocabularyActionEnum.SetQuestionData,
      payload: {
        ...state.question,
        settings: {
          ...state.question.settings,
          question: {
            ...state.question.settings.question,
            selected: questionPayload,
          },
          answer: {
            ...state.question.settings.answer,
            selected: answerPayload,
          },
        },
      },
    });
  }, []);

  const handleClickClose = () => {
    dispatch({
      type: VocabularyActionEnum.SetQuestionData,
      payload: {
        ...state.question,
        settings: {
          ...state.question.settings,
          is_open: false,
        },
      },
    });
  };
  const questionSettingList = dictionaries.settings.list
    .filter((item) => item.type === "question")
    .map((item) => {
      return {
        id: item.id,
        name: item.name,
      };
    });

  const answerSettingList = dictionaries.settings.list
    .filter((item) => item.type === "answer")
    .map((item) => {
      return {
        id: item.id,
        name: item.name,
      };
    });

  const handleClickQuestionSetting = (option: { id: string; name: string }) => {
    const selectedList = state.question.settings.question.selected.map(
      (item) => item.id
    );
    const payload = selectedList.includes(option.id)
      ? state.question.settings.question.selected.filter(
          (item) => item.id !== option.id
        )
      : [...state.question.settings.question.selected, option];
    dispatch({
      type: VocabularyActionEnum.SetQuestionData,
      payload: {
        ...state.question,
        settings: {
          ...state.question.settings,
          question: {
            ...state.question.settings.question,
            selected: payload,
          },
        },
      },
    });
  };

  const handleClickAnswerSetting = (option: { id: string; name: string }) => {
    const payload =
      state.question.settings.answer.selected?.id === option.id ? null : option;
    dispatch({
      type: VocabularyActionEnum.SetQuestionData,
      payload: {
        ...state.question,
        settings: {
          ...state.question.settings,
          answer: {
            ...state.question.settings.answer,
            selected: payload,
          },
        },
      },
    });
  };
  return (
    <BottomSheet isOpen={state.question.settings.is_open}>
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
          "w-full",
          "h-[400px]",
          "bg-blue-300",
          "border border-blue-800",
          "rounded-tr-[1.5rem] rounded-tl-[1.5rem]",
          "px-[1rem] py-[1rem]",
          "relative"
        )}
      >
        <div className={clsx("absolute", "top-[1rem] right-[1rem]", "z-[10]")}>
          <button onClick={handleClickClose}>
            <SVGIcon
              name="X"
              className={clsx("w-[1.5rem] h-[1.5rem]", "text-[black]")}
            />
          </button>
        </div>
        {/*  */}
        <h2>{"Question"}</h2>
        <div
          className={clsx(
            "flex items-center justify-start flex-wrap gap-[0.5rem]",
            "w-full"
          )}
        >
          {questionSettingList.map((option, optionIndex) => (
            <button
              key={optionIndex}
              className={clsx(
                "grid grid-cols-1 place-content-center place-items-center",
                "px-[0.5rem] py-[0.5rem]",
                "text-[1rem] font-semibold",
                state.question.settings.question.selected
                  .map((item) => item.id)
                  .includes(option.id)
                  ? "bg-[blue]"
                  : "bg-[white]",
                state.question.settings.question.selected
                  .map((item) => item.id)
                  .includes(option.id)
                  ? "text-[white]"
                  : "text-[#222222]",
                "border border-[#222222]",
                "rounded-[0.5rem]",
                "capitalize"
              )}
              onClick={() => handleClickQuestionSetting(option)}
            >
              {option.name}
            </button>
          ))}
        </div>

        <h2>{"Answer"}</h2>
        <div
          className={clsx(
            "flex items-center justify-start flex-wrap gap-[0.5rem]"
          )}
        >
          {answerSettingList.map((option, optionIndex) => (
            <button
              key={optionIndex}
              className={clsx(
                "grid grid-cols-1 place-content-center place-items-center",
                "px-[0.5rem] py-[0.5rem]",
                "text-[1rem] text-[#222222] font-semibold",
                state.question.settings.answer.selected?.id === option.id
                  ? "bg-[blue]"
                  : "bg-[white]",
                state.question.settings.answer.selected?.id === option.id
                  ? "text-[white]"
                  : "text-[#222222]",
                "border border-[#222222]",
                "rounded-[0.5rem]",
                "capitalize"
              )}
              onClick={() => handleClickAnswerSetting(option)}
            >
              {option.name}
            </button>
          ))}
        </div>
      </div>
    </BottomSheet>
  );
};
