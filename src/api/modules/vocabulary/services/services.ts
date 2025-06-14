import fs from "fs";
import path from "path";
import Papa from "papaparse";
import { VocabularyCSVSchema } from "../schemas/csv";
import {
  Vocabulary,
  VocabularyListSchema,
  VocabularyQuestion,
} from "../schemas/schema";
import { GetVocabularyQuestionListQueryRequest } from "../dtos";
import { decodeId, encodeId } from "@/api/utils/id";

export class VocabularyService {
  constructor() {}

  async getList() {
    const filePath = path.join(
      process.cwd(),
      "src",
      "data",
      "csv",
      `Vocabulary.csv`
    );
    const fileContent = fs.readFileSync(filePath, "utf-8");

    const parsed = Papa.parse<VocabularyCSVSchema>(fileContent, {
      header: true,
      skipEmptyLines: true,
    });

    const result = VocabularyListSchema.safeParse(parsed.data);

    if (!result.success) {
      throw new Error("Internal server error");
    }
    return result.data;
  }

  generateMultipleChoiceQuestions: (
    vocabularies: string[],
    data: Vocabulary[],
    count: number
  ) => VocabularyQuestion[] = (
    vocabularies: string[],
    data: Vocabulary[],
    count = 5
  ) => {
    const questions = [];

    for (let i = 0; i < count && i < vocabularies.length; i++) {
      const current = data.find((item) => item.id === vocabularies[i]);
      if (!!current) {
        // Pick 3 options aside from current
        const wrongOptions = data
          .filter((item) => item.id !== current.id)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);

        const allOptions = [...wrongOptions, current]
          .sort(() => Math.random() - 0.5)
          .map((opt) => opt);

        const question = {
          id: `q${i + 1}`,
          prompt: {
            ...current,
          },
          options: allOptions,
          answer: current,
        };

        questions.push(question);
      }
    }

    return questions;
  };

  async getVocabularyQuestionList(
    query: GetVocabularyQuestionListQueryRequest
  ) {
    const vocabulariesQuery = query.vocabularies;
    const vocabularies = await this.getList();
    const vocabulariesFilter = vocabulariesQuery.split(",");

    const questions = this.generateMultipleChoiceQuestions(
      vocabulariesFilter,
      vocabularies,
      vocabularies.length
    );

    return questions;
  }
}
