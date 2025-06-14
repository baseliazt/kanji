import fs from "fs";
import path from "path";
import Papa from "papaparse";

const inputCsv = path.join(
  process.cwd(),
  "src",
  "pwa",
  "core",
  "i18n",
  "generated",
  "csv",
  "Translation.csv"
);
const outputTs = path.join(
  process.cwd(),
  "src",
  "pwa",
  "core",
  "i18n",
  "generated",
  "types",
  "resources.ts"
);

// Baca isi CSV
const csvText = fs.readFileSync(inputCsv, "utf-8");

// Parse CSV
const result = Papa.parse(csvText, {
  header: true,
  skipEmptyLines: true,
});

type Row = {
  namespace: string;
  key: string;
  "en-US": string;
};

const rows = result.data as Row[];

const grouped: Record<string, Record<string, string>> = {};

for (const row of rows) {
  console.log(row, "ini row");
  if (!row.namespace || !row.key || !row["en-US"]) continue;

  if (!grouped[row.namespace]) {
    grouped[row.namespace] = {};
  }
  grouped[row.namespace][row.key] = row["en-US"];
}

// Bangun file TypeScript
const lines: string[] = [];

lines.push(`/**`);
lines.push(` * This file was auto-generated by openapi-typescript.`);
lines.push(` * Do not make direct changes to the file.`);
lines.push(` */\n`);

lines.push("export interface Resources {");

for (const [namespace, entries] of Object.entries(grouped)) {
  lines.push(`  ${namespace}: {`);
  for (const [key, value] of Object.entries(entries)) {
    lines.push(`    ${key}: ${JSON.stringify(value)}`);
  }
  lines.push("  }");
}

lines.push("};");

// Simpan ke file
fs.writeFileSync(outputTs, lines.join("\n"), "utf-8");

console.log("✅ Generated Resources Interface successfully");
