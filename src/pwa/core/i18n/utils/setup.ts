import path from "path";
import { fetchSheets, getSheetUrl, runCommand } from "@/shared/scripts";
import { TRANSLATION_SHEETS } from "../constants";

async function main() {
  try {
    //    Fetch Translations
    for (const sheet of TRANSLATION_SHEETS) {
      const url = getSheetUrl(sheet.sheetId, sheet.gid);
      const outputPath = path.join(
        process.cwd(),
        "src",
        "pwa",
        "core",
        "i18n",
        "generated",
        "csv",
        sheet.output
      );
      console.log(`⏳ Fetching Translations from ${url}...`);
      await fetchSheets(url, outputPath);
    }
    console.log("🎉 All Translations fetched!");

    // Export JSON Locale
    await runCommand("tsx src/pwa/core/i18n/utils/exportJSONLocales.ts");

    // Export Resources Interface
    await runCommand("tsx src/pwa/core/i18n/utils/exportResourcesInterface.ts");

    // Export Resources Constant
    await runCommand("tsx src/pwa/core/i18n/utils/exportResources.ts");

    process.exit(0);
  } catch (error: any) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

main();
