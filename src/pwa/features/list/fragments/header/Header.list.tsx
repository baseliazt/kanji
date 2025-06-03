"use client";
import clsx from "clsx";
// import { useTranslation } from "next-i18next";

export const HeaderList = () => {
  // const { t } = useTranslation("kanji_selection");
  return (
    <div className={clsx("flex items-center justify-between", "w-full")}>
      <h2 className={clsx("text-white text-[1.25rem] font-bold")}>
        {/* {t('')} */}
        {/* {t("title")} */}
      </h2>
    </div>
  );
};
