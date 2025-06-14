import { z } from "zod";

import { VocabularySchema } from "../schemas/schema";

export const getVocabularyExercisesQueryRequest = z.object({
  vocabularies: z.string(),
});

export type GetVocabularyExercisesQueryRequest = z.infer<
  typeof getVocabularyExercisesQueryRequest
>;

export const GetVocabularyExercisesResponseDTOSchema = z.object({
  id: z.string(),
  prompt: VocabularySchema,
  options: z.array(VocabularySchema),
  answer: VocabularySchema,
});

export type GetVocabularyExercisesResponseDTO = z.infer<
  typeof GetVocabularyExercisesResponseDTOSchema
>;
