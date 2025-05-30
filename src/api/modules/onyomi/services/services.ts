import fs from "fs";
import path from "path";
import Papa from "papaparse";
import { OnyomiCSVSchema } from "../schemas/csv";
import { OnyomiListSchema } from "../schemas/schema";

export class OnyomiService {
  constructor() {}

  async getList() {
    const filePath = path.join(
      process.cwd(),
      "src",
      "data",
      "csv",
      `Onyomi.csv`
    );
    const fileContent = fs.readFileSync(filePath, "utf-8");

    const parsed = Papa.parse<OnyomiCSVSchema>(fileContent, {
      header: true,
      skipEmptyLines: true,
    });

    const result = OnyomiListSchema.safeParse(parsed.data);

    if (!result.success) {
      throw new Error("Internal server error");
    }
    return result.data;
  }
}
