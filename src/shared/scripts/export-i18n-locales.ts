// scripts/generate-i18n.ts
import fs from "fs";
import path from "path";
import Papa from "papaparse";

const inputFile = path.join(
  process.cwd(),
  "src",
  "pwa",
  "i18n",
  "csv",
  "Translation.csv"
);

const outputBase = path.join(process.cwd(), "src", "pwa", "i18n", "locales");

type Row = {
  namespace: string;
  key: string;
  [lang: string]: string;
};

// Read CSV content as string
const csvContent = fs.readFileSync(inputFile, "utf-8");

// Parse CSV to objects
const parsed = Papa.parse<Row>(csvContent, {
  header: true,
  skipEmptyLines: true,
});

if (parsed.errors.length > 0) {
  console.error("❌ Error parsing CSV:", parsed.errors);
  process.exit(1);
}

const results = parsed.data;

// Group by language -> namespace -> key
const grouped: Record<string, Record<string, Record<string, string>>> = {};

results.forEach((row) => {
  const { namespace, key, ...translations } = row;
  Object.entries(translations).forEach(([lang, value]) => {
    if (!grouped[lang]) grouped[lang] = {};
    if (!grouped[lang][namespace]) grouped[lang][namespace] = {};
    grouped[lang][namespace][key] = value;
  });
});

// Write JSON files
Object.entries(grouped).forEach(([lang, namespaces]) => {
  const langDir = path.join(outputBase, lang);
  if (!fs.existsSync(langDir)) fs.mkdirSync(langDir, { recursive: true });

  Object.entries(namespaces).forEach(([namespace, data]) => {
    const filePath = path.join(langDir, `${namespace}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    console.log(`✅ Generated: ${filePath}`);
  });
});

// NOTES: to create types
// const typeOutput = path.join(
//   process.cwd(),
//   "src",
//   "pwa",
//   "i18n",
//   "types",
//   "locales.d.ts"
// );

// const namespaceKeys: Record<string, Record<string, string>> = {};

// Object.values(grouped["en-US"]).forEach((nsData, nsName) => {
//   namespaceKeys[nsName] = nsData;
// });

// const namespaceList = Object.keys(namespaceKeys);

// const tsContent = `
// // AUTO-GENERATED. DO NOT EDIT MANUALLY.
// import 'i18next';

// declare module 'i18next' {
//   interface CustomTypeOptions {
//     defaultNS: '${namespaceList[0]}';
//     resources: {
// ${namespaceList
//   .map((ns) => {
//     const keys = Object.keys(namespaceKeys[ns])
//       .map((k) => `      ${k}: string;`)
//       .join("\n");
//     return `      ${ns}: {\n${keys}\n      }`;
//   })
//   .join(";\n")}
//     };
//   }
// }
// `;

// fs.writeFileSync(typeOutput, tsContent, "utf-8");
// console.log(`📦 Generated types: ${typeOutput}`);
