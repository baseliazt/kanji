import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { ApiResponseSchema } from "@/api/utils/dto";
import { z } from "zod";
import {
  getVocabularyExercisesQueryRequest,
  GetVocabularyExercisesResponseDTOSchema,
} from "../dtos/exercises.get";

export const GetVocabularyExercisesRegistry: RouteConfig = {
  method: "get",
  path: "/api/kanji/vocabulary/exercises",
  tags: ["Kanji"],
  request: {
    query: getVocabularyExercisesQueryRequest,
  },
  responses: {
    200: {
      description: "Question list retrieved",
      content: {
        "application/json": {
          schema: ApiResponseSchema(
            z.array(GetVocabularyExercisesResponseDTOSchema)
          ),
        },
      },
    },
  },
};
