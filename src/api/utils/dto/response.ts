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
