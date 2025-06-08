import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { encodeId } from "@/api/utils/id";

extendZodWithOpenApi(z);

export const LevelSchema = z
  .object({
    id: z
      .string()
      .transform((val) => encodeId(Number(val)))
      .openapi({ type: "string", example: "Vjo1a910QP" }),
    name: z.string().openapi({ example: "N5" }),
  })
  .openapi("Level");

export const LevelListSchema = z.array(LevelSchema);

export type Level = z.infer<typeof LevelSchema>;
export type LevelList = z.infer<typeof LevelListSchema>;
