// schemas/post.openapi.ts
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { CreatePostRequest, CreatePostResponse } from "@/schemas/post";

export const getKanjiListRegistry: RouteConfig = {
  method: "get",
  path: "/api/kanji",
  tags: ["Kanji"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreatePostRequest,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Post created",
      content: {
        "application/json": {
          schema: CreatePostResponse,
        },
      },
    },
  },
};
