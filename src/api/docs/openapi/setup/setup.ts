// scripts/export-openapi.ts
import { openApiDocument } from "@/api/utils/openapi";
import { runCommand } from "@/shared/scripts";
import { writeFileSync } from "fs";

async function main() {
  try {
    writeFileSync(
      "src/api/docs/openapi/generated/openapi.json",
      JSON.stringify(openApiDocument, null, 2)
    );
    console.log("✅ openapi.json generated!");

    await runCommand(
      "openapi-typescript src/api/docs/openapi/generated/openapi.json -o src/api/docs/openapi/generated/openapi.d.ts"
    );
    console.log("✅ openapi types generated!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to generate openapi types", error);
    process.exit(1);
  }
}

main();
