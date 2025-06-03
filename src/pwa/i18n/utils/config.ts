import type { UserConfig } from "next-i18next";
import path from "path";

const nextI18NextConfig: UserConfig = {
  i18n: {
    defaultLocale: "en-US",
    locales: ["en-US", "id-ID"],
  },
  localePath: path.resolve("./locales"),
  reloadOnPrerender: process.env.NODE_ENV === "development",
};

export default nextI18NextConfig;
