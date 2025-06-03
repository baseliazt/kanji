import clsx from "clsx";

export interface LevelTabContainerProps {
  children?: React.ReactNode;
}

export default function LevelTabContainer({
  children,
}: LevelTabContainerProps) {
  return (
    <div
      className={clsx(
        "flex items-center justify-center",
        "w-fit",
        "rounded-[0.75rem]",
        "bg-neutral-800"
      )}
    >
      {children}
    </div>
  );
}
