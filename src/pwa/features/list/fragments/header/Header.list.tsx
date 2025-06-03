"use client";
import { useTranslation } from "@/pwa/i18n/hooks";
import clsx from "clsx";

export const HeaderList = () => {
  const { t } = useTranslation();
  return (
    <div className={clsx("flex items-center justify-between", "w-full")}>
      <h2 className={clsx("text-white text-[1.25rem] font-bold")}>
        {t("kanji_selection:title")}
      </h2>
    </div>
  );
};
