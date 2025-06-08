"use client";
import { useTranslation } from "@/pwa/core/i18n/hooks";
import clsx from "clsx";

export const HeaderList = () => {
  const { t } = useTranslation();
  return (
    <div className={clsx("flex items-center justify-between", "w-full")}>
      <h1 className={clsx("text-white rounded-lg text-[1.25rem] font-bold")}>
        {t("kanji_selection:title")}
      </h1>
    </div>
  );
};
