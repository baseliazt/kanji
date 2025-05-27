// schemas/post.ts
import { z } from "zod";

export const CreatePostRequest = z.object({
  name: z.string(),
  email: z.string().email(),
});

export const CreatePostResponse = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
});
