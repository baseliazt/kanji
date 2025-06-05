import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { ApiResponseSchema } from "@/api/utils/dto";
import { KanjiSchema } from "../schemas/schema";
import { z } from "zod";
import { KunyomiListSchema } from "../../kunyomi/schemas/schema";
import { OnyomiListSchema } from "../../onyomi/schemas/schema";
import { VocabularyListSchema } from "../../vocabulary/schemas/schema";

export const GetKanjiListRegistry: RouteConfig = {
  method: "get",
  path: "/api/kanji",
  tags: ["Kanji"],
  responses: {
    201: {
      description: "Post created",
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
