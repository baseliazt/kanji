import { z } from "zod";
import { Kanji } from "../schemas/schema";

export const getKanjiListQueryRequest = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
});

export type GetKanjiListQueryRequest = z.infer<typeof getKanjiListQueryRequest>;

export type GetKanjiListResponseDTO = Kanji;
