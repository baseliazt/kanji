import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { ApiResponseSchema } from "@/api/utils/dto";
import { z } from "zod";
import { getKanjiListQueryRequest, GetKanjiListResponseDTOSchema } from "../dtos/list.get";

export const GetKanjiListRegistry: RouteConfig = {
  method: "get",
  path: "/api/kanji",
  tags: ["Kanji"],
  request: {
    query: getKanjiListQueryRequest,
  },
  responses: {
    200: {
      description: "Kanji list retrieved",
      content: {
        "application/json": {
          schema: ApiResponseSchema(z.array(GetKanjiListResponseDTOSchema)),
        },
      },
    },
  },
};
