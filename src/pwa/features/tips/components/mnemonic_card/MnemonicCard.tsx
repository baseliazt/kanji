import * as React from "react";
import clsx from "clsx";
import { useTranslation } from "@/pwa/core/i18n/hooks";
import SVGIcon from "@/pwa/core/icons";

export interface MnemonicCardProps {
  mnemonic?: Array<{ "id-ID": string; "en-US": string }>;
  visualMnemonic?: Array<{ "id-ID": string; "en-US": string }>;
  className?: string;
}

export const MnemonicCard = ({
  mnemonic = [],
  visualMnemonic = [],
  className,
}: MnemonicCardProps) => {
  const { t } = useTranslation();

  if (mnemonic.length === 0 && visualMnemonic.length === 0) {
    return null;
  }

  return (
    <div className={clsx("space-y-6", className)}>
      {/* Main Mnemonic */}
      {mnemonic.length > 0 && (
        <div className={clsx(
          "p-6",
          "bg-gradient-to-br from-orange-900/30 to-orange-800/20",
          "border border-orange-700/50",
          "rounded-2xl"
        )}>
          <div className={clsx("flex items-center gap-3 mb-4")}>
            <div className={clsx(
              "p-2 rounded-lg",
              "bg-orange-600/20"
            )}>
              <SVGIcon name="Sun" className={clsx("w-5 h-5 text-orange-400")} />
            </div>
            <h3 className={clsx("text-orange-300 text-lg font-semibold")}>
              {t("tips:mnemonic")}
            </h3>
          </div>
          
          <div className={clsx("space-y-4")}>
            {mnemonic.map((item, index) => (
              <div key={index} className={clsx("space-y-2")}>
                <p className={clsx("text-white text-base leading-relaxed")}>
                  {item["en-US"]}
                </p>
                {item["id-ID"] && (
                  <p className={clsx("text-orange-200 text-sm leading-relaxed", "italic")}>
                    {item["id-ID"]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Visual Breakdown */}
      {visualMnemonic.length > 0 && (
        <div className={clsx(
          "p-6",
          "bg-gradient-to-br from-purple-900/30 to-purple-800/20",
          "border border-purple-700/50",
          "rounded-2xl"
        )}>
          <div className={clsx("flex items-center gap-3 mb-4")}>
            <div className={clsx(
              "p-2 rounded-lg",
              "bg-purple-600/20"
            )}>
              <SVGIcon name="Eye" className={clsx("w-5 h-5 text-purple-400")} />
            </div>
            <h3 className={clsx("text-purple-300 text-lg font-semibold")}>
              {t("tips:pictograph")}
            </h3>
          </div>
          
          <div className={clsx("space-y-3")}>
            {visualMnemonic.map((item, index) => (
              <div key={index} className={clsx(
                "p-3 rounded-lg",
                "bg-purple-800/20 border border-purple-600/30"
              )}>
                <p className={clsx("text-white text-sm leading-relaxed mb-1")}>
                  {item["en-US"]}
                </p>
                {item["id-ID"] && (
                  <p className={clsx("text-purple-200 text-xs leading-relaxed", "italic")}>
                    {item["id-ID"]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Memory Tip */}
      <div className={clsx(
        "p-4",
        "bg-gradient-to-r from-green-900/20 to-emerald-900/20",
        "border border-green-700/50",
        "rounded-xl"
      )}>
        <div className={clsx("flex items-start gap-3")}>
          <SVGIcon name="Info" className={clsx("w-5 h-5 text-green-400 mt-0.5 flex-shrink-0")} />
          <div className={clsx("space-y-1")}>
            <p className={clsx("text-green-300 text-sm font-medium")}>
              Memory Tip
            </p>
            <p className={clsx("text-green-100 text-sm leading-relaxed")}>
              Practice writing this kanji while saying the mnemonic out loud. 
              The visual and audio memory will help you remember it better!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
