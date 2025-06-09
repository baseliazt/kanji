import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { ApiResponseSchema } from "@/api/utils/dto";
import { LevelSchema } from "../schemas/schema";
import { z } from "zod";

export const GetLevelListRegistry: RouteConfig = {
  method: "get",
  path: "/api/level",
  tags: ["Kanji"],
  responses: {
    200: {
      description: "Post created",
      content: {
        "application/json": {
          schema: ApiResponseSchema(z.array(LevelSchema)),
        },
      },
    },
  },
};
