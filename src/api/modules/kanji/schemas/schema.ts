import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { encodeId } from "@/api/utils/id";

extendZodWithOpenApi(z);

export const KanjiSchema = z
  .object({
    id: z
      .preprocess((val) => encodeId(Number(val)), z.string())
      .openapi({ type: "string", example: "Vjo1a910QP" }),
    kanji: z
      .string()
      .openapi({ example: "一", description: "Kanji's example" }),
    stroke: z
      .preprocess((val) => Number(val), z.number())
      .openapi({ type: "number", example: 1, description: "Number of stroke" }),
    level: z.string().openapi({ example: "N5" }),
  })
  .openapi("Kanji");

export const KanjiListSchema = z.array(KanjiSchema);

export type Kanji = z.infer<typeof KanjiSchema>;
export type KanjiList = z.infer<typeof KanjiListSchema>;
