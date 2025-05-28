import { z } from "zod";
import { LevelEntities } from "../entities";

export const getLevelListRequestDTO = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
});

export type GetLevelListResponseDTO = LevelEntities;
