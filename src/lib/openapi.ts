// lib/openapi.ts
import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi";
import { CreateUserRequest, CreateUserResponse } from "@/schemas/user";

const registry = new OpenAPIRegistry();

registry.registerPath({
  method: "post",
  path: "/api/users",
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
});

export const generator = new OpenApiGeneratorV3(registry.definitions);
export const openApiDocument = generator.generateDocument({
  openapi: "3.0.0",
  info: {
    title: "My API",
    version: "1.0.0",
  },
});
