import { useContext } from "react";
import { KanjiCharacterTips } from "../../components/kanji_character";
import { TipsContext } from "../../context";
import clsx from "clsx";

export const KanjiTips = () => {
  const { state } = useContext(TipsContext);
  if (!state.kanji.data?.length) return null;

  return (
    <div className={clsx("w-full min-w-screen", "bg-red")}>
      <KanjiCharacterTips kanji={state.kanji.data?.[0]?.kanji ?? ""} />
    </div>
  );
};
