import { z } from "zod";
import { Level } from "../schemas";

export const getLevelListRequestDTO = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
});

export type GetLevelListResponseDTO = Level;
