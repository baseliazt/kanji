import { z } from "zod";
import { KanjiSchema } from "../schemas/schema";
import { KanjiLevelZod } from "../../level/dtos/level_list.get";
import { KunyomiListSchema } from "../../kunyomi/schemas/schema";
import { OnyomiListSchema } from "../../onyomi/schemas/schema";
import { VocabularyListSchema } from "../../vocabulary/schemas/schema";

export const getKanjiListQueryRequest = z.object({
  level: KanjiLevelZod,
  id: z.string().optional().nullable(),
});

export type GetKanjiListQueryRequest = z.infer<typeof getKanjiListQueryRequest>;

export const GetKanjiListResponseDTOSchema = KanjiSchema.extend({
  kunyomi: KunyomiListSchema,
  onyomi: OnyomiListSchema,
  vocabulary: VocabularyListSchema,
});

export type GetKanjiListResponseDTO = z.infer<
  typeof GetKanjiListResponseDTOSchema
>;
