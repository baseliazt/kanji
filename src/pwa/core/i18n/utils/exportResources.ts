// scripts/generate-i18n.ts
import fs from "fs";
import path from "path";

const localesPath = path.join(
  process.cwd(),
  "src",
  "pwa",
  "core",
  "i18n",
  "generated",
  "locales"
);
const outputPath = path.join(
  process.cwd(),
  "src",
  "pwa",
  "core",
  "i18n",
  "generated",
  "constants",
  "resources.ts"
);

const languages = fs.readdirSync(localesPath);

const imports: string[] = [];
const resourceObject: string[] = [];

for (const lang of languages) {
  const langDir = path.join(localesPath, lang);
  const files = fs.readdirSync(langDir);
  const nsObject: string[] = [];

  for (const file of files) {
    const ns = file.replace(".json", "");
    const importName = `${lang}_${ns}`.replace(/-/g, "_");
    imports.push(
      `import ${importName} from "@/pwa/core/i18n/generated/locales/${lang}/${file}";`
    );
    nsObject.push(`"${ns}": ${importName}`);
  }

  resourceObject.push(`"${lang}": { ${nsObject.join(", ")} }`);
}

const finalOutput = `${imports.join("\n")}

const resources = {
  ${resourceObject.join(",\n  ")}
};

export default resources;
`;

fs.writeFileSync(outputPath, finalOutput, "utf-8");
console.log("✅ Generated Resources Constants successfully.");
