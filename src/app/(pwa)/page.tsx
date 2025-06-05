import serverClient from "@/pwa/core/lib/api/server";
import { ListContainer } from "@/pwa/features/list/container";
import { initialState, ListProvider } from "@/pwa/features/list/context";

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
      selected: levelData?.data?.find((_, index) => index === 0),
      data: levelData?.data ?? [],
    },
  };

  return (
    <ListProvider initialState={state}>
      <ListContainer />
    </ListProvider>
  );
}
