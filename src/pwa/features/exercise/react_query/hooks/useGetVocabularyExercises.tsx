import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { ExercisesReactQueryKey } from "../keys";

import { ExercisesContext, ExercisesActionEnum } from "../../context";
import serverClient from "@/pwa/core/lib/api/server";

export const useGetVocabularyExercises = () => {
  const { state, dispatch } = React.useContext(ExercisesContext);

  const query = useQuery({
    queryKey: ExercisesReactQueryKey.GetVocabularyExercises(),
    queryFn: () => {
      const api = serverClient.GET("/api/kanji/vocabulary/exercises", {
        params: {
          query: {
            vocabularies:
              state.selections.items
                ?.flatMap((item) => item.vocabulary.map((item) => item.id))
                .join(",") ?? "",
          },
        },
      });
      return api;
    },
    enabled: !!state.selections.items?.length,
  });

  React.useEffect(() => {
    if (query.data && !query.isFetching) {
      const data = query.data;
      dispatch({
        type: ExercisesActionEnum.SetItemsData,
        payload: {
          ...state.items,
          selected: !data.data?.data?.length ? null : 0,
          data:
            data.data?.data?.map((item) => {
              return {
                ...item,
                correct: false,
                answers: [],
              };
            }) ?? [],
        },
      });
    }
  }, [query.data, query.isFetching]);
  return query;
};
