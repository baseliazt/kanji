"use client";
import clsx from "clsx";
import { useContext } from "react";
import { TipsContext } from "../../context";
import { Button } from "@/pwa/core/components/button";
import { useTranslation } from "@/pwa/core/i18n/hooks";
import { useRouter } from "next/navigation";
import { PWARouterURL } from "@/pwa/core/routers";
import SVGIcon from "@/pwa/core/icons";

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
        "px-6 py-6",
        "bg-gradient-to-t from-slate-900 via-slate-900/95 to-transparent",
        "backdrop-blur-sm"
      )}
    >
      <div className={clsx("flex items-center gap-4")}>
        <Button
          onClick={handleClickSkip}
          className={clsx(
            "flex-1",
            "flex items-center justify-center gap-3",
            "px-6 py-4",
            "bg-gradient-to-r from-green-600 to-emerald-600",
            "hover:from-green-700 hover:to-emerald-700",
            "text-white font-semibold text-lg",
            "rounded-2xl",
            "shadow-lg shadow-green-600/25",
            "transition-all duration-200"
          )}
        >
          <span>Start Practice</span>
          <SVGIcon name="ArrowRight" className={clsx("w-5 h-5")} />
        </Button>
      </div>
      
      <div className={clsx("mt-3 text-center")}>
        <span className={clsx("text-slate-400 text-sm")}>
          Ready to test your knowledge?
        </span>
      </div>
    </div>
  );
};
