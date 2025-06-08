import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { encodeId } from "@/api/utils/id";

extendZodWithOpenApi(z);

export const VocabularySchema = z
  .object({
    id: z
      .string()
      .transform((val) => encodeId(Number(val)))
      .openapi({ type: "string", example: "Vjo1a910QP" }),
    kanji_id: z
      .string()
      .transform((val) => encodeId(Number(val)))
      .openapi({ type: "string", example: "Vjo1a910QP" }),
    ["word"]: z
      .string()
      .openapi({ example: "イチ", description: "Vocabulary in katakana" }),
    ["kanji"]: z
      .string()
      .openapi({ example: "ichi", description: "Romanized Japanese" }),
    ["romaji"]: z
      .string()
      .openapi({ example: "ichi", description: "Romanized Japanese" }),
    ["image_url"]: z
      .string()
      .openapi({ example: "ichi", description: "Romanized Japanese" }),
    ["id-ID"]: z
      .string()
      .openapi({ example: "ichi", description: "Romanized Japanese" }),
    ["en-US"]: z
      .string()
      .openapi({ example: "ichi", description: "Romanized Japanese" }),
  })
  .openapi("Vocabulary");

export const VocabularyListSchema = z.array(VocabularySchema);

export type Vocabulary = z.infer<typeof VocabularySchema>;
export type VocabularyList = z.infer<typeof VocabularyListSchema>;
