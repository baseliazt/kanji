"use client";
import clsx from "clsx";
import { useContext } from "react";
import { ListContext } from "../../context";
import { Button } from "@/pwa/core/components/button";
import { useTranslation } from "@/pwa/core/i18n/hooks";

export const CTAList = () => {
  const { state } = useContext(ListContext);
  const { t } = useTranslation();

  if (!state.kanji.selected.length) return null;

  return (
    <div
      className={clsx(
        "fixed bottom-0 left-0 right-0",
        "w-full",
        "px-[1.5rem] py-[1.5rem]"
      )}
    >
      <Button>{t("kanji_selection:cta_practice")}</Button>
    </div>
  );
};
