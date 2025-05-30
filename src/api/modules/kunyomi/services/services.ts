import fs from "fs";
import path from "path";
import Papa from "papaparse";
import { KunyomiCSVSchema } from "../schemas/csv";
import { KunyomiListSchema } from "../schemas/schema";

export class KunyomiService {
  constructor() {}

  async getList() {
    const filePath = path.join(
      process.cwd(),
      "src",
      "data",
      "csv",
      `Kunyomi.csv`
    );
    const fileContent = fs.readFileSync(filePath, "utf-8");

    const parsed = Papa.parse<KunyomiCSVSchema>(fileContent, {
      header: true,
      skipEmptyLines: true,
    });

    const result = KunyomiListSchema.safeParse(parsed.data);

    if (!result.success) {
      throw new Error("Internal server error");
    }
    return result.data;
  }
}
