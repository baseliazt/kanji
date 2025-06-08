import createClient from "openapi-fetch";
import type { paths } from "@/api/docs/openapi/generated/openapi";

const serverClient = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:2026",
  headers: {
    "Content-Type": "application/json",
    // Tambahkan auth headers di sini jika perlu
    // Authorization: `Bearer ${token}`,
  },
});

export default serverClient;
