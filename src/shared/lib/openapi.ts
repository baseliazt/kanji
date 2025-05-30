// lib/openapi.ts
import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi";
import { GetKanjiListRegistry } from "@/api/modules/kanji/docs/list.get";

const registry = new OpenAPIRegistry();

const registryItems = [GetKanjiListRegistry];

for (const registryItem of registryItems) {
  registry.registerPath(registryItem);
}

export const generator = new OpenApiGeneratorV3(registry.definitions);
export const openApiDocument = generator.generateDocument({
  openapi: "3.0.0",
  info: {
    title: "Kanji Documentation",
    version: "1.0.0",
  },
});
