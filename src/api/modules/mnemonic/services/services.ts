import fs from "fs";
import path from "path";
import Papa from "papaparse";
import { MnemonicCSVSchema } from "../schemas/csv";

export class MnemonicService {
  constructor() {}

  async getList() {
    const filePath = path.join(
      process.cwd(),
      "src",
      "data",
      "csv",
      `Mnemonic.csv`
    );
    const fileContent = fs.readFileSync(filePath, "utf-8");

    const parsed = Papa.parse<MnemonicCSVSchema>(fileContent, {
      header: true,
      skipEmptyLines: true,
    });

    return parsed.data;
  }
}
