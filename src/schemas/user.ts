// schemas/user.ts
import { z } from "zod";

export const CreateUserRequest = z.object({
  name: z.string(),
  email: z.string().email(),
});

export const CreateUserResponse = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
});
