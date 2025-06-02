import clsx from "clsx";

export const HeaderList = () => {
  return (
    <div className={clsx("flex items-center justify-between", "w-full")}>
      <h2 className={clsx("text-white text-[1.25rem] font-bold")}>
        {"Select kanji to practice."}
      </h2>
    </div>
  );
};
