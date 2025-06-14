import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { ApiResponseSchema } from "@/api/utils/dto";
import { z } from "zod";
import {
  getVocabularyQuestionListQueryRequest,
  GetVocabularyQuestionListResponseDTOSchema,
} from "../dtos/question_list.get";

export const GetVocabularyQuestionListRegistry: RouteConfig = {
  method: "get",
  path: "/api/kanji/vocabulary/questions",
  tags: ["Kanji"],
  request: {
    query: getVocabularyQuestionListQueryRequest,
  },
  responses: {
    200: {
      description: "Question list retrieved",
      content: {
        "application/json": {
          schema: ApiResponseSchema(
            z.array(GetVocabularyQuestionListResponseDTOSchema)
          ),
        },
      },
    },
  },
};
