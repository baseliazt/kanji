// scripts/export-openapi.ts
import { writeFileSync } from "fs";
import { openApiDocument } from "../lib/openapi";

writeFileSync("src/docs/openapi.json", JSON.stringify(openApiDocument, null, 2));
console.log("✅ openapi.json generated!");
