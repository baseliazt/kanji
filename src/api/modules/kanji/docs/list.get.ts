import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { ApiResponseSchema } from "@/api/utils/dto";
import { KanjiSchema } from "../schemas/schema";
import { z } from "zod";
import { KunyomiListSchema } from "../../kunyomi/schemas/schema";
import { OnyomiListSchema } from "../../onyomi/schemas/schema";
import { VocabularyListSchema } from "../../vocabulary/schemas/schema";
import { getKanjiListQueryRequest } from "../dtos/list.get";

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
          schema: ApiResponseSchema(
            z.array(
              KanjiSchema.extend({
                kunyomi: KunyomiListSchema,
                onyomi: OnyomiListSchema,
                vocabulary: VocabularyListSchema,
              })
            )
          ),
        },
      },
    },
  },
};
