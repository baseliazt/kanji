import * as React from "react";
import clsx from "clsx";
import { Checkbox } from "../checkbox";
import SVGIcon from "../../icons";
import WordLevelLabel, {
  type WordLevelLabelProps,
} from "../word_level_label/WordLevelLabel";
import { WordAttemptLabelProps } from "../word_attempt_label";
import { WordSpeedLabelProps } from "../word_speed_label";
import WordAttemptLabel from "../word_attempt_label/WordAttemptLabel";
import WordSpeedLabel from "../word_speed_label/WordSpeedLabel";

export interface KanjiItemProps {
  selected?: boolean;
  kanji?: string;
  romaji?: string;
  translation?: string;
  level?: WordLevelLabelProps;
  attempt?: WordAttemptLabelProps;
  speed?: WordSpeedLabelProps;
  onSelect?: () => void;
}

export const KanjiItem = ({
  selected = false,
  kanji,
  romaji,
  translation,
  level,
  attempt,
  speed,
  onSelect,
}: KanjiItemProps) => {
  return (
    <div
      className={clsx(
        "grid grid-flow-col place-content-start place-items-start gap-[0.5rem]",
        "w-full",
        selected ? "bg-green-800" : "bg-[#3A3A3ACC]",
        "rounded-[0.75rem]",
        "px-[0.5rem] py-[0.5rem]"
      )}
      onClick={onSelect}
    >
      <Checkbox shape="circle" checked={selected} />
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
          "w-full"
        )}
      >
        {/* header */}
        <div
          className={clsx(
            "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem]"
          )}
        >
          <span className={clsx("text-neutral-200 text-[0.875rem] font-bold")}>
            {kanji}
          </span>
          <SVGIcon
            name="ArrowRight"
            className={clsx("w-[1rem] h-[1rem]", "text-[white]")}
            strokeWidth={1.25}
          />
          <span className={clsx("text-neutral-200 text-[13px] font-semibold")}>
            {romaji}
          </span>
          <SVGIcon
            name="ArrowRight"
            className={clsx("w-[1rem] h-[1rem]", "text-[white]")}
            strokeWidth={1.25}
          />
          <span
            className={clsx("text-neutral-200 text-[13px] font-neutral italic")}
          >
            {translation}
          </span>
        </div>
        {/* footer */}
        <div
          className={clsx(
            "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem]"
          )}
        >
          <WordLevelLabel {...level} />
          <WordSpeedLabel {...speed} />
          <WordAttemptLabel {...attempt} />
        </div>
      </div>
    </div>
  );
};
