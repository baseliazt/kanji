import SVGIcon from "@/pwa/core/icons";
import clsx from "clsx";
// import { useContext } from "react";
// import { ExercisesContext } from "../../context";

export const ToolkitExercises = () => {
//   const { state, dispatch } = useContext(ExercisesContext);
  const toolkits = [
    {
      id: "1",
      name: "voice",
    },
    {
      id: "2",
      name: "translation",
    },
    {
      id: "3",
      name: "kana",
    },
  ];
  return (
    <div
      className={clsx(
        "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem]",
        "w-full"
      )}
    >
      {toolkits.map((toolkit) => (
        <button
          key={toolkit.id}
          className={clsx(
            "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.25rem]",
            "w-full",
            "px-[0.5rem] py-[0.25rem]",
            "bg-neutral-800",
            "rounded-[99px]",
            "overflow-hidden"
          )}
        >
          <SVGIcon
            name="X"
            className={clsx("w-[1.125rem] h-[1.125rem]", "text-white")}
            strokeWidth={1.5}
          />
          <span
            className={clsx("text-[0.75rem] text-[white]", "font-semibold")}
          >
            {toolkit.name}
          </span>
        </button>
      ))}
    </div>
  );
};
