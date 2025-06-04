import fs from "fs";
import path from "path";
import Papa from "papaparse";
import { VocabularyCSVSchema } from "../schemas/csv";
import { VocabularyListSchema } from "../schemas/schema";

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
}
