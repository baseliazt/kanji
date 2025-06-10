export const dynamic = "force-dynamic";
import { KanjiLevel } from "@/api/modules/level/dtos/level_list.get";
import serverClient from "@/pwa/core/lib/api/server";
import { ListContainer } from "@/pwa/features/list/container";
import { initialState, ListProvider } from "@/pwa/features/list/context";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ level?: string }>;
}) {
  const query = await searchParams;

  let state = initialState;
  const { data: levelData } = await serverClient.GET("/api/level");

  const selectedLevel = !query.level
    ? levelData?.data?.find((item) => item.name === "N5")
    : levelData?.data?.find((item) => item.name === query.level);

  const { data: kanjiData } = await serverClient.GET("/api/kanji", {
    params: {
      query: {
        level: (selectedLevel?.name as KanjiLevel) ?? "N5",
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
      data: levelData?.data ?? [],
    },
  };

  return (
    <ListProvider initialState={state}>
      <ListContainer />
    </ListProvider>
  );
}
