import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { ExercisesReactQueryKey } from "../keys";

import { ExercisesContext, ExercisesActionEnum } from "../../context";
import {
  getKanjiSelection,
  KanjiSelectionStorageInterface,
} from "@/pwa/core/storage/indexDB/kanji_selection";

export const useGetKanjiSelection = () => {
  const { state, dispatch } = React.useContext(ExercisesContext);

  const query = useQuery<KanjiSelectionStorageInterface>({
    queryKey: ExercisesReactQueryKey.GetKanjiSelection(),
    queryFn: () => {
      return getKanjiSelection();
    },
  });

  React.useEffect(() => {
    if (query.data && !query.isFetching) {
      const data = query.data;
      dispatch({
        type: ExercisesActionEnum.SetSelectionsData,
        payload: {
          ...state.selections,
          items: data,
        },
      });
    }
  }, [query.data, query.isFetching]);
  return query;
};
