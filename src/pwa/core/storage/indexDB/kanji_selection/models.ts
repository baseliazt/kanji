import { paths } from "@/api/docs/openapi/generated/openapi";

export type KanjiSelectionStorageInterface =
  paths["/api/kanji"]["get"]["responses"]["200"]["content"]["application/json"]["data"];
