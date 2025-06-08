import { useMutation } from "@tanstack/react-query";
import { ListActionEnum, ListContext } from "../../context";
import { useContext } from "react";
import { ListReactQueryKey } from "../keys";
import serverClient from "@/pwa/core/lib/api/server";
import { KanjiLevel } from "@/api/modules/level/dtos/level_list.get";

export const useGetKanjiList = () => {
  const { state, dispatch } = useContext(ListContext);

  const mutation = useMutation({
    mutationKey: ListReactQueryKey.GetKanjiList(),
    mutationFn: () => {
      return serverClient.GET("/api/kanji", {
        params: {
          query: {
            level: (state.level.selected?.name as KanjiLevel) ?? "N5",
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
