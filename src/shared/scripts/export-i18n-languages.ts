import fs from "fs";
import path from "path";
import Papa from "papaparse";

const csvPath = path.join(
  process.cwd(),
  "src",
  "pwa",
  "i18n",
  "csv",
  "Translation.csv"
);
const outputPath = path.join(
  process.cwd(),
  "src",
  "pwa",
  "i18n",
  "types",
  "languages.ts"
);

try {
  const csvRaw = fs.readFileSync(csvPath, "utf8");
  const parsed = Papa.parse(csvRaw, {
    header: true,
    skipEmptyLines: true,
  });

  // Ambil headers dari parsing meta
  const headers = parsed.meta.fields || [];

  // ['namespace', 'key', 'en-US', 'ja-JP', ...]
  const languages = headers.slice(2); // kolom setelah 'key'

  const output = `// Auto-generated from CSV\nexport const languages = ${JSON.stringify(
    languages
  )} as const;\n`;

  fs.writeFileSync(outputPath, output, "utf8");
  console.log("✅ Generated namespaces.ts:", languages);
} catch (error) {
  console.error("❌ Error generating namespaces:", error);
  process.exit(1);
}
