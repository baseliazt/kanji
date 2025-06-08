import { z } from "zod";
import { Kanji } from "../schemas/schema";
import { KanjiLevelZod } from "../../level/dtos/level_list.get";

export const getKanjiListQueryRequest = z.object({
  level: KanjiLevelZod,
  id: z.string().optional().nullable(),
});

export type GetKanjiListQueryRequest = z.infer<typeof getKanjiListQueryRequest>;

export type GetKanjiListResponseDTO = Kanji;
