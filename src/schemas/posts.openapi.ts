// schemas/post.openapi.ts
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { CreatePostRequest, CreatePostResponse } from "@/schemas/post";

export const postRegistry: RouteConfig = {
  method: "post",
  path: "/api/posts",
  tags: ["Posts"],
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
