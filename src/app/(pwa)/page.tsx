export const dynamic = "force-dynamic";
import { KanjiLevel } from "@/api/modules/level/dtos/level_list.get";
import serverClient from "@/pwa/core/lib/api/server";
import { ListContainer } from "@/pwa/features/list/container";
import { initialState, ListProvider } from "@/pwa/features/list/context";

export default async function Home() {
  let state = initialState;
  const { data: levelData } = await serverClient.GET("/api/level");
  const { data: kanjiData } = await serverClient.GET("/api/kanji", {
    params: {
      query: {
        level: levelData?.data?.find((_, index) => index === 0)
          ?.id as KanjiLevel,
      },
    },
  });

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
