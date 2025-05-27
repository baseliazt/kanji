import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

// Comment schema
export const CommentSchema = z
  .object({
    id: z.string().openapi({ example: "c1" }),
    content: z.string().openapi({ example: "Nice post!" }),
    author: z.string().openapi({ example: "user123" }),
  })
  .openapi("Comment");

// Post schema with nested comments
export const PostSchema = z
  .object({
    id: z.string().openapi({ example: "p1" }),
    title: z.string().openapi({ example: "My First Post" }),
    content: z.string().openapi({ example: "Hello, world!" }),
    comments: z
      .array(CommentSchema)
      .openapi({ description: "List of comments" }),
  })
  .openapi("Post");

// Request schema
export const CreatePostRequest = z
  .object({
    title: z.string().openapi({ example: "New Post" }),
    content: z.string().openapi({ example: "Content here..." }),
  })
  .openapi("CreatePostRequest");

// Response schema
export const CreatePostResponse = z
  .object({
    post: PostSchema,
  })
  .openapi("CreatePostResponse");
