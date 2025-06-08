import path from "path";
import { DATABASE_SHEETS } from "@/api/constants";
import { fetchSheets, getSheetUrl } from "@/shared/scripts";
import { generateSchemas } from "@/api/utils/csv";

async function main() {
  try {
    // Loop fetch secara berurutan
    for (const sheet of DATABASE_SHEETS) {
      const url = getSheetUrl(sheet.sheetId, sheet.gid);
      const outputPath = path.join(
        process.cwd(),
        "src",
        "data",
        "csv",
        sheet.output
      );
      console.log(`⏳ Fetching CSV from ${url}...`);
      await fetchSheets(url, outputPath);
    }
    console.log("🎉 All CSVs fetched!");
    generateSchemas();
    process.exit(0);
  } catch (error: any) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

main();
