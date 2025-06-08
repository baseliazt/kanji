import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { encodeId } from "@/api/utils/id";

extendZodWithOpenApi(z);

export const OnyomiSchema = z
  .object({
    id: z
      .preprocess((val) => encodeId(Number(val)), z.string())
      .openapi({ type: "string", example: "Vjo1a910QP" }),
    kanji_id: z
      .preprocess((val) => encodeId(Number(val)), z.string())
      .openapi({ type: "string", example: "Vjo1a910QP" }),
    ["ja-Kana"]: z
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
