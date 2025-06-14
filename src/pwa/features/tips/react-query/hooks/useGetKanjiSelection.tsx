"use client";

import { useQuery } from "@tanstack/react-query";
import { TipsActionEnum, TipsContext } from "../../context";
import { useContext, useEffect } from "react";
import { TipsReactQueryKey } from "../keys";
import {
  getKanjiSelection,
  KanjiSelectionStorageInterface,
} from "@/pwa/core/storage/indexDB/kanji_selection";

export const useGetKanjiSelection = () => {
  const { state, dispatch } = useContext(TipsContext);

  const query = useQuery<KanjiSelectionStorageInterface>({
    queryKey: TipsReactQueryKey.GetKanjiSelection(),
    queryFn: () => {
      console.log("ini kepanggil");
      return getKanjiSelection();
    },
  });

  useEffect(() => {
    if (!!query.data && !query.isFetching) {
      const data = query.data;

      dispatch({
        type: TipsActionEnum.SetKanjiData,
        payload: {
          ...state.kanji,
          data: data,
        },
      });
    }
  }, [query.data, query.isFetching]);
  return query;
};
