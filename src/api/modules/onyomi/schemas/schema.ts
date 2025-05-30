import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const OnyomiSchema = z
  .object({
    id: z
      .preprocess((val) => Number(val), z.number())
      .openapi({ type: "number", example: 1 }),
    kanji_id: z.string().openapi({ example: "1" }),
    ["ja-Hira"]: z
      .string()
      .openapi({ example: "イチ", description: "Onyomi in katakana" }),
    ["ja-Latn"]: z
      .string()
      .openapi({ example: "ichi", description: "Romanized Japanese" }),
  })
  .openapi("Onyomi");

export const OnyomiListSchema = z.array(OnyomiSchema);

export type Onyomi = z.infer<typeof OnyomiSchema>;
export type OnyomiList = z.infer<typeof OnyomiListSchema>;
