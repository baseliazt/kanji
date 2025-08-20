"use client";
import { CTATips } from "../fragments/cta";
import { KanjiTips } from "../fragments/kanji";
import { NavigationIndicator } from "../components/navigation_indicator";
import { useGetKanjiSelection } from "../react-query/hooks";
import { useContext, useState } from "react";
import { TipsContext } from "../context";
import clsx from "clsx";
import { AnimatePresence, motion, PanInfo } from "framer-motion";

export const TipsContainer = () => {
  useGetKanjiSelection();
  const { state } = useContext(TipsContext);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!state.kanji.data?.length) {
    return (
      <div className={clsx(
        "min-h-screen flex items-center justify-center",
        "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
      )}>
        <div className={clsx("text-center space-y-4")}>
          <div className={clsx("text-slate-400 text-lg")}>
            No kanji selected for practice
          </div>
          <div className={clsx("text-slate-500 text-sm")}>
            Please select some kanji from the list first
          </div>
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
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className={clsx(
      "min-h-screen relative overflow-hidden",
      "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    )}>
      {/* Main content area */}
      <div className={clsx("relative w-full h-full")}>
        <AnimatePresence mode="wait" custom={currentIndex}>
          <motion.div
            key={currentIndex}
            custom={currentIndex}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className={clsx("absolute inset-0")}
          >
            <KanjiTips kanjiIndex={currentIndex} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation indicator - positioned above CTA */}
      <div className={clsx(
        "fixed bottom-24 left-0 right-0",
        "flex justify-center",
        "pointer-events-none"
      )}>
        <NavigationIndicator 
          currentIndex={currentIndex} 
          totalItems={totalItems}
        />
      </div>

      <CTATips />
    </div>
  );
};
