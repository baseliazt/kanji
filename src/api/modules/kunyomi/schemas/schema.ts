import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const KunyomiSchema = z
  .object({
    id: z
      .preprocess((val) => Number(val), z.number())
      .openapi({ type: "number", example: 1 }),
    kanji_id: z
      .preprocess((val) => Number(val), z.number())
      .openapi({ type: "number", example: 1 }),
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
