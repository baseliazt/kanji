import fs from "fs";
import path from "path";
import Papa from "papaparse";
import { VisualMnemonicCSVSchema } from "../schemas/csv";

export class VisualMnemonicService {
  constructor() {}

  async getList() {
    const filePath = path.join(
      process.cwd(),
      "src",
      "data",
      "csv",
      `VisualMnemonic.csv`
    );
    const fileContent = fs.readFileSync(filePath, "utf-8");

    const parsed = Papa.parse<VisualMnemonicCSVSchema>(fileContent, {
      header: true,
      skipEmptyLines: true,
    });

    return parsed.data;
  }
}
