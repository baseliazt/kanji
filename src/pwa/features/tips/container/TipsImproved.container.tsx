"use client";
import { CTATips } from "../fragments/cta";
import { KanjiCard } from "../components/kanji_card/KanjiCard";
import { NavigationIndicator } from "../components/navigation_indicator";
import { useGetKanjiSelection } from "../react-query/hooks";
import { useContext, useState } from "react";
import { TipsContext } from "../context";
import { Button } from "@/pwa/core/components/button";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { AnimatePresence, motion, PanInfo } from "framer-motion";

export const TipsContainer = () => {
  useGetKanjiSelection();
  const { state } = useContext(TipsContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  if (!state.kanji.data?.length) {
    return (
      <div
        className={clsx(
          "min-h-screen flex items-center justify-center",
          "bg-gradient-to-br from-[#0F0F0F] via-[#1A1A1A] to-[#0F0F0F]",
          "px-6"
        )}
      >
        <div className={clsx("text-center space-y-6 max-w-md")}>
          <div className={clsx("space-y-2")}>
            <div
              className={clsx("text-white text-2xl font-bold drop-shadow-lg")}
            >
              📚 No Kanji Selected
            </div>
            <div className={clsx("text-green-300 text-lg")}>
              Ready to practice?
            </div>
            <div className={clsx("text-gray-400 text-sm leading-relaxed")}>
              Select some kanji from the list first, then come back here to
              review them before starting your practice session.
            </div>
          </div>

          <Button
            onClick={() => router.push("/")}
            className={clsx(
              "w-full",
              "px-6 py-3",
              "bg-gradient-to-r from-green-600 to-emerald-600",
              "hover:from-green-700 hover:to-emerald-700",
              "text-white font-medium",
              "rounded-xl border-0 shadow-xl shadow-green-500/40",
              "transition-all duration-200 hover:scale-105 hover:shadow-green-500/60"
            )}
          >
            Choose Kanji to Practice
          </Button>
        </div>
      </div>
    );
  }

  const totalItems = state.kanji.data.length;

  const handleDragEnd = (event: any, info: PanInfo) => {
    const swipeThreshold = 100;
    const { offset } = info;

    if (offset.x > swipeThreshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (offset.x < -swipeThreshold && currentIndex < totalItems - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div
      className={clsx(
        "min-h-screen relative",
        "flex flex-col w-full",
        "mb-[5rem]"
      )}
    >
      {/* Main content area - Fixed positioning */}
      <div className="flex-1 px-4 py-6 pb-32">
        <div className="w-full max-w-none mx-0">
          {/* Navigation controls - Desktop only with elegant design */}
          <div className="hidden md:block w-full max-w-none mx-0 mb-6">
            <div className="bg-gradient-to-r from-[#2A2A2A]/90 to-[#1F1F1F]/90 backdrop-blur-sm rounded-2xl p-4 shadow-2xl shadow-black/60 border-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-gray-300 text-sm font-medium">
                    {currentIndex + 1} of {state.kanji.data?.length || 0}
                  </div>
                  <div className="text-white text-lg font-bold drop-shadow-lg">
                    {state.kanji.data?.[currentIndex]?.kanji || "NONE"}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      setCurrentIndex(Math.max(0, currentIndex - 1))
                    }
                    disabled={currentIndex === 0}
                    className={clsx(
                      "px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200",
                      "flex items-center gap-2 border-0",
                      "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100",
                      currentIndex === 0
                        ? "bg-gradient-to-r from-[#333333] to-[#222222] text-gray-400 shadow-inner shadow-black/60"
                        : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-xl shadow-green-500/40 hover:scale-105 hover:shadow-green-500/60"
                    )}
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={() =>
                      setCurrentIndex(
                        Math.min(
                          (state.kanji.data?.length || 1) - 1,
                          currentIndex + 1
                        )
                      )
                    }
                    disabled={
                      currentIndex >= (state.kanji.data?.length || 1) - 1
                    }
                    className={clsx(
                      "px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200",
                      "flex items-center gap-2 border-0",
                      "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100",
                      currentIndex >= (state.kanji.data?.length || 1) - 1
                        ? "bg-gradient-to-r from-[#333333] to-[#222222] text-gray-400 shadow-inner shadow-black/60"
                        : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-xl shadow-green-500/40 hover:scale-105 hover:shadow-green-500/60"
                    )}
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {state.kanji.data?.[currentIndex] ? (
            <KanjiCard kanjiData={state.kanji.data[currentIndex]} />
          ) : (
            <div className="bg-red-600 text-white p-8 rounded-lg text-center">
              <h2 className="text-2xl font-bold mb-4">❌ NO DATA</h2>
              <div>
                Index: {currentIndex}, Available:{" "}
                {state.kanji.data?.length || 0}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation indicator - positioned above CTA */}
      <div
        className={clsx(
          "absolute bottom-24 left-0 right-0",
          "flex justify-center",
          "pointer-events-none",
          "z-10"
        )}
      >
        <NavigationIndicator
          currentIndex={currentIndex}
          totalItems={totalItems}
        />
      </div>

      <CTATips />
    </div>
  );
};
