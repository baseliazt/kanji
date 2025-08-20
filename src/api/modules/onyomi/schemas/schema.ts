import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { encodeId } from "@/api/utils/id";

extendZodWithOpenApi(z);

export const OnyomiSchema = z
  .object({
    id: z
      .string()
      .transform((val) => encodeId(Number(val)))
      .openapi({ type: "string", example: "Vjo1a910QP" }),
    kanji_id: z
      .string()
      .openapi({ type: "string", example: "1", description: "Reference to Kanji ID" }),
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
