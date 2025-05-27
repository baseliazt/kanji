// schemas/user.openapi.ts
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { CreateUserRequest, CreateUserResponse } from "@/schemas/user";

export const userRegistry: RouteConfig = {
  method: "post",
  path: "/api/users",
  tags: ["Users"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateUserRequest,
        },
      },
    },
  },
  responses: {
    201: {
      description: "User created",
      content: {
        "application/json": {
          schema: CreateUserResponse,
        },
      },
    },
  },
};
