import type { NextConfig } from "next";
import { nextI18NextConfig } from "./src/pwa/core/i18n/utils/config";

const nextConfig: NextConfig = {
  /* config options here */
  i18n: nextI18NextConfig.i18n,
  reactStrictMode: true,
};

export default nextConfig;
