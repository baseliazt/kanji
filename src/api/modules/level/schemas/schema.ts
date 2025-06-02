import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const LevelSchema = z
  .object({
    id: z
      .preprocess((val) => Number(val), z.number())
      .openapi({ type: "number", example: 1 }),
    name: z.string().openapi({ example: "N5" }),
  })
  .openapi("Level");

export const LevelListSchema = z.array(LevelSchema);

export type Level = z.infer<typeof LevelSchema>;
export type LevelList = z.infer<typeof LevelListSchema>;
