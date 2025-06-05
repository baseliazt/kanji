import fs from "fs";
import path from "path";
import Papa from "papaparse";
import { LevelCSVSchema, LevelListSchema } from "../schemas";

export class LevelService {
  constructor() {}

  async getLevelList() {
    const filePath = path.join(
      process.cwd(),
      "src",
      "data",
      "csv",
      `Level.csv`
    );
    const fileContent = fs.readFileSync(filePath, "utf-8");

    const parsed = Papa.parse<LevelCSVSchema>(fileContent, {
      header: true,
      skipEmptyLines: true,
    });
    const result = LevelListSchema.safeParse(parsed.data);
    if (!result.success) {
      throw new Error("Internal server error");
    }
    const levelList = result.data;

    return levelList;
  }
}
