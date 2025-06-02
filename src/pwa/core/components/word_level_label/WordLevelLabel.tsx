import clsx from "clsx";

export interface WordLevelLabelProps {
  label?: string;
}

export default function WordLevelLabel({ label = "" }: WordLevelLabelProps) {
  return (
    <div className={clsx("flex items-center justify-start gap-[0.5rem]")}>
      <span className={clsx("text-[0.5rem] text-white font-medium")}>
        {label}
      </span>
    </div>
  );
}
