import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const VocabularySchema = z
  .object({
    id: z
      .preprocess((val) => Number(val), z.number())
      .openapi({ type: "number", example: 1 }),
    kanji_id: z.string().openapi({ example: "1" }),
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
