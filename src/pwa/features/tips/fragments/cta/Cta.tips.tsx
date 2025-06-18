"use client";
import clsx from "clsx";
import { useContext } from "react";
import { TipsContext } from "../../context";
import { Button } from "@/pwa/core/components/button";
import { useTranslation } from "@/pwa/core/i18n/hooks";
import { useRouter } from "next/navigation";
import { PWARouterURL } from "@/pwa/core/routers";

export const CTATips = () => {
  const router = useRouter();
  const { state } = useContext(TipsContext);
  const { t } = useTranslation();

  if (!state.kanji.data?.length) return null;

  const handleClickSkip = () => {
    router.push(PWARouterURL.GetExercises());
  };
  return (
    <div
      className={clsx(
        "fixed bottom-0 left-0 right-0",
        "w-full",
        "px-[1.5rem] py-[1.5rem]"
      )}
    >
      <Button onClick={handleClickSkip}>{t("tips:cta_skip")}</Button>
    </div>
  );
};
