import { useContext } from "react";
import { TipsContext } from "../../context";
import { KanjiCard } from "../../components/kanji_card";
import clsx from "clsx";

export const KanjiTips = ({ kanjiIndex = 0 }: { kanjiIndex?: number }) => {
  const { state } = useContext(TipsContext);
  
  console.log("KanjiTips - state.kanji.data:", state.kanji.data);
  console.log("KanjiTips - kanjiIndex:", kanjiIndex);
  
  if (!state.kanji.data?.length) {
    console.log("KanjiTips - No kanji data");
    return (
      <div className={clsx(
        "flex items-center justify-center h-96",
        "text-slate-400 text-lg"
      )}>
        No kanji selected for practice
      </div>
    );
  }

  const currentKanji = state.kanji.data[kanjiIndex];
  console.log("KanjiTips - currentKanji:", currentKanji);
  
  if (!currentKanji) {
    return (
      <div className={clsx(
        "flex items-center justify-center h-96", 
        "text-slate-400 text-lg"
      )}>
        Kanji not found
      </div>
    );
  }

  return (
    <div className={clsx(
      "w-full min-h-screen",
      "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",
      "px-6 py-8"
    )}>
      <KanjiCard kanjiData={currentKanji} />
    </div>
  );
};
