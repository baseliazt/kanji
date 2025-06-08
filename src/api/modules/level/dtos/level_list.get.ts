import { z } from "zod";
import { Level } from "../schemas";

export const KanjiLevelZod = z
  .enum(["N5", "N4", "N3", "N2", "N1"])
  .optional()
  .nullable();
  
export type KanjiLevel = z.infer<typeof KanjiLevelZod>;

export const getLevelListRequestDTO = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
});

export type GetLevelListResponseDTO = Level;
