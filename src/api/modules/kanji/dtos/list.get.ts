import { z } from "zod";
import { KanjiCSVSchema } from "../schemas/csv";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

export const getKanjiListQueryRequest = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
});

export type GetLevelListResponseDTO = KanjiCSVSchema;
