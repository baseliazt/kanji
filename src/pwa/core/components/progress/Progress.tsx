import clsx from "clsx";

export interface ProgressProps {
  value: number;
}

export const Progress = ({ value = 0 }: ProgressProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start",
        "w-full h-[0.75rem]",
        "border border-green-700",
        "rounded-[0.5rem]",
        "overflow-hidden"
      )}
    >
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start",
          "bg-green-700"
        )}
        style={{ width: `${value}%` }}
      />
    </div>
  );
};
