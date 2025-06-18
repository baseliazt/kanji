"use client";
import clsx from "clsx";
import SVGIcon from "../../icons";
import { Checkbox } from "../checkbox";
import { Divider } from "../divider";

export interface KanjiAccordionHeaderProps {
  id?: string;
  kanji?: string;
  kun?: string;
  on?: string;
  progress?: string;
  isOpen?: boolean;
  selected?: boolean;
  onClick?: () => void;
  onSelect?: () => void;
}

export const KanjiAccordionHeader = ({
  kanji,
  kun,
  on,
  progress,
  isOpen = false,
  selected,
  onClick,
  onSelect,
}: KanjiAccordionHeaderProps) => {
  return (
    <div
      className={clsx(
        "grid grid-flow-col items-center content-center justify-between justify-items-start gap-[0rem]",
        "w-full",
        "cursor-pointer"
      )}
      onClick={onClick}
    >
      <div
        className={clsx(
          "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem]",
          "w-full"
        )}
      >
        <Checkbox
          checked={!!selected}
          onClick={(e) => {
            e.stopPropagation();
            onSelect?.();
          }}
        />
        <span className={clsx("text-white text-[1.25rem] font-semibold")}>
          {kanji}
        </span>
        <div
          className={clsx(
            "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem]",
            "w-full"
          )}
        >
          {kun && (
            <span className={clsx("text-gray-300 text-[0.75rem] font-medium")}>
              {kun}
            </span>
          )}

          {kun && on && <Divider type="vertical" />}
          {on && (
            <span className={clsx("text-gray-300 text-[0.75rem] font-medium")}>
              {on}
            </span>
          )}
        </div>
      </div>

      <div
        className={clsx(
          "grid grid-flow-col items-center content-center justify-between justify-items-start gap-[0.5rem]"
        )}
      >
        {progress && (
          <span className={clsx("text-neutral-200 text-[0.75rem] font-bold")}>
            {progress}
          </span>
        )}
        <div>
          <SVGIcon
            name={isOpen ? "ChevronUp" : "ChevronDown"}
            className={clsx("w-[1.5rem] h-[1.5rem]", "text-neutral-400")}
          />
        </div>
      </div>
    </div>
  );
};
