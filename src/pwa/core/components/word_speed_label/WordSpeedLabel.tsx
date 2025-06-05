import clsx from "clsx";
import SVGIcon from "../../icons";

export interface WordSpeedLabelProps {
  label?: string;
}

export default function WordSpeedLabel({ label = "" }: WordSpeedLabelProps) {
  return (
    <div className={clsx("flex items-center justify-start gap-[0.5rem]")}>
      <SVGIcon
        name="Timer"
        className={clsx("w-[0.75rem] h-[0.75rem]", "text-neutral-200")}
        strokeWidth={1.2}
      />
      <span className={clsx("text-[0.75rem] text-neutral-200 font-medium")}>
        {label}
      </span>
    </div>
  );
}
