import fs from "fs";
import path from "path";
import Papa from "papaparse";

export class LevelService {
  constructor() {}

  async getLevelList() {
    const filePath = path.join(
      process.cwd(),
      "src",
      "data",
      "jlpt",
      `level.csv`
    );
    const fileContent = fs.readFileSync(filePath, "utf-8");

    const parsed = Papa.parse(fileContent, {
      header: true,
      skipEmptyLines: true,
    });

    return parsed.data;
  }
}
