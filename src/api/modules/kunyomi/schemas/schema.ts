import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { encodeId } from "@/api/utils/id";

extendZodWithOpenApi(z);

export const KunyomiSchema = z
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
      .openapi({ example: "イチ", description: "Kunyomi in hiragana" }),
    ["ja-Latn"]: z
      .string()
      .openapi({ example: "ichi", description: "Romanized Japanese" }),
  })
  .openapi("Kunyomi");

export const KunyomiListSchema = z.array(KunyomiSchema);

export type Kunyomi = z.infer<typeof KunyomiSchema>;
export type KunyomiList = z.infer<typeof KunyomiListSchema>;
