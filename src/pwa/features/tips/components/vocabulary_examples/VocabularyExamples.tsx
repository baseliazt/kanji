import * as React from "react";
import clsx from "clsx";
import SVGIcon from "@/pwa/core/icons";

export interface VocabularyExamplesProps {
  vocabulary?: Array<{
    kanji: string;
    romaji: string;
    kana: string;
    "en-US": string;
    "id-ID": string;
  }>;
  maxItems?: number;
  className?: string;
}

export const VocabularyExamples = ({
  vocabulary = [],
  maxItems = 3,
  className,
}: VocabularyExamplesProps) => {
  if (vocabulary.length === 0) {
    return null;
  }

  const displayVocabulary = vocabulary.slice(0, maxItems);

  return (
    <div className={clsx("space-y-4", className)}>
      <div className={clsx("flex items-center gap-3 mb-4")}>
        <div className={clsx(
          "p-2 rounded-lg",
          "bg-blue-600/20"
        )}>
          <SVGIcon name="Globe" className={clsx("w-5 h-5 text-blue-400")} />
        </div>
        <h3 className={clsx("text-blue-300 text-lg font-semibold")}>
          Example Words
        </h3>
      </div>

      <div className={clsx("space-y-3")}>
        {displayVocabulary.map((word, index) => (
          <div
            key={index}
            className={clsx(
              "p-4",
              "bg-gradient-to-r from-slate-800/80 to-slate-700/50",
              "border border-slate-600/50",
              "rounded-xl",
              "transition-all duration-200 hover:border-blue-400/50"
            )}
          >
            <div className={clsx("flex items-center justify-between mb-2")}>
              <div className={clsx("flex items-center gap-3")}>
                <span className={clsx("text-2xl font-bold text-white")}>
                  {word.kanji}
                </span>
                <div className={clsx("flex flex-col")}>
                  <span className={clsx("text-slate-300 text-sm")}>
                    {word.kana}
                  </span>
                  <span className={clsx("text-slate-400 text-xs")}>
                    {word.romaji}
                  </span>
                </div>
              </div>
              <SVGIcon 
                name="ArrowRight" 
                className={clsx("w-4 h-4 text-slate-400")} 
              />
            </div>
            
            <div className={clsx("space-y-1")}>
              <p className={clsx("text-slate-200 text-sm")}>
                {word["en-US"]}
              </p>
              {word["id-ID"] && (
                <p className={clsx("text-slate-400 text-xs italic")}>
                  {word["id-ID"]}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {vocabulary.length > maxItems && (
        <div className={clsx("text-center")}>
          <span className={clsx("text-slate-400 text-sm")}>
            +{vocabulary.length - maxItems} more examples
          </span>
        </div>
      )}
    </div>
  );
};
