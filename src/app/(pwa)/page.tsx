import serverClient from "@/pwa/core/lib/api/server";
import { ListContainer } from "@/pwa/features/list/container";
import { initialState, ListProvider } from "@/pwa/features/list/context";
import { loadLocale } from "@/pwa/i18n/utils/serverTranslations";

export default async function Home() {
  let state = initialState;
  const { data: kanjiData } = await serverClient.GET("/api/kanji");
  const { data: levelData } = await serverClient.GET("/api/level");
  state = {
    ...state,
    kanji: {
      ...state.kanji,
      data: kanjiData?.data ?? [],
    },
    level: {
      ...state.level,
      data: levelData?.data ?? [],
    },
  };
  const translations = await loadLocale("en-US", "kanji_selection");
  console.log(translations, "ini translations");
  return (
    <ListProvider initialState={state}>
      <ListContainer />
    </ListProvider>
  );
}
