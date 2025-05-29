import { z } from "zod";
import { KanjiSchema } from "../schemas/schema";

export const getLevelListRequestDTO = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
});

export type GetLevelListResponseDTO = KanjiSchema;
