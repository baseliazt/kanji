import { z } from "zod";
import { Kanji } from "../schemas/schema";

export const getKanjiListQueryRequest = z.object({
  level: z.enum(["N5", "N4", "N3", "N2", "N1"]).optional().nullable(),
  id: z.string().optional().nullable(),
});

export type GetKanjiListQueryRequest = z.infer<typeof getKanjiListQueryRequest>;

export type GetKanjiListResponseDTO = Kanji;
