import { useMutation } from "@tanstack/react-query";
import { ListActionEnum, ListContext } from "../../context";
import { useContext } from "react";
import { ListReactQueryKey } from "../keys";
import serverClient from "@/pwa/core/lib/api/server";
import { KanjiLevel } from "@/api/modules/level/dtos/level_list.get";
import { useSearchParams } from "next/navigation";

export const useGetKanjiList = () => {
  const { state, dispatch } = useContext(ListContext);
  const searchParams = useSearchParams();
  const level = searchParams.get("level");

  const selectedLevel = !level
    ? state.level.data?.find((item) => item.name === "N5")
    : state.level.data?.find((item) => item.name === level);

  const mutation = useMutation({
    mutationKey: ListReactQueryKey.GetKanjiList(),
    mutationFn: () => {
      return serverClient.GET("/api/kanji", {
        params: {
          query: {
            level: (selectedLevel?.name as KanjiLevel) ?? "N5",
          },
        },
      });
    },
    onSuccess(data) {
      dispatch({
        type: ListActionEnum.SetKanjiData,
        payload: {
          ...state.kanji,
          data: data.data?.data ?? [],
        },
      });
    },
  });
  return mutation;
};
