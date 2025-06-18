import SVGIcon, { SVGIconProps } from "@/pwa/core/icons";
import clsx from "clsx";
import { useContext } from "react";
import { ExercisesActionEnum, ExercisesContext } from "../../context";

const hints = [
  {
    id: "voice",
    name: "voice",
    icon: "Speech",
  },
  {
    id: "translation",
    name: "translation",
    icon: "Globe",
  },
  {
    id: "kana",
    name: "kana",
    icon: "CaseUpper",
  },
  {
    id: "romaji",
    name: "romaji",
    icon: "CaseUpper",
  },
];

export const ToolkitExercises = () => {
  const { state, dispatch } = useContext(ExercisesContext);
  const handleClickHint = (data: { id: string; name: string }) => {
    const isExist = state.hint.selected
      .map((hint) => hint.id)
      .includes(data.id);
    const payload = isExist
      ? state.hint.selected.filter((hint) => hint.id !== data.id)
      : [...state.hint.selected, data];
    dispatch({
      type: ExercisesActionEnum.SetHintData,
      payload: {
        ...state.hint,
        selected: payload,
      },
    });
  };

  const handleClickVoice = async () => {
    if (state.items.selected === null) return;
    const text = state.items.data[state.items.selected].prompt.word ?? "";

    const res = await fetch(`/api/tts?text=${text}&lang=ja`);
    if (!res.ok) {
      alert("Gagal memuat suara");
      return;
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.play();
  };
  return (
    <div
      className={clsx(
        "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem]",
        "w-full"
      )}
    >
      {hints.map((hint) => (
        <button
          key={hint.id}
          className={clsx(
            "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.25rem]",
            "w-full",
            "px-[0.5rem] py-[0.25rem]",
            state.hint.selected
              .map((selectedHint) => selectedHint.id)
              .includes(hint.id) && hint.id !== "voice"
              ? "bg-green-800"
              : "bg-neutral-800",
            "rounded-[99px]",
            "overflow-hidden"
          )}
          onClick={() => {
            if (hint.id === "voice") {
              handleClickVoice();
            } else {
              handleClickHint({
                id: hint.id,
                name: hint.name,
              });
            }
          }}
        >
          <SVGIcon
            name={hint.icon as SVGIconProps["name"]}
            className={clsx("w-[1.125rem] h-[1.125rem]", "text-white")}
            strokeWidth={1.5}
          />
          <span
            className={clsx("text-[0.75rem] text-[white]", "font-semibold")}
          >
            {hint.name}
          </span>
        </button>
      ))}
    </div>
  );
};
