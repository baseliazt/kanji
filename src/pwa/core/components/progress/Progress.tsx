import clsx from "clsx";

export interface ProgressProps {}

export const Progress = (props: ProgressProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start",
        "w-full"
      )}
    >
      <div></div>
    </div>
  );
};
