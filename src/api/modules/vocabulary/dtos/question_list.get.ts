import { z } from "zod";

import { VocabularySchema } from "../schemas/schema";

export const getVocabularyQuestionListQueryRequest = z.object({
  vocabularies: z.string(),
});

export type GetVocabularyQuestionListQueryRequest = z.infer<
  typeof getVocabularyQuestionListQueryRequest
>;

export const GetVocabularyQuestionListResponseDTOSchema = z.object({
  id: z.string(),
  prompt: VocabularySchema,
  options: z.array(VocabularySchema),
  answer: VocabularySchema,
});

export type GetVocabularyQuestionListResponseDTO = z.infer<
  typeof GetVocabularyQuestionListResponseDTOSchema
>;
