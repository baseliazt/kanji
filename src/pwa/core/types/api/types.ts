import { paths } from "@/api/docs/openapi/generated/openapi";

export type GetKanjiListDataResponse =
  paths["/api/kanji"]["get"]["responses"]["200"]["content"]["application/json"]["data"];
