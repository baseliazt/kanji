import serverClient from "@/pwa/core/lib/api/server";
import { ListContainer } from "@/pwa/features/list/container";
import { initialState, ListProvider } from "@/pwa/features/list/context";

export default async function Home() {
  let state = initialState;
  const { data, error } = await serverClient.GET("/api/kanji");

  state = {
    ...state,
    kanji: {
      ...state.kanji,
      data: data?.data ?? [],
    },
  };
  return (
    <ListProvider initialState={state}>
      <ListContainer />
    </ListProvider>
  );
}
