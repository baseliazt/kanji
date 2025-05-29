import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

// VocabularyMeaning
export const VocabularyMeaningSchema = z
  .object({
    id: z.string().openapi({ example: "1" }),
    ["id-ID"]: z
      .string()
      .openapi({ example: "satu", description: "Indonesia translation" }),
    ["en-US"]: z
      .string()
      .openapi({ example: "one", description: "English translation" }),
  })
  .openapi("VocabularyMeaning");

// Vocabulary
export const VocabularySchema = z
  .object({
    id: z.string().openapi({ example: "1" }),
    kanji: z.string().openapi({ example: "1" }),
    kana: z
      .string()
      .openapi({ example: "ひと", description: "Kunyomi in hiragana" }),
    romaji: z
      .string()
      .openapi({ example: "hito", description: "Romaji" }),
    meaning: VocabularyMeaningSchema,
    image_url: z.string().nullable().openapi({ example: null }),
  })
  .openapi("Vocabulary");

// Kunyomi
export const KunyomiSchema = z
  .object({
    id: z.string().openapi({ example: "1" }),
    kanji_id: z.string().openapi({ example: "1" }),
    ["ja-Hira"]: z
      .string()
      .openapi({ example: "ひと", description: "Kunyomi in hiragana" }),
    ["ja-Latn"]: z
      .string()
      .openapi({ example: "hito", description: "Romanized Japanese" }),
  })
  .openapi("Kunyomi");

// Onyomi
export const OnyomiSchema = z
  .object({
    id: z.string().openapi({ example: "1" }),
    kanji_id: z.string().openapi({ example: "1" }),
    ["ja-Kana"]: z
      .string()
      .openapi({ example: "イチ", description: "Onyomi in katakana" }),
    ["ja-Latn"]: z
      .string()
      .openapi({ example: "ichi", description: "Romanized Japanese" }),
  })
  .openapi("Onyomi");

// Kanji schema
export const KanjiSchema = z
  .object({
    id: z.string().openapi({ example: "1" }),
    kanji: z
      .string()
      .openapi({ example: "一", description: "Kanji's example" }),
    kunyomi: z.array(KunyomiSchema).openapi({
      description: "The native Japanese reading of a kanji.",
    }),
    onyomi: z.array(OnyomiSchema).openapi({
      description: "The Sino-Japanese (Chinese-based) reading of a kanji.",
    }),
    stroke: z.number().openapi({ example: 1, description: "Number of stroke" }),
    level: z.string().openapi({ example: "N5" }),
  })
  .openapi("Kanji");

const LevelSchema = z.enum(["N5", "N4", "N3", "N2", "N1"]).openapi({
  example: "N5",
  description: "JLPT Level",
});

// Request schema
export const GetKanjiRequest = z
  .object({
    level: LevelSchema.optional(),
    stroke: z
      .number()
      .openapi({ example: 1, description: "Stroke number" })
      .optional(),
  })
  .openapi("GetKanjiRequest");

// Response schema
export const GetKanjiResponse = z
  .object({
    data: KanjiSchema,
  })
  .openapi("GetKanjiResponse");
