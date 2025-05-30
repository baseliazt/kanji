import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: any;
}

export function createApiResponse<T>(
  success: boolean,
  data?: T,
  message?: string,
  error?: any
): ApiResponse<T> {
  return {
    success,
    message,
    data,
    error,
  };
}

export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    message: z.string().optional(),
    data: dataSchema.optional(),
    error: z.unknown().optional(),
  });
