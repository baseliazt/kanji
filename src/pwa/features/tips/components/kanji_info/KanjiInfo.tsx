import * as React from "react";
import clsx from "clsx";
import { useTranslation } from "@/pwa/core/i18n/hooks";

export interface KanjiInfoProps {
  kanji?: string;
  stroke?: number;
  level?: string;
  kunyomi?: Array<{ "ja-Hira": string; "ja-Latn": string }>;
  onyomi?: Array<{ "ja-Hira": string; "ja-Latn": string }>;
  className?: string;
}

export const KanjiInfo = ({
  kanji,
  stroke,
  level,
  kunyomi = [],
  onyomi = [],
  className,
}: KanjiInfoProps) => {
  const { t } = useTranslation();

  const InfoCard = ({ 
    title, 
    content, 
    accentColor = "blue" 
  }: { 
    title: string; 
    content: React.ReactNode;
    accentColor?: "blue" | "green" | "purple" | "orange";
  }) => {
    const colorClasses = {
      blue: "border-l-blue-500 bg-blue-50/10",
      green: "border-l-green-500 bg-green-50/10", 
      purple: "border-l-purple-500 bg-purple-50/10",
      orange: "border-l-orange-500 bg-orange-50/10"
    };

    return (
      <div className={clsx(
        "border-l-4 pl-4 py-3",
        "rounded-r-lg",
        colorClasses[accentColor]
      )}>
        <h3 className={clsx("text-slate-300 text-sm font-medium mb-1")}>
          {title}
        </h3>
        <div className={clsx("text-white")}>
          {content}
        </div>
      </div>
    );
  };

  return (
    <div className={clsx("space-y-4", className)}>
      {/* Kanji Character Display */}
      <div className={clsx(
        "text-center p-6",
        "bg-gradient-to-br from-slate-800 to-slate-900",
        "rounded-2xl border border-slate-700"
      )}>
        <div className={clsx("text-6xl font-bold text-white mb-2")}>
          {kanji}
        </div>
        <div className={clsx("flex items-center justify-center gap-4 text-slate-400")}>
          {level && (
            <span className={clsx(
              "px-3 py-1 rounded-full",
              "bg-blue-600/20 text-blue-300 text-sm font-medium"
            )}>
              {level}
            </span>
          )}
          {stroke && (
            <span className={clsx("text-sm")}>
              {t("tips:stroke")}: {stroke}
            </span>
          )}
        </div>
      </div>

      {/* Reading Information */}
      <div className={clsx("grid grid-cols-1 gap-4")}>
        {kunyomi.length > 0 && (
          <InfoCard
            title={t("tips:kunyomi")}
            accentColor="green"
            content={
              <div className={clsx("space-y-2")}>
                {kunyomi.map((reading, index) => (
                  <div key={index} className={clsx("flex items-center gap-3")}>
                    <span className={clsx("text-lg font-medium")}>
                      {reading["ja-Hira"]}
                    </span>
                    <span className={clsx("text-slate-400 text-sm")}>
                      ({reading["ja-Latn"]})
                    </span>
                  </div>
                ))}
              </div>
            }
          />
        )}

        {onyomi.length > 0 && (
          <InfoCard
            title={t("tips:onyomi")}
            accentColor="purple"
            content={
              <div className={clsx("space-y-2")}>
                {onyomi.map((reading, index) => (
                  <div key={index} className={clsx("flex items-center gap-3")}>
                    <span className={clsx("text-lg font-medium")}>
                      {reading["ja-Hira"]}
                    </span>
                    <span className={clsx("text-slate-400 text-sm")}>
                      ({reading["ja-Latn"]})
                    </span>
                  </div>
                ))}
              </div>
            }
          />
        )}
      </div>
    </div>
  );
};
